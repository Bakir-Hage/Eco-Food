import { useSelector } from "react-redux";
import "./App.css";

function App() {
  const user = useSelector((state: any) => state.user);
  console.log("User state:", user);
  return (
    <>
      {user.isLoggedIn ? (
        <p>Welcome back, {user.userName || user.email}!</p>
      ) : (
        <p>Please log in to continue.</p>
      )}
    </>
  );
}

export default App;
