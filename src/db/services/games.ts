// games.ts
const URL = "http://localhost:3402";

interface Gamble {
    title: string,
    ecenary: string,
    page: number,
    option: string
}

interface Quiz {
    title: string,
    ecenary: string,
    page: number,
    options: any[],
    completed?: boolean,
    score?: number
}

// CREATE YOUR HISTORY - POST (envía estado de la historia)
export async function createYourHistory(bookId: string, gamble: Gamble, token?: string) {
  if (!token) {
    throw new Error("Token de autenticación requerido");
  }

  const res = await fetch(`${URL}/createYourHistory/${bookId}`, {  
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(gamble), // Siempre envía datos del contexto
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Error en createYourHistory: ${res.status} - ${text}`);
  }

  return res.json();
}

// QUIZ - GET (solo obtiene preguntas)
export async function getQuiz(bookId: string, token?: string) {
  if (!token) {
    throw new Error("Token de autenticación requerido");
  }

  const res = await fetch(`${URL}/quiz/${bookId}`, {  
    method: "GET", // GET sin body
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    // NO body en GET
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Error en getQuiz: ${res.status} - ${text}`);
  }

  return res.json();
}

// QUIZ - POST (para enviar resultados finales)
export async function submitQuiz(bookId: string, quiz: Quiz, token?: string) {
  if (!token) {
    throw new Error("Token de autenticación requerido");
  }

  const res = await fetch(`${URL}/quiz/${bookId}`, {  
    method: "POST", // POST para enviar resultados
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(quiz), // Envía el quiz completo con score
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Error en submitQuiz: ${res.status} - ${text}`);
  }

  return res.json();
}