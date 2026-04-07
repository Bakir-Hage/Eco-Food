import { createBrowserRouter } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import NotFoundPage from "./components/NotFoundPage";
import App from "./App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/app",
    element: <App />,
  },
]);
export default router;
