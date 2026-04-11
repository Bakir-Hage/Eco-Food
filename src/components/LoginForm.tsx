import { useState, type JSX } from "react";
import { CiLock } from "react-icons/ci";
import { MdEmail } from "react-icons/md";
import { LuEye, LuEyeOff } from "react-icons/lu";
import type { AppDispatch, RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/userThunk";
import { useNavigate } from "react-router-dom";

interface LoginFormProps {
  error: string;
  setError: (error: string) => void;
}

export default function LoginForm({
  error,
  setError,
}: LoginFormProps): JSX.Element {
  const [showPassword, setShowPassword] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector((state: RootState) => state.user.loading);
  const navigate = useNavigate();

  return (
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

              const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i;
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
      {loading ? (
        <div className="flex justify-center w-full py-3.5">
          <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-solid rounded-full border-t-transparent"></div>
        </div>
      ) : (
        <button
          onClick={async () => {
            if (!loginForm.email.trim() || !loginForm.password.trim()) {
              setError("Please enter both email and password.");
            } else {
              setError("");
              try {
                await dispatch(
                  loginUser({
                    email: loginForm.email,
                    password: loginForm.password,
                  }),
                ).unwrap();
                navigate("/app");
              } catch (error: any) {
                if (error === "wrong-password-or-email")
                  setError("The email or password you entered is incorrect.");
              }
            }
          }}
          className="w-full rounded-xl bg-[#3a7d44] py-3.5 text-sm font-semibold text-white hover:bg-[#2f6438] transition-colors"
        >
          Login
        </button>
      )}
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
