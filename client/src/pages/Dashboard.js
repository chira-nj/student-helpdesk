import CreateTicket from "./CreateTicket";

function Dashboard() {

  return (

    <div
      style={{
        minHeight: "100vh",
        background: "#f4f7fb",
      }}
    >

      {/* Navbar */}

      <div
        style={{
          background: "#2563eb",
          padding: "15px 30px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: "white",
        }}
      >

        <h2>Student Helpdesk</h2>

        <div>

          <a
            href="/dashboard"
            style={{
              color: "white",
              marginRight: "20px",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Dashboard
          </a>

          <a
            href="/history"
            style={{
              color: "white",
              marginRight: "20px",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            History
          </a>

          <a
            href="/"
            style={{
              color: "white",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Logout
          </a>

        </div>

      </div>

      {/* Dashboard Content */}

      <div
        style={{
          padding: "30px",
        }}
      >

        <h1
          style={{
            marginBottom: "25px",
            color: "#333",
          }}
        >
          Student Dashboard
        </h1>

        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "12px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
          }}
        >

          <CreateTicket />

        </div>

      </div>

    </div>
  );
}

export default Dashboard;