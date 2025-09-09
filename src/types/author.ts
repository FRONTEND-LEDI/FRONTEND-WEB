export type AuthorAvatar =
| string
| {
secure_url?: string;
url?: string;
url_secura?: string; // URL Cloudinary ?
[k: string]: any;
};


export type Author = {
_id: string;
name: string;
biography: string;
avatar?: AuthorAvatar;
};


export function getAuthorAvatarUrl(a?: AuthorAvatar): string | undefined {
if (!a) return undefined;
if (typeof a === "string") return a;
return a.secure_url || a.url || (a as any).url_secura || undefined;
}