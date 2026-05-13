import { useEffect, useState } from "react";

function SummaryCards() {

  const [summary, setSummary] =
    useState({});

  useEffect(() => {

    fetchSummary();

  }, []);

  const fetchSummary = async () => {

    try {

      const response =
        await fetch(
          "http://localhost:5000/dashboard-summary"
        );

      const data =
        await response.json();

      setSummary(data);

    } catch (error) {

      console.log(error);

    }
  };

  const cards = [

    {
      title: "Total Tickets",
      value:
        summary.totalTickets || 0,
      color: "#2563eb",
      bg: "#dbeafe",
      icon: "🎫",
    },

    {
      title: "Pending",
      value:
        summary.pendingTickets || 0,
      color: "#f59e0b",
      bg: "#fef3c7",
      icon: "⏳",
    },

    {
      title: "In Progress",
      value:
        summary.inProgressTickets || 0,
      color: "#7c3aed",
      bg: "#ede9fe",
      icon: "🚀",
    },

    {
      title: "Resolved",
      value:
        summary.resolvedTickets || 0,
      color: "#22c55e",
      bg: "#dcfce7",
      icon: "✅",
    },

    {
      title: "Closed",
      value:
        summary.closedTickets || 0,
      color: "#64748b",
      bg: "#e2e8f0",
      icon: "📁",
    },
  ];

  return (

    <div
      style={{
        display: "grid",

        gridTemplateColumns:
          "repeat(auto-fit,minmax(240px,1fr))",

        gap: "24px",

        marginTop: "30px",

        marginBottom: "40px",
      }}
    >

      {
        cards.map(
          (card, index) => (

            <div
              key={index}

              style={{
                background: "white",

                borderRadius: "28px",

                padding: "28px",

                boxShadow:
                  "0 8px 24px rgba(0,0,0,0.06)",

                position: "relative",

                overflow: "hidden",

                transition: "0.3s",
              }}
            >

              {/* TOP */}

              <div
                style={{
                  display: "flex",

                  justifyContent:
                    "space-between",

                  alignItems:
                    "center",

                  marginBottom:
                    "25px",
                }}
              >

                <div
                  style={{
                    width: "65px",

                    height: "65px",

                    borderRadius:
                      "20px",

                    background:
                      card.bg,

                    display: "flex",

                    justifyContent:
                      "center",

                    alignItems:
                      "center",

                    fontSize: "30px",
                  }}
                >
                  {card.icon}
                </div>

                <div
                  style={{
                    width: "12px",

                    height: "12px",

                    borderRadius:
                      "50%",

                    background:
                      card.color,
                  }}
                />

              </div>

              {/* TITLE */}

              <p
                style={{
                  color: "#64748b",

                  fontSize: "16px",

                  marginBottom:
                    "10px",

                  fontWeight: "500",
                }}
              >
                {card.title}
              </p>

              {/* VALUE */}

              <h1
                style={{
                  fontSize: "48px",

                  color: "#0f172a",

                  fontWeight: "700",
                }}
              >
                {card.value}
              </h1>

              {/* BOTTOM BAR */}

              <div
                style={{
                  position: "absolute",

                  bottom: 0,

                  left: 0,

                  width: "100%",

                  height: "6px",

                  background:
                    card.color,
                }}
              />

            </div>
          )
        )
      }

    </div>
  );
}

export default SummaryCards;