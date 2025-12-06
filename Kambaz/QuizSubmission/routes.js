import QuizSubmissionsDao from "./dao.js";
export default function QuizSubmissionRoutes(app) {
  const dao = QuizSubmissionsDao();

  const createQuizSubmission = async (req, res) => {
    const { qid } = req.params;
    const quizSubmission = {
      ...req.body,
      quizId: qid,
    };
    const newQuizSubmission = await dao.createQuizSubmission(quizSubmission);
    res.send(newQuizSubmission);
  };

  const findLatestQuizSubmissionsForUser = async (req, res) => {
    const { uid } = req.params;
    const submissions = await dao.findLatestQuizSubmissionsForUser(uid);

    res.json(submissions);
  };

  const findQuizSubmissionById = async (req, res) => {
    const { qsid } = req.params;
    const quizSubmission = await dao.findQuizSubmissionById(qsid);
    res.json(quizSubmission ?? {});
  };

  const deleteQuizSubmission = async (req, res) => {
    const { qsid } = req.params;
    const status = await dao.deleteQuizSubmission(qsid);
    res.send(status);
  };

  app.post("/api/quiz-submissions/:qid", createQuizSubmission);
  app.get("/api/quiz-submissions/user/:uid", findLatestQuizSubmissionsForUser);
  app.get("/api/quiz-submissions/:qsid", findQuizSubmissionById);
  app.delete("/api/quiz-submissions/:sid", deleteQuizSubmission);
}
