// src/modals/RoomCreationModal.tsx
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';

interface RoomCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RoomCreationModal: React.FC<RoomCreationModalProps> = ({ isOpen, onClose }) => {
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const languages = ['JavaScript', 'Python', 'TypeScript', 'Java', 'C++'];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <Dialog open={isOpen} onOpenChange={onClose}>
        <div className="relative w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>

          <h2 className="mb-4 text-2xl font-semibold">Create a Room</h2>
          
          <div className="mb-4">
            <label className="block mb-2 text-sm">Choose a Language:</label>
            <div className="grid grid-cols-3 gap-2">
              {languages.map((lang) => (
                <Button
                  key={lang}
                  variant={selectedLanguage === lang ? "default" : "outline"}
                  onClick={() => setSelectedLanguage(lang)}
                >
                  {lang}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-2">   
          <Checkbox id="Enable Webcam" />
          <label htmlFor='Enable Webcam'  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" >
            {""} Click here to enble webcam
          </label>
          </div>

          <Button
            onClick={() => alert('Room Created!')}
            disabled={!selectedLanguage}
            variant="default"
            className="mt-4 w-full"
          >
            Create Room
          </Button>
        </div>
      </Dialog>
    </div>
  );
};

export default RoomCreationModal;
