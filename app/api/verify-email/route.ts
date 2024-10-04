import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import User from '@/models/User'; // Import the User model

export async function POST(req: NextRequest) {
  const { email, otp } = await req.json();

  if (!email || !otp) {
    return NextResponse.json({ message: 'Email and OTP are required' }, { status: 400 });
  }

  try {
    // Ensure the database is connected
    await connectToDatabase();

    // Find the user by email using the User model
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Check if the OTP matches and hasn't expired
    const isValidOtp = user.otp === otp && Date.now() < user.otpExpiry;

    if (!isValidOtp) {
      return NextResponse.json({ message: 'Invalid or expired OTP' }, { status: 400 });
    }

    // Update the user's verified status
    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    return NextResponse.json({ message: 'Email verified successfully!' });
  } catch (error) {
    console.error('Error verifying email:', error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}
