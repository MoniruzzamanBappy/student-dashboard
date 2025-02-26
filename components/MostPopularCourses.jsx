export default function MostPopularCourses({ courses = [] }) {
  const popularCourses = [...courses]
    .sort((a, b) => b.enrollment - a.enrollment) // Sort by Enrollment (Highest First)
    .slice(0, 5);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold">🔥 Most Popular Courses</h2>
      <ul className="mt-2">
        {popularCourses.map((course) => (
          <li key={course.id} className="border-b p-2">
            {course.title} - {course.enrollment} students
          </li>
        ))}
      </ul>
    </div>
  );
}
