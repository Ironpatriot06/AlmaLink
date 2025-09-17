import React from 'react';
import { supabase } from '../lib/supabaseClient';

export default function LoginButton() {
  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({ provider: 'google' });
  };

  return (
    <button onClick={signInWithGoogle} className="px-4 py-2 rounded bg-blue-600 text-white">
      Sign in with Google
    </button>
  );
}
