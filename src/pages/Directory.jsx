// src/pages/Directory.jsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Link } from 'react-router-dom';

export default function Directory() {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.from('profiles').select('id, full_name, batch_year, current_company, profile_pic_path').eq('approved', true).order('full_name');
      if (error) return console.error(error);
      setProfiles(data);
    })();
  }, []);

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
      {profiles.map(p => (
        <div key={p.id} className="p-4 border rounded">
          <div className="font-bold">{p.full_name}</div>
          <div className="text-sm">{p.current_company} • {p.batch_year}</div>
          <Link to={`/profile/${p.id}`} className="text-blue-600 mt-2 inline-block">View</Link>
        </div>
      ))}
    </div>
  );
}
