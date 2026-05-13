import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import TicketModal from "../components/TicketModal";

import NotificationBell from "../components/NotificationBell";

import { CSVLink } from "react-csv";

import SummaryCards from "../components/SummaryCards";
import {

  PieChart,

  Pie,

  Cell,

  Tooltip,

  Legend,

  ResponsiveContainer,

  BarChart,

  Bar,

  XAxis,

  YAxis,

  CartesianGrid,

} from "recharts";

function AdminPanel() {

  const navigate = useNavigate();

  const [selectedTicket, setSelectedTicket] =
  useState(null);

  const [tickets, setTickets] = useState([]);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] =
    useState("");

  const [priorityFilter, setPriorityFilter] =
    useState("");

  const [departmentFilter, setDepartmentFilter] =
    useState("");

  //const [selectedTicket, setSelectedTicket] =
    useState(null);

    const [comment, setComment] =
  useState("");

  // ====================================
  // FETCH TICKETS
  // ====================================

  const fetchTickets = async () => {

    try {

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/tickets`
      );

      const data = await response.json();

      console.log(data);

      setTickets(data);

    } catch (error) {

      console.log(error);

    }
  };

  useEffect(() => {

  fetchTickets();

  const interval =
    setInterval(() => {

      fetchTickets();

    }, 2000);

  return () =>
    clearInterval(interval);

}, []);

  // ====================================
  // UPDATE STATUS
  // ====================================

  const updateStatus = async (
    id,
    status
  ) => {

    try {

      await fetch(
        `${process.env.REACT_APP_API_URL}/tickets/${id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            status,
          }),
        }
      );

      fetchTickets();

    } catch (error) {

      console.log(error);

    }
  };

  // ====================================
  // DELETE TICKET
  // ====================================

  const deleteTicket = async (id) => {

    const confirmDelete =
      window.confirm(
        "Delete this ticket?"
      );

    if (!confirmDelete) return;

    try {

      await fetch(
        `${process.env.REACT_APP_API_URL}/tickets/${id}`,
        {
          method: "DELETE",
        }
      );

      fetchTickets();

    } catch (error) {

      console.log(error);

    }
  };
  const addComment = async (id) => {

  if (!comment) return;

  try {

    await fetch(

      `${process.env.REACT_APP_API_URL}/tickets/${id}/comment`,

      {

        method: "PUT",

        headers: {

          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({

          text: comment,
        }),
      }
    );

    setComment("");

    fetchTickets();

  } catch (error) {

    console.log(error);

  }
};
  // ====================================
  // LOGOUT
  // ====================================

  const handleLogout = () => {

    localStorage.clear();

    navigate("/");
  };

  // ====================================
  // FILTER TICKETS
  // ====================================

  const filteredTickets =
    tickets.filter((ticket) => {

      const matchesSearch =

        ticket.title
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||

        ticket.description
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesStatus =

        statusFilter === "" ||

        ticket.status ===
          statusFilter;

      const matchesPriority =

        priorityFilter === "" ||

        ticket.priority ===
          priorityFilter;

      const matchesDepartment =

        departmentFilter === "" ||

        ticket.department ===
          departmentFilter;

      return (

        matchesSearch &&

        matchesStatus &&

        matchesPriority &&

        matchesDepartment
      );
    });

  // ====================================
  // COUNTS
  // ====================================

 // const totalTickets =
   // tickets.length;

  const pendingTickets =
    tickets.filter(
      (ticket) =>
        ticket.status ===
        "Pending"
    ).length;

  const progressTickets =
    tickets.filter(
      (ticket) =>
        ticket.status ===
        "In Progress"
    ).length;

  const resolvedTickets =
    tickets.filter(
      (ticket) =>
        ticket.status ===
        "Resolved"
    ).length;

  // ====================================
  // STATUS CHART
  // ====================================

  const statusData = [

    {
      name: "Pending",
      value: pendingTickets,
    },

    {
      name: "In Progress",
      value: progressTickets,
    },

    {
      name: "Resolved",
      value: resolvedTickets,
    },
  ];

  // ====================================
  // PRIORITY CHART
  // ====================================

  const priorityData = [

    {
      name: "Low",
      value: tickets.filter(
        (ticket) =>
          ticket.priority ===
          "Low"
      ).length,
    },

    {
      name: "Medium",
      value: tickets.filter(
        (ticket) =>
          ticket.priority ===
          "Medium"
      ).length,
    },

    {
      name: "High",
      value: tickets.filter(
        (ticket) =>
          ticket.priority ===
          "High"
      ).length,
    },

    {
      name: "Critical",
      value: tickets.filter(
        (ticket) =>
          ticket.priority ===
          "Critical"
      ).length,
    },
  ];

  // ====================================
  // DEPARTMENT CHART
  // ====================================

  const departmentData = [

    {
      name: "IT",
      value: tickets.filter(
        (ticket) =>
          ticket.department ===
          "itsupport"
      ).length,
    },

    {
      name: "Accounts",
      value: tickets.filter(
        (ticket) =>
          ticket.department ===
          "accounts"
      ).length,
    },

    {
      name: "Maintenance",
      value: tickets.filter(
        (ticket) =>
          ticket.department ===
          "maintenance"
      ).length,
    },

    {
      name: "Hostel",
      value: tickets.filter(
        (ticket) =>
          ticket.department ===
          "hosteladmin"
      ).length,
    },
  ];

  const COLORS = [

    "#f59e0b",

    "#3b82f6",

    "#22c55e",
  ];

  const csvData = tickets.map(
  (ticket) => ({
    Title: ticket.title,
    Description:
      ticket.description,
    Priority:
      ticket.priority,
    Department:
      ticket.department,
    AssignedTo:
      ticket.assignedTo,
    Status:
      ticket.status,
    CreatedAt:
      new Date(
        ticket.createdAt
      ).toLocaleString(),
  })
);
  return (

    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background:
          "linear-gradient(to right, #f8fafc, #e0f2fe)",
      }}
    >

