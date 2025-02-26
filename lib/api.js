import axios from "axios";

// Mock API URL
const API_BASE_URL = "https://jsonplaceholder.typicode.com";

// Fetch Students (Adding GPA for Leaderboard (100 student) and Year/Courses for Filtering)
export const fetchStudents = async () => {
  const response = await axios.get(`${API_BASE_URL}/users`);
  return response.data.map((student, index) => ({
    ...student,
    gpa: (Math.random() * 4).toFixed(2), // Mock GPA (0-4)
    year: ["Freshman", "Sophomore", "Junior", "Senior"][index % 4], // Mock Year
    courses: ["Math", "Science", "History", "English", "Art"].slice(
      index % 3,
      (index % 3) + 2
    ), // Mock Courses
  }));
};

// Fetch Courses (Adding Enrollment Count)
export const fetchCourses = async () => {
  const response = await axios.get(`${API_BASE_URL}/posts`);
  return response.data.map((course) => ({
    ...course,
    enrollment: Math.floor(Math.random() * 200), // Mock Enrollment (0-200)
  }));
};
