import { useNavigate } from "react-router-dom";

const cardHoverStyle = `
  .feature-card {
    transition: transform 0.25s ease, box-shadow 0.25s ease;
    cursor: default;
  }
  .feature-card:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 16px 40px rgba(124,58,237,0.18) !important;
  }
`;

export default function Introduction() {
  const navigate = useNavigate();

  const goToLogin = () => navigate("/login");

  return (
    <>
      {/* ===== Bootstrap CDN - include in index.html ===== */}
      {/* <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"> */}
      {/* <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" rel="stylesheet"> */}

      <style>{cardHoverStyle}</style>
      <div
        style={{ backgroundColor: "#eef0f8", minHeight: "100vh", fontFamily: "'Segoe UI', sans-serif" }}
      >
        {/* ===== NAVBAR ===== */}
        <nav
          className="navbar navbar-light bg-white px-2 py-0"
          style={{
            position: "sticky",
            top: 0,
            zIndex: 1000,
            boxShadow: "0 2px 20px rgba(124,58,237,0.10), 0 1px 4px rgba(0,0,0,0.06)",
            borderBottom: "1.5px solid rgba(124,58,237,0.08)",
            minHeight: 68,
          }}
        >
          <div className="container d-flex align-items-center justify-content-between" style={{ minHeight: 68 }}>
            {/* Logo */}
            <a className="navbar-brand d-flex align-items-center gap-2 fw-bold mb-0" href="#">
              <span
                className="d-flex align-items-center justify-content-center rounded-3"
                style={{
                  width: 42,
                  height: 42,
                  background: "linear-gradient(135deg, #7c3aed, #a855f7)",
                  boxShadow: "0 4px 12px rgba(124,58,237,0.35)",
                }}
              >
                <i className="bi bi-layout-text-sidebar text-white" style={{ fontSize: 20 }}></i>
              </span>
              <span style={{ color: "#7c3aed", fontSize: "1.3rem", letterSpacing: "-0.3px" }}>
                Budget Tracker
              </span>
            </a>

            {/* Actions */}
            <div className="d-flex align-items-center gap-2">
              <button
                className="btn fw-semibold px-4 py-2"
                style={{
                  color: "#7c3aed",
                  border: "1.5px solid rgba(124,58,237,0.25)",
                  borderRadius: 10,
                  fontSize: "0.92rem",
                  background: "rgba(124,58,237,0.04)",
                  transition: "all 0.2s",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = "rgba(124,58,237,0.1)";
                  e.currentTarget.style.borderColor = "#7c3aed";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = "rgba(124,58,237,0.04)";
                  e.currentTarget.style.borderColor = "rgba(124,58,237,0.25)";
                }}
                onClick={goToLogin}
              >
                Login
              </button>
              <button
                className="btn text-white fw-semibold px-4 py-2 d-flex align-items-center gap-2"
                style={{
                  background: "linear-gradient(135deg, #7c3aed, #a855f7)",
                  borderRadius: 10,
                  fontSize: "0.92rem",
                  boxShadow: "0 4px 14px rgba(124,58,237,0.35)",
                  transition: "all 0.2s",
                  border: "none",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.boxShadow = "0 6px 20px rgba(124,58,237,0.5)";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.boxShadow = "0 4px 14px rgba(124,58,237,0.35)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
                onClick={goToLogin}
              >
                Get Started
                <i className="bi bi-arrow-right"></i>
              </button>
            </div>
          </div>
        </nav>

        {/* ===== HERO SECTION ===== */}
        <section className="py-5 text-center">
          <div className="container py-4">
            {/* Badge */}
            <div className="mb-4">
              <span
                className="badge px-3 py-2 fw-normal"
                style={{
                  background: "rgba(124,58,237,0.1)",
                  color: "#7c3aed",
                  border: "1px solid rgba(124,58,237,0.3)",
                  borderRadius: 20,
                  fontSize: "0.85rem",
                }}
              >
                Take Control of Your Finances
              </span>
            </div>

            {/* Heading */}
            <h1
              className="fw-bold mb-4"
              style={{
                fontSize: "clamp(2.5rem, 5vw, 3.8rem)",
                background: "linear-gradient(135deg, #7c3aed, #ec4899)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                lineHeight: 1.2,
              }}
            >
              Track, Analyze, and Optimize
              <br />
              Your Spending
            </h1>

            {/* Subtitle */}
            <p className="text-muted mx-auto mb-5" style={{ maxWidth: 620, fontSize: "1.15rem", lineHeight: 1.7 }}>
              A modern, beautiful budget tracking application that helps you understand where your money
              goes. Set monthly income goals, track expenses by category, and gain insights with powerful
              analytics.
            </p>

            {/* CTA Buttons */}
            <div className="d-flex justify-content-center gap-3 flex-wrap mb-5">
              <button
                className="btn text-white fw-semibold px-4 py-2 d-flex align-items-center gap-2"
                style={{
                  background: "linear-gradient(135deg, #7c3aed, #a855f7)",
                  borderRadius: 8,
                  fontSize: "0.95rem",
                }}
                onClick={goToLogin}
              >
                Start Tracking Free <i className="bi bi-arrow-right"></i>
              </button>
              <button
                className="btn btn-outline-secondary fw-semibold px-4 py-2"
                style={{ borderRadius: 8, fontSize: "0.95rem",color:"black",borderColor:"#a855f7" }}
                onClick={goToLogin}
              >
                Sign In
              </button>
            </div>

            {/* Dashboard Preview Card */}
            <div
              className="mx-auto rounded-4 p-5 shadow-lg"
              style={{ maxWidth: 860, backgroundColor: "#fff" }}
            >
              {/* Stats Row */}
              <div className="row g-3 mb-4">
                {/* Total Income */}
                <div className="col-4">
                  <div
                    className="rounded-3 p-3 text-white d-flex justify-content-between align-items-start"
                    style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7)" }}
                  >
                    <div>
                      <div style={{ fontSize: "0.7rem", opacity: 0.85 }}>Total Income</div>
                      <div className="fw-bold" style={{ fontSize: "1.3rem" }}>$5,000</div>
                    </div>
                    <i className="bi bi-graph-up-arrow" style={{ fontSize: "1.3rem", opacity: 0.8 }}></i>
                  </div>
                </div>
                {/* Expenses */}
                <div className="col-4">
                  <div
                    className="rounded-3 p-3 text-white d-flex justify-content-between align-items-start"
                    style={{ background: "linear-gradient(135deg, #ec4899, #f43f5e)" }}
                  >
                    <div>
                      <div style={{ fontSize: "0.7rem", opacity: 0.85 }}>Expenses</div>
                      <div className="fw-bold" style={{ fontSize: "1.3rem" }}>$3,240</div>
                    </div>
                    <i className="bi bi-wallet2" style={{ fontSize: "1.3rem", opacity: 0.8 }}></i>
                  </div>
                </div>
                {/* Remaining */}
                <div className="col-4">
                  <div
                    className="rounded-3 p-3 text-white d-flex justify-content-between align-items-start"
                    style={{ background: "linear-gradient(135deg, #10b981, #34d399)" }}
                  >
                    <div>
                      <div style={{ fontSize: "0.7rem", opacity: 0.85 }}>Remaining</div>
                      <div className="fw-bold" style={{ fontSize: "1.3rem" }}>$1,760</div>
                    </div>
                    <i className="bi bi-pie-chart" style={{ fontSize: "1.3rem", opacity: 0.8 }}></i>
                  </div>
                </div>
              </div>

              {/* Chart Placeholder */}
              <div
                className="d-flex align-items-end justify-content-center gap-2 py-3"
                style={{ height: 160 }}
              >
                {[40, 65, 50, 80, 55, 90, 70].map((h, i) => (
                  <div
                    key={i}
                    className="rounded-top"
                    style={{
                      width: 38,
                      height: `${h}%`,
                      background: i === 5
                        ? "linear-gradient(180deg, #7c3aed, #a855f7)"
                        : "rgba(124,58,237,0.15)",
                      borderRadius: "6px 6px 0 0",
                    }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ===== FEATURES SECTION ===== */}
        <section className="py-5">
          <div className="container py-3">
            <div className="text-center mb-5">
              <h2
                className="fw-bold"
                style={{
                  background: "linear-gradient(135deg, #7c3aed, #ec4899)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
                }}
              >
                Everything You Need to Manage Your Budget
              </h2>
              <p className="text-muted">Powerful features designed to give you complete control</p>
            </div>

            <div className="row g-4">
              {/* Feature 1 */}
              <div className="col-md-4">
                <div className="card border-0 rounded-4 h-100 shadow-sm feature-card" style={{ borderTop: "3px solid #7c3aed !important" }}>
                  <div className="card-body p-4" style={{ borderTop: "3px solid #7c3aed", borderRadius: "inherit" }}>
                    <div
                      className="d-flex align-items-center justify-content-center rounded-3 mb-3"
                      style={{ width: 44, height: 44, background: "rgba(124,58,237,0.1)" }}
                    >
                      <i className="bi bi-grid" style={{ color: "#7c3aed", fontSize: "1.2rem" }}></i>
                    </div>
                    <h6 className="fw-bold mb-2">Expense Tracking</h6>
                    <p className="text-muted  mb-0">
                      Track every expense with detailed categorization. Add, edit, and delete expenses with
                      ease. Set different monthly income values for flexible budgeting.
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="col-md-4">
                <div className="card border-0 rounded-4 h-100 shadow-sm feature-card" >
                  <div className="card-body p-4" style={{ borderTop: "3px solid #ec4899", borderRadius: "inherit" }}>
                    <div
                      className="d-flex align-items-center justify-content-center rounded-3 mb-3"
                      style={{ width: 44, height: 44, background: "rgba(236,72,153,0.1)" }}
                    >
                      <i className="bi bi-bar-chart" style={{ color: "#ec4899", fontSize: "1.2rem" }}></i>
                    </div>
                    <h6 className="fw-bold mb-2">Visual Analytics</h6>
                    <p className="text-muted  mb-0">
                      Beautiful charts and graphs help you understand spending patterns. Interactive pie
                      charts and bar charts show expense breakdowns by category.
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="col-md-4">
                <div className="card border-0 rounded-4 h-100 shadow-sm feature-card">
                  <div className="card-body p-4" style={{ borderTop: "3px solid #10b981", borderRadius: "inherit" }}>
                    <div
                      className="d-flex align-items-center justify-content-center rounded-3 mb-3"
                      style={{ width: 44, height: 44, background: "rgba(16,185,129,0.1)" }}
                    >
                      <i className="bi bi-pie-chart" style={{ color: "#10b981", fontSize: "1.2rem" }}></i>
                    </div>
                    <h6 className="fw-bold mb-2">Smart Reports</h6>
                    <p className="text-muted  mb-0">
                      Generate detailed reports with percentage breakdowns. Filter by month, export to CSV,
                      and get insights into your spending habits.
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="col-md-4">
                <div className="card border-0 rounded-4 h-100 shadow-sm feature-card">
                  <div className="card-body p-4" style={{ borderTop: "3px solid #3b82f6", borderRadius: "inherit" }}>
                    <div
                      className="d-flex align-items-center justify-content-center rounded-3 mb-3"
                      style={{ width: 44, height: 44, background: "rgba(59,130,246,0.1)" }}
                    >
                      <i className="bi bi-shield-check" style={{ color: "#3b82f6", fontSize: "1.2rem" }}></i>
                    </div>
                    <h6 className="fw-bold mb-2">Secure & Private</h6>
                    <p className="text-muted  mb-0">
                      Your financial data is stored securely in your browser. We respect your privacy and
                      never share your information with third parties.
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature 5 */}
              <div className="col-md-4">
                <div className="card border-0 rounded-4 h-100 shadow-sm feature-card" >
                  <div className="card-body p-4" style={{ borderTop: "3px solid #f59e0b", borderRadius: "inherit" }}>
                    <div
                      className="d-flex align-items-center justify-content-center rounded-3 mb-3"
                      style={{ width: 44, height: 44, background: "rgba(245,158,11,0.1)" }}
                    >
                      <i className="bi bi-lightning-charge" style={{ color: "#f59e0b", fontSize: "1.2rem" }}></i>
                    </div>
                    <h6 className="fw-bold mb-2">Fast & Responsive</h6>
                    <p className="text-muted  mb-0">
                      Lightning-fast performance with a beautiful, responsive design. Works seamlessly on
                      desktop, tablet, and mobile devices.
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature 6 */}
              <div className="col-md-4">
                <div className="card border-0 rounded-4 h-100 shadow-sm feature-card" >
                  <div className="card-body p-4" style={{ borderTop: "3px solid #8b5cf6", borderRadius: "inherit" }}>
                    <div
                      className="d-flex align-items-center justify-content-center rounded-3 mb-3"
                      style={{ width: 44, height: 44, background: "rgba(139,92,246,0.1)" }}
                    >
                      <i className="bi bi-moon-stars" style={{ color: "#8b5cf6", fontSize: "1.2rem" }}></i>
                    </div>
                    <h6 className="fw-bold mb-2">Dark Mode</h6>
                    <p className="text-muted  mb-0">
                      Beautiful dark mode support for comfortable viewing in any lighting condition. Toggle
                      between light and dark themes instantly.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== CTA SECTION ===== */}
        <section className="py-5">
          <div className="container py-3">
            <div
              className="rounded-4 text-center text-white py-5 px-4"
              style={{ background: "linear-gradient(135deg, #7c3aed, #ec4899)" }}
            >
              <h2 className="fw-bold mb-3" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}>
                Ready to Take Control?
              </h2>
              <p className="mb-4 opacity-75" style={{ fontSize: "1rem" }}>
                Join thousands of users who have transformed their financial lives with
                <br />
                Budget Tracker. Start your journey today!
              </p>
              <button
                className="btn btn-light fw-semibold px-4 py-2 d-inline-flex align-items-center gap-2"
                style={{ borderRadius: 8, color: "#7c3aed", fontSize: "0.95rem" }}
                onClick={goToLogin}
              >
                Get Started Now - It's Free <i className="bi bi-arrow-right"></i>
              </button>
            </div>
          </div>
        </section>

        {/* ===== FOOTER ===== */}
        <footer className="py-4 text-center text-muted" style={{ fontSize: "0.85rem" }}>
          © 2026 Budget Tracker. Made with{" "}
          <span style={{ color: "#ef4444" }}>❤</span> for better financial management.
        </footer>
      </div>
    </>
  );
}
