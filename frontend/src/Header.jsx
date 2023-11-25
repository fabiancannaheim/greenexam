import React, { useEffect } from "react";
import "./colorModeToggler.js";

const Header = () => {
  //   const getStoredTheme = () => localStorage.getItem("theme");
  //   const setStoredTheme = (theme) => localStorage.setItem("theme", theme);

  //   const getPreferredTheme = () => {
  //     const storedTheme = getStoredTheme();
  //     if (storedTheme) {
  //       return storedTheme;
  //     }

  //     return window.matchMedia("(prefers-color-scheme: dark)").matches
  //       ? "dark"
  //       : "light";
  //   };

  //   const setTheme = (theme) => {
  //     if (
  //       theme === "auto" &&
  //       window.matchMedia("(prefers-color-scheme: dark)").matches
  //     ) {
  //       document.documentElement.setAttribute("data-bs-theme", "dark");
  //     } else {
  //       document.documentElement.setAttribute("data-bs-theme", theme);
  //     }
  //   };

  //   const showActiveTheme = (theme, focus = false) => {
  //     const themeSwitcher = document.querySelector("#bd-theme");

  //     if (!themeSwitcher) {
  //       return;
  //     }

  //     const themeSwitcherText = document.querySelector("#bd-theme-text");
  //     const activeThemeIcon = document.querySelector("i.theme-icon-active");
  //     const btnToActive = document.querySelector(
  //       `[data-bs-theme-value="${theme}"]`
  //     );
  //     const iconOfActiveBtn = btnToActive
  //       .querySelector("i")
  //       .getAttribute("data-icon");

  //     document.querySelectorAll("[data-bs-theme-value]").forEach((element) => {
  //       element.classList.remove("active");
  //       element.setAttribute("aria-pressed", "false");
  //     });

  //     btnToActive.classList.add("active");
  //     btnToActive.setAttribute("aria-pressed", "true");
  //     let currentIcon = activeThemeIcon.getAttribute("data-active-icon");
  //     activeThemeIcon.classList.remove(`bi-${currentIcon}`);
  //     activeThemeIcon.setAttribute("data-active-icon", iconOfActiveBtn);
  //     activeThemeIcon.classList.add(`bi-${iconOfActiveBtn}`);
  //     const themeSwitcherLabel = `${themeSwitcherText.textContent} (${btnToActive.dataset.bsThemeValue})`;
  //     themeSwitcher.setAttribute("aria-label", themeSwitcherLabel);

  //     if (focus) {
  //       themeSwitcher.focus();
  //     }
  //   };

  //   useEffect(() => {
  //     setTheme(getPreferredTheme());

  //     const handleDarkModeChange = () => {
  //       const storedTheme = getStoredTheme();
  //       if (storedTheme !== "light" && storedTheme !== "dark") {
  //         setTheme(getPreferredTheme());
  //       }
  //     };

  //     window
  //       .matchMedia("(prefers-color-scheme: dark)")
  //       .addEventListener("change", handleDarkModeChange);

  //     showActiveTheme(getPreferredTheme());

  //     document.querySelectorAll("[data-bs-theme-value]").forEach((toggle) => {
  //       toggle.addEventListener("click", () => {
  //         const theme = toggle.getAttribute("data-bs-theme-value");
  //         setStoredTheme(theme);
  //         setTheme(theme);
  //         showActiveTheme(theme, true);
  //       });
  //     });

  //     return () => {
  //       window
  //         .matchMedia("(prefers-color-scheme: dark)")
  //         .removeEventListener("change", handleDarkModeChange);
  //     };
  //   }, []);

  //   const handleThemeChange = (theme) => {
  //     // Add your logic for theme change here
  //     console.log(`Theme changed to ${theme}`);
  //   };

  return (
    <header>
      <nav className="navbar navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow mb-3">
        <div className="container">
          <a href="/" className="navbar-brand">
            GreenExam
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target=".navbar-collapse"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="navbar-collapse collapse d-sm-inline-flex justify-content-between">
            <ul className="navbar-nav flex-grow-1">
              <li className="nav-item">
                <a href="/" className="nav-link">
                  Exam
                </a>
              </li>
            </ul>
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <button
                  className="btn btn-link nav-link py-2 px-0 px-lg-2 dropdown-toggle d-flex align-items-center"
                  id="bd-theme"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i
                    className="bi bi-moon-stars-fill my-1 theme-icon-active"
                    data-active-icon="moon-stars-fill"
                  ></i>
                  <span className="d-lg-none ms-2" id="bd-theme-text">
                    Toggle theme
                  </span>
                </button>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="bd-theme-text"
                >
                  <li>
                    <button
                      type="button"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-theme-value="light"
                      aria-pressed="false"
                      //   onClick={() => handleThemeChange("light")}
                    >
                      <i
                        className="bi bi-sun-fill me-2 opacity-50 theme-icon"
                        data-icon="sun-fill"
                      ></i>
                      Light
                      <i className="bi bi-check2 ms-auto d-none"></i>
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      className="dropdown-item d-flex align-items-center active"
                      data-bs-theme-value="dark"
                      aria-pressed="true"
                      //   onClick={() => handleThemeChange("dark")}
                    >
                      <i
                        className="bi bi-moon-stars-fill me-2 opacity-50 theme-icon"
                        data-icon="moon-stars-fill"
                      ></i>
                      Dark
                      <i className="bi bi-check2 ms-auto d-none"></i>
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-theme-value="auto"
                      aria-pressed="false"
                      //   onClick={() => handleThemeChange("auto")}
                    >
                      <i
                        className="bi bi-circle-half me-2 opacity-50 theme-icon"
                        data-icon="circle-half"
                      ></i>
                      Auto
                      <i className="bi bi-check2 ms-auto d-none"></i>
                    </button>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
