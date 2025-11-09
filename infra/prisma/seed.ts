import { PrismaClient } from '@prisma/client';
import { randomBytes } from 'crypto';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Clean existing data in development
  if (process.env.NODE_ENV !== 'production') {
    console.log('🧹 Cleaning existing data...');
    await prisma.auditLog.deleteMany();
    await prisma.streamMessage.deleteMany();
    await prisma.streamSession.deleteMany();
    await prisma.postTag.deleteMany();
    await prisma.tag.deleteMany();
    await prisma.share.deleteMany();
    await prisma.postComment.deleteMany();
    await prisma.postLike.deleteMany();
    await prisma.postAsset.deleteMany();
    await prisma.post.deleteMany();
    await prisma.callParticipant.deleteMany();
    await prisma.callSession.deleteMany();
    await prisma.notification.deleteMany();
    await prisma.spaceChannel.deleteMany();
    await prisma.spaceMember.deleteMany();
    await prisma.space.deleteMany();
    await prisma.reaction.deleteMany();
    await prisma.messageAttachment.deleteMany();
    await prisma.message.deleteMany();
    await prisma.conversationParticipant.deleteMany();
    await prisma.conversation.deleteMany();
    await prisma.follow.deleteMany();
    await prisma.friendship.deleteMany();
    await prisma.profile.deleteMany();
    await prisma.session.deleteMany();
    await prisma.account.deleteMany();
    await prisma.user.deleteMany();
    console.log('✅ Cleaned existing data');
  }

  // Create demo users
  console.log('👤 Creating users...');
  const user1 = await prisma.user.create({
    data: {
      email: 'alice@gjyl.local',
      name: 'Alice Johnson',
      handle: 'alice',
      emailVerified: new Date(),
      image: 'https://i.pravatar.cc/150?img=1',
      profile: {
        create: {
          displayName: 'Alice Johnson',
          bio: 'Designer and creator. Love sharing my work!',
          location: 'San Francisco, CA',
          timezone: 'America/Los_Angeles',
          language: 'en',
          avatar: 'https://i.pravatar.cc/150?img=1',
          pronouns: 'she/her',
          links: {
            website: 'https://alice.example.com',
            twitter: 'alicejohnson'
          },
          settings: {
            theme: 'dark',
            readReceipts: true,
            desktopNotifications: true
          }
        }
      }
    },
    include: { profile: true }
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'bob@gjyl.local',
      name: 'Bob Smith',
      handle: 'bob',
      emailVerified: new Date(),
      image: 'https://i.pravatar.cc/150?img=2',
      profile: {
        create: {
          displayName: 'Bob Smith',
          bio: 'Developer and tech enthusiast. Building cool stuff!',
          location: 'New York, NY',
          timezone: 'America/New_York',
          language: 'en',
          avatar: 'https://i.pravatar.cc/150?img=2',
          pronouns: 'he/him',
          links: {
            website: 'https://bob.example.com',
            github: 'bobsmith'
          },
          settings: {
            theme: 'dark',
            readReceipts: true,
            desktopNotifications: true
          }
        }
      }
    },
    include: { profile: true }
  });

  console.log(`✅ Created users: ${user1.handle}, ${user2.handle}`);

  // Create friendship
  console.log('🤝 Creating friendship...');
  const friendship = await prisma.friendship.create({
    data: {
      initiatorId: user1.id,
      receiverId: user2.id,
      status: 'ACCEPTED',
      note: 'Hey Bob! Would love to connect!'
    }
  });
  console.log('✅ Created friendship');

  // Create follows (for feed)
  console.log('👥 Creating follows...');
  await prisma.follow.createMany({
    data: [
      { followerId: user1.id, followingId: user2.id },
      { followerId: user2.id, followingId: user1.id }
    ]
  });
  console.log('✅ Created follows');

  // Create a DM conversation
  console.log('💬 Creating DM conversation...');
  const dmConversation = await prisma.conversation.create({
    data: {
      type: 'DM',
      participants: {
        create: [
          { userId: user1.id },
          { userId: user2.id }
        ]
      }
    }
  });
  console.log('✅ Created DM conversation');

  // Create welcome messages
  console.log('✉️ Creating messages...');
  const textMessage = await prisma.message.create({
    data: {
      conversationId: dmConversation.id,
      senderId: user1.id,
      type: 'TEXT',
      text: 'Hey Bob! Welcome to GJYL! 🎉'
    }
  });

  const imageMessage = await prisma.message.create({
    data: {
      conversationId: dmConversation.id,
      senderId: user2.id,
      type: 'IMAGE',
      text: 'Check out this cool photo!',
      attachments: {
        create: {
          storageKey: 'demo/sample-image.jpg',
          fileName: 'sample-image.jpg',
          mimeType: 'image/jpeg',
          size: 245680,
          width: 1920,
          height: 1080,
          metadata: { source: 'seed' }
        }
      }
    }
  });

  const voiceMessage = await prisma.message.create({
    data: {
      conversationId: dmConversation.id,
      senderId: user1.id,
      type: 'AUDIO',
      attachments: {
        create: {
          storageKey: 'demo/sample-voice.webm',
          fileName: 'voice-clip.webm',
          mimeType: 'audio/webm',
          size: 45600,
          duration: 15,
          metadata: {
            waveform: Array.from({ length: 50 }, () => Math.random() * 100)
          }
        }
      }
    }
  });

  console.log('✅ Created messages');

  // Create a demo space
  console.log('🏢 Creating demo space...');
  const demoSpace = await prisma.space.create({
    data: {
      name: 'Demo Space',
      emoji: '🚀',
      color: '#6366f1',
      description: 'A demo space for testing GJYL features',
      inviteCode: randomBytes(8).toString('hex'),
      members: {
        create: [
          { userId: user1.id, role: 'OWNER' },
          { userId: user2.id, role: 'MEMBER' }
        ]
      },
      channels: {
        create: [
          { name: 'general', type: 'TEXT', position: 0 },
          { name: 'random', type: 'TEXT', position: 1 }
        ]
      }
    }
  });
  console.log('✅ Created demo space');

  // Create tags
  console.log('🏷️ Creating tags...');
  const tags = await prisma.tag.createMany({
    data: [
      { name: 'tech', useCount: 5 },
      { name: 'design', useCount: 3 },
      { name: 'funny', useCount: 2 },
      { name: 'tutorial', useCount: 4 },
      { name: 'creative', useCount: 1 }
    ]
  });
  console.log('✅ Created tags');

  // Create demo feed posts
  console.log('📹 Creating feed posts...');
  const techTag = await prisma.tag.findUnique({ where: { name: 'tech' } });
  const designTag = await prisma.tag.findUnique({ where: { name: 'design' } });

  const post1 = await prisma.post.create({
    data: {
      userId: user1.id,
      caption: 'Check out my latest design work! 🎨 #design #creative',
      visibility: 'PUBLIC',
      status: 'READY',
      likesCount: 15,
      commentsCount: 3,
      viewsCount: 142,
      assets: {
        create: [
          {
            kind: 'VIDEO',
            storageKey: 'posts/video1.mp4',
            mimeType: 'video/mp4',
            size: 5242880,
            width: 1080,
            height: 1920,
            duration: 30
          },
          {
            kind: 'THUMBNAIL',
            storageKey: 'posts/video1-thumb.jpg',
            mimeType: 'image/jpeg',
            size: 45600,
            width: 1080,
            height: 1920
          }
        ]
      },
      tags: {
        create: designTag ? [{ tagId: designTag.id }] : []
      }
    }
  });

  const post2 = await prisma.post.create({
    data: {
      userId: user2.id,
      caption: 'Quick coding tutorial on React hooks! 💻 #tech #tutorial',
      visibility: 'PUBLIC',
      status: 'READY',
      likesCount: 28,
      commentsCount: 7,
      viewsCount: 234,
      assets: {
        create: [
          {
            kind: 'VIDEO',
            storageKey: 'posts/video2.mp4',
            mimeType: 'video/mp4',
            size: 7864320,
            width: 1080,
            height: 1920,
            duration: 45
          },
          {
            kind: 'THUMBNAIL',
            storageKey: 'posts/video2-thumb.jpg',
            mimeType: 'image/jpeg',
            size: 52400,
            width: 1080,
            height: 1920
          }
        ]
      },
      tags: {
        create: techTag ? [{ tagId: techTag.id }] : []
      }
    }
  });

  const post3 = await prisma.post.create({
    data: {
      userId: user1.id,
      caption: 'Behind the scenes of my creative process ✨',
      visibility: 'PUBLIC',
      status: 'READY',
      likesCount: 42,
      commentsCount: 5,
      viewsCount: 567,
      assets: {
        create: [
          {
            kind: 'VIDEO',
            storageKey: 'posts/video3.mp4',
            mimeType: 'video/mp4',
            size: 6291456,
            width: 1080,
            height: 1920,
            duration: 38
          },
          {
            kind: 'THUMBNAIL',
            storageKey: 'posts/video3-thumb.jpg',
            mimeType: 'image/jpeg',
            size: 48900,
            width: 1080,
            height: 1920
          }
        ]
      }
    }
  });

  const post4 = await prisma.post.create({
    data: {
      userId: user2.id,
      caption: 'New tech setup! What do you think? 🖥️',
      visibility: 'PUBLIC',
      status: 'READY',
      likesCount: 35,
      commentsCount: 12,
      viewsCount: 445,
      assets: {
        create: [
          {
            kind: 'VIDEO',
            storageKey: 'posts/video4.mp4',
            mimeType: 'video/mp4',
            size: 5767168,
            width: 1080,
            height: 1920,
            duration: 25
          },
          {
            kind: 'THUMBNAIL',
            storageKey: 'posts/video4-thumb.jpg',
            mimeType: 'image/jpeg',
            size: 51200,
            width: 1080,
            height: 1920
          }
        ]
      }
    }
  });

  const post5 = await prisma.post.create({
    data: {
      userId: user1.id,
      caption: 'Sunday vibes! Hope everyone is having a great weekend 🌅',
      visibility: 'PUBLIC',
      status: 'READY',
      likesCount: 67,
      commentsCount: 15,
      viewsCount: 892,
      assets: {
        create: [
          {
            kind: 'VIDEO',
            storageKey: 'posts/video5.mp4',
            mimeType: 'video/mp4',
            size: 8388608,
            width: 1080,
            height: 1920,
            duration: 52
          },
          {
            kind: 'THUMBNAIL',
            storageKey: 'posts/video5-thumb.jpg',
            mimeType: 'image/jpeg',
            size: 54800,
            width: 1080,
            height: 1920
          }
        ]
      }
    }
  });

  console.log('✅ Created 5 demo posts');

  // Create post likes
  await prisma.postLike.create({
    data: { postId: post1.id, userId: user2.id }
  });
  await prisma.postLike.create({
    data: { postId: post2.id, userId: user1.id }
  });

  // Create post comments
  await prisma.postComment.createMany({
    data: [
      {
        postId: post1.id,
        userId: user2.id,
        text: 'This looks amazing! Great work! 🔥'
      },
      {
        postId: post2.id,
        userId: user1.id,
        text: 'Super helpful tutorial, thanks for sharing!'
      }
    ]
  });

  // Create a demo stream session
  console.log('📡 Creating demo stream session...');
  const streamSession = await prisma.streamSession.create({
    data: {
      userId: user1.id,
      title: 'Live Design Session',
      description: 'Working on a new UI design, come hang out!',
      status: 'CREATED',
      streamKey: randomBytes(16).toString('hex')
    }
  });
  console.log('✅ Created demo stream session');

  // Create notifications
  console.log('🔔 Creating notifications...');
  await prisma.notification.createMany({
    data: [
      {
        userId: user2.id,
        senderId: user1.id,
        type: 'FRIEND_ACCEPTED',
        title: 'Friend request accepted',
        message: 'Alice Johnson accepted your friend request',
        link: `/friends/${user1.id}`
      },
      {
        userId: user1.id,
        senderId: user2.id,
        type: 'POST_LIKE',
        title: 'New like on your post',
        message: 'Bob Smith liked your post',
        link: `/feed/posts/${post1.id}`
      }
    ]
  });
  console.log('✅ Created notifications');

  // Create profanity filter words
  console.log('🚫 Creating profanity filter...');
  await prisma.profanityFilter.createMany({
    data: [
      { word: 'spam', severity: 'low' },
      { word: 'scam', severity: 'medium' }
    ]
  });
  console.log('✅ Created profanity filter');

  console.log('');
  console.log('✅ Seed complete!');
  console.log('');
  console.log('Demo accounts:');
  console.log('  📧 alice@gjyl.local (Alice Johnson)');
  console.log('  📧 bob@gjyl.local (Bob Smith)');
  console.log('');
  console.log('Features seeded:');
  console.log('  ✅ 2 users with profiles');
  console.log('  ✅ 1 friendship (accepted)');
  console.log('  ✅ 1 DM conversation with 3 messages');
  console.log('  ✅ 1 demo space with 2 channels');
  console.log('  ✅ 5 feed posts with likes and comments');
  console.log('  ✅ 1 stream session');
  console.log('  ✅ 2 notifications');
  console.log('');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Seed failed:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
