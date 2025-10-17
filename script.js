const courseListSection = document.getElementById("course-list");
const courseDetailSection = document.getElementById("course-detail");
const coursesContainer = document.getElementById("courses");
const courseTitle = document.getElementById("course-title");
const lessonList = document.getElementById("lesson-list");
const backBtn = document.getElementById("back-btn");
const completeBtn = document.getElementById("complete-btn");
const progressText = document.getElementById("progress-text");

let coursesData = []; // will come from backend
let completedCourses = [];

// ✅ Fetch data from backend
async function loadCourses() {
  try {
    const res = await fetch("http://localhost:5000/courses");
    coursesData = await res.json();
    renderCourses();
  } catch (err) {
    console.error("❌ Error fetching courses:", err);
  }
}

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

function openCourse(id) {
  const course = coursesData.find(c => c.id === id);
  if (!course) return;

  courseListSection.classList.add("hidden");
  courseDetailSection.classList.remove("hidden");
  courseTitle.textContent = course.title;

  // Mock lessons (backend doesn't have them yet)
  lessonList.innerHTML = `
    <li>Lesson 1</li>
    <li>Lesson 2</li>
    <li>Lesson 3</li>
  `;

  updateProgress(course);
  completeBtn.onclick = () => markCompleted(id);
}

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

// ✅ Mark as completed using backend
async function markCompleted(id) {
  try {
    const res = await fetch(`http://localhost:5000/courses/${id}/complete`, {
      method: "POST",
    });
    const data = await res.json();
    console.log(data.message);

    // Update local data
    const course = coursesData.find(c => c.id === id);
    if (course) course.completed = true;

    updateProgress(course);
    renderCourses();
  } catch (err) {
    console.error("❌ Error marking course complete:", err);
  }
}

backBtn.addEventListener("click", () => {
  courseDetailSection.classList.add("hidden");
  courseListSection.classList.remove("hidden");
  renderCourses();
});

// ✅ Initial load
loadCourses();
