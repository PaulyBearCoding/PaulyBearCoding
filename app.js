// Global State
let currentUser = null;
let ws = null;
let onlineUsers = [];
let groups = [];
let peerConnection = null;
let localStream = null;
let currentCall = null;
let selectedGroupId = null;

// WebRTC Configuration
const rtcConfig = {
    iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' }
    ]
};

// DOM Elements
const loginScreen = document.getElementById('loginScreen');
const mainScreen = document.getElementById('mainScreen');
const usernameInput = document.getElementById('usernameInput');
const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');
const currentUserSpan = document.getElementById('currentUser');
const usersList = document.getElementById('usersList');
const groupsList = document.getElementById('groupsList');
const createGroupBtn = document.getElementById('createGroupBtn');
const startCallBtn = document.getElementById('startCallBtn');
const callArea = document.getElementById('callArea');
const welcomeMessage = document.getElementById('welcomeMessage');
const localVideo = document.getElementById('localVideo');
const remoteVideo = document.getElementById('remoteVideo');
const toggleAudioBtn = document.getElementById('toggleAudioBtn');
const toggleVideoBtn = document.getElementById('toggleVideoBtn');
const endCallBtn = document.getElementById('endCallBtn');

// Initialize WebSocket Connection
function connectWebSocket() {
    ws = new WebSocket('ws://localhost:8080');

    ws.onopen = () => {
        console.log('Connected to server');
        if (currentUser) {
            ws.send(JSON.stringify({
                type: 'register',
                username: currentUser
            }));
        }
    };

    ws.onmessage = async (event) => {
        const data = JSON.parse(event.data);
        console.log('Received:', data);

        switch(data.type) {
            case 'users':
                updateUsersList(data.users);
                break;
            case 'groups':
                updateGroupsList(data.groups);
                break;
            case 'group-created':
                groups.push(data.group);
                updateGroupsList(groups);
                closeModal('createGroupModal');
                alert('Group created successfully!');
                break;
            case 'group-updated':
                const index = groups.findIndex(g => g.id === data.group.id);
                if (index !== -1) {
                    groups[index] = data.group;
                    updateGroupsList(groups);
                }
                break;
            case 'offer':
                await handleOffer(data);
                break;
            case 'answer':
                await handleAnswer(data);
                break;
            case 'ice-candidate':
                await handleIceCandidate(data);
                break;
            case 'call-ended':
                endCall();
                break;
        }
    };

    ws.onclose = () => {
        console.log('Disconnected from server');
        setTimeout(connectWebSocket, 3000);
    };

    ws.onerror = (error) => {
        console.error('WebSocket error:', error);
    };
}

// Login Handler
loginBtn.addEventListener('click', () => {
    const username = usernameInput.value.trim();
    if (username) {
        currentUser = username;
        currentUserSpan.textContent = username;
        logoutBtn.style.display = 'block';
        loginScreen.classList.remove('active');
        mainScreen.classList.add('active');
        connectWebSocket();
    } else {
        alert('Please enter a username');
    }
});

// Logout Handler
logoutBtn.addEventListener('click', () => {
    if (ws) {
        ws.close();
    }
    currentUser = null;
    currentUserSpan.textContent = 'Guest';
    logoutBtn.style.display = 'none';
    mainScreen.classList.remove('active');
    loginScreen.classList.add('active');
    usernameInput.value = '';
});

// Update Users List
function updateUsersList(users) {
    onlineUsers = users.filter(u => u !== currentUser);
    usersList.innerHTML = '';
    onlineUsers.forEach(user => {
        const li = document.createElement('li');
        li.className = 'online';
        li.textContent = user;
        usersList.appendChild(li);
    });
}

// Update Groups List
function updateGroupsList(groupsData) {
    groups = groupsData;
    groupsList.innerHTML = '';
    groups.forEach(group => {
        const li = document.createElement('li');
        li.textContent = `${group.name} (${group.members.length})`;
        li.addEventListener('click', () => openGroupDetails(group));
        groupsList.appendChild(li);
    });
}

// Modal Functions
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.add('active');
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('active');
    const content = modal.querySelector('.modal-content');
    if (content) {
        content.classList.remove('collapsed');
    }
}

// Close modal when clicking outside
document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal(modal.id);
        }
    });
});

// Close buttons
document.querySelectorAll('.close-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const modalId = btn.getAttribute('data-modal');
        closeModal(modalId);
    });
});

// Collapse buttons
document.querySelectorAll('.collapse-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const modalContent = btn.closest('.modal-content');
        const isCollapsed = modalContent.classList.toggle('collapsed');
        btn.textContent = isCollapsed ? '+' : '−';
    });
});

