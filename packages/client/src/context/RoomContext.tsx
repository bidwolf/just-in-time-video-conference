import React, { ReactNode, createContext, useEffect } from "react";
import SocketIOClient, { Socket } from "socket.io-client";
import Peer from "peerjs";
import { v4 as uuidV4 } from "uuid";
import { useToast } from "@/components/ui/use-toast";
import { RoomEvents } from "@rtcapp/utils";
const WS = import.meta.env.VITE_WS
type RoomContextType = {
  ws?: Socket
  me?: Peer
}
type RoomParams = {
  participants: string[],
  roomId: string
}
export const RoomContext = createContext<RoomContextType>({
})

export const RoomProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [me, setMe] = React.useState<Peer>()
  const { toast } = useToast()
  const getUsers = ({
    participants,
    roomId
  }: RoomParams) => {
    toast({ title: "Usuários na sala", description: `Sala: ${roomId}\nUsuários: ${participants.join(", ")}` })
  }
  const [ws, setWs] = React.useState<Socket>()
  useEffect(() => {
    if (!ws) {
      const socket = SocketIOClient(WS)
      setWs(socket)
    }
    const meId = uuidV4();
    const peer = new Peer(meId);
    setMe(peer);
  }, [])
  useEffect(() => {
    if (ws && me) {
      ws.on(RoomEvents.GetUsers, getUsers)
      ws.on(RoomEvents.UserDisconnected, ({ peerId }: { peerId: string }) => {
        toast({ title: "Usuário desconectado", description: `Usuário: ${peerId}` })
      })
    }
  }, [ws, me])
  return (
    <RoomContext.Provider value={{ ws, me }}>
      {children}
    </RoomContext.Provider>
  )
}
