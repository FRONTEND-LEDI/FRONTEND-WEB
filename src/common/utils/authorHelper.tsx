import type { AuthorItem, NormalizedAuthor } from "../../types/books";

export function normalizeAuthors(
  authorField: AuthorItem[] | undefined
): NormalizedAuthor[] {
  if (!authorField || authorField.length === 0) return [];
  const first = authorField[0];
  if (typeof first === "string") {
    return (authorField as string[]).map((name) => ({ name }));
  }
  return (authorField as { _id: string; name: string }[]).map((a) => ({
    id: a._id,
    name: a.name,
  }));
}

export function formatAuthorsForCard(authors: NormalizedAuthor[]): string {
  if (authors.length === 0) return "Autor desconocido";
  if (authors.length === 1) return authors[0].name;
  if (authors.length === 2) return `${authors[0].name}, ${authors[1].name}`;
  return `${authors[0].name}, ${authors[1].name} +${authors.length - 2} más`;
}
