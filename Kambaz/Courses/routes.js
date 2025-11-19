import CoursesDao from "./dao.js";
import EnrollmentsDao from "../Enrollments/dao.js";
export default function CourseRoutes(app) {
 const dao = CoursesDao(db);
 const enrollmentsDao = EnrollmentsDao(db);

  const createCourse = (req, res) => {
    const currentUser = req.session["currentUser"];
    const newCourse = dao.createCourse(req.body);
    enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id);
    res.json(newCourse);
  };

  const findAllCourses = async (req, res) => {
    const courses = await dao.findAllCourses();
    res.send(courses);
  }

  const deleteCourse = (req, res) => {
    const { courseId } = req.params;
    const status = dao.deleteCourse(courseId);
    res.send(status);
  }

  const updateCourse = async (req, res) => {
    const { courseId } = req.params;
    const courseUpdates = req.body;
    const status = await dao.updateCourse(courseId, courseUpdates);
    res.send(status);
  }
  
  const findCoursesForEnrolledUser = async (req, res) => {
    let { userId } = req.params;
    if (userId === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      userId = currentUser._id;
    }
    const courses = await dao.findCoursesForEnrolledUser(userId);
    res.json(courses);
  };

  app.get("/api/users/:userId/courses", findCoursesForEnrolledUser);
  app.get("/api/courses", findAllCourses);
  app.post("/api/users/current/courses", createCourse);
  app.delete("/api/courses/:courseId", deleteCourse);
  app.put("/api/courses/:courseId", updateCourse);
}
