import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import User from '@/models/User';
import { connectToDatabase } from '@/lib/mongodb';

export async function POST(request: Request) {
  const { email, otp, newPassword, confirmPassword } = await request.json();

  if (!email || !otp || !newPassword || !confirmPassword) {
    return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
  }

  if (newPassword !== confirmPassword) {
    return NextResponse.json({ message: 'Passwords do not match' }, { status: 400 });
  }

  await connectToDatabase();

  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }

  // Validate OTP
  if (user.otp !== otp) {
    return NextResponse.json({ message: 'Invalid OTP' }, { status: 400 });
  }

  // Check if OTP is expired
  if (user.otpExpiry && user.otpExpiry < new Date()) {
    return NextResponse.json({ message: 'OTP expired' }, { status: 400 });
  }

  // Hash the new password
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  // Update the user's password
  user.password = hashedPassword;
  user.otp = null; // Clear OTP after successful reset
  user.otpExpiry = null; // Clear OTP expiry
  await user.save();

  return NextResponse.json({ message: 'Password reset successfully' }, { status: 200 });
}
