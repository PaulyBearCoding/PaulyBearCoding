// ============================================================================
// SOCIALCONNECT - FRONTEND DEMO VERSION
// Uses mock data with curated Pexels images
// No backend required - pure frontend demonstration
// ============================================================================

// Demo Images - Centralized Pexels URLs
const demoAvatars = [
  "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400",
  "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=400",
  "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=400",
  "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400",
  "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=400",
  "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=400",
  "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400",
  "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=400",
  "https://images.pexels.com/photos/1024311/pexels-photo-1024311.jpeg?auto=compress&cs=tinysrgb&w=400",
  "https://images.pexels.com/photos/1580271/pexels-photo-1580271.jpeg?auto=compress&cs=tinysrgb&w=400",
  "https://images.pexels.com/photos/1520760/pexels-photo-1520760.jpeg?auto=compress&cs=tinysrgb&w=400",
  "https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=400"
];

// Global State
let currentUser = null;
let onlineUsers = [];
let groups = [];
let userPhotos = {}; // Cache for Pexels photos
let selectedGroupId = null;
let inCall = false;

// Mock user names for demo
const MOCK_USERNAMES = [
    'Alex Chen', 'Jordan Smith', 'Sam Taylor', 'Riley Johnson',
    'Morgan Williams', 'Casey Brown', 'Drew Martinez', 'Quinn Davis',
    'Avery Anderson', 'Blake Thompson', 'Cameron White', 'Dakota Lee'
];

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
const chatArea = document.getElementById('chatArea');
const chatUserAvatar = document.getElementById('chatUserAvatar');
const chatUserName = document.getElementById('chatUserName');
const startVideoCallBtn = document.getElementById('startVideoCallBtn');
const closeChatBtn = document.getElementById('closeChatBtn');
const callArea = document.getElementById('callArea');
const welcomeMessage = document.getElementById('welcomeMessage');
const localVideo = document.getElementById('localVideo');
const remoteVideo = document.getElementById('remoteVideo');
const remoteLabel = document.getElementById('remoteLabel');
const toggleAudioBtn = document.getElementById('toggleAudioBtn');
const toggleVideoBtn = document.getElementById('toggleVideoBtn');
const endCallBtn = document.getElementById('endCallBtn');

// Current chat user
let currentChatUser = null;

// ============================================================================
// DEMO IMAGE ASSIGNMENT
// ============================================================================

function assignPhotosToUsers() {
    // Use curated Pexels images from demoAvatars
    MOCK_USERNAMES.forEach((username, index) => {
        userPhotos[username] = demoAvatars[index % demoAvatars.length];
    });
}

// ============================================================================
// MOCK DATA GENERATION
// ============================================================================

function initializeMockData() {
    // Create mock online users (exclude current user)
    onlineUsers = MOCK_USERNAMES
        .filter(name => name !== currentUser)
        .slice(0, 6); // Show 6 online users

    // Create mock groups
    groups = [
        {
            id: 'group-1',
            name: 'Dev Team',
            members: [currentUser, onlineUsers[0], onlineUsers[1], onlineUsers[2]]
        },
        {
            id: 'group-2',
            name: 'Project Alpha',
            members: [currentUser, onlineUsers[1], onlineUsers[3]]
        },
        {
            id: 'group-3',
            name: 'Coffee Break',
            members: [currentUser, onlineUsers[0], onlineUsers[4], onlineUsers[5]]
        }
    ];
}

// ============================================================================
// UI RENDERING
// ============================================================================

function renderOnlineUsers() {
    usersList.innerHTML = '';

    onlineUsers.forEach(username => {
        const userItem = document.createElement('div');
        userItem.className = 'user-item';
        userItem.innerHTML = `
            <img src="${userPhotos[username] || demoAvatars[0]}"
                 alt="${username}"
                 class="user-avatar">
            <span class="user-name">${username}</span>
            <span class="user-status online">●</span>
        `;
        userItem.addEventListener('click', () => openChat(username));
        usersList.appendChild(userItem);
    });
}

function renderGroups() {
    groupsList.innerHTML = '';

    groups.forEach(group => {
        const groupItem = document.createElement('div');
        groupItem.className = 'group-item';
        groupItem.innerHTML = `
            <div class="group-icon">👥</div>
            <div class="group-info">
                <div class="group-name">${group.name}</div>
                <div class="group-members">${group.members.length} members</div>
            </div>
        `;
        groupItem.addEventListener('click', () => openGroup(group.id));
        groupsList.appendChild(groupItem);
    });
}

// ============================================================================
// LOGIN / LOGOUT
// ============================================================================

loginBtn.addEventListener('click', async () => {
    const username = usernameInput.value.trim();
    if (!username) {
        alert('Please enter a username');
        return;
    }

    // Show loading state
    loginBtn.disabled = true;
    loginBtn.textContent = 'Loading...';

    currentUser = username;

    // Assign demo photos to users
    assignPhotosToUsers();

    // Initialize mock data
    initializeMockData();

    // Update UI - hide login, show main
    loginScreen.classList.remove('active');
    loginScreen.style.display = 'none';
    mainScreen.classList.add('active');
    mainScreen.style.display = 'flex';
    currentUserSpan.textContent = currentUser;
    logoutBtn.style.display = 'block';

    renderOnlineUsers();
    renderGroups();

    // Reset login button
    loginBtn.disabled = false;
    loginBtn.textContent = 'Join Demo';
});

