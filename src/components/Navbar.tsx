import { Home, Store } from "lucide-react";
import { CiLogout } from "react-icons/ci";
import { LuShoppingBag } from "react-icons/lu";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../features/userSlice";

interface NavbarProps {
  cartItemCount?: number;
}

export default function Navbar({ cartItemCount = 0 }: NavbarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const navLinks = [
    { to: "/marketplace", label: "Marketplace", icon: Home },
    { to: "/vendor", label: "Vendor Dashboard", icon: Store },
  ];
  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="container mx-auto flex h-20 items-center justify-between gap-4 px-4">
        <div className="flex items-center gap-3">
          <img
            src="/Logo.png"
            alt="Eco-Food Logo"
            className="h-10 w-10 rounded-full object-cover"
          />
          <div>
            <div className="text-lg font-semibold text-slate-900">Eco-Food</div>
            <div className="text-xs text-slate-500">Rescue surplus food</div>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`flex items-center gap-2 text-sm font-medium transition ${
                isActive(link.to)
                  ? "text-emerald-800"
                  : "text-slate-600 hover:text-emerald-700"
              }`}
            >
              <link.icon className="h-4 w-4" />
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-4">
          <button
            className="relative"
            // onClick={onOpenCart}
          >
            <LuShoppingBag className="w-7 h-7" />
            {cartItemCount > 0 && (
              <span className="absolute -top-4 -right-4 flex h-5 items-center justify-center rounded-full bg-emerald-800 px-1.5 text-[10px] font-bold text-white">
                {cartItemCount}
              </span>
            )}
          </button>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                dispatch(logout());
                navigate("/");
              }}
              className="inline-flex items-center gap-2 rounded-full bg-red-800 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-red-900"
            >
              <CiLogout className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
