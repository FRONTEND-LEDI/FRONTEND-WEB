import type { Coment } from "./types";

type PopularProps = {
  posts: Coment[];
};

export default function Popular({ posts }: PopularProps) {
  return (
    <ul className="space-y-2">
      {posts.map((post) => (
        <li key={post.id} className="p-2 bg-white shadow rounded">
          <p className="font-bold text-primary">{post.autor}</p>
          <p>{post.contenido}</p>
        </li>
      ))}
    </ul>
  );
}