// Create Group Modal
createGroupBtn.addEventListener('click', () => {
    openModal('createGroupModal');
    updateMembersList();
});

function updateMembersList() {
    const membersList = document.getElementById('membersList');
    membersList.innerHTML = '';
    onlineUsers.forEach(user => {
        const div = document.createElement('div');
        div.className = 'user-checkbox';
        div.innerHTML = `
            <input type="checkbox" id="member-${user}" value="${user}">
            <label for="member-${user}">${user}</label>
        `;
        membersList.appendChild(div);
    });
}

// Confirm Create Group
document.getElementById('confirmCreateGroupBtn').addEventListener('click', () => {
    const groupName = document.getElementById('groupNameInput').value.trim();
    if (!groupName) {
        alert('Please enter a group name');
        return;
    }

    const selectedMembers = [];
    document.querySelectorAll('#membersList input:checked').forEach(checkbox => {
        selectedMembers.push(checkbox.value);
    });

    if (selectedMembers.length === 0) {
        alert('Please select at least one member');
        return;
    }

    selectedMembers.push(currentUser);

    ws.send(JSON.stringify({
        type: 'create-group',
        name: groupName,
        members: selectedMembers
    }));

    document.getElementById('groupNameInput').value = '';
});

// Open Group Details
function openGroupDetails(group) {
    selectedGroupId = group.id;
    document.getElementById('groupDetailsTitle').textContent = group.name;

    const membersList = document.getElementById('groupMembersList');
    membersList.innerHTML = '';
    group.members.forEach(member => {
        const li = document.createElement('li');
        li.textContent = member;
        membersList.appendChild(li);
    });

    openModal('groupDetailsModal');
}

// Add Members to Group
document.getElementById('addMemberBtn').addEventListener('click', () => {
    updateAvailableUsersList();
    openModal('addMembersModal');
});

function updateAvailableUsersList() {
    const selectedGroup = groups.find(g => g.id === selectedGroupId);
    if (!selectedGroup) return;

    const availableUsers = onlineUsers.filter(user =>
        !selectedGroup.members.includes(user)
    );

    const availableUsersList = document.getElementById('availableUsersList');
    availableUsersList.innerHTML = '';

    if (availableUsers.length === 0) {
        availableUsersList.innerHTML = '<p>No available users to add</p>';
        return;
    }

    availableUsers.forEach(user => {
        const div = document.createElement('div');
        div.className = 'user-checkbox';
        div.innerHTML = `
            <input type="checkbox" id="add-${user}" value="${user}">
            <label for="add-${user}">${user}</label>
        `;
        availableUsersList.appendChild(div);
    });
}

// Confirm Add Members
document.getElementById('confirmAddMembersBtn').addEventListener('click', () => {
    const newMembers = [];
    document.querySelectorAll('#availableUsersList input:checked').forEach(checkbox => {
        newMembers.push(checkbox.value);
    });

    if (newMembers.length === 0) {
        alert('Please select at least one user');
        return;
    }

    ws.send(JSON.stringify({
        type: 'add-members',
        groupId: selectedGroupId,
        members: newMembers
    }));

    closeModal('addMembersModal');
});

// Leave Group
document.getElementById('leaveGroupBtn').addEventListener('click', () => {
    if (confirm('Are you sure you want to leave this group?')) {
        ws.send(JSON.stringify({
            type: 'leave-group',
            groupId: selectedGroupId
        }));
        closeModal('groupDetailsModal');
    }
});

// Start Call
startCallBtn.addEventListener('click', () => {
    updateCallUsersList();
    openModal('callUserModal');
});

function updateCallUsersList() {
    const callUsersList = document.getElementById('callUsersList');
    callUsersList.innerHTML = '';

    if (onlineUsers.length === 0) {
        callUsersList.innerHTML = '<p>No users available to call</p>';
        return;
    }

    onlineUsers.forEach(user => {
        const div = document.createElement('div');
        div.className = 'user-item';
        div.textContent = user;
        div.addEventListener('click', () => {
            initiateCall(user);
            closeModal('callUserModal');
        });
        callUsersList.appendChild(div);
    });
}

