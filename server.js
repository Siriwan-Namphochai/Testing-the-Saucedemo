// server.js
import express from 'express';
import { Client } from '@line/bot-sdk';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const config = {
  channelAccessToken: process.env.LINE_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET,
};

const client = new Client(config);
const app = express();

app.use(express.json());

// Webhook endpoint
app.post('/webhook', (req, res) => {
  if (!req.body.events || req.body.events.length === 0) {
    res.status(200).send('No events');
    return;
  }

  Promise.all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error('Error handling webhook events:', err);
      res.status(500).end();
    });
});

// Handle incoming events
async function handleEvent(event) {
  if (event.type === 'message') {
    switch (event.message.type) {
      case 'text':
        return client.replyMessage(event.replyToken, {
          type: 'text',
          text: `คุณพูดว่า: ${event.message.text}`,
        });
      case 'sticker':
        return client.replyMessage(event.replyToken, {
          type: 'text',
          text: 'ฉันได้รับสติ๊กเกอร์ของคุณแล้ว!',
        });
      case 'image':
        return client.replyMessage(event.replyToken, {
          type: 'text',
          text: 'ฉันได้รับรูปภาพของคุณแล้ว!',
        });
      case 'video':
        return client.replyMessage(event.replyToken, {
          type: 'text',
          text: 'ฉันได้รับวิดีโอของคุณแล้ว!',
        });
      case 'audio':
        return client.replyMessage(event.replyToken, {
          type: 'text',
          text: 'ฉันได้รับไฟล์เสียงของคุณแล้ว!',
        });
      default:
        return client.replyMessage(event.replyToken, {
          type: 'text',
          text: 'ข้อความประเภทนี้ยังไม่รองรับ',
        });
    }
  }
}

// Push message function (สามารถเรียกจากที่อื่นได้)
export async function sendPushMessage(userId, message) {
  try {
    await client.pushMessage(userId, {
      type: 'text',
      text: message,
    });
    console.log(`Push message sent to ${userId}`);
  } catch (err) {
    console.error('Error sending push message:', err);
  }
}

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
