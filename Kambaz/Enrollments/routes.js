import EnrollmentsDao from "./dao.js";

export default function EnrollmentsRoutes(app, db) {
  const dao = EnrollmentsDao(db);

  const findEnrollments = (req, res) => {
    const enrollments = dao.fetchEnrollments();
    res.json(enrollments);
  };

  const enroll = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }

    const { courseId } = req.body;

    dao.enrollUserInCourse(currentUser._id, courseId);
    res.sendStatus(200);
  };

  const unenroll = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }

    const { courseId } = req.params;

    const success = dao.unEnrollUserInCourse(currentUser._id, courseId);

    if (success) res.sendStatus(200);
    else res.sendStatus(404);
  };

  app.get("/api/enrollments", findEnrollments);
  app.post("/api/enrollments", enroll);
  app.delete("/api/enrollments/:courseId", unenroll);
}