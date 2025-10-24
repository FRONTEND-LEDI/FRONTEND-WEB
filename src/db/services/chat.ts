// services/chatApi.ts
export async function sendMessageToChatBot(message: string) {
  try {
    const response = await fetch("http://localhost:3402/api/chatBot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idSecccion: "45678asdasdd",
        message,
      }),
    });

    if (!response.ok) {
      throw new Error("Error al comunicarse con el chatbot");
    }

    const data = await response.json();
     return { output: data.output || "Sin respuesta" };
    return data;
  } catch (error) {
    console.error(error);
    return { text: "Hubo un problema al conectar con el bot." };
  }
}

