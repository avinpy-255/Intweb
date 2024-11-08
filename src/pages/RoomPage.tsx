import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { io, Socket } from 'socket.io-client';
import debounce from 'lodash.debounce';
import throttle from 'lodash.throttle';

// Define constants
const ENDPOINT = "http://localhost:4001"; // Replace with your server URL
const LOCK_ACQUIRED = "LOCK_ACQUIRED";
const LOCK_FAILED = "LOCK_FAILED";

// Define types for the messages
type UpdateCodeMessage = { uuid: string; code: string };
type LockMessage = { uuid: string };

const RoomPage: React.FC = () => {
  const [muted, setMuted] = useState(false);
  const [cameraOn, setCameraOn] = useState(true);
  const [code, setCode] = useState<string>('');
  const [lockStatus, setLockStatus] = useState<string | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);

  // Unique ID for each user
  const uuid = Math.random().toString(36).substring(2);

  useEffect(() => {
    // Initialize socket connection
    const newSocket: Socket = io(ENDPOINT);
    setSocket(newSocket);

    // Fetch the latest code when component mounts
    fetch(`${ENDPOINT}/latest-code`)
      .then((response) => response.json())
      .then((data) => {
        if (data?.code) {
          setCode(data.code);
          setLockStatus(LOCK_ACQUIRED);
        }
      });

    // Socket event listeners
    newSocket.on("update-code", (data: UpdateCodeMessage) => {
      if (uuid !== data.uuid) {
        setCode(data.code);
        setLockStatus(LOCK_FAILED);
      }
    });

    newSocket.on("code-locked", (data: LockMessage) => {
      if (uuid !== data.uuid) {
        setLockStatus(LOCK_FAILED);
      }
    });

    newSocket.on("code-unlocked", (data: LockMessage) => {
      if (uuid !== data.uuid) {
        setLockStatus(LOCK_ACQUIRED);
      }
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  // Throttled function to emit code updates
  const emitUpdateCode = throttle((newCode: string) => {
    socket?.emit("update-code", { uuid, code: newCode });
  }, 500);

  // Debounced function to emit code lock status
  const emitCodeLocked = debounce(() => {
    socket?.emit("code-locked", { uuid });
  }, 2000, { leading: true, trailing: false });

  const emitCodeUnlocked = debounce(() => {
    socket?.emit("code-unlocked", { uuid });
  }, 2000);

  // Handle code editor changes
  const handleCodeChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = event.target.value;
    setCode(newCode);

    // Emit events for collaborative editing
    emitCodeLocked();
    emitUpdateCode(newCode);
    emitCodeUnlocked();
  };

  return (
    <div className="h-screen flex flex-col p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Button variant="outline" onClick={() => setCameraOn(!cameraOn)}>
            {cameraOn ? "Camera Off" : "Camera On"}
          </Button>
          <Button variant="outline" onClick={() => setMuted(!muted)} className="ml-4">
            {muted ? "Unmute" : "Mute"}
          </Button>
        </div>
        <Button variant="destructive">Leave</Button>
      </div>

      <div className="flex-grow bg-gray-100 flex justify-center items-center">
        {/* Webcam view mockups */}
        {cameraOn && (
          <div className="bg-black text-white w-1/3 h-full flex justify-center items-center">
            P1 Webcam
          </div>
        )}
       
        {cameraOn && (
          <div className="bg-black text-white w-1/3 h-full flex justify-center items-center">
            P2 Webcam
          </div>
        )}
         <div className="flex-grow bg-white p-6 mx-6 rounded-lg shadow-md">
          <h2 className="text-center font-bold text-2xl mb-4">Live Coding</h2>
          {/* Collaborative Code Editor */}
          <Textarea
            value={code}
            onChange={handleCodeChange}
            placeholder="Code here..."
            className="mt-2 w-full"
            rows={18}
            style={{
              fontFamily: 'monospace',
              fontSize: '14px',
              lineHeight: '1.5'
            }}
          />
          <p className="text-sm text-gray-500 mt-2">
            {lockStatus === LOCK_ACQUIRED
              ? "You have the editing lock."
              : "Editing is locked by another user."}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between space-x-4">
        <Button variant="ghost">Share</Button>
        <Textarea className="flex-grow" placeholder="Chat here..." />
      </div>
    </div>
  );
};

export default RoomPage;
