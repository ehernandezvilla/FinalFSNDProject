import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Loading from './components/Loading';
import Navbar from './components/Navbar';
import Home from './views/Home';
import Profile from './views/Profile';
import DomainList from './views/DomainList';

function App() {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/domains" element={<DomainList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

