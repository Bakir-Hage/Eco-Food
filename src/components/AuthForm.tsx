import { useState, type JSX } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import GoogleAuthSection from "./GoogleAuthSection";

type Tab = "login" | "signup";
interface AuthFormProps {
  tab: Tab;
}

export default function AuthForm({ tab }: AuthFormProps): JSX.Element {
  const [error, setError] = useState("");

  return (
    <>
      {tab === "login" ? (
        <LoginForm error={error} setError={setError} />
      ) : (
        <SignupForm error={error} setError={setError} />
      )}
      <GoogleAuthSection tab={tab} />
    </>
  );
}
