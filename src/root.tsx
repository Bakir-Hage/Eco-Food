import { createBrowserRouter } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import NotFoundPage from "./components/NotFoundPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <NotFoundPage />,
  },
]);
export default router;
