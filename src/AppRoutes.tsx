import React, { Suspense } from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Layout from "./layout/layout";
import Loading from "./shared/components/loading";

const AppRoutes = () => {
  const WeatherView = React.lazy(() => import("./views/weatherView"));
  const FavoritesView = React.lazy(() => import("./views/favoritesView"));
  const SettingsView = React.lazy(() => import("./views/settingsView"));

  return (
    // must add suspense while using lazy loading
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <Suspense fallback={<Loading />}>
                <WeatherView />
              </Suspense>
            }
          />
          <Route
            path="/favorites"
            element={
              <Suspense fallback={<Loading />}>
                <FavoritesView />
              </Suspense>
            }
          />
          <Route
            path="/settings"
            element={
              <Suspense fallback={<Loading />}>
                <SettingsView />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
