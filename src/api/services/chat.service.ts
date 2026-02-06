import axiosClient from "../axiosClient";
import { Chat, Message } from "@/types";

class ChatService {
  async getChats(): Promise<Chat[]> {
    return axiosClient.get("/chats");
  }

  async getChat(id: string): Promise<Chat> {
    return axiosClient.get(`/chats/${id}`);
  }

  async getOrCreateChat(listingId: string, receiverId: string): Promise<Chat> {
    return axiosClient.post("/chats", { listingId, receiverId });
  }

  async getMessages(chatId: string): Promise<Message[]> {
    return axiosClient.get(`/chats/${chatId}/messages`);
  }

  async sendMessage(chatId: string, content: string): Promise<Message> {
    return axiosClient.post(`/chats/${chatId}/messages`, { content });
  }

  async markAsRead(chatId: string): Promise<void> {
    return axiosClient.put(`/chats/${chatId}/read`);
  }
}

export const chatService = new ChatService();
