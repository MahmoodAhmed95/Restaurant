// const cloudinary = require("../utils/cloudinary");
module.exports = {
    blog,
  };
  
  // function to show all in the home page
  async function blog(req, res) {
  
    res.render("blog", {});
  }
  