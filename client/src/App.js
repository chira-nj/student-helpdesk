import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import ProtectedRoute from "./pages/ProtectedRoute";

import Register from "./pages/Register";

import Login from "./pages/Login";

import Dashboard from "./pages/Dashboard";

import TicketHistory from "./pages/TicketHistory";

import AdminPanel from "./pages/AdminPanel";

import SupportDashboard from "./pages/SupportDashboard";

function App() {

  return (

    <BrowserRouter>

      <div
        style={{
          minHeight: "100vh",
          background:
            "linear-gradient(to right, #eef2ff, #f8fafc)",
        }}
      >

        <Routes>

          {/* LOGIN */}

          <Route
            path="/"
            element={<Login />}
          />

          {/* REGISTER */}

          <Route
            path="/register"
            element={<Register />}
          />

          {/* STUDENT DASHBOARD */}

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* ADMIN PANEL */}

          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminPanel />
              </ProtectedRoute>
            }
          />

          {/* TICKET HISTORY */}

          <Route
            path="/history"
            element={
              <ProtectedRoute>
                <TicketHistory />
              </ProtectedRoute>
            }
          />

          {/* IT SUPPORT */}

          <Route
            path="/itsupport"
            element={
              <ProtectedRoute>
                <SupportDashboard />
              </ProtectedRoute>
            }
          />

          {/* ACCOUNTS */}

          <Route
            path="/accounts"
            element={
              <ProtectedRoute>
                <SupportDashboard />
              </ProtectedRoute>
            }
          />

          {/* MAINTENANCE */}

          <Route
            path="/maintenance"
            element={
              <ProtectedRoute>
                <SupportDashboard />
              </ProtectedRoute>
            }
          />

          {/* PLACEMENT */}

          <Route
            path="/placementofficer"
            element={
              <ProtectedRoute>
                <SupportDashboard />
              </ProtectedRoute>
            }
          />

          {/* FALLBACK */}

          <Route
            path="*"
            element={

              <div
                style={{
                  height: "100vh",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >

                <h1
                  style={{
                    color: "#2563eb",
                    fontSize: "50px",
                    marginBottom: "10px",
                  }}
                >
                  404
                </h1>

                <h2
                  style={{
                    color: "#475569",
                  }}
                >
                  Page Not Found
                </h2>

              </div>
            }
          />

        </Routes>

      </div>

    </BrowserRouter>
  );
}

export default App;