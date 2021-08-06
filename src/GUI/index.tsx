import React from "react";
import ReactDOM from "react-dom";
import FigureSidebar from "./FigureSidebar";
import SettingsSidebar from "./SettingsSidebar";

export const renderGUI = () => {
  ReactDOM.render(
    <React.StrictMode>
      <FigureSidebar />
    </React.StrictMode>,
    document.getElementById("figure-sidebar")
  );
  ReactDOM.render(
    <React.StrictMode>
      <SettingsSidebar />
    </React.StrictMode>,
    document.getElementById("settings-sidebar")
  );
};
