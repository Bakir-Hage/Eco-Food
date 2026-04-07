import AuthForm from "./AuthForm";

type Tab = "login" | "signup";

interface AuthModalProps {
  isOpen: boolean;
  tab: Tab;
  onClose: () => void;
  setTab: (tab: Tab) => void;
}

export default function AuthModal({
  isOpen,
  tab,
  onClose,
  setTab,
}: AuthModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 overflow-y-auto p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative bg-[#3a7d44] px-8 pb-7 pt-6">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30"
          >
            ✕
          </button>
          <div className="mb-2 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/20 text-2xl">
              <img
                src="src/assets/Logo.png"
                alt="Eco-Food Logo"
                className="w-13 h-13 "
              />
            </div>
            <span className="text-xl font-semibold text-white">Eco-Food</span>
          </div>
          <p className="text-sm text-white/80">
            Join us in rescuing surplus food and reducing waste
          </p>
        </div>

        <div className="px-8 pb-8 pt-6">
          <div className="mb-6 flex rounded-full bg-gray-100 p-1">
            {(["login", "signup"] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`flex-1 rounded-full py-2.5 text-sm font-medium capitalize transition-all ${
                  tab === t
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {t === "login" ? "Login" : "Sign Up"}
              </button>
            ))}
          </div>
          <AuthForm tab={tab} />
        </div>
      </div>
    </div>
  );
}
