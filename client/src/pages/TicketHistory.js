import { useEffect, useState } from "react";

function TicketHistory() {

  const [tickets, setTickets] =
    useState([]);

  // =====================================
  // FETCH USER TICKETS
  // =====================================

  const fetchTickets = async () => {

    try {

      const email =
        localStorage.getItem(
          "email"
        );

      const response =
        await fetch(

          `${process.env.REACT_APP_API_URL}/my-tickets/${email}`
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

  return (

    <div
      style={{
        minHeight: "100vh",
        background: "#f4f7fb",
      }}
    >

      {/* NAVBAR */}

      <div
        style={{
          background: "#2563eb",
          padding: "15px 30px",
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
          color: "white",
        }}
      >

        <h2>
          Ticket History
        </h2>

        <div>

          <a
            href="/dashboard"
            style={{
              color: "white",
              marginRight: "20px",
              textDecoration:
                "none",
              fontWeight: "bold",
            }}
          >
            Dashboard
          </a>

          <a
            href="/"
            style={{
              color: "white",
              textDecoration:
                "none",
              fontWeight: "bold",
            }}
          >
            Logout
          </a>

        </div>

      </div>

      {/* CONTENT */}

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
          My Tickets
        </h1>

        {

          tickets.length === 0 ?

            (

              <h2
                style={{
                  textAlign:
                    "center",
                  color: "#555",
                }}
              >
                No Tickets Found
              </h2>

            )

          :

          tickets.map((ticket) => (

            <div
              key={ticket._id}
              style={{
                background:
                  "white",

                padding: "20px",

                borderRadius:
                  "12px",

                marginBottom:
                  "20px",

                boxShadow:
                  "0 4px 10px rgba(0,0,0,0.08)",

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

              {/* TITLE */}

              <h3
                style={{
                  marginBottom:
                    "10px",

                  color:
                    "#2563eb",
                }}
              >
                {ticket.title}
              </h3>

              {/* DESCRIPTION */}

              <p
                style={{
                  marginBottom:
                    "10px",
                }}
              >
                {ticket.description}
              </p>

              {/* PRIORITY */}

              <p>
                <b>
                  Priority:
                </b>{" "}
                {ticket.priority}
              </p>

              {/* DEPARTMENT */}

              <p>
                <b>
                  Department:
                </b>{" "}
                {
                  ticket.department ||
                  "Not Assigned"
                }
              </p>

              {/* ASSIGNED TO */}

              <p>
                <b>
                  Assigned To:
                </b>{" "}
                {
                  ticket.assignedTo ||
                  "Not Assigned"
                }
              </p>

              {/* STATUS */}

              <p>
                <b>Status:</b>{" "}
                {ticket.status}
              </p>

              {/* DATE */}

              <p>
                <b>
                  Created:
                </b>{" "}
                {
                  new Date(
                    ticket.createdAt
                  ).toLocaleString()
                }
              </p>

              {/* COMMENTS */}

              <div
                style={{
                  marginTop:
                    "20px",
                }}
              >

                <h4
                  style={{
                    color:
                      "#2563eb",

                    marginBottom:
                      "10px",
                  }}
                >
                  Comments
                </h4>

                {

                  ticket.comments
                    ?.length > 0 ?

                    ticket.comments.map(

                      (
                        comment,
                        index
                      ) => (

                        <div
                          key={index}
                          style={{
                            background:
                              "#f1f5f9",

                            padding:
                              "10px",

                            borderRadius:
                              "8px",

                            marginBottom:
                              "10px",
                          }}
                        >

                          <p>
                            {
                              comment.text
                            }
                          </p>

                        </div>
                      )
                    )

                  :

                  <p>
                    No Comments Yet
                  </p>
                }

              </div>

            </div>
          ))
        }

      </div>

    </div>
  );
}

export default TicketHistory;