import { Phone } from "lucide-react";
import { useState, type JSX } from "react";
import { CiLock } from "react-icons/ci";
import { IoPersonSharp } from "react-icons/io5";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { MdEmail } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../features/userThunk";
import type { AppDispatch, RootState } from "../store";

interface SignupFormProps {
  error: string;
  setError: (error: string) => void;
}

export default function SignupForm({
  error,
  setError,
}: SignupFormProps): JSX.Element {
  const [showPassword, setShowPassword] = useState(false);
  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector((state: RootState) => state.user.loading);

  return (
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
            value={signupForm.email}
            onChange={(e) => {
              const value = e.target.value;
              setSignupForm({ ...signupForm, email: value });

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
            value={signupForm.password}
            onChange={(e) =>
              setSignupForm({ ...signupForm, password: e.target.value })
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
      {loading ? (
        <div className="flex justify-center w-full py-3.5">
          <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-solid rounded-full border-t-transparent"></div>
        </div>
      ) : (
        <button
          onClick={async () => {
            if (
              !signupForm.name.trim() ||
              !signupForm.phone.trim() ||
              !signupForm.email.trim() ||
              !signupForm.password.trim()
            ) {
              setError("Please fill in all fields.");
            } else {
              setError("");
              try {
                await dispatch(
                  signupUser({
                    email: signupForm.email,
                    password: signupForm.password,
                    phoneNumber: signupForm.phone,
                    userName: signupForm.name,
                  }),
                ).unwrap();
                // navigate("/app");
              } catch (error: any) {
                if (error === "email-already-in-use")
                  setError("An account with this email already exists.");
                else if (error === "phone-already-in-use")
                  setError("An account with this phone number already exists.");
                else setError("Something went wrong. Please try again.");
              }
            }
          }}
          className="w-full rounded-xl bg-[#3a7d44] py-3.5 text-sm font-semibold text-white hover:bg-[#2f6438] transition-colors"
        >
          Create account
        </button>
      )}
    </div>
  );
}
