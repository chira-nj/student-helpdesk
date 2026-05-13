
import TicketTimeline from "./TicketTimeline";

function TicketModal({
  ticket,
  closeModal,
  updateStatus,
  deleteTicket,
  addComment,
  comment,
  setComment,
}) {

  if (!ticket) return null;

  return (

    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >

      <div
        style={{
          background: "white",
          width: "700px",
          maxHeight: "90vh",
          overflowY: "auto",
          padding: "30px",
          borderRadius: "16px",
          position: "relative",
        }}
      >

        <button
          onClick={closeModal}
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            background: "red",
            color: "white",
            border: "none",
            width: "35px",
            height: "35px",
            borderRadius: "50%",
            cursor: "pointer",
          }}
        >
          X
        </button>

        <h1
          style={{
            color: "#2563eb",
            marginBottom: "20px",
          }}
        >
          {ticket.title}
        </h1>

        <p
  style={{
    color: "#64748b",
    fontWeight: "bold",
    marginBottom: "20px",
  }}
>
  {ticket.ticketId}
</p>

        <p>
          <b>Description:</b>{" "}
          {ticket.description}
        </p>

        <p>
          <b>Priority:</b>{" "}
          {ticket.priority}
        </p>

        <p>

  <b>Status:</b>{" "}

  <span
    style={{
      padding: "6px 12px",
      borderRadius: "8px",
      color: "white",
      fontWeight: "bold",

      background:

        ticket.status ===
        "Pending"

          ? "#f59e0b"

          : ticket.status ===
            "In Progress"

          ? "#3b82f6"

          : "#22c55e",
    }}
  >

    {ticket.status}

  </span>

</p>

        <p>
          <b>Department:</b>{" "}
          {ticket.department}
        </p>

        <p>
          <b>Assigned To:</b>{" "}
          {ticket.assignedTo}
        </p>

        {/* COMMENTS */}

        <div
          style={{
            marginTop: "25px",
          }}
        >

          <h3>Comments</h3>

          {

            ticket.comments?.map(
              (c, index) => (

                <div
                  key={index}
                  style={{
                    background: "#f1f5f9",
                    padding: "10px",
                    borderRadius: "8px",
                    marginBottom: "10px",
                  }}
                >
                  {c.text}
                </div>
              )
            )
          }

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
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              marginTop: "10px",
            }}
          />

          <button
            onClick={() =>
              addComment(ticket._id)
            }

            style={{
              marginTop: "10px",
              background: "#2563eb",
              color: "white",
              border: "none",
              padding: "10px 16px",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Add Comment
          </button>

        </div>

        {/* TIMELINE */}

        <TicketTimeline
          timeline={ticket.timeline}
        />

        {/* ACTIONS */}

        <div
          style={{
            marginTop: "20px",
            display: "flex",
            gap: "10px",
          }}
        >

          <select
            value={ticket.status}
            onChange={(e) =>
              updateStatus(
                ticket._id,
                e.target.value
              )
            }

            style={{
              padding: "10px",
              borderRadius: "8px",
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

          <button
            onClick={() =>
              deleteTicket(ticket._id)
            }

            style={{
              background: "#ef4444",
              color: "white",
              border: "none",
              padding: "10px 16px",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}

export default TicketModal;