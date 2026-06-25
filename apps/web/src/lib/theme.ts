export const THEME_STORAGE_KEY = "portfolio-theme";

export const themePreferences = ["system", "light", "dark"] as const;

export type ThemePreference = (typeof themePreferences)[number];

export type ResolvedTheme = Exclude<ThemePreference, "system">;

export function isThemePreference(value: string | null | undefined): value is ThemePreference {
  return themePreferences.includes(value as ThemePreference);
}
