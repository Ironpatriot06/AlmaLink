import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function Admin() {
  const [pending, setPending] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from('profiles').select('*').eq('approved', false).order('created_at', { ascending: false });
      setPending(data || []);
    })();
  }, []);

  const approve = async (id) => {
    await supabase.from('profiles').update({ approved: true }).eq('id', id);
    setPending(prev => prev.filter(p => p.id !== id));
  };

  return (
    <div className="p-4">
      <h2 className="text-xl">Admin — Approve Profiles</h2>
      {pending.map(p => (
        <div key={p.id} className="border p-3 my-2">
          <div>{p.full_name} — {p.current_company}</div>
          <button onClick={()=>approve(p.id)} className="mt-2 bg-green-600 text-white px-3 py-1">Approve</button>
        </div>
      ))}
    </div>
  );
}
