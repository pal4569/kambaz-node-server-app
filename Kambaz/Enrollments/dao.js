import { v4 as uuidv4 } from "uuid";
export default function EnrollmentsDao(db) {
  function enrollUserInCourse(userId, courseId) {
    const { enrollments } = db;
    enrollments.push({ _id: uuidv4(), user: userId, course: courseId });
  }

  function unEnrollUserInCourse(userId, courseId) {
    const { enrollments } = db;
    const index = enrollments.findIndex(
      e => e.user === userId && e.course === courseId
    );

    if (index !== -1) {
      enrollments.splice(index, 1);
      return true;
    }

    return false;
  }


  function fetchEnrollments() {
    return db.enrollments;
  }

  return { enrollUserInCourse, unEnrollUserInCourse, fetchEnrollments };
}
