import { v4 as uuidv4 } from "uuid"
import model from "./model.js";

export default function QuizzesDao() {
  function createQuiz(quiz) {
    const defaultQuestion = {
      _id: uuidv4(),
      title: "Test question",
      points: 10,
      questionText: "This is a test question",
      questionType: "multiple-choice",

      choices: [
        { _id: uuidv4(), text: "Option correct", isCorrect: true },
        { _id: uuidv4(), text: "Option incorrect", isCorrect: false }
      ],

      correctBoolean: null,
      correctText: null,
      answers: []
    };

    const newQuiz = {
      ...quiz,
      _id: uuidv4(),
      questions: quiz.questions?.length ? quiz.questions : [defaultQuestion]
    };

    return model.create(newQuiz);
  }

  async function findQuizzesForCourse(courseId) {
    return await model.find({ course: courseId });
  }

  async function deleteQuiz(qid) {
    return await model.deleteOne({ _id: qid});
  }

  async function updateQuiz(qid, quizUpdates) {
    return await model.findByIdAndUpdate(
      qid,
      { $set: quizUpdates },
      { new: true}
    );
  }

  async function findQuizById(qid) {
    return await model.findOne({ _id: qid});
  }


 return {
   findQuizzesForCourse,
   createQuiz,
   deleteQuiz,
   updateQuiz,
   findQuizById,
 };
}
