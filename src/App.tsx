import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RoomPage from './pages/RoomPage';
import RoomCreationModal from './modals/RoomCreationModal';

const App: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage openModal={() => setShowModal(true)} />} />
        <Route path="/room" element={<RoomPage />} />
      </Routes>
      <RoomCreationModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </Router>
  );
};

export default App;
