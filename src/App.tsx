import React, { useEffect } from "react";
import AppRoutes from "./AppRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  useEffect(() => {
    if (localStorage["theme"]) {
      document.documentElement.setAttribute(
        "data-theme",
        JSON.parse(localStorage["theme"])
      );
    }
  }, []);
  return (
    <React.Fragment>
      <AppRoutes />
      <ToastContainer theme="dark" position="bottom-right" />
    </React.Fragment>
  );
};

export default App;
