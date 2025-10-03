// games.ts
const URL = "http://localhost:3402";

export async function createYourHistory(bookId: string, gamble?: any, token?: string) {
  const res = await fetch(`${URL}/createYourHistory/${bookId}`, {  
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: gamble ? JSON.stringify(gamble) : undefined,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Error en createYourHistory: ${res.status} - ${text}`);
  }

  return res.json();
}

