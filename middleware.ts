import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify, JWTPayload } from 'jose'; // Using jose for JWT verification

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value; // Get the token from cookies
  
  console.log("Token in middleware:", token); // Debugging log for token

  // If the request is for a protected page and there's no token
  if (req.nextUrl.pathname === '/profile' && !token) {
    console.log('Redirecting to login, no token found.');
    return NextResponse.redirect(new URL('/login', req.url)); // Redirect to login if no token
  }

  if (token) {
    try {
      // Verifying the token using jose library
      const secret = new TextEncoder().encode(process.env.JWT_SECRET!); // Encoding the JWT secret
      const { payload }: { payload: JWTPayload } = await jwtVerify(token, secret); // Verifies and decodes the token payload

      console.log("Token is valid, payload:", payload); // Log payload to verify token is valid
      
      // Check for additional conditions here if needed (e.g., role-based access)
    } catch (err: any) {
      // Handle token errors: either it's expired or invalid
      if (err.code === 'ERR_JWT_EXPIRED') {
        console.log('Token expired, redirecting to login.');
      } else {
        console.log('Token invalid, redirecting to login:', err);
      }
      return NextResponse.redirect(new URL('/login', req.url)); // Redirect if token is expired or invalid
    }
  }

  // Allow access if the token is valid
  return NextResponse.next();
}

// Apply middleware to the profile route and any other protected routes
export const config = {
  matcher: ['/profile', '/event'], // Add other protected routes here
};
