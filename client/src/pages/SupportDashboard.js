import React, {
  useEffect,
  useState,
} from "react";
function SupportDashboard() {

  const [tickets, setTickets] =
    useState([]);

  const [comment, setComment] =
    useState("");

  const role =
    localStorage.getItem("role");

  // FETCH TICKETS

  const fetchTickets = React.useCallback(async () => {

    try {

      const response =
        await fetch(

          `${process.env.REACT_APP_API_URL}/role-tickets/${role}`
        );

      const data =
        await response.json();

      setTickets(data);

    } catch (error) {

      console.log(error);

    }
}, [role]);

useEffect(() => {

  fetchTickets();

}, [fetchTickets]);

  // UPDATE STATUS

  const updateStatus =
    async (id, status) => {

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

  // ADD COMMENT

  const addComment =
    async (id) => {

      if (!comment) return;

      try {

        await fetch(

          `http://localhost:5000/tickets/${id}/comment`,

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

  return (

    <div
      style={{
        minHeight: "100vh",
        background: "#eef2ff",
        padding: "40px",
      }}
    >

      <h1
        style={{
          textAlign: "center",
          color: "#2563eb",
          marginBottom: "40px",
        }}
      >
        Support Dashboard
      </h1>

      {

        tickets.length === 0 ?

          (

            <h2
              style={{
                textAlign: "center",
                color: "#555",
              }}
            >
              No Tickets Assigned
            </h2>

          )

        :

        tickets.map((ticket) => (

          <div
            key={ticket._id}
            style={{
              background: "white",
              padding: "25px",
              borderRadius: "16px",
              marginBottom: "25px",
              boxShadow:
                "0 4px 12px rgba(0,0,0,0.08)",
            }}
          >

            {/* TITLE */}

            <h2
              style={{
                color: "#2563eb",
                marginBottom: "10px",
              }}
            >
              {ticket.title}
            </h2>

            {/* DESCRIPTION */}

            <p
              style={{
                marginBottom: "10px",
                color: "#444",
              }}
            >
              {ticket.description}
            </p>

            {/* DETAILS */}

            <p>
              <b>Priority:</b>{" "}
              {ticket.priority}
            </p>

            <p>
              <b>Department:</b>{" "}
              {ticket.department}
            </p>

            <p>
              <b>Status:</b>{" "}
              {ticket.status}
            </p>

            {/* STATUS UPDATE */}

            <select
              value={ticket.status}

              onChange={(e) =>
                updateStatus(
                  ticket._id,
                  e.target.value
                )
              }

              style={{
                width: "100%",
                padding: "12px",
                marginTop: "15px",
                borderRadius: "10px",
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

            {/* COMMENTS */}

            <div
              style={{
                marginTop: "25px",
              }}
            >

              <h3
                style={{
                  color: "#2563eb",
                  marginBottom: "15px",
                }}
              >
                Comments
              </h3>

              {

                ticket.comments?.length > 0 ?

                  ticket.comments.map(

                    (c, index) => (

                      <div
                        key={index}
                        style={{
                          background:
                            "#f1f5f9",

                          padding: "12px",

                          borderRadius:
                            "10px",

                          marginBottom:
                            "10px",
                        }}
                      >

                        <p>
                          {c.text}
                        </p>

                      </div>
                    )
                  )

                :

                <p>
                  No Comments Yet
                </p>
              }

              {/* COMMENT INPUT */}

              <input
                type="text"

                placeholder="Add Comment"

                value={comment}

                onChange={(e) =>
                  setComment(
                    e.target.value
                  )
                }

                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "10px",
                  border:
                    "1px solid #ccc",
                  marginTop: "15px",
                }}
              />

              {/* BUTTON */}

              <button
                onClick={() =>
                  addComment(
                    ticket._id
                  )
                }

                style={{
                  marginTop: "15px",
                  background:
                    "#2563eb",
                  color: "white",
                  border: "none",
                  padding:
                    "12px 18px",
                  borderRadius:
                    "10px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Add Comment
              </button>

            </div>

          </div>
        ))
      }

    </div>
  );
}

export default SupportDashboard;