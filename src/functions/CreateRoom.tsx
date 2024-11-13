import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import axiosService from "@/lib/axios"
import { useNavigate } from '@tanstack/react-router'


interface RoomResponse {
  code: string;
  createdAt: string;
  roomId: string;
  roomName: string;
  updatedAt: string;
  _id: string;
}

const CreateRoom: React.FC = () => {
  const navigate = useNavigate()
  const [name, setName] = useState<string>("")
  const [isOpen, setIsOpen] = useState(false)
  const [error, setError] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)

  const handleCreateRoom = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setName(event.target.value)
    setError("")
  }

  const handleSubmit = async (): Promise<void> => {
    if (!name.trim()) {
      setError("Please Give A Room Name")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const { data, status } = await axiosService.post<RoomResponse>('/', {
        name: name.trim()
      })

      if (status === 201 && data.roomId) {
        console.log('Room created successfully')
        setIsOpen(false)
        navigate({ to: `/${data.roomId}` })
      } else {
        setError("Failed to create room. Please try again.")
      }
    } catch (error) {
      console.error('Error creating room:', error)
      setError("An error occurred while creating the room")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="default" size="lg">
          Create Room
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Room</DialogTitle>
          <DialogDescription>
            Enter a name for your new room
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="roomName" className="text-right">
              Room Name
            </Label>
            <Input
              id="roomName"
              className="col-span-3"
              value={name}
              onChange={handleCreateRoom}
              placeholder="Enter room name"
              disabled={isLoading}
            />
          </div>
          {error && (
            <p className="text-sm text-red-500 mt-2">
              {error}
            </p>
          )}
        </div>
        <DialogFooter className="flex flex-col gap-4">
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? "Creating..." : "Create Room"}
          </Button>
          <DialogDescription>
            This Site is Under Development
          </DialogDescription>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default CreateRoom