{/* MODERN SIDEBAR */}

<div
  style={{
    width: "280px",

    height: "100vh",

    background:
      "linear-gradient(to bottom,#020617,#0f172a)",

    color: "white",

    padding: "30px 22px",

    position: "fixed",

    display: "flex",

    flexDirection: "column",

    justifyContent:
      "space-between",
  }}
>

  {/* TOP */}

  <div>

    {/* LOGO */}

    <div
      style={{
        display: "flex",

        alignItems: "center",

        gap: "15px",

        marginBottom: "50px",
      }}
    >

      <div
        style={{
          width: "60px",

          height: "60px",

          borderRadius: "18px",

          background: "white",

          display: "flex",

          justifyContent: "center",

          alignItems: "center",

          fontSize: "30px",
        }}
      >
        🎓
      </div>

      <div>

        <h2
          style={{
            fontSize: "28px",

            marginBottom: "5px",
          }}
        >
          Helpdesk
        </h2>

        <p
          style={{
            color: "#94a3b8",
          }}
        >
          Admin Panel
        </p>

      </div>

    </div>

    {/* MENU */}

    <div
      style={{
        display: "flex",

        flexDirection: "column",

        gap: "18px",
      }}
    >

      <button
        style={{
          ...modernSidebarBtn,

          background:
            "linear-gradient(to right,#4f46e5,#2563eb)",
        }}

        onClick={() =>
          document
            .getElementById(
              "dashboard"
            )
            .scrollIntoView({
              behavior:
                "smooth",
            })
        }
      >
        Dashboard
      </button>

      <button
        style={modernSidebarBtn}

        onClick={() =>
          document
            .getElementById(
              "tickets-section"
            )
            .scrollIntoView({
              behavior:
                "smooth",
            })
        }
      >
        Tickets
      </button>

      <button
        style={modernSidebarBtn}

        onClick={() =>
          document
            .getElementById(
              "analytics-section"
            )
            .scrollIntoView({
              behavior:
                "smooth",
            })
        }
      >
        Analytics
      </button>

    </div>

  </div>

  {/* LOGOUT */}

  <button
    onClick={handleLogout}

    style={{
      background: "#ef4444",

      border: "none",

      color: "white",

      padding: "16px",

      borderRadius: "16px",

      fontSize: "16px",

      fontWeight: "600",

      cursor: "pointer",
    }}
  >
    Logout
  </button>
