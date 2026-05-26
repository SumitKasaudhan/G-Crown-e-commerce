import {
  Search,
  Heart,
  ShoppingCart,
  MapPin,
  User,
  Menu,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate, NavLink as RouterNavLink, useLocation } from "react-router-dom"; // Updated imports
import Logo from "../assets/logo.svg";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext";

export default function Navbar() {
  const [visible, setVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // NEW: search state
  const lastScrollY = useRef(0);
  const navigate = useNavigate();
  const location = useLocation(); // Useful if you need to check paths manually
  const { getCartCount } = useCart();
  const { favorites } = useFavorites();

  /* ---------------- Scroll hide / show ---------------- */
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (Math.abs(currentY - lastScrollY.current) < 10) return;
      if (currentY > lastScrollY.current && currentY > 80) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  // Helper to check if a link is active for manual logic (like mobile icons)
  const isActive = (path) => location.pathname === path;

  // NEW: handle search submit
  const handleSearch = () => {
    if (searchQuery.trim() === "") return;
    navigate(`/searchProduct?q=${encodeURIComponent(searchQuery.trim())}`);
    setSearchQuery(""); // optional: clear search bar after submit
  };

  return (
    <>
      {/* NAVBAR */}
      <header
        className={`fixed top-0 left-0 w-full z-50 bg-[#0F231C]
        transition-transform duration-300 ease-out
        ${visible ? "translate-y-0" : "-translate-y-full"}`}
      >
        <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-10">
          <div className="relative flex h-22 items-center justify-between">
            {/* MOBILE LEFT (Menu) */}
            <button
              aria-label="Open menu"
              onClick={() => setMenuOpen(true)}
              className="lg:hidden rounded-md p-2 text-white hover:bg-white/10"
            >
              <Menu size={26} />
            </button>

            {/* DESKTOP SEARCH */}
            <div className="hidden lg:flex w-[320px] xl:w-105 items-center rounded-full bg-[#FBF6EA] px-4 py-2">
              <input
                type="text"
                placeholder="Search"
                value={searchQuery} // NEW
                onChange={(e) => setSearchQuery(e.target.value)} // NEW
                onKeyDown={(e) => e.key === "Enter" && handleSearch()} // NEW: enter key
                className=" w-full bg-transparent text-sm text-[#001302] outline-none placeholder:text-[#00140a] placeholder:text-lg placeholder:text-center"
              />
              <Search
                size={18}
                className="text-[#00140a] shrink-0 mr-5"
                onClick={handleSearch} // UPDATED: navigate with query
              />
            </div>

            {/* LOGO */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 lg:top-3/4">
              <img
                src={Logo}
                alt="Graphura Jewellery"
                className="h-16 md:h-18 lg:h-22 w-auto cursor-pointer"
                onClick={() => navigate("/")}
              />
            </div>

            {/* ICONS (Mobile & Desktop shared logic) */}
            <div className="flex items-center gap-2 lg:gap-3">
              <IconButton
                Icon={Heart}
                active={isActive("/favorites")}
                onClick={() => { navigate("/favorites"); window.scrollTo(0,0); }}
                badge={favorites.length}
              />
              <IconButton
                Icon={ShoppingCart}
                active={isActive("/cart")}
                onClick={() => { navigate("/cart"); window.scrollTo(0,0); }}
                badge={getCartCount()}
              />
              <div className="hidden lg:flex gap-3">
                <IconButton
                  Icon={MapPin}
                  active={isActive("/track-order")}
                  onClick={() => { navigate("/track-order"); window.scrollTo(0,0); }}
                />
                <IconButton
                  Icon={User}
                  active={isActive("/profile")}
                  onClick={() => { navigate("/profile"); window.scrollTo(0,0); }}
                />
              </div>
            </div>
          </div>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center justify-between pb-4 text-base xl:text-lg">
            <div className="flex gap-30 xl:gap-40">
              <CustomNavLink label="Home" href="/" />
              <CustomNavLink label="About Us" href="/about" />
              <CustomNavLink label="Collections" href="/collections" />
            </div>
            <div className="flex gap-30 xl:gap-40">
              <CustomNavLink label="Occasions" href="/occasions" />
              <CustomNavLink label="New Arrivals" href="/new-arrivals" />
              <CustomNavLink label="Store" href="/store" />
            </div>
          </nav>
        </div>
      </header>

      {/* Overlay */}
      <div
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity
        ${menuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
      />

      {/* Drawer */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-[85%] max-w-[320px]
        bg-[#0F231C] text-white transform transition-transform duration-300
        ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-5 h-22">
          <img src={Logo} alt="Logo" className="h-10" />
          <button onClick={() => setMenuOpen(false)}>
            <X size={26} />
          </button>
        </div>

        <nav className="px-6 pt-6 space-y-6 text-lg">
          {[
            { label: "Home", href: "/" },
            { label: "About Us", href: "/about" },
            { label: "Collections", href: "/collections" },
            { label: "Occasions", href: "/occasions" },
            { label: "New Arrivals", href: "/new-arrivals" },
            { label: "Store", href: "/store" },
            { label: "Track Order", href: "/track-order" },
          ].map((item) => (
            <RouterNavLink
              key={item.label}
              to={item.href}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) => 
                `block transition-colors ${isActive ? "text-white font-bold" : "text-[#CBA135] hover:text-white"}`
              }
            >
              {item.label}
            </RouterNavLink>
          ))}
        </nav>

        {/* Drawer Footer */}
        <div className="absolute bottom-6 left-0 w-full px-6">
          <div className="flex justify-between">
            <MobileAction
              Icon={Heart}
              label="Wishlist"
              active={isActive("/favorites")}
              onClick={() => { setMenuOpen(false); navigate("/favorites"); }}
              badge={favorites.length}
            />
            <MobileAction
              Icon={ShoppingCart}
              label="Cart"
              active={isActive("/cart")}
              onClick={() => { setMenuOpen(false); navigate("/cart"); }}
              badge={getCartCount()}
            />
            <MobileAction
              Icon={User}
              label="Account"
              active={isActive("/profile")}
              onClick={() => { setMenuOpen(false); navigate("/profile"); }}
            />
          </div>
        </div>
      </aside>
    </>
  );
}

/* ---------------- Updated Components ---------------- */

function IconButton({ Icon, onClick, badge = 0, active = false }) {
  return (
    <button
      onClick={onClick}
      className={`relative flex h-10 w-10 items-center justify-center rounded-full transition-colors cursor-pointer
      ${active ? "bg-[#CBA135] text-white" : "bg-[#FBF6EA] text-[#0F231C] hover:bg-[#E8DDC4]"}`}
    >
      <Icon size={18} />
      {badge > 0 && (
        <span className={`absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-white
        ${active ? "bg-[#0F231C]" : "bg-[#CBA135]"}`}>
          {badge > 9 ? "9+" : badge}
        </span>
      )}
    </button>
  );
}

function MobileAction({ Icon, label, onClick, badge = 0, active = false }) {
  return (
    <button onClick={onClick} className="relative flex flex-col items-center gap-1 text-sm">
      <div className={`relative flex h-12 w-12 items-center justify-center rounded-full transition-colors
        ${active ? "bg-[#CBA135] text-white" : "bg-[#FBF6EA] text-[#0F231C]"}`}>
        <Icon size={20} />
        {badge > 0 && (
          <span className={`absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-white
          ${active ? "bg-[#0F231C]" : "bg-[#CBA135]"}`}>
            {badge > 9 ? "9+" : badge}
          </span>
        )}
      </div>
      <span className={active ? "text-white font-bold" : "text-[#CBA135]"}>{label}</span>
    </button>
  );
}

// Renamed from NavLink to CustomNavLink to avoid conflict with RouterNavLink
function CustomNavLink({ label, href }) {
  return (
    <RouterNavLink
      to={href}
      className={({ isActive }) => `
        relative transition-all duration-300
        ${isActive ? "text-white font-medium" : "text-[#CBA135] hover:text-white"}
        after:absolute after:left-0 after:-bottom-1 after:h-0.5
        after:bg-[#CBA135] after:transition-all after:duration-300
        ${isActive ? "after:w-full" : "after:w-0 hover:after:w-full"}
      `}
    >
      {label}
    </RouterNavLink>
  );
}
