const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
  {
    // TITLE

    title: {
      type: String,
      required: true,
      trim: true,
    },
    ticketId: {
  type: String,
},

    // DESCRIPTION

    description: {
      type: String,
      required: true,
      trim: true,
    },

    // USER EMAIL

    email: {
      type: String,
      required: true,
    },

    // PRIORITY

    priority: {
      type: String,
      required: true,

      enum: [
        "Low",
        "Medium",
        "High",
        "Critical",
      ],
    },

    // ISSUE TYPE

    issueType: {
      type: String,
      required: true,
    },

    // ASSIGNED TO

    assignedTo: {
      type: String,
      required: true,
    },

    // DEPARTMENT

    department: {
      type: String,
      required: true,
    },

    // COMMENTS

    comments: [
      {
        text: String,

        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    // TIMELINE / ACTIVITY LOG

    timeline: [
      {
        action: String,

        time: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    // STATUS

    status: {
      type: String,

      default: "Pending",

      enum: [
        "Pending",
        "In Progress",
        "Resolved",
        "Closed",
      ],
    },
  },

  // AUTO CREATED AT & UPDATED AT

  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Ticket",
  ticketSchema
);