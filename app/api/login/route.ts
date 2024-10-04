import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '@/models/User'; // Make sure this path is correct for your User model
import { connectToDatabase } from '@/lib/mongodb'; // Assuming you have a MongoDB connection utility

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json(); // Parse the request body

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }

    // Connect to your database
    await connectToDatabase();

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }

    // Check if the user's account is verified (if applicable)
    if (!user.isVerified) {
      return NextResponse.json({ message: 'Account not verified. Please check your email.' }, { status: 403 });
    }

    // Generate JWT token including name
    const token = jwt.sign(
      { id: user._id, email: user.email, name: user.name }, 
      process.env.JWT_SECRET!, 
      { expiresIn: '1h' }
    );
    console.log("Generated Token ",token);

    // Return the token and user info in the response
    return NextResponse.json({ token, name: user.name, email: user.email });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ message: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
