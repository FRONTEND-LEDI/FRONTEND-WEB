type PopularProps = {
  posts: string[];
};

export default function Popular({ posts }: PopularProps) {
  return (
    <ul className="space-y-2">
      {posts.map((post, idx) => (
        <li key={idx} className="p-2 bg-white shadow rounded">
          {post}
        </li>
      ))}
    </ul>
  );
}



