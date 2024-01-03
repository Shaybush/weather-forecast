import React, { Suspense } from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Layout from "./layout/layout";

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
              <Suspense fallback={<div>Loading...</div>}>
                <WeatherView />
              </Suspense>
            }
          />
          <Route
            path="/favorites"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <FavoritesView />
              </Suspense>
            }
          />
          <Route
            path="/settings"
            element={
              <Suspense fallback={<div>Loading...</div>}>
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
