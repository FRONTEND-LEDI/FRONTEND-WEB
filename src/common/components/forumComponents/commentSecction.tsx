"use client";
import { useState } from "react";

interface CommentSectionProps {
  commentsCount: number;
}

export default function CommentSection({ commentsCount }: CommentSectionProps) {
  const [showComments, setShowComments] = useState(false);

  return (
    <div className="mt-3 border-t pt-3">
      <button
        onClick={() => setShowComments(!showComments)}
        className="text-sm text-primary hover:underline font-semibold flex items-center gap-2"
      >
        <span>{showComments ? '▼' : '▶'}</span>
        <span>Comentarios ({commentsCount})</span>
      </button>
    </div>
  );
}