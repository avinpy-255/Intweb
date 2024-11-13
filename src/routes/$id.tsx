
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/$id')({
  component: RoomID,

})

function RoomID() {
 
  return (
    <>
     <h1>Room</h1>
    </>
  )
}
