import { Phone } from "lucide-react";
import { useState, type JSX } from "react";
import { CiLock } from "react-icons/ci";
import { FcGoogle } from "react-icons/fc";
import { IoPersonSharp } from "react-icons/io5";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { MdEmail } from "react-icons/md";

type Tab = "login" | "signup";
interface AuthFormProps {
  tab: Tab;
}

export default function AuthForm({ tab }: AuthFormProps): JSX.Element {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  return (
    <>
      {tab === "login" ? (
        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Email
            </label>
            <div className="flex items-center gap-2 rounded-xl bg-gray-100 px-4">
              <MdEmail />
              <input
                type="email"
                placeholder="you@example.com"
                value={loginForm.email}
                onChange={(e) => {
                  const value = e.target.value;
                  setLoginForm({ ...loginForm, email: value });

                  const emailRegex =
                    /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i;
                  if (value && !emailRegex.test(value)) {
                    setError("Please enter a valid email address.");
                  } else {
                    setError("");
                  }
                }}
                className="flex-1 bg-transparent py-3 text-sm outline-none placeholder:text-gray-400"
              />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="flex items-center gap-2 rounded-xl bg-gray-100 px-4">
              <CiLock />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={loginForm.password}
                onChange={(e) =>
                  setLoginForm({ ...loginForm, password: e.target.value })
                }
                className="flex-1 bg-transparent py-3 text-sm outline-none placeholder:text-gray-400"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <LuEye className="text-2xl" />
                ) : (
                  <LuEyeOff className="text-2xl" />
                )}
              </button>
            </div>
          </div>
          <button
            onClick={() => {
              if (!loginForm.email.trim() || !loginForm.password.trim()) {
                setError("Please enter both email and password.");
              } else {
                setError("");
                console.log("Logging in with:", loginForm);
              }
            }}
            className="w-full rounded-xl bg-[#3a7d44] py-3.5 text-sm font-semibold text-white hover:bg-[#2f6438] transition-colors"
          >
            Login
          </button>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Full name
            </label>
            <div className="flex items-center gap-2 rounded-xl bg-gray-100 px-4">
              <IoPersonSharp />
              <input
                type="text"
                placeholder="Bakir"
                value={signupForm.name}
                onChange={(e) => {
                  const onlyLetters = e.target.value.replace(
                    /[^a-zA-Z\s\u0600-\u06FF]/g,
                    "",
                  );
                  setSignupForm({ ...signupForm, name: onlyLetters });
                }}
                className="flex-1 bg-transparent py-3 text-sm outline-none placeholder:text-gray-400"
              />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <div className="flex items-center gap-2 rounded-xl bg-gray-100 px-4">
              <Phone />
              <input
                type="text"
                placeholder="053xxxxxxxs"
                value={signupForm.phone}
                onChange={(e) => {
                  const onlyDigits = e.target.value.replace(/\D/g, "");
                  if (onlyDigits.length <= 10) {
                    setSignupForm({ ...signupForm, phone: onlyDigits });
                  }
                }}
                className="flex-1 bg-transparent py-3 text-sm outline-none placeholder:text-gray-400"
              />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Email
            </label>
            <div className="flex items-center gap-2 rounded-xl bg-gray-100 px-4">
              <MdEmail />
              <input
                type="email"
                placeholder="you@example.com"
                value={loginForm.email}
                onChange={(e) => {
                  const value = e.target.value;
                  setLoginForm({ ...loginForm, email: value });

                  const emailRegex =
                    /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i;
                  if (value && !emailRegex.test(value)) {
                    setError("Please enter a valid email address.");
                  } else {
                    setError("");
                  }
                }}
                className="flex-1 bg-transparent py-3 text-sm outline-none placeholder:text-gray-400"
              />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="flex items-center gap-2 rounded-xl bg-gray-100 px-4">
              <CiLock />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={loginForm.password}
                onChange={(e) =>
                  setLoginForm({ ...loginForm, password: e.target.value })
                }
                className="flex-1 bg-transparent py-3 text-sm outline-none placeholder:text-gray-400"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <LuEye className="text-2xl" />
                ) : (
                  <LuEyeOff className="text-2xl" />
                )}
              </button>
            </div>
          </div>

          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          <button
            onClick={() => {
              if (
                !signupForm.name.trim() ||
                !signupForm.phone.trim() ||
                !signupForm.email.trim() ||
                !signupForm.password.trim()
              ) {
                setError("Please fill in all fields.");
              } else {
                setError("");
                console.log("Signing up with:", signupForm);
              }
            }}
            className="w-full rounded-xl bg-[#3a7d44] py-3.5 text-sm font-semibold text-white hover:bg-[#2f6438] transition-colors"
          >
            Create account
          </button>
        </div>
      )}
      <div className="my-5 flex items-center gap-3">
        <div className="h-px flex-1 bg-gray-200" />
        <span className="text-xs tracking-widest text-gray-400">
          OR CONTINUE WITH
        </span>
        <div className="h-px flex-1 bg-gray-200" />
      </div>
      <button className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-200 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
        <FcGoogle className="text-2xl" />
        Continue with Google
      </button>
    </>
  );
}
