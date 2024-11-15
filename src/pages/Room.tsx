import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar"

import { useParams } from "@tanstack/react-router";


// interface RoomResponse {
//   code: string;
//   createdAt: string;
//   roomId: string;
//   roomName: string;
//   updatedAt: string;
//   _id: string;
// }



export  function AppSidebar() {
  const { roomId } = useParams({ strict: false });
  



  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <h1 style={{ fontFamily: "Apple" }}>Room Details</h1>
          <p>Room ID: {roomId}</p>
          <SidebarGroupLabel></SidebarGroupLabel>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}