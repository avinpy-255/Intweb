import { createFileRoute, useParams } from "@tanstack/react-router";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/pages/Room";
import { SetStateAction, useEffect, useState } from "react";
import { getRoomsbyId } from "@/common/services";
import socket from "@/lib/socket";
import CodeEditor from "@/functions/CodeEditor";
import { LanguageSelector } from "@/functions/LanguageSelector";

// Define route with a dynamic 'id' segment in the path
export const Route = createFileRoute("/$id")({
  component: RoomID,
  loader: async ({ params }) => await getRoomsbyId(params.id),
});

function RoomID() {
  const { id: roomId } = useParams({ from: '/$id' });
  const room = Route.useLoaderData();
  console.log(room);
  const [selectedLang, setSelectedLang] = useState('javascript')
  const [content, setContent] = useState<string>("");
  const [roomData, setRoomData] = useState<{ roomId: string; roomName: string } | null>(null);

  useEffect(() => {
    const fetchRoomData = async () => {
      if (roomId) {
        const data = await getRoomsbyId(roomId);
        setRoomData(data);
      }
    };

    fetchRoomData();

    socket.connect();
    socket.emit("join-room", roomId);

    socket.on("update-code", (newContent: string) => setContent(newContent));

    return () => {
      socket.disconnect();
    };
  }, [roomId]);

  // `handleChange` to match the expected parameter type in CodeEditor
  const handleChange = (newContent: string | undefined) => {
    setContent(newContent || "");
    socket.emit("code-change", { roomId, content: newContent });
  };

  const handleLang = (selectedLang: SetStateAction<string>) =>  setSelectedLang( selectedLang)

  return (
    <SidebarProvider>
      {roomData ? (
        <>
          <AppSidebar roomId={roomData.roomId} roomName={roomData.roomName} />
          <main>
          <SidebarTrigger />
          <LanguageSelector  value={selectedLang} onChange={handleLang}/>
            <CodeEditor 
              language={selectedLang} 
              value={content} 
              onChange={handleChange} 
            />
          </main>
        </>
      ) : (
        <p>Loading room data...</p>
      )}
    </SidebarProvider>
  );
}

export default RoomID;
