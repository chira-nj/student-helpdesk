import { useState } from "react";

import { useNavigate } from "react-router-dom";

function Login() {

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {

  e.preventDefault();

  try {

    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/login`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    const data =
      await response.json();

    console.log(data);

    alert(data.message);

    if (response.ok) {

      // SAVE TOKEN

      localStorage.setItem(
        "token",
        data.token
      );

      // SAVE ROLE

      localStorage.setItem(
        "role",
        data.user.role
      );

      // SAVE EMAIL

      localStorage.setItem(
        "email",
        data.user.email
      );

      // ROLE

      const role =
        data.user.role;

      // REDIRECTS

      if (role === "student") {

        navigate("/dashboard");

      }

      else if (
        role === "admin"
      ) {

        navigate("/admin");

      }

      else {

        navigate(`/${role}`);
      }
    }

  } catch (error) {

    console.log(error);

    alert(
      "Login Failed"
    );
  }
};

  return (

    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(to right, #dbeafe, #eff6ff)",
      }}
    >

      <div
        style={{
          width: "380px",
          background: "white",
          padding: "35px",
          borderRadius: "16px",
          boxShadow:
            "0 6px 18px rgba(0,0,0,0.1)",
        }}
      >

        <h1
          style={{
            textAlign: "center",
            marginBottom: "25px",
            color: "#2563eb",
          }}
        >
          Student Helpdesk
        </h1>

        <form onSubmit={handleLogin}>

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            style={inputStyle}
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            style={inputStyle}
          />

          <button
            type="submit"
            style={buttonStyle}
          >
            Login
          </button>

        </form>

        <p
          style={{
            textAlign: "center",
            marginTop: "20px",
          }}
        >
          Don't have an account?
        </p>

        <div
          style={{
            textAlign: "center",
          }}
        >

          <a
            href="/register"
            style={{
              color: "#2563eb",
              fontWeight: "bold",
              textDecoration: "none",
            }}
          >
            Register Here
          </a>

        </div>

      </div>

    </div>
  );
}

// STYLES

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "18px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "14px",
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  background: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "8px",
  fontSize: "16px",
  cursor: "pointer",
};

export default Login;