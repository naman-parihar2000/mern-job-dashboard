import React from "react";
import { IoSunny, IoMoon } from "react-icons/io5";
import Wrapper from "../assets/wrappers/ThemeToggle";
import { useDashboardContext } from "../pages/DashboardLayout";

const ThemeToggle = () => {
  const { isDarkTheme, toggleDarkTheme } = useDashboardContext();
  return (
    <Wrapper onClick={toggleDarkTheme}>
      {isDarkTheme ? (
        <IoSunny className="toggle-icon" />
      ) : (
        <IoMoon className="toggle-icon" />
      )}
    </Wrapper>
  );
};

export default ThemeToggle;
IoSunny;
IoMoon;
