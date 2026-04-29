import { useDarkMode } from "./DarkModeContext";

const Mode = () => {
  const { isDark, toggleDarkMode } = useDarkMode();

  return (
    <div className="d-flex">
      <div>
        {!isDark && (
          <i
            className="bi bi-brightness-high me-3"
            onClick={toggleDarkMode}
            style={{
              fontSize: "2rem",
              border: "1px solid lightgray",
              backgroundColor: "#f8f7f7",
              borderRadius: "8px",
              padding: "6px",
              cursor: "pointer",
              color: "#7c3aed",
            }}
          ></i>
        )}
        {isDark && (
          <i
            className="bi bi-moon me-3"
            onClick={toggleDarkMode}
            style={{
              fontSize: "2rem",
              border: "1px solid lightgray",
              backgroundColor: "#f8f7f7",
              borderRadius: "8px",
              padding: "6px",
              cursor: "pointer",
              color: "#7c3aed",
            }}
          ></i>
        )}
      </div>
      <div style={{ paddingRight: "1.2rem" }}>
        <i
          className="bi bi-person"
          style={{
            fontSize: "2rem",
            border: "1px solid lightgray",
            backgroundColor: "#f8f7f7",
            borderRadius: "8px",
            padding: "6px",
            cursor: "pointer",
            color: "#7c3aed",
          }}
        ></i>
      </div>
    </div>
  );
};

export default Mode;