import { useEffect } from "react";
import AppRoutes from "./AppRoutes";

const App = () => {
  useEffect(() => {
    if (localStorage["theme"]) {
      document.documentElement.setAttribute(
        "data-theme",
        JSON.parse(localStorage["theme"])
      );
    }
  }, []);
  return <AppRoutes />;
};

export default App;
