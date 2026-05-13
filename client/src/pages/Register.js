import { useState } from "react";

function Register() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");

  const handleRegister = async (e) => {

    e.preventDefault();

    try {

      const response = await fetch("http://localhost:5000/register", {

        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name,
          email,
          password,
          role,
        }),
      });

      const data = await response.json();

      alert(data.message);

      setName("");
      setEmail("");
      setPassword("");

    } catch (error) {

      console.log(error);

    }
  };

  return (

    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f4f7fb",
      }}
    >

      <div
        style={{
          width: "380px",
          background: "white",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        }}
      >

        <h2
          style={{
            textAlign: "center",
            marginBottom: "25px",
            color: "#2563eb",
          }}
        >
          Create Account
        </h2>

        <form onSubmit={handleRegister}>

          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "15px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "14px",
            }}
          />

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "15px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "14px",
            }}
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "15px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "14px",
            }}
          />

          <select
  value={role}
  onChange={(e) => setRole(e.target.value)}
  style={{
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    marginBottom: "15px",
    border: "1px solid #ccc",
  }}
>

  <option value="student">
    Student
  </option>

  <option value="admin">
    Admin
  </option>

  <option value="superadmin">
    Super Admin
  </option>

  <option value="itsupport">
    IT Support
  </option>

  <option value="maintenance">
    Maintenance
  </option>

  <option value="accounts">
    Accounts
  </option>

  <option value="placementofficer">
    Placement Officer
  </option>

  <option value="hosteladmin">
    Hostel Admin
  </option>

  <option value="labassistant">
    Lab Assistant
  </option>

  <option value="faculty">
    Faculty
  </option>

  <option value="librarian">
    Librarian
  </option>

  <option value="transportmanager">
    Transport Manager
  </option>

  <option value="examcell">
    Exam Cell
  </option>

  <option value="hod">
    HOD
  </option>

  <option value="principal">
    Principal
  </option>

  <option value="security">
    Security
  </option>

  <option value="cleaningstaff">
    Cleaning Staff
  </option>

  <option value="networkengineer">
    Network Engineer
  </option>

  <option value="electrician">
    Electrician
  </option>

  <option value="technician">
    Technician
  </option>

</select>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              background: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Register
          </button>

        </form>

        <p
          style={{
            textAlign: "center",
            marginTop: "20px",
          }}
        >
          Already have an account?
        </p>

        <div style={{ textAlign: "center" }}>

          <a
            href="/"
            style={{
              color: "#2563eb",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Login Here
          </a>

        </div>

      </div>

    </div>
  );
}

export default Register;