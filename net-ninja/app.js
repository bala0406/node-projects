const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");

const app = express();

// connect to mongo db
const databaseURI =
    "mongodb+srv://bala:0912@nodejs-netninja.kxtu4.mongodb.net/node-netninja?retryWrites=true&w=majority";
mongoose
    .connect(databaseURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then((result) => app.listen(3000))
    .catch((error) => console.log(error));

// register view engine
app.set("view engine", "ejs");

// middleware and static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// routes
app.get("/", (request, response) => {
    response.redirect("/blogs");
});

app.get("/about", (request, response) => {
    response.render("about", { title: "About" });
});

//blog routes
app.use("/blogs",blogRoutes);

// return 404
app.use((request, response) => {
    response.status(404).render("404", { title: "404" });
});
