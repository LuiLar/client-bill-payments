"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Avoid rendering the toggle on the server to prevent hydration mismatch
    // Render a placeholder that matches the toggle's dimensions
    return <div className="h-8 w-14 rounded-full bg-muted/50" />;
  }

  const isDark = theme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "relative inline-flex h-8 w-14 items-center rounded-full px-1 transition-colors duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        isDark ? "bg-secondary" : "bg-muted"
      )}
      aria-label="Toggle theme"
    >
      <span className="sr-only">Toggle theme</span>

      <Sun
        className={cn(
          "h-5 w-5 text-muted-foreground transition-opacity",
          isDark ? "opacity-100" : "opacity-0"
        )}
      />

      <span
        className={cn(
          "pointer-events-none absolute flex h-6 w-6 transform items-center justify-center rounded-full bg-background shadow-lg ring-0 transition-transform duration-300 ease-in-out",
          isDark ? "translate-x-[26px]" : "translate-x-1"
        )}
      >
        <Sun
          className={cn(
            "h-4 w-4 text-foreground transition-opacity",
            isDark ? "opacity-0" : "opacity-100"
          )}
        />
        <Moon
          className={cn(
            "absolute h-4 w-4 text-foreground transition-opacity",
            isDark ? "opacity-100" : "opacity-0"
          )}
        />
      </span>

      <Moon
        className={cn(
          "ml-auto h-5 w-5 text-muted-foreground transition-opacity",
          isDark ? "opacity-0" : "opacity-100"
        )}
      />
    </button>
  );
}