</div>


{/* MAIN */}

<div
  style={{
    flex: 1,
    marginLeft: "280px",
    padding: "40px",
    width: "calc(100% - 280px)",
    minHeight: "100vh",
  }}
>
       {/* TOP HEADER */}

<div
  style={{
    display: "flex",

    justifyContent:
      "space-between",

    alignItems: "center",

    marginBottom: "35px",
  }}
>

  {/* LEFT */}

  <div>

    <h1
      style={{
        fontSize: "52px",

        color: "#0f172a",

        marginBottom: "8px",

        fontWeight: "700",
      }}
    >
      All Tickets
    </h1>

    <p
      style={{
        color: "#64748b",

        fontSize: "17px",
      }}
    >
      Manage and track
      student support tickets
    </p>

  </div>

  {/* RIGHT */}

  <div
    style={{
      display: "flex",

      alignItems: "center",

      gap: "18px",
    }}
  >

    <CSVLink
      data={csvData}

      filename={
        "tickets-report.csv"
      }

      style={{
        background:
          "linear-gradient(to right,#22c55e,#16a34a)",

        color: "white",

        padding:
          "14px 22px",

        borderRadius:
          "18px",

        textDecoration:
          "none",

        fontWeight:
          "600",

        boxShadow:
          "0 4px 10px rgba(0,0,0,0.08)",
      }}
    >
      Export CSV
    </CSVLink>

    <NotificationBell />

  </div>

</div>

{/* FILTER BAR */}

<div
  style={{
    background: "white",

    padding: "22px",

    borderRadius: "24px",

    display: "flex",

    gap: "18px",

    marginBottom: "35px",

    flexWrap: "wrap",

    boxShadow:
      "0 4px 12px rgba(0,0,0,0.05)",
  }}
>

  <input
    type="text"

    placeholder="Search tickets..."

    value={search}

    onChange={(e) =>
      setSearch(e.target.value)
    }

    style={{
      padding: "16px",

      borderRadius: "14px",

      border:
        "1px solid #e2e8f0",

      minWidth: "260px",

      fontSize: "15px",

      outline: "none",
    }}
  />

  <select
    value={statusFilter}

    onChange={(e) =>
      setStatusFilter(
        e.target.value
      )
    }

    style={{
      padding: "16px",

      borderRadius: "14px",

      border:
        "1px solid #e2e8f0",

      minWidth: "200px",
    }}
  >

    <option value="">
      All Status
    </option>

    <option value="Pending">
      Pending
    </option>

    <option value="In Progress">
      In Progress
    </option>

    <option value="Resolved">
      Resolved
    </option>

  </select>

  <select
    value={priorityFilter}

    onChange={(e) =>
      setPriorityFilter(
        e.target.value
      )
    }

    style={{
      padding: "16px",

      borderRadius: "14px",

      border:
        "1px solid #e2e8f0",

      minWidth: "200px",
    }}
  >

    <option value="">
      All Priority
    </option>

    <option value="Low">
      Low
    </option>

    <option value="Medium">
      Medium
    </option>

    <option value="High">
      High
    </option>

    <option value="Critical">
      Critical
    </option>

  </select>

  <select
    value={departmentFilter}

    onChange={(e) =>
      setDepartmentFilter(
        e.target.value
      )
    }

    style={{
      padding: "16px",

      borderRadius: "14px",

      border:
        "1px solid #e2e8f0",

      minWidth: "220px",
    }}
  >

    <option value="">
      All Departments
    </option>

    <option value="itsupport">
      IT Support
    </option>

    <option value="accounts">
      Accounts
    </option>

    <option value="maintenance">
      Maintenance
    </option>

    <option value="hosteladmin">
      Hostel
    </option>

  </select>

</div>

        {/* CARDS */}

        
        <div id="dashboard">
  <SummaryCards />
