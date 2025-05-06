import { lazy } from "react";
import { Navigate } from "react-router-dom";

const Landing = lazy(() => import("../components/Landing"));
const About = lazy(() => import("../components/About"));
const Login = lazy(() => import("../components/Login"));

const routes = [
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
];

export default routes;