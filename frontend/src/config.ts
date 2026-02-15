// Try both import.meta.env (Vite standard) and process.env (Vercel fallback)
export const API_URL = import.meta.env.VITE_API_URL || process.env.VITE_API_URL || "http://localhost:8000";
console.log('API_URL initialized as:', API_URL);
