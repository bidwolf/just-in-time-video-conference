import { Button } from "@/components/ui/button";
import { useRoom } from "@/hooks/useRoom";
import { RoomEvents } from "@rtcapp/utils";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Room() {
  const { ws, me } = useRoom();
  const roomId = useParams<{ roomId: string }>().roomId;
  const navigate = useNavigate();

  useEffect(() => {
    if (ws && roomId && me) {
      ws.emit(RoomEvents.Join, { roomId, peerId: me?.id })
    }
  }, [ws, me, roomId])
  return (
    <div>
      <h1>Room</h1>
      <p>{roomId}</p>
      <Button onClick={() => {
        ws?.emit(RoomEvents.Leave, { roomId, peerId: me?.id })
        navigate("/", {
          replace: true
        })
      }}>
        Leave Room
      </Button>
    </div>
  )
}