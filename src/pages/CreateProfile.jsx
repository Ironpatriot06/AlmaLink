// src/pages/CreateProfile.jsx
import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../contexts/AuthContext';

export default function CreateProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState({ full_name: '', batch_year: '', current_company: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    // optionally load existing profile
    (async () => {
      const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();
      if (data) setProfile(data);
    })();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert('Sign in first');
    setLoading(true);
    const payload = { ...profile, id: user.id };
    const { error } = await supabase.from('profiles').upsert(payload);
    setLoading(false);
    if (error) alert(error.message); else alert('Profile saved');
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl mb-4">Create / Edit Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input value={profile.full_name} onChange={e=>setProfile({...profile, full_name:e.target.value})}
          placeholder="Full name" className="w-full p-2 border"/>
        <input value={profile.batch_year} onChange={e=>setProfile({...profile, batch_year:+e.target.value})}
          placeholder="Batch year" className="w-full p-2 border"/>
        <input value={profile.current_company} onChange={e=>setProfile({...profile, current_company:e.target.value})}
          placeholder="Company" className="w-full p-2 border"/>
        <button type="submit" className="px-4 py-2 bg-green-600 text-white">{loading ? 'Saving...' : 'Save'}</button>
      </form>
    </div>
  );
}
