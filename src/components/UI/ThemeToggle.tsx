import { useTheme } from "../../context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      className="cursor-pointer text-sm px-3 py-1 rounded border hover:bg-gray-100 dark:hover:bg-gray-700"
    >
      {theme === "light" ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}
