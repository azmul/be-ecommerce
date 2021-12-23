
export type UserType = {
    userId: string;
    socketId: string;
}

export type MessageType = {
    appointment_id: string;
    appointment_role: number;
    id: string;
    user_id: string;
    receiverId: string;
    role: number;
    name: string;
    picture_url: string;
    text: string;
  }