logoutBtn.addEventListener('click', () => {
    currentUser = null;
    onlineUsers = [];
    groups = [];
    userPhotos = {};

    // Show login, hide main
    loginScreen.classList.add('active');
    loginScreen.style.display = 'flex';
    mainScreen.classList.remove('active');
    mainScreen.style.display = 'none';
    usernameInput.value = '';
    logoutBtn.style.display = 'none';
    currentUserSpan.textContent = 'Guest';
});

// ============================================================================
// CHAT FUNCTIONS
// ============================================================================

function openChat(username) {
    currentChatUser = username;

    // Update chat UI
    chatUserAvatar.src = userPhotos[username] || demoAvatars[0];
    chatUserName.textContent = username;

    // Hide welcome, show chat
    welcomeMessage.style.display = 'none';
    chatArea.style.display = 'flex';
    callArea.style.display = 'none';
}

function closeChat() {
    currentChatUser = null;
    chatArea.style.display = 'none';
    welcomeMessage.style.display = 'flex';
}

closeChatBtn.addEventListener('click', closeChat);

// ============================================================================
// VIDEO CALLING SIMULATION
// ============================================================================

function initiateCall(targetUser) {
    if (inCall) {
        alert('Already in a call. End current call first.');
        return;
    }

    // Hide chat and welcome, show call area
    welcomeMessage.style.display = 'none';
    chatArea.style.display = 'none';
    callArea.style.display = 'flex';

    // Simulate call initiation
    showCallNotification(`Calling ${targetUser}...`);

    setTimeout(() => {
        startMockCall(targetUser);
    }, 2000);
}

// Start call button from chat
startVideoCallBtn.addEventListener('click', () => {
    if (currentChatUser) {
        initiateCall(currentChatUser);
    }
});

function startMockCall(targetUser) {
    inCall = true;

    // Use user photos as "video" frames
    localVideo.src = userPhotos[currentUser] || demoAvatars[0];
    remoteVideo.src = userPhotos[targetUser] || demoAvatars[1];

    // Update remote label
    remoteLabel.textContent = targetUser;

    showCallNotification(`Connected with ${targetUser}`, 'success');
}

function endCall() {
    inCall = false;

    // Hide call area, show chat if we have a chat user
    callArea.style.display = 'none';
    if (currentChatUser) {
        chatArea.style.display = 'flex';
    } else {
        welcomeMessage.style.display = 'flex';
    }

    // Reset video elements
    localVideo.src = '';
    remoteVideo.src = '';
    remoteLabel.textContent = 'Connecting...';

    // Reset controls
    audioEnabled = true;
    videoEnabled = true;
    toggleAudioBtn.classList.remove('muted');
    toggleVideoBtn.classList.remove('disabled');

    showCallNotification('Call ended', 'info');
}

endCallBtn.addEventListener('click', endCall);

// ============================================================================
// CALL CONTROLS (SIMULATION)
// ============================================================================

let audioEnabled = true;
let videoEnabled = true;

toggleAudioBtn.addEventListener('click', () => {
    audioEnabled = !audioEnabled;
    toggleAudioBtn.textContent = audioEnabled ? '🎤' : '🔇';
    toggleAudioBtn.classList.toggle('muted', !audioEnabled);

    showCallNotification(audioEnabled ? 'Microphone unmuted' : 'Microphone muted', 'info');
});

toggleVideoBtn.addEventListener('click', () => {
    videoEnabled = !videoEnabled;
    toggleVideoBtn.textContent = videoEnabled ? '📹' : '📵';
    toggleVideoBtn.classList.toggle('disabled', !videoEnabled);

    localVideo.style.opacity = videoEnabled ? '1' : '0.3';
    showCallNotification(videoEnabled ? 'Video enabled' : 'Video disabled', 'info');
});

// ============================================================================
// GROUP MANAGEMENT (Simplified for demo)
// ============================================================================

function openGroup(groupId) {
    const group = groups.find(g => g.id === groupId);
    if (!group) return;

    showCallNotification(`Group calling coming soon! This is a demo.`, 'info');
}

createGroupBtn.addEventListener('click', () => {
    showCallNotification(`Group creation coming soon! This is a demo.`, 'info');
});

// ============================================================================
// NOTIFICATIONS
// ============================================================================

function showCallNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(400px); opacity: 0; }
    }
    .user-avatar, .member-avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        object-fit: cover;
        margin-right: 10px;
    }
    .user-item, .member-item {
        display: flex;
        align-items: center;
        padding: 10px;
        cursor: pointer;
        transition: background 0.2s;
    }
    .user-item:hover {
        background: rgba(255,255,255,0.1);
        border-radius: 8px;
    }
    .user-status.online {
        color: #4CAF50;
        margin-left: auto;
    }
`;
document.head.appendChild(style);

// ============================================================================
// INITIALIZATION
// ============================================================================

console.log('SocialConnect Demo Loaded - Frontend Only');
console.log('This is a UI demonstration with mock data and curated Pexels images');