</div>
        <div id="analytics-section">
        {/* CHARTS */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "1fr 1fr",
            gap: "20px",
            marginBottom: "40px",
          }}
        >

          {/* PIE CHART */}

          <div style={chartBox}>

            <h2 style={chartTitle}>
              Ticket Status Analytics
            </h2>

            <ResponsiveContainer
              width="100%"
              height={300}
            >

              <PieChart>

                <Pie
                  data={statusData}
                  dataKey="value"
                  outerRadius={100}
                  label
                >

                  {
                    statusData.map(
                      (entry, index) => (

                        <Cell
                          key={index}
                          fill={
                            COLORS[index]
                          }
                        />
                      )
                    )
                  }

                </Pie>

                <Tooltip />

                <Legend />

              </PieChart>

            </ResponsiveContainer>

          </div>

          {/* PRIORITY CHART */}

          <div style={chartBox}>

            <h2 style={chartTitle}>
              Priority Analytics
            </h2>

            <ResponsiveContainer
              width="100%"
              height={300}
            >

              <BarChart
                data={priorityData}
              >

                <CartesianGrid
                  strokeDasharray="3 3"
                />

                <XAxis dataKey="name" />

                <YAxis />

                <Tooltip />

                <Legend />

                <Bar
                  dataKey="value"
                  fill="#2563eb"
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* DEPARTMENT CHART */}

        <div
          style={{
            marginBottom: "40px",
          }}
        >

          <div style={chartBox}>

            <h2 style={chartTitle}>
              Department Analytics
            </h2>

            <ResponsiveContainer
              width="100%"
              height={320}
            >

              <BarChart
                data={departmentData}
              >

                <CartesianGrid
                  strokeDasharray="3 3"
                />

                <XAxis dataKey="name" />

                <YAxis />

                <Tooltip />

                <Legend />

                <Bar
                  dataKey="value"
                  fill="#0ea5e9"
                  radius={[
                    8,
                    8,
                    0,
                    0,
                  ]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>
</div>
        
{/* TICKETS CARD */}

{/* MODERN TICKETS */}

<div id="tickets-section">

{
  filteredTickets.map(
    (ticket) => (

      <div
        key={ticket._id}

        style={{
          background: "white",

          borderRadius: "28px",

          padding: "28px",

          marginBottom: "28px",

          display: "flex",

          justifyContent: "space-between",

          alignItems: "center",

          boxShadow:
            "0 6px 18px rgba(0,0,0,0.06)",
        }}
      >

        {/* LEFT SIDE */}

        <div
          style={{
            display: "flex",

            gap: "24px",

            alignItems: "flex-start",
          }}
        >

          {/* ICON */}

          <div
            style={{
              width: "90px",

              height: "90px",

              borderRadius: "24px",

              background: "#ede9fe",

              display: "flex",

              justifyContent: "center",

              alignItems: "center",

              fontSize: "40px",
            }}
          >
            🎫
          </div>

          {/* DETAILS */}

          <div>

            {/* TOP */}

            <div
              style={{
                display: "flex",

                alignItems: "center",

                gap: "14px",

                marginBottom: "10px",
              }}
            >

              <h3
                style={{
                  color: "#4f46e5",
                }}
              >
                {ticket.ticketId}
              </h3>

              <span
                style={{
                  background:

                    ticket.priority ===
                    "Critical"

                      ? "#fee2e2"

                      : ticket.priority ===
                        "High"

                      ? "#ffedd5"

                      : ticket.priority ===
                        "Medium"

                      ? "#fef3c7"

                      : "#dcfce7",

                  color:

                    ticket.priority ===
                    "Critical"

                      ? "#dc2626"

                      : ticket.priority ===
                        "High"

                      ? "#ea580c"

                      : ticket.priority ===
                        "Medium"

                      ? "#d97706"

                      : "#16a34a",

                  padding:
                    "6px 14px",

                  borderRadius:
                    "20px",

                  fontWeight:
                    "600",
                }}
              >

                {ticket.priority}

              </span>

            </div>

            {/* TITLE */}

            <h1
              style={{
                fontSize: "38px",

                color: "#0f172a",

                marginBottom: "10px",
              }}
            >
              {ticket.title}
            </h1>

            {/* DESCRIPTION */}

            <p
              style={{
                color: "#64748b",

                maxWidth: "700px",

                lineHeight: "1.7",

                marginBottom: "18px",
              }}
            >
              {ticket.description}
            </p>

            {/* META */}

            <div
              style={{
                display: "flex",

                gap: "24px",

                flexWrap: "wrap",
              }}
            >

              <span
                style={{
                  color: "#7c3aed",

                  fontWeight: "600",
                }}
              >
                {ticket.department}
              </span>

              <span
                style={{
                  color: "#2563eb",

                  fontWeight: "600",
                }}
              >
                {ticket.assignedTo}
              </span>

              <span
                style={{
                  color: "#64748b",
                }}
              >

                {

                  Math.floor(

                    (
                      new Date() -

                      new Date(
                        ticket.createdAt
                      )

                    ) /

                    (
                      1000 *
                      60 *
                      60 *
                      24
                    )

                  )

                }

                days ago

              </span>

            </div>

          </div>

        </div>

        {/* RIGHT SIDE */}

        <div
          style={{
            minWidth: "230px",

            display: "flex",

            flexDirection: "column",

            gap: "18px",
          }}
        >

          {/* STATUS */}

          <div>

            <p
              style={{
                color: "#94a3b8",

                marginBottom: "8px",
              }}
            >
              Status
            </p>

            <span
              style={{
                padding:
                  "8px 16px",

                borderRadius:
                  "20px",

                color: "white",

                fontWeight:
                  "600",

                background:

                  ticket.status ===
                  "Pending"

                    ? "#f59e0b"

                    : ticket.status ===
                      "In Progress"

                    ? "#2563eb"

                    : "#22c55e",
              }}
            >

              {ticket.status}

            </span>

          </div>

          {/* OVERDUE */}

          {

            Math.floor(
              (
                new Date() -

                new Date(
                  ticket.createdAt
                )
              ) /

              (
                1000 *
                60 *
                60 *
                24
              )
            ) > 3 &&

            ticket.status !==
              "Resolved" && (

              <div
                style={{
                  background:
                    "#fee2e2",

                  color: "#dc2626",

                  padding:
                    "10px",

                  borderRadius:
                    "14px",

                  fontWeight:
                    "600",

                  textAlign:
                    "center",
                }}
              >
                ⚠ Overdue
              </div>
            )
          }

          {/* BUTTON */}

          <button
            onClick={() =>
              setSelectedTicket(ticket)
            }

            style={{
              border:
                "2px solid #4f46e5",

              background:
                "transparent",

              color: "#4f46e5",

              padding:
                "14px",

              borderRadius:
                "18px",

              fontSize: "15px",

              fontWeight:
                "600",

              cursor: "pointer",

              transition:
                "0.3s",
            }}
          >
            View Details
          </button>

        </div>

      </div>
    )
  )
}



</div>
   

      </div>
      {
  selectedTicket && (

    <TicketModal

      ticket={selectedTicket}

      closeModal={() =>
        setSelectedTicket(null)
      }

      updateStatus={updateStatus}

      deleteTicket={deleteTicket}

      addComment={addComment}

      comment={comment}

      setComment={setComment}

    />
  )
}

    </div>
  );
}

// ====================================
// STYLES
// ====================================
const modernSidebarBtn = {

  border: "none",

  background: "transparent",

  color: "white",

  textAlign: "left",

  padding: "18px",

  borderRadius: "18px",

  fontSize: "17px",

  fontWeight: "600",

  cursor: "pointer",

  transition: "0.3s",
};


/*const cardStyle = {

  padding: "25px",

  borderRadius: "16px",

  color: "white",

  textAlign: "center",
};*/

const chartBox = {

  background: "white",

  padding: "20px",

  borderRadius: "16px",

  boxShadow:
    "0 4px 10px rgba(0,0,0,0.08)",
};

const chartTitle = {

  textAlign: "center",

  marginBottom: "20px",

  color: "#1e293b",
};

// const inputStyle = {

//   padding: "12px",

//   borderRadius: "10px",

//   border: "1px solid #ccc",

//   width: "220px",
// };


export default AdminPanel;