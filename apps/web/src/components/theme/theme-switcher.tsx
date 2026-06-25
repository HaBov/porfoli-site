"use client";

import { useSyncExternalStore } from "react";

import {
  isThemePreference,
  THEME_STORAGE_KEY,
  type ResolvedTheme,
  type ThemePreference,
  themePreferences,
} from "@/lib/theme";

const THEME_CHANGE_EVENT = "portfolio-theme-change";

const themeLabels: Record<ThemePreference, string> = {
  system: "System",
  light: "Light",
  dark: "Dark",
};

function resolveTheme(preference: ThemePreference): ResolvedTheme {
  if (preference === "light" || preference === "dark") {
    return preference;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function getThemePreferenceSnapshot(): ThemePreference {
  const rootPreference = document.documentElement.dataset.themePreference;

  return isThemePreference(rootPreference) ? rootPreference : "system";
}

function getServerThemePreferenceSnapshot(): ThemePreference {
  return "system";
}

function applyTheme(
  preference: ThemePreference,
  options: {
    persist: boolean;
  },
): void {
  const resolvedTheme = resolveTheme(preference);
  const root = document.documentElement;

  root.dataset.theme = resolvedTheme;
  root.dataset.themePreference = preference;
  root.style.colorScheme = resolvedTheme;

  if (options.persist) {
    window.localStorage.setItem(THEME_STORAGE_KEY, preference);
  }

  window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
}

function subscribeToThemePreference(onStoreChange: () => void): () => void {
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

  function handleThemeChange(): void {
    onStoreChange();
  }

  function handleSystemThemeChange(): void {
    if (getThemePreferenceSnapshot() === "system") {
      applyTheme("system", {
        persist: false,
      });
    }
  }

  function handleStorageChange(event: StorageEvent): void {
    if (event.key !== THEME_STORAGE_KEY) {
      return;
    }

    const nextPreference = isThemePreference(event.newValue) ? event.newValue : "system";

    applyTheme(nextPreference, {
      persist: false,
    });
  }

  window.addEventListener(THEME_CHANGE_EVENT, handleThemeChange);
  window.addEventListener("storage", handleStorageChange);
  mediaQuery.addEventListener("change", handleSystemThemeChange);

  return () => {
    window.removeEventListener(THEME_CHANGE_EVENT, handleThemeChange);
    window.removeEventListener("storage", handleStorageChange);
    mediaQuery.removeEventListener("change", handleSystemThemeChange);
  };
}

export function ThemeSwitcher() {
  const preference = useSyncExternalStore(
    subscribeToThemePreference,
    getThemePreferenceSnapshot,
    getServerThemePreferenceSnapshot,
  );

  function handlePreferenceChange(nextPreference: ThemePreference): void {
    applyTheme(nextPreference, {
      persist: true,
    });
  }

  return (
    <div
      aria-label="Color theme"
      className="border-line bg-surface inline-flex rounded-[var(--radius-md)] border p-1"
      role="group"
    >
      {themePreferences.map((themePreference) => {
        const selected = preference === themePreference;

        return (
          <button
            key={themePreference}
            aria-pressed={selected}
            className={[
              "min-h-11 rounded-[var(--radius-sm)] px-3 text-sm font-medium",
              "transition-colors",
              "focus-visible:ring-2 focus-visible:outline-none",
              "focus-visible:ring-accent focus-visible:ring-offset-2",
              "focus-visible:ring-offset-page",
              selected
                ? "bg-accent-muted text-accent"
                : "text-secondary hover:bg-surface-hover hover:text-foreground",
            ].join(" ")}
            onClick={() => handlePreferenceChange(themePreference)}
            type="button"
          >
            {themeLabels[themePreference]}
          </button>
        );
      })}
    </div>
  );
}
