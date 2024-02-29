import sanitizeHtml from "sanitize-html";

export const cleanHtml = (html: string) => {
  return sanitizeHtml(html);
};
