import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify, JWTPayload } from 'jose'; // Using jose for JWT verification

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value; // Get the token from cookies
  
  // Log token for debugging (only do this in non-production environments for security reasons)
  if (process.env.NODE_ENV !== 'production') {
    console.log("Token in middleware:", token); 
  }

  // If no token exists and the route is protected, redirect to login
  if (req.nextUrl.pathname === '/profile' && !token) {
    console.log('Redirecting to login, no token found.');
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // If token exists, verify it
  if (token) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET); // JWT secret from env variable
      
      if (!process.env.JWT_SECRET) {
        console.error('JWT_SECRET is not set in production.');
        throw new Error('Missing JWT secret');
      }

      // Verifies and decodes the token payload
      const { payload }: { payload: JWTPayload } = await jwtVerify(token, secret);
      
      console.log("Token is valid, payload:", payload);

      // Check for any additional conditions like expiration, roles, etc. here if needed
    } catch (err: any) {
      // Handle token errors: expired, invalid, etc.
      console.log('Error verifying token:', err.message);

      if (err.code === 'ERR_JWT_EXPIRED') {
        console.log('Token expired, redirecting to login.');
      } else {
        console.log('Token invalid or error in token verification, redirecting to login.');
      }
      
      // Redirect to login if token is invalid or expired
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  // If the token is valid or it's a non-protected route, allow the request to proceed
  return NextResponse.next();
}

// Apply middleware to protected routes (add more routes if necessary)
export const config = {
  matcher: ['/profile', '/event'], // Protect these routes
};
