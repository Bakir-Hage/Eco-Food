import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { LOGIN } from "./features/userSlice";

function App() {
  const user = useSelector((state: any) => state.user);
  console.log("User state:", user); // Debugging log
  const dispatch = useDispatch();
  return (
    <>
      {user.isLoggedIn ? (
        <p>Welcome back, Bakir!</p>
      ) : (
        <p>Please log in to continue.</p>
      )}
      <button onClick={() => dispatch(LOGIN())}>Log In</button>
    </>
  );
}

export default App;
