import mongoose, { Document, Schema } from 'mongoose';

interface IMessage {
  role: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

export interface IChat extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  messages: IMessage[];
}

const MessageSchema: Schema = new Schema({
    role: { type: String, enum: ['user', 'bot'], required: true },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

const ChatSchema: Schema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  messages: [MessageSchema]
}, { timestamps: true });

export default mongoose.model<IChat>('Chat', ChatSchema);