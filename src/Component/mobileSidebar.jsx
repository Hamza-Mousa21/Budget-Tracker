import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Mode from "./Mode";
const pages = ["Dashboard", "Add expense", "Analytics", "Settings"];
const logos = [
  "bi bi-columns-gap",
  "bi bi-plus-circle",
  "bi bi-bar-chart-line",
  "bi bi-gear",
];
const routes = ["/dashboard", "/addExpense", "/analytics", "/settings"];

const MobileSidebar = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

   const navigate=useNavigate()
 const handleSelect = (index) => {
    setSelectedIndex(index);
    setIsOpen(false);
    navigate(routes[index]); // ✅ navigate to the route
};
 

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(true)}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "#7c3aed",
          fontSize: "1.8rem",
          padding: "0.3rem 0.6rem",
        }}
      >
        <i className="bi bi-list" />
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.4)",
            zIndex: 1040,
            backdropFilter: "blur(2px)",
          }}
        />
      )}

      {/* Sidebar Drawer */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          width: "270px",
          backgroundColor: "#fff",
          zIndex: 1050,
          transform: isOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.3s ease",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          boxShadow: "4px 0 20px rgba(124,58,237,0.15)",
        }}
      >
        {/* Header */}
        <div>
          <div
            className="d-flex justify-content-between align-items-center px-4 py-3"
            style={{ borderBottom: "1px solid #ede9fe" }}
          >
            <span
              className="fw-bold fs-5"
              style={{
                background: "linear-gradient(135deg, #7c3aed, #ec4899)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Budget Tracker
            </span>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#7c3aed",
                fontSize: "1.4rem",
              }}
            >
              <i className="bi bi-x-lg" />
            </button>
          </div>

          {/* Nav Items */}
          <div style={{ padding: "1.5rem 1rem" }}>
            {logos.map((logo, index) => (
              <div
                key={index}
                onClick={() => handleSelect(index)}
                className="d-flex align-items-center gap-3 mb-2"
                style={{
                  borderRadius: "12px",
                  padding: "0.6rem 1rem",
                  backgroundColor:
                    selectedIndex === index ? "#7c3aed" : "transparent",
                  color: selectedIndex === index ? "white" : "#7c3aed",
                  cursor: "pointer",
                  boxShadow: "0 2px 8px rgba(124,58,237,0.1)",
                  transition: "all 0.2s ease",
                }}
              >
                <i className={logo} style={{ fontSize: "1.2rem" }} />
                <span className="fw-semibold">{pages[index]}</span>
              </div>
            ))}
          </div>
        </div>

            
        {/* Footer */}
        <div style={{ padding: "1.5rem" }}>
          
            <Mode></Mode>
         
          <hr />
          <div
            className="p-3 d-flex align-items-center gap-2"
            style={{ borderRadius: "15px", backgroundColor: "#e5daf9" }}
          >
            <div
              style={{
                backgroundColor: "#7c3aed",
                width: "42px",
                height: "42px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <i
                className="bi bi-coin"
                style={{ color: "gold", fontSize: "1.4rem" }}
              />
            </div>
            <p className="mb-0 fw-medium" style={{ color: "#7c3aed" }}>
              Track smart
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileSidebar;