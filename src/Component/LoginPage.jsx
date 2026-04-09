import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  const goHome = () => navigate("/");

  return (
    <div
      className="min-vh-100 d-flex flex-column align-items-center justify-content-center px-3 py-4"
      style={{ backgroundColor: "#eef0f8" }}
    >
      {/* Back to Home */}
      <div className="w-100 mb-3" style={{ maxWidth: 480 }}>
        <button
          className="btn btn-link text-decoration-none fw-medium p-0 d-flex align-items-center gap-2"
          style={{ color: "#7c3aed" }}
          onClick={goHome}
        >
          <i className="bi bi-arrow-left"></i>
          Back to Home
        </button>
      </div>

      {/* Card */}
      <div
        className="bg-white rounded-4 w-100 px-4 px-md-5 py-5 shadow"
        style={{
          maxWidth: 480,
          borderTop: "5px solid transparent",
          backgroundImage: "linear-gradient(white, white), linear-gradient(90deg, #7c3aed, #ec4899)",
          backgroundOrigin: "border-box",
          backgroundClip: "padding-box, border-box",
        }}
      >
        {/* Logo */}
        <div className="d-flex justify-content-center mb-4">
          <div
            className="d-flex align-items-center justify-content-center rounded-3 text-white"
            style={{
              width: 64,
              height: 64,
              background: "linear-gradient(135deg, #7c3aed, #a855f7)",
              boxShadow: "0 6px 20px rgba(124,58,237,0.35)",
            }}
          >
            <i className="bi bi-wallet2" style={{ fontSize: 28 }}></i>
          </div>
        </div>

        {isLogin ? (
          <>
            {/* ===== LOGIN ===== */}
            <h2
              className="fw-bold text-center mb-1"
              style={{
                background: "linear-gradient(135deg, #7c3aed, #a855f7)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Welcome Back
            </h2>
            <p className="text-center text-secondary mb-4" style={{ fontSize: "0.92rem" }}>
              Sign in to continue managing your budget
            </p>

            {/* Email */}
            <div className="mb-3">
              <label className="form-label fw-semibold d-flex align-items-center gap-2" style={{ fontSize: "0.88rem", color: "#374151" }}>
                <i className="bi bi-envelope" style={{ color: "#7c3aed" }}></i>
                Email
              </label>
              <input
                type="email"
                className="form-control border-0 rounded-3 py-3"
                placeholder="you@example.com"
                style={{ backgroundColor: "#f3f4f8", fontSize: "0.93rem" }}
              />
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="form-label fw-semibold d-flex align-items-center gap-2" style={{ fontSize: "0.88rem", color: "#374151" }}>
                <i className="bi bi-lock" style={{ color: "#7c3aed" }}></i>
                Password
              </label>
              <input
                type="password"
                className="form-control border-0 rounded-3 py-3"
                placeholder="••••••••"
                style={{ backgroundColor: "#f3f4f8", fontSize: "0.93rem" }}
              />
            </div>

            {/* Sign In Button */}
            <button
              className="btn w-100 fw-semibold text-white py-3 rounded-3 mb-3"
              style={{
                background: "linear-gradient(90deg, #7c3aed, #a855f7)",
                fontSize: "1rem",
                boxShadow: "0 4px 16px rgba(124,58,237,0.30)",
                border: "none",
              }}
            >
              Sign In
            </button>

            {/* Switch to Register */}
            <p className="text-center mb-3" style={{ fontSize: "0.88rem", color: "#6b7280" }}>
              Don't have an account?{" "}
              <span
                className="fw-semibold"
                role="button"
                style={{ color: "#7c3aed", cursor: "pointer" }}
                onClick={() => setIsLogin(false)}
              >
                Sign up
              </span>
            </p>

            {/* Demo Box */}
            <div
              className="rounded-3 px-3 py-3 text-center"
              style={{
                backgroundColor: "#f5f3ff",
                border: "1.5px solid rgba(124,58,237,0.18)",
                fontSize: "0.84rem",
                color: "#6b7280",
              }}
            >
              <span className="fw-semibold" style={{ color: "#7c3aed" }}>Demo:</span>{" "}
              Create an account or use any email/password you register with
            </div>
          </>
        ) : (
          <>
            {/* ===== REGISTER ===== */}
            <h2
  className="fw-bold text-center mb-1"
  style={{
    background: "linear-gradient(135deg, #7c3aed, #ec4899)",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    color: "transparent",
  }}
>
  Create Account
</h2>
            <p className="text-center text-secondary mb-4" style={{ fontSize: "0.92rem" }}>
              Start tracking your budget today
            </p>

            {/* Full Name */}
            <div className="mb-3">
              <label className="form-label fw-semibold d-flex align-items-center gap-2" style={{ fontSize: "0.88rem", color: "#374151" }}>
                <i className="bi bi-person" style={{ color: "#7c3aed" }}></i>
                Full Name
              </label>
              <input
                type="text"
                className="form-control border-0 rounded-3 py-3"
                placeholder="John Doe"
                style={{ backgroundColor: "#f3f4f8", fontSize: "0.93rem" }}
              />
            </div>

            {/* Email */}
            <div className="mb-3">
              <label className="form-label fw-semibold d-flex align-items-center gap-2" style={{ fontSize: "0.88rem", color: "#374151" }}>
                <i className="bi bi-envelope" style={{ color: "#7c3aed" }}></i>
                Email
              </label>
              <input
                type="email"
                className="form-control border-0 rounded-3 py-3"
                placeholder="you@example.com"
                style={{ backgroundColor: "#f3f4f8", fontSize: "0.93rem" }}
              />
            </div>

            {/* Password */}
            <div className="mb-3">
              <label className="form-label fw-semibold d-flex align-items-center gap-2" style={{ fontSize: "0.88rem", color: "#374151" }}>
                <i className="bi bi-lock" style={{ color: "#7c3aed" }}></i>
                Password
              </label>
              <input
                type="password"
                className="form-control border-0 rounded-3 py-3"
                placeholder="••••••••"
                style={{ backgroundColor: "#f3f4f8", fontSize: "0.93rem" }}
              />
            </div>

            {/* Confirm Password */}
            <div className="mb-4">
              <label className="form-label fw-semibold d-flex align-items-center gap-2" style={{ fontSize: "0.88rem", color: "#374151" }}>
                <i className="bi bi-lock" style={{ color: "#7c3aed" }}></i>
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control border-0 rounded-3 py-3"
                placeholder="••••••••"
                style={{ backgroundColor: "#f3f4f8", fontSize: "0.93rem" }}
              />
            </div>

            {/* Create Account Button */}
            <button
              className="btn w-100 fw-semibold text-white py-3 rounded-3 mb-3"
              style={{
                background: "linear-gradient(90deg, #7c3aed, #ec4899)",
                fontSize: "1rem",
                boxShadow: "0 4px 16px rgba(124,58,237,0.30)",
                border: "none",
              }}
            >
              Create Account
            </button>

            {/* Switch to Login */}
            <p className="text-center mb-0" style={{ fontSize: "0.88rem", color: "#6b7280" }}>
              Already have an account?{" "}
              <span
                className="fw-semibold"
                role="button"
                style={{ color: "#7c3aed", cursor: "pointer" }}
                onClick={() => setIsLogin(true)}
              >
                Sign in
              </span>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
