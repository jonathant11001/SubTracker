import { lazy } from "react";
import { Navigate } from "react-router-dom";

const Landing = lazy(() => import("../components/Landing"));
const About = lazy(() => import("../components/About"));
const Login = lazy(() => import("../components/Login"));
const SignUp = lazy(() => import("../components/SignUp"));
const ForgotPassword = lazy(() => import("../components/ForgotPassword"));
const Home = lazy(() => import("../components/Home"));
const SubscriptionList = lazy(() => import("../components/SubscriptionList"));
const Account = lazy(() => import("../components/Account"));

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
    path: "/signUp",
    element: <SignUp />,
  },
  {
    path: "/forgotPassword",
    element: <ForgotPassword />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/subscription",
    element: <SubscriptionList />,
  },
  {
    path: "/account",
    element: <Account />,
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
];

export default routes;