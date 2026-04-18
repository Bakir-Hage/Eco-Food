import { createBrowserRouter } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import NotFoundPage from "./components/NotFoundPage";
import App from "./App";
import MarketPlace from "./components/MarketPlace";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/app",
    element: <App />,
    children: [
      {
        index: true,
        element: <MarketPlace />,
      },
      {
        path: "MarketPlace",
        element: <MarketPlace />,
      },
    ],
  },
]);
export default router;
