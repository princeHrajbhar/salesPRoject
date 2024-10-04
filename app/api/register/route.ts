import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import User from '@/models/User';
import { connectToDatabase } from '@/lib/mongodb';
import { sendVerificationEmail } from '@/lib/mailer';
import crypto from 'crypto';

export async function POST(request: Request) {
  const { name, email, password } = await request.json();
  
  if (!name || !email || !password) {
    return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
  }

  await connectToDatabase();

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return NextResponse.json({ message: 'User already exists' }, { status: 400 });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Generate OTP
  const otp = crypto.randomInt(100000, 999999).toString();
  const otpExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1-hour expiry

  // Create the new user
  const user = new User({
    name,
    email,
    password: hashedPassword,
    otp,
    otpExpiry
  });

  await user.save();

  // Send verification email
  try {
    await sendVerificationEmail(email, otp);
  } catch (error) {
    console.error('Error sending email:', error); // Log the error
    return NextResponse.json({ message: 'Error sending email' }, { status: 500 });
  }

  return NextResponse.json({ message: 'User registered. Check your email to verify your account' }, { status: 200 });
}
