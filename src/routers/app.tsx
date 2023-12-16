import {
  createBrowserRouter,
  ScrollRestoration,
  Outlet,
} from "react-router-dom";
import Index from "../pages/Index";
import Sample from "../pages/Sample";

const Layout = () => {
  return (
    <>
      <ScrollRestoration />
      <Outlet />
    </>
  );
};

export const children = () => {
  const isLocalhost = document.location.hostname === "localhost";

  const catalogRoutes = isLocalhost ? [] : [];

  const publicRoutes = [
    { path: "/", element: <Index /> },
    { path: "/sample", element: <Sample /> },
  ];

  return [...catalogRoutes, ...publicRoutes];
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: children(),
  },
]);
