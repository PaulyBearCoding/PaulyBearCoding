const WebSocket = require('ws');
const http = require('http');
const express = require('express');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Serve static files
app.use(express.static(path.join(__dirname)));

// In-memory storage
const users = new Map(); // username -> WebSocket
const groups = new Map(); // groupId -> { id, name, members: [] }

let groupIdCounter = 1;

// WebSocket connection handler
wss.on('connection', (ws) => {
    console.log('New client connected');
    let username = null;

    ws.on('message', (message) => {
        try {
            const data = JSON.parse(message);
            console.log('Received:', data.type, 'from:', username || 'unknown');

            switch (data.type) {
                case 'register':
                    handleRegister(ws, data);
                    break;
                case 'create-group':
                    handleCreateGroup(ws, data);
                    break;
                case 'add-members':
                    handleAddMembers(ws, data);
                    break;
                case 'leave-group':
                    handleLeaveGroup(ws, data);
                    break;
                case 'offer':
                    handleOffer(data);
                    break;
                case 'answer':
                    handleAnswer(data);
                    break;
                case 'ice-candidate':
                    handleIceCandidate(data);
                    break;
                case 'call-ended':
                    handleCallEnded(data);
                    break;
            }
        } catch (error) {
            console.error('Error processing message:', error);
        }
    });

    ws.on('close', () => {
        if (username) {
            console.log(`User ${username} disconnected`);
            users.delete(username);
            broadcastUsersList();
        }
    });

    // Register user
    function handleRegister(ws, data) {
        username = data.username;
        users.set(username, ws);
        console.log(`User registered: ${username}`);

        // Send current users list
        broadcastUsersList();

        // Send groups that user is part of
        sendUserGroups(username);
    }

    // Create group
    function handleCreateGroup(ws, data) {
        const groupId = `group-${groupIdCounter++}`;
        const group = {
            id: groupId,
            name: data.name,
            members: data.members
        };

        groups.set(groupId, group);
        console.log(`Group created: ${group.name} with members:`, group.members);

        // Notify all group members
        group.members.forEach(member => {
            const memberWs = users.get(member);
            if (memberWs && memberWs.readyState === WebSocket.OPEN) {
                memberWs.send(JSON.stringify({
                    type: 'group-created',
                    group: group
                }));
            }
        });
    }

    // Add members to group
    function handleAddMembers(ws, data) {
        const group = groups.get(data.groupId);
        if (!group) return;

        data.members.forEach(member => {
            if (!group.members.includes(member)) {
                group.members.push(member);
            }
        });

        console.log(`Members added to ${group.name}:`, data.members);

        // Notify all group members about the update
        group.members.forEach(member => {
            const memberWs = users.get(member);
            if (memberWs && memberWs.readyState === WebSocket.OPEN) {
                memberWs.send(JSON.stringify({
                    type: 'group-updated',
                    group: group
                }));
            }
        });
    }

    // Leave group
    function handleLeaveGroup(ws, data) {
        const group = groups.get(data.groupId);
        if (!group) return;

        group.members = group.members.filter(m => m !== username);
        console.log(`${username} left group ${group.name}`);

        if (group.members.length === 0) {
            groups.delete(data.groupId);
            console.log(`Group ${group.name} deleted (no members)`);
        } else {
            // Notify remaining members
            group.members.forEach(member => {
                const memberWs = users.get(member);
                if (memberWs && memberWs.readyState === WebSocket.OPEN) {
                    memberWs.send(JSON.stringify({
                        type: 'group-updated',
                        group: group
                    }));
                }
            });
        }

        // Send updated groups to user who left
        sendUserGroups(username);
    }

    // WebRTC signaling handlers
    function handleOffer(data) {
        const targetWs = users.get(data.to);
        if (targetWs && targetWs.readyState === WebSocket.OPEN) {
            targetWs.send(JSON.stringify({
                type: 'offer',
                offer: data.offer,
                from: data.from
            }));
        }
    }

    function handleAnswer(data) {
        const targetWs = users.get(data.to);
        if (targetWs && targetWs.readyState === WebSocket.OPEN) {
            targetWs.send(JSON.stringify({
                type: 'answer',
                answer: data.answer
            }));
        }
    }

    function handleIceCandidate(data) {
        const targetWs = users.get(data.to);
        if (targetWs && targetWs.readyState === WebSocket.OPEN) {
            targetWs.send(JSON.stringify({
                type: 'ice-candidate',
                candidate: data.candidate
            }));
        }
    }

    function handleCallEnded(data) {
        const targetWs = users.get(data.to);
        if (targetWs && targetWs.readyState === WebSocket.OPEN) {
            targetWs.send(JSON.stringify({
                type: 'call-ended'
            }));
        }
    }
});

// Broadcast online users to all connected clients
function broadcastUsersList() {
    const usersList = Array.from(users.keys());
    const message = JSON.stringify({
        type: 'users',
        users: usersList
    });

    users.forEach((ws, username) => {
        if (ws.readyState === WebSocket.OPEN) {
            ws.send(message);
        }
    });

    console.log('Broadcasted users list:', usersList);
}

// Send groups to a specific user
function sendUserGroups(username) {
    const userGroups = [];
    groups.forEach(group => {
        if (group.members.includes(username)) {
            userGroups.push(group);
        }
    });

    const userWs = users.get(username);
    if (userWs && userWs.readyState === WebSocket.OPEN) {
        userWs.send(JSON.stringify({
            type: 'groups',
            groups: userGroups
        }));
    }

    console.log(`Sent ${userGroups.length} groups to ${username}`);
}

// Start server
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`
╔═══════════════════════════════════════════════════════╗
║                                                       ║
║        🌐 SocialConnect Server Running!              ║
║                                                       ║
║        Server: http://localhost:${PORT}                 ║
║        WebSocket: ws://localhost:${PORT}                ║
║                                                       ║
║        Features:                                      ║
║        ✓ WebRTC Video Calling                        ║
║        ✓ Group Management                            ║
║        ✓ Real-time Messaging                         ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝
    `);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received, closing server...');
    server.close(() => {
        console.log('Server closed');
        process.exit(0);
    });
});

process.on('SIGINT', () => {
    console.log('\nSIGINT received, closing server...');
    server.close(() => {
        console.log('Server closed');
        process.exit(0);
    });
});
