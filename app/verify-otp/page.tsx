'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios, { AxiosError } from 'axios';
import toast, { Toaster } from 'react-hot-toast';

export default function VerifyOtp() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !otp) {
      toast.error('Both email and OTP are required');
      return;
    }

    try {
      setLoading(true);
      await axios.post('/api/verify-email', { email, otp }); // Removed unused response
      setLoading(false);
      toast.success('Email verified successfully!');
      router.push('/login'); // Redirect to login page after successful verification
    } catch (error) {
      setLoading(false);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || 'Something went wrong');
      } else {
        toast.error('An unexpected error occurred');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800">
      <div className="bg-gray-900 p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold text-gray-100 mb-6 text-center">Verify OTP</h2>
        <form onSubmit={handleVerifyOtp} className="space-y-6">
          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-300">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-300">OTP</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter the OTP sent to your email"
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={loading}
          >
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>
        </form>
        <Toaster />
      </div>
    </div>
  );
}
