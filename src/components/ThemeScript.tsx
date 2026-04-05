/**
 * Runs before React hydrates so theme and locale apply immediately (no flash).
 * Default: dark theme, en locale.
 */
export function ThemeScript() {
  const script = `
(function() {
  var theme = localStorage.getItem('theme') || 'dark';
  var locale = localStorage.getItem('locale') || 'en';
  var d = document.documentElement;
  d.classList.toggle('dark', theme === 'dark');
  d.setAttribute('lang', locale);
  d.setAttribute('dir', locale === 'he' ? 'rtl' : 'ltr');
})();
`;
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
