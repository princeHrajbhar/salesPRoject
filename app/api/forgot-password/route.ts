import { NextResponse } from 'next/server';
import User from '@/models/User';
import { connectToDatabase } from '@/lib/mongodb';
import { sendOtpEmail } from '@/lib/forgot-mailer';

export async function POST(request: Request) {
  const { email } = await request.json();

  if (!email) {
    return NextResponse.json({ message: 'Email is required' }, { status: 400 });
  }

  await connectToDatabase();

  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }

  // Generate OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP
  const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // OTP valid for 10 minutes

  // Update the user with the OTP and expiry
  user.otp = otp;
  user.otpExpiry = otpExpiry;
  await user.save();

  // Send OTP email
  try {
    await sendOtpEmail(user.email, otp);
  } catch (error) {
    console.error('Error sending OTP:', error);  // Log the error
    return NextResponse.json({ message: 'Error sending OTP' }, { status: 500 });
  }

  return NextResponse.json({ message: 'OTP sent to your email' }, { status: 200 });
}
