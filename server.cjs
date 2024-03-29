const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const ejs = require('ejs');
const port = process.env.PORT || 3000;

const homeStartingContent =
  "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent =
  "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent =
  "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";



let arrs = [];

app.set("view engine", "ejs");
app.set('views',__dirname+'/views');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname+"/public"));


app.get("/", function (req, res) {
  res.render("home", { content: homeStartingContent, arrs: arrs });
});

app.get("/about", function (req, res) {
  res.render("about", { contentAbout: aboutContent });
});

app.get("/contact", function (req, res) {
  res.render("contact", { contactUs: contactContent });
});

app.get("/post", function (req, res) {
  res.render("email");
});

app.get("/posts", (req, res) => {
  console.log("triggered");
  res.render("posts", { arrs: arrs });
});
app.get("/post/:postName", function (req, res) {
  const requestedTitle = req.params.postName;
  console.log(arrs);
  let found = false;

  arrs.forEach(function (arr) {
    const storedTitle = arr.title;

    if (storedTitle === requestedTitle) {
      console.log("matched found");
      res.render("certain", { arr: arr });
      found = true;
    }
  });

  if (!found) {
    res.status(404).send("Post not found");
  }
});

app.get("/:postName", function (req, res) {
  const requestedTitle = req.params.postName;

  let found = false;

  arrs.forEach(function (arr) {
    const storedTitle = arr.compose;

    if (storedTitle === requestedTitle) {
      console.log("Match found");
      res.render("linkpost", { arr: arr });
      found = true;
    }
  });

  if (!found) {
    res.status(404).send("Post not found");
  }
});

app.post("/post", function (req, res) {
  let mail = req.body.gmail;
  let review = req.body.compose;
  const post = {
    title: mail,
    compose: review,
  };
  // let arr = post;
  arrs.push(post);
  res.redirect("/");
});


if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

module.exports = app;