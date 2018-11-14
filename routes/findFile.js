var express = require('express');
var router = express.Router();
const FileHound = require('filehound');
var path = require('path');
var slash = require('slash');


router.get('/', function (req, res, next) {
  res.render("libsearch");
})
/* post users listing. */
router.post('/', function (req, res, next) {

  if (req.body.filePath) {
    var size = ""
    if (req.body.size) {
      size = req.body.size;
    }
    console.log("body", req.body)
    const files = FileHound.create()
      .paths(slash(path.normalize(req.body.filePath)))
      .ext(req.body.ext)
      .match(req.body.match + '*')
      .find();
  
    files.then(function (data) {
      res.render("output", {data: data});
    });
  } else {
    res.send("Please privide file path");
  }
  
});

module.exports = router;