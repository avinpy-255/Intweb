import { useState } from "react";
import { Button } from "@/components/ui/button";
import "../assets/fonts/CosmicDream/AppleGaramond.ttf";
import "./Home.css";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

function Home() {
  const [name, setName] = useState("");
  const [repoLink, setRepoLink] = useState("");
  const [roomCode, setRoomCode] = useState("");

  const handleJoinRoom = () => {
    console.log("Joining room with code:", roomCode);
  };

  const handleCreateRoom = () => {
    console.log("Creating room with repo link:", repoLink);
  };

  return (
    <Dialog>
      <article className="wrapper">
        <div className="flex flex-col items-center justify-center min-h-screen space-y-8">
          <h1 className="text-9xl " style={{ fontFamily: "Apple" }}>
            Cosmic Code
          </h1>
          <DialogTrigger asChild>
            <Button variant="default" size="lg">
              Create Room
            </Button>
          </DialogTrigger>
        </div>
      </article>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Room</DialogTitle>
          <DialogDescription>
            Set your name and give your github repo link
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              defaultValue="Pedro"
              className="col-span-3"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="github" className="text-right">
              Repo Link
            </Label>
            <Input
              id="github"
              defaultValue="github/repo"
              className="col-span-3"
              value={repoLink}
              onChange={(e) => setRepoLink(e.target.value)}
            />
          </div>
        </div>
        <Button
          onClick={handleCreateRoom}
         
        >
          {" "}
          Create Room{" "}
        </Button>
        <DialogTitle>Join Room</DialogTitle>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="github" className="text-right">
            Room Code
          </Label>
          <Input
            id="github"
            defaultValue="github/repo"
            className="col-span-3"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value)}
          />
        </div>
        <Button
          onClick={handleJoinRoom}
          
        >
          Join Room
        </Button>

        <DialogFooter>
          {" "}
          <DialogDescription>This Site is Under Development</DialogDescription>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default Home;
