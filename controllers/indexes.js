// const cloudinary = require("../utils/cloudinary");
module.exports = {
  index,
  getBranch,
};

// function to show all in the home page
async function index(req, res) {

  res.render("index", {});
}

// new function to get the branch by the selected drag drop
async function getBranch(req, res) {
  const food = "food";
  console.log(food);
  res.json(food);
}