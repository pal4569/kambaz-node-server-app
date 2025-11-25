import { v4 as uuidv4 } from "uuid";
import model from "./model.js";

export default function CoursesDao() {
  function findAllCourses() {
    return model.find({});
  }

  function createCourse(course) {
    const newCourse = { ...course, _id: uuidv4() };
    return model.create(newCourse);
  }

  async function findCoursesForEnrolledUser(userId) {
  const courses = await model.find({});
  const enrolledCourses = courses.filter((course) =>
    enrollments.some(
      (enrollment) =>
        enrollment.user === userId && enrollment.course === course._id
    )
  );
  return enrolledCourses;
  }

  async function deleteCourse(courseId) {
    return await model.deleteOne({ _id: courseId });
  }

  async function updateCourse(courseId, courseUpdates) {
    return await model.findByIdAndUpdate(
      courseId,
      { $set: courseUpdates },
      { new: true }
    );
  }

  

  return {
    findAllCourses,
    findCoursesForEnrolledUser,
    createCourse,
    deleteCourse,
    updateCourse,
  };
}
