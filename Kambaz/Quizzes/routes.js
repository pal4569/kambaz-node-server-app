import QuizzesDao from "../Quizzes/dao.js";
export default function QuizzesRoutes(app, db) {
  const dao = QuizzesDao();

  const findQuizzesForCourse = async (req, res) => {
    const { courseId } = req.params;
    const quizzes = await dao.findQuizzesForCourse(courseId);
    res.json(quizzes);
  }

  const createQuizForCourse = async (req, res) => {
    const { courseId } = req.params;
    const quiz = {
      ...req.body,
      quiz: courseId,
    };
    const newQuiz = await dao.createQuiz(quiz);
    res.send(newQuiz);
  }

  const deleteQuiz = async (req, res) => {
    const { qid } = req.params;
    const status = await dao.deleteQuiz(qid);
    res.send(status);
  }

  const updateQuiz = async (req, res) => {
    const { qid } = req.params;
    const quizUpdates = req.body;
    const status = await dao.updateQuiz(qid, quizUpdates);
    res.send(status);
  }

  const findQuizById = async (req, res) => {
    const { qid } = req.params;
    const quiz = await dao.findQuizById(qid);
    res.json(quiz ?? {});
  }

  app.post("/api/courses/:courseId/quizzes", createQuizForCourse);
  app.get("/api/courses/:courseId/quizzes", findQuizzesForCourse);
  app.delete("/api/quizzes/:qid", deleteQuiz);
  app.put("/api/quizzes/:qid", updateQuiz);
  app.get("/api/courses/:courseId/quizzes/:qid", findQuizById);
}