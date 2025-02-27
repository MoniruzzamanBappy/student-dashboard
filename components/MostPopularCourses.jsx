export default function MostPopularCourses({ courses = [] }) {
  const popularCourses = [...courses]
    .sort((a, b) => b.enrollment - a.enrollment) // Sort by Enrollment (Highest First)
    .slice(0, 5);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-900 flex items-center">
        🔥 Most Popular Courses
      </h2>
      <ul className="mt-4 space-y-3">
        {popularCourses.map((course) => (
          <li
            key={course.id}
            className="flex justify-between items-center bg-gray-100 p-3 rounded-lg hover:bg-gray-200 transition"
          >
            <span className="text-md font-medium">{course.title}</span>
            <span className="px-3 py-1 bg-blue-500 text-white text-sm rounded-md">
              {course.enrollment} students
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
