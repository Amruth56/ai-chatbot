import { useTheme } from "../../context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      className="cursor-pointer text-sm px-3 py-1 rounded border transition-colors hover:opacity-80 border-slate-200 dark:border-slate-700"
    >
      {theme === "light" ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}
