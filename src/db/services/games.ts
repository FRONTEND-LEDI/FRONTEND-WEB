// games.ts
import type { Quiz, Gamble } from "../../types/games";

const URL = "http://localhost:3402";

// CREATE YOUR HISTORY - POST
export async function createYourHistory(bookId: string, gamble: Gamble, token?: string) {
  if (!token) {
    throw new Error("Token de autenticación requerido");
  }
  
  const res = await fetch(`${URL}/createYourHistory/${bookId}`, {  // ✅ Corregido: paréntesis normales
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(gamble),
  });
  
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Error en createYourHistory: ${res.status} - ${text}`); // ✅ Corregido: paréntesis normales
  }
  
  return res.json();
}

// QUIZ - POST 
export async function submitQuiz(bookId: string, quiz: Quiz, token?: string) {
  if (!token) {
    throw new Error("Token de autenticación requerido");
  }
  
  const res = await fetch(`${URL}/quiz/${bookId}`, {  // ✅ Corregido: paréntesis normales
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(quiz),
  });
  
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Error en submitQuiz: ${res.status} - ${text}`); // ✅ Corregido: paréntesis normales
  }
  
  return res.json();
}