# 🌐 SocialConnect - Full-Featured Social App

A fully functional social media application with real-time video calling, group management, and collapsible modals built with WebRTC, WebSockets, and vanilla JavaScript.

![SocialConnect Banner](https://img.shields.io/badge/SocialConnect-v1.0.0-blue) ![Node.js](https://img.shields.io/badge/Node.js-v14+-green) ![WebRTC](https://img.shields.io/badge/WebRTC-enabled-orange)

---

## ✨ Features

### 📞 Video & Audio Calling
- **One-on-One Video Calls** using WebRTC peer-to-peer connections
- **Audio/Video Controls** - Mute/unmute microphone and toggle video
- **High-Quality Streams** with adaptive quality
- **Call Notifications** with accept/reject functionality

### 👥 Group Management
- **Create Groups** with multiple members
- **Add Members** to existing groups dynamically
- **Leave Groups** anytime
- **Real-time Updates** when groups are modified
- **Group Details View** showing all members

### 🎨 Collapsible Modals
- **Smooth Animations** for opening/closing modals
- **Collapse/Expand** functionality to minimize modals
- **Multiple Modal Types**:
  - Create Group Modal
  - Group Details Modal
  - Add Members Modal
  - Incoming Call Modal
  - Call User Modal
- **Click Outside to Close** for better UX

### 🔄 Real-time Features
- **Live User List** showing all online users
- **Instant Updates** when users join/leave
- **WebSocket Communication** for real-time messaging
- **Automatic Reconnection** if connection drops

---

## 🛠️ Tech Stack

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with animations
- **Vanilla JavaScript** - No frameworks needed
- **WebRTC API** - Peer-to-peer video calling
- **WebSocket API** - Real-time communication

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web server
- **ws** - WebSocket server library
- **HTTP Server** - Static file serving

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** v14.0.0 or higher
- **npm** or **yarn**
- **Modern Browser** with WebRTC support (Chrome, Firefox, Safari, Edge)
- **HTTPS** for production (required for camera/microphone access)

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/PaulyBearCoding/PaulyBearCoding.git
cd PaulyBearCoding
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start the server:**
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

4. **Open your browser:**
Navigate to `http://localhost:8080`

5. **Test with multiple users:**
Open multiple browser tabs or different browsers to simulate multiple users.

---

## 📖 Usage Guide

### Logging In
1. Enter a unique username
2. Click "Join Now"
3. You'll see the main application screen

### Making a Video Call
1. Click **"Start Call"** button
2. Select a user from the online users list
3. Wait for them to accept
4. Use controls to mute/unmute or toggle video
5. Click **"End Call"** when finished

### Receiving a Call
1. When someone calls you, a modal appears
2. Click **"Accept"** to answer or **"Reject"** to decline
3. Allow browser permissions for camera/microphone

### Creating a Group
1. Click **"Create Group"** button
2. Enter a group name
3. Select members from the checklist
4. Click **"Create Group"**

### Managing Groups
1. Click on any group in your groups list
2. View group details and members
3. Click **"Add Members"** to invite more users
4. Click **"Leave Group"** to exit the group
5. Click **"Start Group Call"** (feature coming soon)

### Using Collapsible Modals
- Click the **−** button to collapse a modal (minimize)
- Click the **+** button to expand it again
- Click the **×** button to close the modal
- Click outside the modal to close it

---

## 🏗️ Architecture

### Client-Side (`app.js`)
```
User Interface
    ↓
WebSocket Connection
    ↓
WebRTC Peer Connection
    ↓
Media Streams (Video/Audio)
```

**Key Components:**
- Modal Management System
- WebRTC Connection Handler
- WebSocket Message Router
- UI Update Functions
- Call State Management

### Server-Side (`server.js`)
```
Express Server
    ↓
WebSocket Server
    ↓
User Registry (Map)
    ↓
Group Storage (Map)
```

**Key Features:**
- User registration and tracking
- Group CRUD operations
- WebRTC signaling relay
- Real-time user/group broadcasting

---

## 🔌 WebSocket API

### Client → Server Messages

#### Register User
```json
{
  "type": "register",
  "username": "john_doe"
}
```

#### Create Group
```json
{
  "type": "create-group",
  "name": "My Group",
  "members": ["john_doe", "jane_doe"]
}
```

#### Add Members to Group
```json
{
  "type": "add-members",
  "groupId": "group-1",
  "members": ["alice", "bob"]
}
```

#### Leave Group
```json
{
  "type": "leave-group",
  "groupId": "group-1"
}
```

#### WebRTC Offer
```json
{
  "type": "offer",
  "offer": {...},
  "to": "target_user",
  "from": "caller_user"
}
```

#### WebRTC Answer
```json
{
  "type": "answer",
  "answer": {...},
  "to": "target_user"
}
```

#### ICE Candidate
```json
{
  "type": "ice-candidate",
  "candidate": {...},
  "to": "target_user"
}
```

#### End Call
```json
{
  "type": "call-ended",
  "to": "target_user"
}
```

### Server → Client Messages

#### Users List
```json
{
  "type": "users",
  "users": ["john_doe", "jane_doe", "alice"]
}
```

#### Groups List
```json
{
  "type": "groups",
  "groups": [
    {
      "id": "group-1",
      "name": "My Group",
      "members": ["john_doe", "jane_doe"]
    }
  ]
}
```

#### Group Created
```json
{
  "type": "group-created",
  "group": {...}
}
```

#### Group Updated
```json
{
  "type": "group-updated",
  "group": {...}
}
```

---

## 🎨 Styling Features

### Gradient Theme
- **Purple Gradient Background** (#667eea → #764ba2)
- **White Cards** with shadows
- **Smooth Transitions** on all interactive elements

### Responsive Design
- **Mobile-First** approach
- **Grid Layout** for desktop
- **Stack Layout** for mobile
- **Flexible Modals** that work on all screen sizes

### Animations
- **Fade In** for modals
- **Slide In** for modal content
- **Collapse/Expand** animations
- **Hover Effects** on buttons and list items

---

## 🔒 Security Considerations

### Current Implementation
- Username-based authentication (simple for demo)
- WebRTC peer-to-peer encryption
- No persistent storage (memory-only)

### Production Recommendations
- ✅ Implement proper authentication (JWT, OAuth)
- ✅ Add user password protection
- ✅ Use HTTPS/WSS for secure connections
- ✅ Add rate limiting
- ✅ Implement input validation and sanitization
- ✅ Add persistent database (MongoDB, PostgreSQL)
- ✅ Use TURN servers for better connectivity
- ✅ Implement end-to-end encryption for messages

---

## 🌟 Browser Compatibility

| Browser | Video Calling | WebSockets | Modals |
|---------|--------------|------------|---------|
| Chrome 80+ | ✅ | ✅ | ✅ |
| Firefox 75+ | ✅ | ✅ | ✅ |
| Safari 14+ | ✅ | ✅ | ✅ |
| Edge 80+ | ✅ | ✅ | ✅ |

**Note:** Camera/microphone access requires HTTPS in production.

---

## 📝 File Structure

```
PaulyBearCoding/
├── index.html          # Main HTML structure
├── styles.css          # All styling and animations
├── app.js              # Client-side JavaScript
├── server.js           # Node.js WebSocket server
├── package.json        # Dependencies and scripts
└── SOCIAL_APP_README.md # This file
```

---

## 🐛 Troubleshooting

### Camera/Microphone Not Working
1. Check browser permissions
2. Ensure you're using HTTPS (or localhost)
3. Check if another app is using the camera
4. Try a different browser

### Can't Connect to Server
1. Ensure server is running (`npm start`)
2. Check if port 8080 is available
3. Verify WebSocket URL in `app.js` (line 94)
4. Check firewall settings

### User Not Appearing Online
1. Refresh the page
2. Check WebSocket connection in browser console
3. Ensure username is unique
4. Restart the server

### Video Not Showing
1. Check WebRTC connection in console
2. Verify ICE candidates are being exchanged
3. Try using STUN/TURN servers
4. Check network/firewall settings

---

## 🚧 Roadmap / Future Features

- [ ] **Group Video Calls** - Multi-party video conferencing
- [ ] **Text Chat** - Send messages to users and groups
- [ ] **File Sharing** - Share images and documents
- [ ] **Screen Sharing** - Share your screen during calls
- [ ] **User Profiles** - Avatar, status, bio
- [ ] **Persistent Storage** - Save messages and history
- [ ] **Push Notifications** - Desktop and mobile notifications
- [ ] **End-to-End Encryption** - For messages and calls
- [ ] **Mobile Apps** - iOS and Android versions
- [ ] **Emoji Reactions** - React to messages
- [ ] **Voice Messages** - Record and send audio
- [ ] **Dark/Light Mode** - Theme switching

---

## 👨‍💻 Development

### Running in Development Mode
```bash
npm run dev
```
Uses `nodemon` to automatically restart on file changes.

### Testing Multiple Users
1. Open browser in normal mode
2. Open browser in incognito/private mode
3. Open different browser
4. Open on different device (same network)

### Debugging
- Open browser DevTools (F12)
- Check Console for logs
- Check Network tab for WebSocket messages
- Use `console.log` in code for debugging

---

## 📜 License

This project is part of PaulyBearCoding's portfolio. See [LICENSE.md](./LICENSE.md) for details.

---

## 🙏 Acknowledgments

- **WebRTC** - For peer-to-peer communication
- **WebSocket** - For real-time messaging
- **STUN Servers** - Google's public STUN servers
- **Express.js** - For the web server framework

---

## 📧 Contact

**Paul Stenet** - PaulyBearCoding
- GitHub: [@PaulyBearCoding](https://github.com/PaulyBearCoding)
- Email: paulybearcoding@gmail.com

---

## ⭐ Show Your Support

If you found this project helpful, please give it a star! ⭐

---

**Built with ❤️ by PaulyBearCoding**
