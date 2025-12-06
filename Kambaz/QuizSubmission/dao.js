import { v4 as uuidv4 } from "uuid"
import model from "./model.js";

export default function QuizSubmissionsDao() {
  async function createQuizSubmission(quizSubmission) {
    const newQuizSubmission = { ...quizSubmission, _id: uuidv4() };
    return await model.create(newQuizSubmission);
  }

  async function findLatestQuizSubmissionsForUser(uid) {
    return await model.aggregate([
      { $match: { userId: uid } },
      { $sort: { createdAt: -1 } },
      {
        $group: {
          _id: "$quizId",
          latestSubmission: { $first: "$$ROOT" }
        }
      },
      {
        $project: {
          _id: 0,
          quizId: "$_id",
          latestSubmission: 1
        }
      }
    ]);
  }

  async function deleteQuizSubmission(qsid) {
    return await model.deleteOne({ _id: qsid});
  }

  async function findQuizSubmissionById(qsid) {
    return await model.findOne({ _id: qsid});
  }

 return {
   createQuizSubmission,
   findLatestQuizSubmissionsForUser,
   deleteQuizSubmission,
   findQuizSubmissionById,
 };
}