import { useState, useEffect } from "react";

function CreateTicket() {

  const [title, setTitle] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [priority, setPriority] =
    useState("");

  const [issueType, setIssueType] =
    useState("");

  const [tickets, setTickets] =
    useState([]);

  // =====================================
  // FETCH TICKETS
  // =====================================

  const fetchTickets = async () => {

    try {

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/tickets`
      );

      const data =
        await response.json();

      setTickets(data);

    } catch (error) {

      console.log(error);

    }
  };

  // =====================================
  // LOAD TICKETS
  // =====================================

  useEffect(() => {

    fetchTickets();

  }, []);

  // =====================================
  // UPDATE STATUS
  // =====================================

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

  // =====================================
  // CREATE TICKET
  // =====================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (
      !title ||
      !description ||
      !priority ||
      !issueType
    ) {

      alert(
        "Please fill all fields"
      );

      return;
    }

    // FIXED EMAIL

    const ticketData = {

      title,

      description,

      priority,

      issueType,

      email:
        localStorage.getItem(
          "email"
        ),
    };

    console.log(ticketData);

    try {

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/create-ticket`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(
            ticketData
          ),
        }
      );

      const data =
        await response.json();

      alert(data.message);

      // CLEAR INPUTS

      setTitle("");

      setDescription("");

      setPriority("");

      setIssueType("");

      // REFRESH TICKETS

      fetchTickets();

    } catch (error) {

      console.log(error);

    }
  };

  return (

    <div
      style={{
        padding: "30px",
        background: "#f4f7fb",
        minHeight: "100vh",
      }}
    >

      {/* FORM CARD */}

      <div
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "16px",
          boxShadow:
            "0 4px 15px rgba(0,0,0,0.08)",
          marginBottom: "40px",
        }}
      >

        <h2
          style={{
            marginBottom: "25px",
            color: "#2563eb",
            textAlign: "center",
          }}
        >
          Create Ticket
        </h2>

        <form onSubmit={handleSubmit}>

          {/* TITLE */}

          <input
            type="text"
            placeholder="Enter Title"
            value={title}
            onChange={(e) =>
              setTitle(
                e.target.value
              )
            }
            style={inputStyle}
          />

          {/* DESCRIPTION */}

          <textarea
            placeholder="Enter Description"
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
            style={{
              ...inputStyle,
              minHeight: "120px",
              resize: "none",
            }}
          />

          {/* ISSUE TYPE */}

          <select
            value={issueType}
            onChange={(e) =>
              setIssueType(
                e.target.value
              )
            }
            style={inputStyle}
          >

            <option value="">
              Select Issue Type
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

            <option value="electrician">
              Electrician
            </option>

            <option value="networkengineer">
              Network Engineer
            </option>

          </select>

          {/* PRIORITY */}

          <select
            value={priority}
            onChange={(e) =>
              setPriority(
                e.target.value
              )
            }
            style={inputStyle}
          >

            <option value="">
              Select Priority
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

          {/* BUTTON */}

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "14px",
              background:
                "linear-gradient(to right, #2563eb, #1d4ed8)",
              color: "white",
              border: "none",
              borderRadius: "10px",
              fontSize: "16px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Create Ticket
          </button>

        </form>

      </div>

      {/* TICKETS */}

      <h2
        style={{
          marginBottom: "20px",
          color: "#1e293b",
        }}
      >
        All Tickets
      </h2>

      {

        tickets.map((ticket) => (

          <div
            key={ticket._id}
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "14px",
              marginBottom: "20px",
              boxShadow:
                "0 4px 12px rgba(0,0,0,0.06)",
              borderLeft:
                ticket.status ===
                "Resolved"

                  ? "6px solid green"

                  : ticket.status ===
                    "In Progress"

                  ? "6px solid orange"

                  : "6px solid red",
            }}
          >

            <h3
              style={{
                color: "#2563eb",
                marginBottom: "10px",
              }}
            >
              {ticket.title}
            </h3>

            <p
              style={{
                marginBottom: "10px",
              }}
            >
              {ticket.description}
            </p>

            <p>
              <b>Priority:</b>{" "}
              {ticket.priority}
            </p>

            <p>
              <b>Department:</b>{" "}
              {
                ticket.department ||
                "Not Assigned"
              }
            </p>

            <p>
              <b>Assigned To:</b>{" "}
              {
                ticket.assignedTo ||
                "Not Assigned"
              }
            </p>

            <p>
              <b>Status:</b>{" "}
              {ticket.status}
            </p>

            {/* STATUS */}

            <select
              value={ticket.status}
              onChange={(e) =>
                updateStatus(
                  ticket._id,
                  e.target.value
                )
              }
              style={{
                marginTop: "12px",
                padding: "10px",
                borderRadius: "8px",
                border:
                  "1px solid #ccc",
              }}
            >

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

          </div>
        ))
      }

    </div>
  );
}

// =====================================
// COMMON STYLE
// =====================================

const inputStyle = {

  width: "100%",

  padding: "14px",

  marginBottom: "18px",

  borderRadius: "10px",

  border: "1px solid #d1d5db",

  fontSize: "15px",

  outline: "none",
};

export default CreateTicket;