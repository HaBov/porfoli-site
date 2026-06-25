import { THEME_STORAGE_KEY } from "@/lib/theme";

const themeInitializationScript = `
(() => {
  const storageKey = ${JSON.stringify(THEME_STORAGE_KEY)};

  const isValidPreference = (value) =>
    value === "system" || value === "light" || value === "dark";

  const resolveTheme = (preference) => {
    if (preference === "light" || preference === "dark") {
      return preference;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  try {
    const storedPreference = window.localStorage.getItem(storageKey);
    const preference = isValidPreference(storedPreference)
      ? storedPreference
      : "system";
    const resolvedTheme = resolveTheme(preference);
    const root = document.documentElement;

    root.dataset.theme = resolvedTheme;
    root.dataset.themePreference = preference;
    root.style.colorScheme = resolvedTheme;
  } catch {
    const root = document.documentElement;

    root.dataset.theme = "dark";
    root.dataset.themePreference = "system";
    root.style.colorScheme = "dark";
  }
})();
`;

export function ThemeScript() {
  return (
    <script
      id="theme-initializer"
      dangerouslySetInnerHTML={{ __html: themeInitializationScript }}
    />
  );
}
