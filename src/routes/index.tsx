import { createFileRoute } from '@tanstack/react-router'
import Home from '@/pages/Home'
import { getRooms } from '@/common/services'

export const Route = createFileRoute('/')({
  component: Index,
  loader: async () => {
    const rooms = await getRooms();
    console.log("Loader fetched rooms:", rooms);
    return rooms;
  }
})

function Index() {
  const allRooms = Route.useLoaderData()

  console.log(allRooms)

  return (
    <Home/>
  )
}
