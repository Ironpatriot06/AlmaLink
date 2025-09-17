import React from 'react';
import LoginButton from '../components/LoginButton';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Landing() {
  const { user } = useAuth();
  return (
    <div className="p-8">
      <h1 className="text-2xl">AlmaLink</h1>
      <p>Reconnect with alumni</p>
      <div className="mt-4">
        <LoginButton />
        {user && <Link to="/create-profile" className="ml-4">Create profile</Link>}
      </div>
      <div className="mt-6">
        <Link to="/directory" className="text-blue-600">View directory</Link>
      </div>
    </div>
  );
}
