// DOM elements
const courseListSection = document.getElementById("course-list");
const courseDetailSection = document.getElementById("course-detail");
const coursesContainer = document.getElementById("courses");
const courseTitle = document.getElementById("course-title");
const lessonList = document.getElementById("lesson-list");
const backBtn = document.getElementById("back-btn");
const completeBtn = document.getElementById("complete-btn");
const progressText = document.getElementById("progress-text");

let coursesData = [];

// ✅ Load data from local file (works on Netlify)git add script.js
async function loadCourses() {
  try {
    const res = await fetch("courses.json"); // Fetch the local file
    coursesData = await res.json();
    renderCourses();
  } catch (err) {
    console.error("❌ Error fetching courses:", err);
    coursesContainer.innerHTML = "<p>⚠️ Failed to load courses. Please refresh.</p>";
  }
}

// ✅ Display all courses
function renderCourses() {
  coursesContainer.innerHTML = "";
  coursesData.forEach(course => {
    const card = document.createElement("div");
    card.className = "course-card";
    card.innerHTML = `
      <h3>${course.title}</h3>
      <p><strong>Status:</strong> ${course.completed ? "✅ Completed" : "🕓 In Progress"}</p>
    `;
    card.addEventListener("click", () => openCourse(course.id));
    coursesContainer.appendChild(card);
  });
}

// ✅ Open course detail
function openCourse(id) {
  const course = coursesData.find(c => c.id === id);
  if (!course) return;

  courseListSection.classList.add("hidden");
  courseDetailSection.classList.remove("hidden");
  courseTitle.textContent = course.title;

  // Mock lessons (you can later replace with real data)
  lessonList.innerHTML = `
    <li>Lesson 1: Introduction</li>
    <li>Lesson 2: Practice Session</li>
    <li>Lesson 3: Quiz & Summary</li>
  `;

  updateProgress(course);
  completeBtn.onclick = () => markCompleted(id);
}

// ✅ Update progress text and button state
function updateProgress(course) {
  if (course.completed) {
    progressText.textContent = "🎉 You have completed this course!";
    completeBtn.disabled = true;
    completeBtn.style.backgroundColor = "#6b7280";
  } else {
    progressText.textContent = "You are currently learning this course.";
    completeBtn.disabled = false;
    completeBtn.style.backgroundColor = "#1e3a8a";
  }
}

// ✅ Mark course as completed (local only)
function markCompleted(id) {
  const course = coursesData.find(c => c.id === id);
  if (course) {
    course.completed = true;
    updateProgress(course);
    renderCourses();
  }
}

// ✅ Handle back navigation
backBtn.addEventListener("click", () => {
  courseDetailSection.classList.add("hidden");
  courseListSection.classList.remove("hidden");
  renderCourses();
});

// ✅ Initial load
loadCourses();
