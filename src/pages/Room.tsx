import { getRoomsbyId } from "@/common/services";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { useEffect, useState } from "react";

interface RoomProps {
  roomId: string;
  roomName: string;
}

export const AppSidebar: React.FC<RoomProps> = ({ roomId }) => {
  const [room, setRoom] = useState<RoomProps | null>(null);
  const [copySuccess, setCopySuccess] = useState<string>("");
  

  useEffect(() => {
    const fetchRoom = async () => {
      const roomData = await getRoomsbyId(roomId);
      setRoom(roomData);
    };
    if (roomId) {
      fetchRoom();
    }
  }, [roomId]);

  const handleCopy = () => {
    navigator.clipboard.writeText(roomId)
      .then(() => {
        setCopySuccess("Copied!");
        setTimeout(() => setCopySuccess(""), 2000); // Clear message after 2 seconds
      })
      .catch(() => setCopySuccess("Failed to copy"));
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <h1 style={{ fontFamily: "Apple" }}>Room: {room ? room.roomName : "loading..."}</h1>
          <p>
            Room ID: {roomId}{" "}
            <Button onClick={handleCopy} style={{ marginLeft: "8px", fontSize: "0.9em", cursor: "pointer", backgroundColor: "black" }}>
              Copy
            </Button>
          </p>
          {copySuccess && <p style={{ color: "green", fontSize: "0.8em" }}>{copySuccess}</p>}
          <SidebarGroupLabel></SidebarGroupLabel>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