// WebRTC Functions
async function initiateCall(targetUser) {
    try {
        localStream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        });

        localVideo.srcObject = localStream;
        welcomeMessage.style.display = 'none';
        callArea.style.display = 'block';

        peerConnection = new RTCPeerConnection(rtcConfig);

        localStream.getTracks().forEach(track => {
            peerConnection.addTrack(track, localStream);
        });

        peerConnection.onicecandidate = (event) => {
            if (event.candidate) {
                ws.send(JSON.stringify({
                    type: 'ice-candidate',
                    candidate: event.candidate,
                    to: targetUser
                }));
            }
        };

        peerConnection.ontrack = (event) => {
            remoteVideo.srcObject = event.streams[0];
        };

        const offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer);

        ws.send(JSON.stringify({
            type: 'offer',
            offer: offer,
            to: targetUser,
            from: currentUser
        }));

        currentCall = targetUser;
    } catch (error) {
        console.error('Error initiating call:', error);
        alert('Error accessing camera/microphone');
    }
}

async function handleOffer(data) {
    try {
        document.getElementById('callerName').textContent = `${data.from} is calling...`;
        openModal('incomingCallModal');

        // Store the offer for when user accepts
        window.pendingOffer = data;
    } catch (error) {
        console.error('Error handling offer:', error);
    }
}

document.getElementById('acceptCallBtn').addEventListener('click', async () => {
    try {
        const data = window.pendingOffer;
        closeModal('incomingCallModal');

        localStream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        });

        localVideo.srcObject = localStream;
        welcomeMessage.style.display = 'none';
        callArea.style.display = 'block';

        peerConnection = new RTCPeerConnection(rtcConfig);

        localStream.getTracks().forEach(track => {
            peerConnection.addTrack(track, localStream);
        });

        peerConnection.onicecandidate = (event) => {
            if (event.candidate) {
                ws.send(JSON.stringify({
                    type: 'ice-candidate',
                    candidate: event.candidate,
                    to: data.from
                }));
            }
        };

        peerConnection.ontrack = (event) => {
            remoteVideo.srcObject = event.streams[0];
        };

        await peerConnection.setRemoteDescription(new RTCSessionDescription(data.offer));
        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);

        ws.send(JSON.stringify({
            type: 'answer',
            answer: answer,
            to: data.from
        }));

        currentCall = data.from;
    } catch (error) {
        console.error('Error accepting call:', error);
        alert('Error accessing camera/microphone');
    }
});

document.getElementById('rejectCallBtn').addEventListener('click', () => {
    closeModal('incomingCallModal');
    ws.send(JSON.stringify({
        type: 'call-ended',
        to: window.pendingOffer.from
    }));
});

async function handleAnswer(data) {
    try {
        await peerConnection.setRemoteDescription(new RTCSessionDescription(data.answer));
    } catch (error) {
        console.error('Error handling answer:', error);
    }
}

async function handleIceCandidate(data) {
    try {
        if (peerConnection) {
            await peerConnection.addIceCandidate(new RTCIceCandidate(data.candidate));
        }
    } catch (error) {
        console.error('Error handling ICE candidate:', error);
    }
}

// Call Controls
toggleAudioBtn.addEventListener('click', () => {
    if (localStream) {
        const audioTrack = localStream.getAudioTracks()[0];
        audioTrack.enabled = !audioTrack.enabled;
        toggleAudioBtn.textContent = audioTrack.enabled ? '🎤 Mute' : '🎤 Unmute';
    }
});

toggleVideoBtn.addEventListener('click', () => {
    if (localStream) {
        const videoTrack = localStream.getVideoTracks()[0];
        videoTrack.enabled = !videoTrack.enabled;
        toggleVideoBtn.textContent = videoTrack.enabled ? '📹 Stop Video' : '📹 Start Video';
    }
});

endCallBtn.addEventListener('click', () => {
    endCall();
    if (currentCall) {
        ws.send(JSON.stringify({
            type: 'call-ended',
            to: currentCall
        }));
    }
});

function endCall() {
    if (peerConnection) {
        peerConnection.close();
        peerConnection = null;
    }

    if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
        localStream = null;
    }

    localVideo.srcObject = null;
    remoteVideo.srcObject = null;
    callArea.style.display = 'none';
    welcomeMessage.style.display = 'block';
    currentCall = null;

    toggleAudioBtn.textContent = '🎤 Mute';
    toggleVideoBtn.textContent = '📹 Stop Video';
}

// Group Call
document.getElementById('groupCallBtn').addEventListener('click', () => {
    alert('Group calling feature coming soon! This would initiate a multi-party call with all group members.');
});

// Handle Enter key on login
usernameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        loginBtn.click();
    }
});

// Handle Enter key on group name
document.getElementById('groupNameInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        document.getElementById('confirmCreateGroupBtn').click();
    }
});
