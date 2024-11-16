import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from '@tanstack/react-router';
import React, { useState } from 'react';

const JoinRoom: React.FC = () => {
    const navigate = useNavigate();
    const [name, setName] = useState<string>('');
    const [error, setError] = useState<string>('');

    const handleJoinRoom = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setName(event.target.value);
        setError('');
    };

    const handleNavigate = () => {
        if (!name) {
            setError('Please provide a room ID');
        } else {
            navigate({ to: `/${name}` });
        }
    };

    return (
        <>
            <Input
                id="roomName"
                value={name}
                className="col-span-3"
                onChange={handleJoinRoom}
                placeholder="Enter room name"
            />
            {error && <p className="text-sm text-red-700">{error}</p>}
            <Button onClick={handleNavigate} className="mt-4">
                Join Room
            </Button>
        </>
);
};

export default JoinRoom;
