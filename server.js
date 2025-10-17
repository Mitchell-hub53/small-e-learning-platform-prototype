// server.js
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let courses = [
  { id: 1, title: "HTML Fundamentals", completed: false },
  { id: 2, title: "CSS Styling", completed: false },
  { id: 3, title: "JavaScript Essentials", completed: false }
];

// Get all courses
app.get("/courses", (req, res) => res.json(courses));

// Mark a course as completed
app.post("/courses/:id/complete", (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).json({ message: "Course not found" });
  course.completed = true;
  res.json({ message: "Course marked completed", course });
});

// Start server
app.listen(5000, () => console.log("✅ Backend running on http://localhost:5000"));
