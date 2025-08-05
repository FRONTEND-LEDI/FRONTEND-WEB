import React from 'react';
import { Link } from 'wouter';

interface BookCardProps {
  id: string;
  title: string;
  author: string;
  bookCoverImage: string;
}

const BookCard: React.FC<BookCardProps> = ({ id,title, author, bookCoverImage }) => {
  return (
    <Link href={`/libro/${id}`} className="rounded-2xl shadow p-4 flex flex-col items-center bg-white hover:shadow-lg transition">
      <img src={bookCoverImage} alt={title} className="w-full h-100% object-cover rounded-lg mb-2" />
      <h3 className="text-lg font-semibold text-center line-clamp-2">{title}</h3>
      <p className="text-sm text-gray-600 text-center mt-1 line-clamp-1">{author}</p>
    </ Link>
  );
};

export default BookCard;