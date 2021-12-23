
import { UserType, MessageType } from "./socketType";
import Message from "../models/message";
import Notification from "../models/notification";
import log from "../logger";

// users array
export let users: UserType[] = [];

export async function userConnectController(userId: string, socketId: string){
    !users?.some((user: UserType) => user.userId === userId) && users.push({userId, socketId})
}

export async function userDisconnectController(socketId: string) {
    users = users?.filter((user: UserType) => user.socketId !== socketId);
}

export function getUserController(userId: string) {
   return users?.find((user: UserType) => user.userId === userId);
}

export function getUsersController() {
    return users;
 }

export async function sendMessageController(data: MessageType) {
    const {id, appointment_id, receiverId, user_id, role, picture_url, name, text, appointment_role} = data;
    try {
            const message = await Message.findOne({appointment_id});
            if(message) {
            message?.messages.unshift({ 
                id,
                user_id,
                role,
                name,
                picture_url,
                text,
                time: new Date()
            });
            await message.save();

            const notification = new Notification({appointment_id, appointment_role, user_id: receiverId, role, picture_url, name, text})
            await notification.save();
        }
    } catch(err: any){
        log.error(err);
    }
}