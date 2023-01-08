import env from "dotenv"
env.config()
const port = process.env.PORT || 9000;
import express from 'express'
import bodyParser from 'body-parser'
import route from "./router.js"
import legit from "legit"
export var Email;
const app = express()

app.set('view engine', 'ejs');
 app.use(express.static("public"))
 app.use(express.static("assets"))
app.use(bodyParser.urlencoded({ extended: true }));

import mongoose from "mongoose"
import User from "./model/user.js"
const {urlencoded} = bodyParser
mongoose.connect(process.env.MONGO_URI);

app.get('/', (req, res) => {
    res.render('home', {msg: ""});
})

app.post("/",  async(req, res) => {
    const email = req.body.email;
    if (!email) {
        res.render("home", { msg: "Can Not Proceed Without Email" });
    } else {
        const result = await legit(email);
        if(result.isValid){
             User.findOne({ email: email }, (err, found) => {
                if (!found) {
                    Email = email;
                    res.redirect("/quiz/page1")
                } else if (found) {
                    res.render("home", { msg: "Email Already in Use"});
                } else if (err){
                    console.log(err);
                }
            })
        } else {
            res.render("home", { msg: "Can not verify Email" });
            console.log("Not Valid");
        }
    }
})

app.use("/quiz", route);

app.listen(port, (req, res) => {
    console.log(`Server Listening on ${port} http://localhost:${port}`);
})