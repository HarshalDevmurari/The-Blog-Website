//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");


const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";

const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let posts = [];

app.get("/", function (req, res) {

  res.render("home", {
    homeStartingContent: homeStartingContent,
    posts: posts
  })

})

app.get("/zoology", function (req, res) {

  res.render("zoology", {
    posts: posts
  })

})

app.get("/about", function (req, res) {
  res.render("about", { aboutContent: aboutContent })
})

app.get("/contact", function (req, res) {
  res.render("contact")
})

app.get("/compose", function (req, res) {
  res.render("compose")
})

app.post("/compose", function (req, res) {

  const post = {
    title: req.body.postTitle,
    content: req.body.postBody,
    imgLink: req.body.imgLink
  };

  posts.push(post);
  res.redirect("/")
})

app.get("/post", function (req, res) {
  res.render("post")
})

app.get("/posts/:postName", function (req, res) {
  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(function (post) {
    const storedTitle = _.lowerCase(post.title);

    if (storedTitle === requestedTitle) {
      res.render("post", {
        title: post.title,
        content: post.content,
        imgLink: post.imgLink
      });
    }
  });

});

app.get("/admin", function (req, res) {
  res.render("admin", {
    posts: posts
  })
})

app.get("/admin/:postName", function (req, res) {
  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(function (post) {
    const storedTitle = _.lowerCase(post.title);

    if (storedTitle === requestedTitle) {
      res.render("post", {
        title: post.title,
        content: post.content,
        page:req.url
      });
    }
  });

});

app.post("/contact", function (req, res) {

  const communication = {
    userName: req.body.userName,
    userMail: req.body.userMail,
    userMsg: req.body.userMsg
  };

  console.log(communication)
  res.redirect("/")
})

const post1 = {
  title: "Penguine",
  content: "Penguins are a group of aquatic flightless birds. They live almost exclusively in the Southern Hemisphere: only one species, the Galápagos penguin, is found north of the Equator. Highly adapted for life in the water, penguins have countershaded dark and white plumage and flippers for swimming",
  imgLink: "https://www.cabq.gov/artsculture/biopark/news/10-cool-facts-about-penguins/@@images/1a36b305-412d-405e-a38b-0947ce6709ba.jpeg"
}
const post2 = {
  title: "Red panda",
  content: "The red panda, also known as the lesser panda, is a small mammal native to the eastern Himalayas and southwestern China. It has dense reddish-brown fur with a black belly and legs, white-lined ears, a mostly white muzzle and a ringed tail. Its head-to-body length is 51–63.5 cm with a 28–48.5 cm tail, and it weighs between 3.2 and 15 kg. It is well adapted to climbing due to its flexible joints and curved semi-retractile claws. ",
  imgLink: "https://www.cbc.ca/kids/images/wild_and_wonderful_asian_animals_header_1140.jpg"
}
const post3 = {
  title: "Komodo dragon",
  content: "The Komodo dragon (Varanus komodoensis), also known as the Komodo monitor, is a member of the monitor lizard family Varanidae that is endemic to the Indonesian islands of Komodo, Rinca, Flores, and Gili Motang. It is the largest extant species of lizard, growing to a maximum length of 3 metres (10 ft), and weighing up to approximately 70 kilograms (150 lb). As a result of their size, Komodo dragons are apex predators, and dominate the ecosystems in which they live. Komodo dragons hunt and ambush prey including invertebrates, birds, and mammals",
  imgLink: "https://a-z-animals.com/media/2021/07/Komodo-Dragon-with-its-tongue-out-1.jpg"
}
const post4 = {
  title: "Snow Leopard",
  content: "The snow leopard, also known as the ounce, is a felid in the genus Panthera native to the mountain ranges of Central and South Asia. It is listed as Vulnerable on the IUCN Red List because the global population is estimated to number fewer than 10,000 mature individuals and is expected to decline about 10% by 2040",
  imgLink: "https://www.science.org/cms/10.1126/science.aas9893/asset/b3064092-042e-405f-a8c7-1098268b11dc/assets/graphic/359_1110_f1.jpeg"
}
const post5 = {
  title: "Keel-billed toucan",
  content: "The keel-billed toucan, also known as sulfur-breasted toucan or rainbow-billed toucan, is a colorful Latin American member of the toucan family. It is the national bird of Belize. The species is found in tropical jungles from southern Mexico to Colombia. The keel-billed toucan, also known as sulfur-breasted toucan or rainbow-billed toucan, is a colorful Latin American member of the toucan family. It is the national bird of Belize. The species is found in tropical jungles from southern Mexico to Colombia.",
  imgLink: "https://preview.redd.it/fx9mzykuyfr41.jpg?auto=webp&s=6f676dd1512888c1ba6a9ae16f53e8f3ceb02b63"
}

posts.push(post4);
posts.push(post3);
posts.push(post2);
posts.push(post1);
posts.push(post5);

app.listen(3000, function () {
  console.log("Server started on port 3000");
});

