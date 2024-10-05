import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '@/models/User'; // Ensure this path is correct for your User model
import { connectToDatabase } from '@/lib/mongodb'; // Ensure your MongoDB connection utility is correctly imported

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }

    // Connect to the database
    await connectToDatabase();

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }

    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }

    // Check if the user's account is verified
    if (!user.isVerified) {
      return NextResponse.json({ message: 'Account not verified. Please check your email.' }, { status: 403 });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, name: user.name },
      process.env.JWT_SECRET!, // Ensure JWT_SECRET is set in your environment
      { expiresIn: '1h' }
    );

    // Return the token and user details
    return NextResponse.json({ token, name: user.name, email: user.email });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ message: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
