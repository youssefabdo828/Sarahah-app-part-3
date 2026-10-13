import './Config/env.config.js'
import express from "express";
import authcontroller from "./modules/Auth/auth.controller.js";
import userController from "./modules/User/user.controller.js";
import messageController from "./modules/Message/message.controller.js";
import  connectDB  from "./DB/connection.js";
import globalErrorHandler from './Middlewares/global-error-handler.middleware.js';

const app = express();

app.use(express.json());




connectDB();

app.use("/auth", authcontroller);
app.use("/user", userController);
app.use("/message", messageController);




app.all("/*dummy", (req, res) => {
    return res.status(404).json({
        message: "Route not found"
    });
});



app.use(globalErrorHandler);




app.use((err, req, res, next) => {
    const statusCode = err?.cause?.status || 500;

    return res.status(statusCode).json({
        err,
        message: err.message || "Internal Server Error",
        stack: err.stack || "No stack trace available",
    });
});


const PORT = process.env.PORT || 3000;

function startServer() {
  app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
  });
}

startServer();



// console.log(process.env);
