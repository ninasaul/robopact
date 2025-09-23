export function ThemeScript() {
  return (
    <script
      suppressHydrationWarning
      dangerouslySetInnerHTML={{
        __html: `
          try {
            const savedTheme = localStorage.getItem('theme');
            const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            const shouldBeDark = savedTheme === 'dark' || (!savedTheme && systemPrefersDark);
            
            console.log('Theme script executing:', { savedTheme, systemPrefersDark, shouldBeDark });
            
            const root = document.documentElement;
            if (shouldBeDark) {
              root.classList.add('dark');
              root.classList.remove('light');
              console.log('Added dark class to html');
            } else {
              root.classList.remove('dark');
              root.classList.add('light');
              console.log('Added light class to html');
            }
          } catch (e) {
            console.warn('Theme script error:', e);
          }
        `,
      }}
    />
  );
}
