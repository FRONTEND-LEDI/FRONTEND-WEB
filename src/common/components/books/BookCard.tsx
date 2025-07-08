import React from 'react';

interface BookCardProps {
  title: string;
  author: string;
  bookCoverImage: string;
}

const BookCard: React.FC<BookCardProps> = ({ title, author, bookCoverImage }) => {
  return (
    <div className="rounded-2xl shadow p-4 flex flex-col items-center bg-white hover:shadow-lg transition">
      <img src={bookCoverImage} alt={title} className="w-full h-100% object-cover rounded-lg mb-2" />
      <h3 className="text-lg font-semibold text-center line-clamp-2">{title}</h3>
      <p className="text-sm text-gray-600 text-center mt-1 line-clamp-1">{author}</p>
    </div>
  );
};

export default BookCard;