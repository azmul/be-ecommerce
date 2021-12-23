import { Server, Socket } from "socket.io";
import { MessageType, UserType } from "./socketType";
import { 
  getUserController,
  getUsersController,
  userConnectController, 
  userDisconnectController, 
  sendMessageController,
} from "./socketController";

export default function socketConnection(httpServer: any) {
    
  const io = new Server(httpServer, {
      cors: {
        origin: '*',
        methods: ["GET", "POST"]
      },
  })
      
  io.on("connection", (socket: Socket) => {
      socket.on("addUser", (userId: string) => {
        userConnectController(userId, socket.id)
        io.emit("getUsers", getUsersController())
      });
      
      socket.on("disconnect", () => {
        userDisconnectController(socket.id)
        io.emit("getUsers", getUsersController())
      });
      
      socket.on("sendMessage", async (data: MessageType )=> {
        const { receiverId } = data;
        sendMessageController(data);
        if(receiverId) {
          const user: UserType | undefined = getUserController(receiverId);
          if(user) {
            io.to(user.socketId).emit("getMessage", data)
          }
        }

      })
  });
}