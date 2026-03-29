import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env') });

export const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key';
export const PORT = process.env.PORT || 3001;
export const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';
export const GROQ_API_KEY = process.env.GROQ_API_KEY || '';
export const DATABASE_URL = process.env.DATABASE_URL || '';
