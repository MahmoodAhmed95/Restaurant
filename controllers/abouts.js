// const cloudinary = require("../utils/cloudinary");
module.exports = {
  about,
};

// function to show all in the home page
async function about(req, res) {

  res.render("about", {});
}
