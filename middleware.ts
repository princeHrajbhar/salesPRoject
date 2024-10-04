import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose'; // Using jose for JWT verification

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value; // Get the token from cookies
  
  console.log("Token in middleware:", token); // Log token to debug

  // Check if the request is for the profile page and token is missing
  if (req.nextUrl.pathname === '/profile' && !token) {
    console.log('Redirecting to login, no token found.');
    return NextResponse.redirect(new URL('/login', req.url)); // Redirect to login if no token
  }

  if (token) {
    try {
      // Verifying the token using jose library
      const secret = new TextEncoder().encode(process.env.JWT_SECRET!); // Encoding the JWT secret
      const { payload } = await jwtVerify(token, secret); // Verifies and decodes the token payload

      console.log("Token is valid, payload:", payload); // Log the payload to verify the token
    } catch (err) {
      console.log("Token verification failed:", err); // Log error if verification fails
      return NextResponse.redirect(new URL('/login', req.url)); // Redirect if the token is invalid
    }
  }

  // Continue to the profile page if the token is valid
  return NextResponse.next();
}

// Apply middleware to the profile route
export const config = {
  matcher: ['/profile'], // Add other protected routes here if needed
};
