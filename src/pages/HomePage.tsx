import React from 'react'
import { Button } from '@/components/ui/button';

interface HomePageProps {
    openModal: () => void;
  }

const HomePage: React.FC<HomePageProps> = ({ openModal }) => {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-4xl font-bold">INT WEB</h1>
        <div className="mt-4 space-x-4">
          <Button variant="outline">Docs</Button>
          <Button onClick={openModal}>Create Room</Button>
        </div>
      </div>
    );
  };
  
  export default HomePage;