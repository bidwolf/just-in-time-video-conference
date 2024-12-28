import { Button } from "@/components/ui/button"
import { useRoom } from "@/hooks/useRoom"
import { RoomEvents } from "@rtcapp/utils"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function Home() {
  const { ws } = useRoom()
  const navigate = useNavigate()
  useEffect(() => {
    if (ws) {
      ws.on("room-created", ({ roomId }) => {
        navigate(`/room/${roomId}`)
      })
    }
  }, [ws, navigate])
  return (
    <>
      <Button onClick={() => {
        if (ws) {
          ws.emit(RoomEvents.Create)
        }
      }}>
        Entrar na sala
      </Button>
    </>)
}