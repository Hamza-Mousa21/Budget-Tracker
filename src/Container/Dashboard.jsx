import Sidebar from "../Component/sidebar";
import Header from "../Component/header";
import SidebarBody from "../Component/SidbarBody";

const Dashboard = () => {
  return (
    <>
      <Header />

      <div
        className="d-flex"
        style={{
          minHeight: "100vh",
          backgroundColor: "#f8f9fc",
          overflowX: "hidden",
        }}
      >
        {/* Main Content */}
        <div className="flex-grow-1">
          <main className="">
            {/* Title */}
            <div className="d-flex">
              <div className="col-3 col-md-3 col-lg-3">
                <SidebarBody></SidebarBody>
              </div>
              <div className="col-9 col-md-9 col-lg-9 p-4 p-lg-5">
                <div className="mb-4">
                  <h1
                    className="fw-bold mb-1"
                    style={{
                      fontSize: "3rem",
                      color: "#7c3aed",
                      lineHeight: "1.1",
                    }}
                  >
                    Dashboard
                  </h1>

                  <div className="d-flex align-items-center gap-2 text-muted">
                    <span
                      style={{
                        width: "8px",
                        height: "8px",
                        backgroundColor: "#10b981",
                        borderRadius: "50%",
                        display: "inline-block",
                      }}
                    ></span>
                    <span style={{ fontSize: "1rem" }}>
                      Overview for April 2026
                    </span>
                  </div>
                </div>

                {/* Top Cards */}
                <div className="row g-4 mb-4">
                  {/* Monthly Income */}
                  <div className="col-md-4">
                    <div
                      className="card border-0 shadow-sm h-100"
                      style={{
                        borderRadius: "18px",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          height: "5px",
                          background:
                            "linear-gradient(90deg, #8b5cf6, #a855f7)",
                        }}
                      ></div>

                      <div className="card-body p-4">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <p className="text-secondary mb-2 fw-medium">
                              Monthly Income
                            </p>
                            <h2
                              className="fw-bold mb-0"
                              style={{ fontSize: "2.5rem" }}
                            >
                              $0
                            </h2>
                          </div>

                          <div
                            className="d-flex align-items-center justify-content-center"
                            style={{
                              width: "64px",
                              height: "64px",
                              borderRadius: "16px",
                              backgroundColor: "#f3e8ff",
                              color: "#7c3aed",
                              fontSize: "2rem",
                            }}
                          >
                            $
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Total Expenses */}
                  <div className="col-md-4">
                    <div
                      className="card border-0 shadow-sm h-100"
                      style={{
                        borderRadius: "18px",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          height: "5px",
                          background:
                            "linear-gradient(90deg, #ec4899, #f43f5e)",
                        }}
                      ></div>

                      <div className="card-body p-4">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <p className="text-secondary mb-2 fw-medium">
                              Total Expenses
                            </p>
                            <h2
                              className="fw-bold mb-1"
                              style={{ fontSize: "2.5rem" }}
                            >
                              $0
                            </h2>
                            <small
                              style={{ color: "#f97316", fontWeight: 500 }}
                            >
                              No income set
                            </small>
                          </div>

                          <div
                            className="d-flex align-items-center justify-content-center"
                            style={{
                              width: "64px",
                              height: "64px",
                              borderRadius: "16px",
                              backgroundColor: "#fce7f3",
                              color: "#ec4899",
                              fontSize: "1.8rem",
                            }}
                          >
                            ↘
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Remaining Balance */}
                  <div className="col-md-4">
                    <div
                      className="card border-0 shadow-sm h-100"
                      style={{
                        borderRadius: "18px",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          height: "5px",
                          background:
                            "linear-gradient(90deg, #10b981, #14b8a6)",
                        }}
                      ></div>

                      <div className="card-body p-4">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <p className="text-secondary mb-2 fw-medium">
                              Remaining Balance
                            </p>
                            <h2
                              className="fw-bold mb-1"
                              style={{ fontSize: "2.5rem" }}
                            >
                              $0
                            </h2>
                            <small
                              style={{ color: "#10b981", fontWeight: 500 }}
                            >
                              On track
                            </small>
                          </div>

                          <div
                            className="d-flex align-items-center justify-content-center"
                            style={{
                              width: "64px",
                              height: "64px",
                              borderRadius: "16px",
                              backgroundColor: "#d1fae5",
                              color: "#059669",
                              fontSize: "1.8rem",
                            }}
                          >
                            💳
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Middle Section */}
                <div className="row g-4 mb-4">
                  {/* Expenses by Category */}
                  <div className="col-lg-6">
                    <div
                      className="card border-0 shadow-sm h-100"
                      style={{
                        borderRadius: "18px",
                        overflow: "hidden",
                        minHeight: "390px",
                      }}
                    >
                      <div
                        style={{
                          height: "5px",
                          background:
                            "linear-gradient(90deg, #8b5cf6, #a855f7, #ec4899)",
                        }}
                      ></div>

                      <div
                        className="px-4 py-3"
                        style={{
                          background:
                            "linear-gradient(180deg, rgba(139,92,246,0.05), rgba(255,255,255,1))",
                        }}
                      >
                        <div className="d-flex align-items-center gap-2">
                          <div
                            style={{
                              width: "4px",
                              height: "24px",
                              borderRadius: "999px",
                              backgroundColor: "#8b5cf6",
                            }}
                          ></div>
                          <h5 className="mb-0 fw-bold">Expenses by Category</h5>
                        </div>
                      </div>

                      <div
                        className="card-body d-flex align-items-center justify-content-center"
                        style={{ minHeight: "300px" }}
                      >
                        <p
                          className="text-muted mb-0"
                          style={{ fontSize: "1.1rem" }}
                        >
                          No expense data to display
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Category Breakdown */}
                  <div className="col-lg-6">
                    <div
                      className="card border-0 shadow-sm h-100"
                      style={{
                        borderRadius: "18px",
                        overflow: "hidden",
                        minHeight: "390px",
                      }}
                    >
                      <div
                        style={{
                          height: "5px",
                          background:
                            "linear-gradient(90deg, #ec4899, #f43f5e, #f97316)",
                        }}
                      ></div>

                      <div
                        className="px-4 py-3"
                        style={{
                          background:
                            "linear-gradient(180deg, rgba(236,72,153,0.05), rgba(255,255,255,1))",
                        }}
                      >
                        <div className="d-flex align-items-center gap-2">
                          <div
                            style={{
                              width: "4px",
                              height: "24px",
                              borderRadius: "999px",
                              backgroundColor: "#ec4899",
                            }}
                          ></div>
                          <h5 className="mb-0 fw-bold">Category Breakdown</h5>
                        </div>
                      </div>

                      <div
                        className="card-body d-flex align-items-center justify-content-center"
                        style={{ minHeight: "300px" }}
                      >
                        <p
                          className="text-muted mb-0 text-center"
                          style={{ fontSize: "1.1rem" }}
                        >
                          No category data available
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Expenses */}
                <div
                  className="card border-0 shadow-sm"
                  style={{
                    borderRadius: "18px",
                    overflow: "hidden",
                    minHeight: "300px",
                  }}
                >
                  <div
                    style={{
                      height: "5px",
                      background: "linear-gradient(90deg, #10b981, #14b8a6)",
                    }}
                  ></div>

                  <div
                    className="px-4 py-3"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(16,185,129,0.05), rgba(255,255,255,1))",
                    }}
                  >
                    <div className="d-flex align-items-center gap-2">
                      <div
                        style={{
                          width: "4px",
                          height: "24px",
                          borderRadius: "999px",
                          backgroundColor: "#10b981",
                        }}
                      ></div>
                      <h5 className="mb-0 fw-bold">Recent Expenses</h5>
                    </div>
                  </div>

                  <div
                    className="card-body d-flex flex-column align-items-center justify-content-center text-center"
                    style={{ minHeight: "220px" }}
                  >
                    <div
                      className="d-flex align-items-center justify-content-center mb-3"
                      style={{
                        width: "56px",
                        height: "56px",
                        borderRadius: "50%",
                        backgroundColor: "#f3e8ff",
                        fontSize: "1.6rem",
                      }}
                    >
                      💸
                    </div>

                    <p
                      className="text-muted mb-0"
                      style={{ fontSize: "1.05rem" }}
                    >
                      No expenses yet. Add your first expense to get started!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
