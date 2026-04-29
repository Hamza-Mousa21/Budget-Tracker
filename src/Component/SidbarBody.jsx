import { useNavigate, useLocation } from "react-router-dom";

const SidebarBody = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const pages = ["Dashboard", "Add expense", "Analytics", "Settings"];

  const ROUTES = [
    "/dashboard",
    "/addExpense",
    "/analytics",
    "/settings",
  ];

  const logos = [
    "bi bi-columns-gap",
    "bi bi-plus-circle",
    "bi bi-bar-chart-line",
    "bi bi-gear",
  ];

  // Derive selected index from current URL — no useState needed
  const selectedIndex = ROUTES.findIndex(route => route === location.pathname);

  return (
    <>
      <div className="row position-fixed">
        <div className="col-12 col-md-12 col-lg-12 d-flex" style={{ height: "89vh", justifyContent: "space-between", alignItems: "center", flexDirection: "column" }}>
          <div style={{ padding: "1.5rem", width: "97%" }}>
            {logos.map((logo, index) => (
              <div key={index}>
                <div
                  className="d-flex gap-3 mb-2"
                  style={{
                    borderRadius: "15px",
                    padding: "0.4rem",
                    backgroundColor: selectedIndex === index ? "#7c3aed" : "transparent",
                    color: selectedIndex === index ? "white" : "#7c3aed",
                    cursor: "pointer",
                    boxShadow: "0 2px 8px rgba(124, 58, 237, 0.15)",
                    width: "200px"
                  }}
                  onClick={() => navigate(ROUTES[index])}
                >
                  <i className={logo} style={{ marginLeft: "1rem" }} />
                  <h5>{pages[index]}</h5>
                </div>
              </div>
            ))}
          </div>
          <div style={{ width: "100%" }}>
            <hr />
            <div className="w-100" style={{ padding: "1.5rem" }}>
              <div className="p-3 d-flex" style={{ borderRadius: "15px", backgroundColor: "var(--card-bg)" }}>
                <div style={{ backgroundColor: "#7c3aed", width: "48px", borderRadius: "50%" }}>
                  <i className="bi bi-coin p-2" style={{ color: "gold", fontSize: "2rem" }} />
                </div>
                <div>
                  <p className="mt-2 ms-2">Track smart</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SidebarBody;