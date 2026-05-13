import { useEffect, useState } from "react";

function NotificationBell() {

  const [count, setCount] =
    useState(0);

  useEffect(() => {

    fetchNotifications();

    const interval =
      setInterval(() => {

        fetchNotifications();

      }, 5000);

    return () =>
      clearInterval(interval);

  }, []);

  const fetchNotifications =
    async () => {

      try {

        const response =
          await fetch(
            "http://localhost:5000/notifications-count"
          );

        const data =
          await response.json();

        setCount(data.count);

      } catch (error) {

        console.log(error);

      }
    };

  return (

    <div
      style={{
        position: "relative",
        display: "inline-block",
      }}
    >

      {/* BELL ICON */}

      <div
        style={{
          fontSize: "28px",
          cursor: "pointer",
        }}
      >
        🔔
      </div>

      {/* BADGE */}

      {

        count > 0 && (

          <span
            style={{
              position: "absolute",
              top: "-8px",
              right: "-8px",
              background: "red",
              color: "white",
              borderRadius: "50%",
              padding: "4px 8px",
              fontSize: "12px",
              fontWeight: "bold",
            }}
          >
            {count}
          </span>
        )
      }

    </div>
  );
}

export default NotificationBell;