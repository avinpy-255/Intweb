import React, { useState } from 'react'
import { Button } from "@/components/ui/button";
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
import axiosService from "@/lib/axios";

const CreateRoom: React.FC = () => {
    const [name, setName] = useState<string>("");

    const handleCreateRoom = (event: React.ChangeEvent<HTMLInputElement>): void => {
      const { value } = event.target;
      setName(value);
    };
  
    const handleSubmit = async (): Promise<void> => {
      try {
        const url: string = '/';
        const response = await axiosService.post<{ status: number }>(url, { name });
  
        if (response.status === 200) {
          console.log('Room created successfully');
        }
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <Dialog>
          <DialogTrigger asChild>
            <Button variant="default" size="lg">
              Create Room
            </Button>
          </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Room</DialogTitle>
          <DialogDescription>
            Set your room name
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              name
            </Label>
            <Input
              id="username"
              className="col-span-3"
              value={name}
              onChange={handleCreateRoom}
            />
          </div>
        </div>
        <Button
          onClick={handleSubmit}
         
        >
          {" "}
          Create Room{" "}
        </Button>
        <DialogFooter>
          {" "}
          <DialogDescription>This Site is Under Development</DialogDescription>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CreateRoom;