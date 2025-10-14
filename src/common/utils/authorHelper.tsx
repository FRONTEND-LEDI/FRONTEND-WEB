import type { AuthorItem, NormalizedAuthor } from "../../types/books";

export function normalizeAuthors(
  authorField: AuthorItem[] | undefined
): NormalizedAuthor[] {
  if (!authorField || authorField.length === 0) return [];
  const first = authorField[0];
  if (typeof first === "string") {
    return (authorField as string[]).map((fullName) => ({ fullName }));
  }
  return (authorField as { _id: string; fullName: string }[]).map((a) => ({
    id: a._id,
    fullName: a.fullName,
  }));
}

export function formatAuthorsForCard(authors: NormalizedAuthor[]): string {
  if (authors.length === 0) return "Autor desconocido";
  if (authors.length === 1) return authors[0].fullName;
  if (authors.length === 2)
    return `${authors[0].fullName}, ${authors[1].fullName}`;
  return `${authors[0].fullName}, ${authors[1].fullName} +${
    authors.length - 2
  } más`;
}
