import express from 'express';
import Hello from "./Hello.js";
import Lab5 from "./Labs/Lab5/index.js";

import cors from "cors";
import db from "./Kambaz/Database/index.js";
import UserRoutes from "./Kambaz/Users/routes.js";
import CourseRoutes from "./Kambaz/Courses/routes.js";
import ModuleRoutes from "./Kambaz/Modules/routes.js";
import EnrollmentsRoutes from "./Kambaz/Enrollments/routes.js";
import AssignmentsRoutes from './Kambaz/Assignments/routes.js';

import "dotenv/config";
import session from "express-session";
const PORT = process.env.PORT || 4000;
const app = express();
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL || "http://localhost:3000",
  })
);
const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kambaz",
  resave: false,
  saveUninitialized: false,
  proxy: true,
  cookie: {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  }
};

if (process.env.SERVER_ENV === "development") {
  sessionOptions.cookie.secure = false;
  sessionOptions.cookie.sameSite = "lax";
}

app.use(session(sessionOptions));
app.use(express.json());

UserRoutes(app, db);
CourseRoutes(app, db);
ModuleRoutes(app, db);
AssignmentsRoutes(app, db);
EnrollmentsRoutes(app, db);
Lab5(app);
Hello(app);

app.listen(PORT, () => {
  console.log("Server running on http://localhost:4000");
});
