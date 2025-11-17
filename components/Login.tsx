import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import Icon from './Icon';

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({ email });

    if (error) {
      setError(error.message);
    } else {
      setMessage('Check your email for the magic link!');
    }
    setLoading(false);
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-4 bg-zinc-900 rounded-2xl text-center">
      <h2 className="text-2xl font-bold text-gold mb-4">Login to Your Profile</h2>
      <p className="text-zinc-400 mb-6 max-w-xs">
        Enter your email to receive a secure, password-free magic link to sign in.
      </p>
      <form onSubmit={handleLogin} className="w-full max-w-sm">
        <input
          type="email"
          placeholder="your.email@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-3 mb-4 bg-zinc-800 border-2 border-zinc-700 rounded-lg text-white focus:outline-none focus:border-gold transition-colors"
        />
        <button
          type="submit"
          disabled={loading || !email}
          className="w-full bg-gold text-black font-bold py-3 rounded-lg transition-transform hover:scale-105 disabled:bg-zinc-600 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
        >
          {loading ? 'Sending...' : <> <Icon name="paper-plane" className="mr-2" /> Send Magic Link </>}
        </button>
      </form>
      {message && <p className="mt-4 text-green-400">{message}</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  );
};

export default Login;
