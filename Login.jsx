import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // AC #2: Password Length Validation
    if (password.length < 8) {
      alert("Password must be at least 8 characters long.");
      return;
    }

    // AC #3: Simulate Authentication
    onLogin({ name: email.split('@')[0], email: email });
    navigate('/'); // Redirect to homepage
  };

  return (
    <div className="pt-40 pb-20 max-w-md mx-auto px-4">
      <div className="bg-[#121212] border border-white/10 p-8 rounded-3xl shadow-2xl">
        <h2 className="text-3xl font-black italic uppercase mb-2 text-center">
          {isRegistering ? 'Join the' : 'Welcome'} <span className="text-red-600">Hub</span>
        </h2>
        <p className="text-gray-500 text-xs font-bold uppercase text-center mb-8 tracking-widest">
          {isRegistering ? 'Create your account' : 'Login to your account'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest mb-2 block">Email Address</label>
            <input 
              type="email" required
              className="w-full bg-black border border-white/10 p-3 rounded-xl text-sm focus:border-red-600 outline-none"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest mb-2 block">Password</label>
            <input 
              type="password" required
              className="w-full bg-black border border-white/10 p-3 rounded-xl text-sm focus:border-red-600 outline-none"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="w-full bg-red-600 hover:bg-red-700 py-3 rounded-xl font-black uppercase text-xs tracking-[0.2em] transition-all mt-4">
            {isRegistering ? 'Register' : 'Login'}
          </button>
        </form>

        <button 
          onClick={() => setIsRegistering(!isRegistering)}
          className="w-full text-center text-[10px] font-bold text-gray-500 uppercase mt-6 hover:text-white transition-colors"
        >
          {isRegistering ? 'Already have an account? Login' : "Don't have an account? Register"}
        </button>
      </div>
    </div>
  );
};

export default Login;