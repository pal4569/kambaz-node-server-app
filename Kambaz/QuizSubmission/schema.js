import mongoose from "mongoose";
const quizSubmissionSchema = new mongoose.Schema({
    _id: String,
    quizId: String,
    userId: String,

    submittedAt: String,
    score: Number,
    totalPoints: Number,

    answers: [{
        questionId: String,
        selectedChoices: [String],
        trueFalse: { type: Boolean, default: null },
        fillIn: String,
        correct: Boolean,
    }]
},
{ 
    collection: "quiz-submissions", 
    timestamps: true 
}
);
export default quizSubmissionSchema;