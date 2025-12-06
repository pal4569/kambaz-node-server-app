import mongoose from "mongoose";
const quizSchema = new mongoose.Schema({
    _id : String,
    name: {type: String, required: true},
    published: Boolean,
    instructions: String,
    questions: Number,
    course: String,

    quizType: String, // Graded Quiz (default), Practice Quiz, Graded Survey, Ungraded Survey
    points: Number,
    assignmentGroup: String, // Quizzes (default), Exams, Assignments, Project
    shuffleAnswers: Boolean, // true default
    timeLimit: Number, // 20 mins default
    multipleAttempts: String, // false default
    howManyAttempts: Number, // 1 default
    showCorrectAnswers: String,
    accessCode: String,
    oneQuestionAtATime: Boolean, // true default
    webcamRequired: Boolean, // false default
    lockQuestionsAfterAnswering: Boolean, // false default
    viewResponses: Boolean,
    requireLockdown: Boolean,
    requireResults: Boolean,
  
    dueDate: String,
    available: String,
    untilDate: String,

    questions: [{
      _id: String,

      title: String,
      points: Number,
      questionText: String,
      questionType: {
        type: String,
        enum: ["multiple-choice", "true-false", "fill-in-the-blank"]
      },

      choices: [{
        _id: String,
        text: String,
        isCorrect: Boolean
      }],

      correctBoolean: Boolean,
      correctText: String,

      answers: [String],
    }]
  },
  { collection: "quizzes" }
);
export default quizSchema;
