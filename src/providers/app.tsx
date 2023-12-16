import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "../routers/app";

export const AppProvider: React.FC = () => {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
};
