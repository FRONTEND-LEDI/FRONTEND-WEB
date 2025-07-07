export const getAllBooks = async (token: string | null) => {
  const res = await fetch('http://localhost:3402/books', {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) throw new Error('Error al obtener libros');

  const data = await res.json();
  return data;
};

