import { NextApiRequest } from "next";
import jwt, { JwtPayload } from "jsonwebtoken";

// Define your secret key
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

// Interface for decoded JWT payload (including user details)
interface DecodedUser extends JwtPayload {
  id: string;
  email: string;
  role?: string; // Optional: roles like "admin", "user", etc.
  exp: number; // Expiration time
}

/**
 * Function to check if the user is authenticated and retrieve user details
 * @param req - Next.js API request
 * @returns The decoded user data if authenticated, or null if not authenticated
 */
export function checkAuthentication(req: NextApiRequest) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return { error: "No token provided", user: null };
  }

  const token = authHeader.split(" ")[1];

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, JWT_SECRET) as DecodedUser;

    // Check if the token has expired
    if (Date.now() >= decoded.exp * 1000) {
      return { error: "Token expired", user: null };
    }

    // Return the decoded user information
    return { error: null, user: decoded };
  } catch (err: unknown) {
    // Differentiate between various token errors
    if (err instanceof jwt.TokenExpiredError) {
      return { error: "Token expired", user: null };
    }
    if (err instanceof jwt.JsonWebTokenError) {
      return { error: "Invalid token", user: null };
    }
    return { error: "An error occurred", user: null };
  }
}
