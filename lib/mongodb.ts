import mongoose, { ConnectOptions } from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/princedb'; // Updated to 'princedb'

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

let cachedConnection: mongoose.Connection | null = null;
let cachedPromise: Promise<mongoose.Connection> | null = null;

export const connectToDatabase = async () => {
  // Return cached connection if it exists
  if (cachedConnection && cachedConnection.readyState === 1) {
    return cachedConnection;
  }

  // Create a new connection if one does not exist
  if (!cachedPromise) {
    cachedPromise = mongoose.connect(MONGODB_URI, {
      // Removed deprecated options
    } as ConnectOptions)
    .then((mongooseInstance) => {
      cachedConnection = mongooseInstance.connection; // Cache the connection
      return cachedConnection; // Return the connection
    });
  }

  // Await the promise and cache the connection
  cachedConnection = await cachedPromise;
  return cachedConnection; // Return the connection
};
