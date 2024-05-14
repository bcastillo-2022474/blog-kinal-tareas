import { IconMoon, IconSun } from "@tabler/icons-react";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const bodyRef = useRef<HTMLElement | null>(null);
  if (!bodyRef.current) bodyRef.current = document.querySelector("body");
  const isDarkRef = useRef(false);
  if (!isDarkRef.current)
    isDarkRef.current = bodyRef.current!.classList.contains("dark");
  const [isDark, setIsDark] = useState(isDarkRef.current);

  return (
    <nav className="flex justify-between gap-5 py-5 px-10 dark:text-neutral-100 text-slate-700 text-lg sticky top-0 z-10 backdrop-blur-lg">
      <ul className="flex gap-3">
        <Link to={"/"} className="cursor-pointer hover:text-rose-300">
          Home
        </Link>
        <li className="cursor-pointer hover:text-rose-300">Posts</li>
      </ul>
      <div
        onClick={() => {
          if (!isDark) bodyRef.current!.classList.add("dark");
          else bodyRef.current!.classList.remove("dark");
          setIsDark(!isDark);
        }}
      >
        {isDark ? (
          <IconMoon className="cursor-pointer hover:text-rose-300" />
        ) : (
          <IconSun className="cursor-pointer hover:text-rose-300" />
        )}
      </div>
    </nav>
  );
}
