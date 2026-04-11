import { type JSX } from "react";
import { FcGoogle } from "react-icons/fc";
import { signInWithGoogle } from "../Config/firebaseLogic";
import { useNavigate } from "react-router-dom";

interface OAuthSectionProps {
  tab: "login" | "signup";
}

export default function GoogleAuthSection({
  tab,
}: OAuthSectionProps): JSX.Element {
  const navigate = useNavigate();

  return (
    <>
      <div className="my-5 flex items-center gap-3">
        <div className="h-px flex-1 bg-gray-200" />
        <span className="text-xs tracking-widest text-gray-400">
          OR CONTINUE WITH
        </span>
        <div className="h-px flex-1 bg-gray-200" />
      </div>
      <button
        onClick={async () => {
          await signInWithGoogle(tab);
          navigate("/app", { replace: true });
        }}
        className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-200 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
      >
        <FcGoogle className="text-2xl" />
        Continue with Google
      </button>
    </>
  );
}
