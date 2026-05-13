const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

require("dotenv").config();

const User = require("./models/User");
const Ticket = require("./models/Ticket");

const app = express();

// ======================================
// MIDDLEWARES
// ======================================

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json());

// ======================================
// DATABASE CONNECTION
// ======================================

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

// ======================================
// NODEMAILER
// ======================================

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ======================================
// HOME ROUTE
// ======================================

app.get("/", (req, res) => {
  res.send("Server Running");
});

// ======================================
// REGISTER
// ======================================

app.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const user = new User({
      name,
      email,
      password,
      role,
    });

    await user.save();

    res.json({
      message: "User Registered Successfully",
      user,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      error: err.message,
    });
  }
});

// ======================================
// LOGIN
// ======================================

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(400).json({
        message: "User Not Found",
      });
    }

    if (user.password !== password) {
      return res.status(400).json({
        message: "Invalid Password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },

      "secretkey"
    );

    res.json({
      message: "Login Success",
      token,
      user,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      error: err.message,
    });
  }
});

// ======================================
// CREATE TICKET
// ======================================

app.post("/create-ticket", async (req, res) => {
  try {
    const {
      title,
      description,
      priority,
      issueType,
      email,
    } = req.body;

    const assignedTo = issueType;

    const department = issueType;


    const randomId =
  Math.floor(
    1000 + Math.random() * 9000
  );

const ticketId =
  `HD-${randomId}`;

    const ticket = new Ticket({
        ticketId,
      title,
      description,
      priority,
      issueType,
      assignedTo,
      department,
      email,

      status: "Pending",

      timeline: [
        {
          action: "Ticket Created",
          time: new Date(),
        },
      ],
    });

    await ticket.save();

    // EMAIL SEND

    try {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Ticket Created",
    text: `Your ticket "${title}" has been created successfully.`,
  });

  console.log("Mail sent");
} catch (mailError) {
  console.log("Mail Error:", mailError);
}

    res.json({
      message: "Ticket Created Successfully",
      ticket,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      error: err.message,
    });
  }
});

// ======================================
// GET ALL TICKETS
// ======================================

app.get("/tickets", async (req, res) => {
  try {
    const tickets = await Ticket.find().sort({
      createdAt: -1,
    });

    res.json(tickets);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      error: err.message,
    });
  }
});

// ======================================
// ROLE BASED TICKETS
// ======================================

app.get("/role-tickets/:role", async (req, res) => {
  try {
    const role = req.params.role;

    const tickets = await Ticket.find({
      assignedTo: role,
    }).sort({
      createdAt: -1,
    });

    res.json(tickets);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      error: err.message,
    });
  }
});

// ======================================
// UPDATE STATUS
// ======================================

app.put("/tickets/:id", async (req, res) => {
  try {
    const { status } = req.body;

    const ticket = await Ticket.findById(req.params.id);

    ticket.status = status;

    ticket.timeline.push({
      action: `Status changed to ${status}`,
      time: new Date(),
    });

    await ticket.save();

    // EMAIL SEND

    await transporter.sendMail({
      from: "chiranjeevee1095@gmail.com",

      to: ticket.email,

      subject: "Ticket Status Updated",

      text: `Your ticket status changed to ${status}`,
    });

    res.json({
      message: "Ticket Updated Successfully",
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      error: err.message,
    });
  }
});

// ======================================
// ADD COMMENT
// ======================================

app.put("/tickets/:id/comment", async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);

    ticket.comments.push({
      text: req.body.text,
    });

    ticket.timeline.push({
      action: `Comment Added: ${req.body.text}`,
      time: new Date(),
    });

    await ticket.save();

    // EMAIL SEND

    await transporter.sendMail({
      from: "chiranjeevee1095@gmail.com",

      to: ticket.email,

      subject: "New Comment Added",

      text: `New update on your ticket: "${req.body.text}"`,
    });

    res.json({
      message: "Comment Added",
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      error: err.message,
    });
  }
});

// ======================================
// DELETE TICKET
// ======================================

app.delete("/tickets/:id", async (req, res) => {
  try {
    await Ticket.findByIdAndDelete(req.params.id);

    res.json({
      message: "Ticket Deleted Successfully",
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      error: err.message,
    });
  }
});

// ======================================
// MY TICKETS
// ======================================

app.get("/my-tickets/:email", async (req, res) => {
  try {
    const tickets = await Ticket.find({
      email: req.params.email,
    }).sort({
      createdAt: -1,
    });

    res.json(tickets);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      error: err.message,
    });
  }
});

// ======================================
// DASHBOARD SUMMARY
// ======================================

app.get("/dashboard-summary", async (req, res) => {
  try {
    const totalTickets =
      await Ticket.countDocuments();

    const pendingTickets =
      await Ticket.countDocuments({
        status: "Pending",
      });

    const inProgressTickets =
      await Ticket.countDocuments({
        status: "In Progress",
      });

    const resolvedTickets =
      await Ticket.countDocuments({
        status: "Resolved",
      });

    const closedTickets =
      await Ticket.countDocuments({
        status: "Closed",
      });

    res.json({
      totalTickets,
      pendingTickets,
      inProgressTickets,
      resolvedTickets,
      closedTickets,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      error: err.message,
    });
  }
});

// ======================================
// OVERDUE TICKETS
// ======================================

app.get("/overdue-tickets", async (req, res) => {
  try {
    const threeDaysAgo = new Date();

    threeDaysAgo.setDate(
      threeDaysAgo.getDate() - 3
    );

    const overdueTickets =
      await Ticket.find({
        createdAt: {
          $lte: threeDaysAgo,
        },

        status: {
          $ne: "Resolved",
        },
      });

    res.json(overdueTickets);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      error: err.message,
    });
  }
});

// ======================================
// NOTIFICATION COUNT
// ======================================

app.get("/notifications-count", async (req, res) => {
  try {
    const pendingCount =
      await Ticket.countDocuments({
        status: "Pending",
      });

    res.json({
      count: pendingCount,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      error: err.message,
    });
  }
});

// ======================================
// TICKET TIMELINE
// ======================================

app.get("/ticket-timeline/:id", async (req, res) => {
  try {
    const ticket = await Ticket.findById(
      req.params.id
    );

    res.json(ticket.timeline);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      error: err.message,
    });
  }
});

// ======================================
// SERVER
// ======================================

app.listen(5000, () => {
  console.log(
    "Server Started on Port 5000"
  );
});