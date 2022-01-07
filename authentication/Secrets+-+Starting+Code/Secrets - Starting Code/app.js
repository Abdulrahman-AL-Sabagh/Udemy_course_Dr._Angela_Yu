//jshint esversion:
require("dotenv").config()
const express = require("express");
const app = express();
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require("passport-google-oauth20").Strategy
const findOrCreate = require("mongoose-findorcreate");




app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(session({
    secret: "Our little secret.",
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session())





mongoose.connect("mongodb://localhost:27017/userDB");
const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    googleId: String
})
userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate)
const User = mongoose.model("User", userSchema);

passport.use(User.createStrategy());
passport.serializeUser((user, done) => {
    done(null, user.id)
});
passport.deserializeUser((id, done) => {
    User.findById, (err, user) => {
        done(err, user)
    }
})
console.log(process.env.CLIENT_ID)
passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/secrets",
}, (accessToken, refreshToken, profile, cb) => {
    console.log(profile);
    User.findOrCreate({ googleId: profile.id }, (err, user) => {
        return cb(err, user)
    })
}))




app.listen(3000, () => {
    console.log(("Server is running on port 3000"));
})
app.route("/")
    .get((req, res) => {
        res.render("home");
    });
app.route("/register")
    .get((req, res) => {
        res.render("register");
    })

.post((req, res) => {
    User.register({ username: req.body.username }, req.body.password, (err, user) => {
        if (err) {
            throw err;
            res.redirect("/register")
        } else {
            passport.authenticate("local")(req, res, () => {
                res.redirect("/secrets")
            })

        }
    })
})
app.get("/auth/google",
    passport.authenticate("google", { failureRedirect: "/login" }),
    (req, res) => {
        res.redirect("/secrets")
    });
passport.authenticate("google", { scope: ["profile"] });
app.get("/auth/google/secrets")

app.get("/secrets", (req, res) => {
    if (req.isAuthenticated()) {
        res.render("secrets");
    } else {
        res.redirect("/login")
    }
})
app.route("/login")
    .get((req, res) => {
        res.render("login");
    }).post((req, res) => {
        const user = new User({
            username: req.body.username,
            password: req.body.password
        })
        req.login(user, (err) => {
            if (err) {
                throw err;
            } else {
                passport.authenticate("local")(req, res, () => {
                    res.redirect("/secrets")
                })
            }
        })

    })

app.get("/logout", (req, res) => {
    req.logOut()
    res.redirect("/")
})
app.route("/submit")
    .get((req, res) => {
        if (req.isAuthenticated()) {
            res.render("submit")
        } else {
            res.redirect("/login")
        }
    });