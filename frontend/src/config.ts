// Try both import.meta.env (Vite standard) and process.env (Vercel fallback)
export const API_URL = import.meta.env.VITE_API_URL || process.env.VITE_API_URL || "https://project-ultimate-tictactoe.onrender.com";
console.log('API_URL initialized as:', API_URL);
