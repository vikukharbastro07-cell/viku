import { useNavigate } from "@tanstack/react-router";

const LINKS = [
  { icon: "🏠", label: "Home", path: "/" },
  { icon: "⭐", label: "Astro Chart", path: "/horoscope" },
  { icon: "🔢", label: "Numerology", path: "/numerology" },
  { icon: "🌟", label: "Horary", path: "/horary" },
];

export default function ServiceNavBar() {
  const navigate = useNavigate();
  const currentPath =
    typeof window !== "undefined" ? window.location.pathname : "/";

  return (
    <nav
      style={{ background: "#1a1f2e" }}
      className="w-full px-3 py-1.5 flex items-center gap-1 overflow-x-auto scrollbar-none"
    >
      {LINKS.map((link) => {
        const isActive =
          link.path === "/"
            ? currentPath === "/"
            : currentPath.startsWith(link.path);
        return (
          <button
            key={link.path}
            type="button"
            data-ocid={`service_nav.${link.label.toLowerCase().replace(/ /g, "_")}.link`}
            onClick={() =>
              navigate({
                to: link.path as "/" | "/horoscope" | "/numerology" | "/horary",
              })
            }
            className="flex items-center gap-1 px-3 py-1 rounded text-xs font-medium whitespace-nowrap transition-colors"
            style={{
              color: isActive ? "#1a1f2e" : "#c8a96e",
              background: isActive ? "#c8a96e" : "transparent",
            }}
          >
            <span>{link.icon}</span>
            <span>{link.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
