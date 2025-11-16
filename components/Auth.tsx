
import React, { useState } from 'react';
import type { User } from '../types';
import { apiService } from '../services/api';
import { SpinnerIcon } from './icons';

interface AuthProps {
  onLoginSuccess: (user: User) => void;
}

const Auth: React.FC<AuthProps> = ({ onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Login state
  const [loginUsername, setLoginUsername] = useState('demo');
  const [loginPassword, setLoginPassword] = useState('demo123');

  // Register state
  const [regFullName, setRegFullName] = useState('');
  const [regUsername, setRegUsername] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const result = await apiService.login(loginUsername, loginPassword);
    if (result.success && result.user) {
      onLoginSuccess(result.user);
    } else {
      setError(result.error || 'Login failed');
    }
    setLoading(false);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if(regPassword.length < 6) {
        setError('Password must be at least 6 characters long.');
        return;
    }
    setError(null);
    setLoading(true);
    const result = await apiService.register(regFullName, regUsername, regEmail);
     if (result.success) {
      alert('Registration successful! Please log in.');
      setIsLogin(true);
    } else {
      setError(result.error || 'Registration failed');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="p-8 bg-blue-600 text-white text-center">
          <i className="fas fa-wind fa-2x mb-2"></i>
          <h1 className="text-2xl font-bold">AQI Monitor Delhi-NCR</h1>
          <p className="text-blue-100">Your partner for cleaner air</p>
        </div>

        <div className="flex border-b">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-3 font-semibold text-center transition-colors duration-300 ${isLogin ? 'bg-white text-blue-600' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-3 font-semibold text-center transition-colors duration-300 ${!isLogin ? 'bg-white text-blue-600' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}
          >
            Register
          </button>
        </div>

        <div className="p-6">
          {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-4 text-sm" role="alert">{error}</div>}
          
          {isLogin ? (
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="login-username">Username</label>
                <input value={loginUsername} onChange={(e) => setLoginUsername(e.target.value)} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" id="login-username" type="text" placeholder="demo" required/>
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="login-password">Password</label>
                <input value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" id="login-password" type="password" placeholder="demo123" required/>
              </div>
              <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-300 flex items-center justify-center disabled:bg-blue-400">
                {loading && <SpinnerIcon />}
                Login
              </button>
            </form>
          ) : (
             <form onSubmit={handleRegister}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="reg-fullname">Full Name</label>
                <input value={regFullName} onChange={e => setRegFullName(e.target.value)} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" id="reg-fullname" type="text" required/>
              </div>
               <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="reg-username">Username</label>
                <input value={regUsername} onChange={e => setRegUsername(e.target.value)} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" id="reg-username" type="text" required/>
              </div>
               <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="reg-email">Email</label>
                <input value={regEmail} onChange={e => setRegEmail(e.target.value)} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" id="reg-email" type="email" required/>
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="reg-password">Password</label>
                <input value={regPassword} onChange={e => setRegPassword(e.target.value)} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" id="reg-password" type="password" required/>
              </div>
              <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-300 flex items-center justify-center disabled:bg-blue-400">
                 {loading && <SpinnerIcon />}
                Create Account
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
