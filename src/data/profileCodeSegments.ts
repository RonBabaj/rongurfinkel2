/**
 * Hero `profile.js` — gray (keys + punctuation), purple (keyword + Ron), green (strings).
 */
export type ProfileCodeSegment = { text: string; className: string };

export const PROFILE_CODE_SEGMENTS: ProfileCodeSegment[] = [
  { text: "const ", className: "code-syntax-kw" },
  { text: "Ron", className: "code-syntax-id" },
  { text: " = {\n", className: "code-syntax-punct" },
  { text: "  ", className: "code-syntax-punct" },
  { text: "name", className: "code-syntax-prop" },
  { text: ": ", className: "code-syntax-punct" },
  { text: '"Ron Gurfinkel"', className: "code-syntax-str" },
  { text: ",\n", className: "code-syntax-punct" },
  { text: "  ", className: "code-syntax-punct" },
  { text: "role", className: "code-syntax-prop" },
  { text: ": ", className: "code-syntax-punct" },
  { text: '"QA, Developer and 3D Hobbyist"', className: "code-syntax-str" },
  { text: ",\n", className: "code-syntax-punct" },
  { text: "  ", className: "code-syntax-punct" },
  { text: "also", className: "code-syntax-prop" },
  { text: ": ", className: "code-syntax-punct" },
  { text: '"Musician And Designer"', className: "code-syntax-str" },
  { text: ",\n", className: "code-syntax-punct" },
  { text: "  ", className: "code-syntax-punct" },
  { text: "builds", className: "code-syntax-prop" },
  { text: ": [\n", className: "code-syntax-punct" },
  { text: "    ", className: "code-syntax-punct" },
  { text: '"web apps"', className: "code-syntax-str" },
  { text: ",\n", className: "code-syntax-punct" },
  { text: "    ", className: "code-syntax-punct" },
  { text: '"mobile apps"', className: "code-syntax-str" },
  { text: ",\n", className: "code-syntax-punct" },
  { text: "    ", className: "code-syntax-punct" },
  { text: '"DIY Projects"', className: "code-syntax-str" },
  { text: ",\n", className: "code-syntax-punct" },
  { text: "    ", className: "code-syntax-punct" },
  { text: '"Songwriting and Art Projects"', className: "code-syntax-str" },
  { text: ",\n", className: "code-syntax-punct" },
  { text: "  ],\n", className: "code-syntax-punct" },
  { text: "}", className: "code-syntax-punct" },
  { text: ";", className: "code-syntax-punct" },
];

/** Plain text (must match joined segments) for a11y. */
export const PROFILE_CODE_PLAIN = PROFILE_CODE_SEGMENTS.map((s) => s.text).join("");

export function profileCodeTotalLength(): number {
  return PROFILE_CODE_SEGMENTS.reduce((n, s) => n + s.text.length, 0);
}
