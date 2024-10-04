// app/api/logout/route.ts
import { NextResponse } from 'next/server';

export async function POST() {
  // Clear the authentication cookie by setting it with Max-Age=0
  const res = NextResponse.json({ message: 'Logout successful' });
  res.cookies.set('token', '', {
    httpOnly: true,
    path: '/',
    maxAge: 0, // Expire the cookie
    sameSite: 'lax',
  });
  
  return res;
}
