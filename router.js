import express from "express";
import env from "dotenv";
env.config();
var router = express.Router();
import { quiz1, quiz2, quiz3 } from "./quiz.js";
import result from "./functions/result.js";
let a,b,c = "";
let choices = [];
import Ans from "./functions/chat.js"
import { Email } from "./server.js";

import mongoose from "mongoose";
import User from "./model/user.js";
mongoose.set("strictQuery", true);
mongoose.connect(process.env.MONGO_URI, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected To DB");
  }
});

const app = express();
app.use(express.static("public"));
app.use(express.static("assets"));

router.get("/page1", (req, res) => {
  res.render("quiz", { quiz: quiz1, href: "page1", text: "Next" });
});

router.post("/page1", (req, res) => {
  a = req.body.radio;
  if (a) {
    if (!choices.includes(a)) {
      choices.push(a);
    }
    res.render("quiz", { quiz: quiz2, href: "page2", text: "Next" });
  } else {
    res.render("quiz", { quiz: quiz1, href: "page1", text: "Next" });
  }
});

router.post("/page2", (req, res) => {
  b = req.body.radio;
  if (b) {
    if (!choices.includes(b)) {
      choices.push(b);
    }
    res.render("quiz", { quiz: quiz3, href: "page3", text: "Submit" });
  } else {
    res.render("quiz", { quiz: quiz2, href: "page2", text: "Next" });
  }
});

router.post("/page3", async (req, res) => {
  c = req.body.radio;
  if (c) {
    if (!choices.includes(c)) {
      choices.push(c);
    }
    let prompt = result(a, b, c);
    let answer = await Ans(prompt)
    const newUser = new User({
      email: Email,
      choices: choices,
      prompt: prompt,
    });

    newUser.save((err) => {
      if (!err) {
        res.render("output", { result: answer, headerText: a });
      } else {
        console.log(err);
      }
    });
  } else {
    res.render("quiz", { quiz: quiz3, href: "page3", text: "Submit" });
  }
});

export default router;
