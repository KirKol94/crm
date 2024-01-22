import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import "../styles/index.scss";
import { ROUTER_PATH } from "@/shared/const/path/routerPath";
import { AuthFormType } from "@/features/AuthForm";
import { RootProvider } from "../providers/RootProvider";

const AuthPage = lazy(() => import("@/pages/AuthPage"));
const HomePage = lazy(() => import("@/pages/HomePage"));

export const App = () => {
  return (
    <RootProvider>
      <Routes>
        <Route
          index
          element={
            <Suspense fallback={<>loading...</>}>
              <HomePage />
            </Suspense>
          }
        />
        <Route
          path={ROUTER_PATH.LOGIN}
          element={
            <Suspense fallback={<>loading...</>}>
              <AuthPage type={AuthFormType.LOGIN} />
            </Suspense>
          }
        />
        <Route
          path={ROUTER_PATH.REGISTER}
          element={
            <Suspense fallback={<>loading...</>}>
              <AuthPage type={AuthFormType.REGISTER} />
            </Suspense>
          }
        />
        <Route path="*" element={<>page is not found</>} />
      </Routes>
    </RootProvider>
  );
};
