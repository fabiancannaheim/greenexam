import "./colorModeToggler";

export const Header = () => {
  return (
    <>
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
                    type="button"
                    aria-expanded="false"
                    data-bs-toggle="dropdown"
                    data-bs-display="static"
                    aria-label="Toggle theme (dark)"
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
    </>
  );
};
