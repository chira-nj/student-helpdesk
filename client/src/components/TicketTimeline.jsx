function TicketTimeline({
  timeline,
}) {

  if (!timeline)
    return null;

  return (

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
        Timeline
      </h3>

      {

        timeline.map(
          (item, index) => (

            <div
              key={index}
              style={{
                padding: "10px",
                background: "#f8fafc",
                borderRadius: "8px",
                marginBottom: "10px",
              }}
            >

              <p>
                {item.action}
              </p>

              <small>
                {
                  new Date(
                    item.time
                  ).toLocaleString()
                }
              </small>

            </div>
          )
        )
      }

    </div>
  );
}

export default TicketTimeline;