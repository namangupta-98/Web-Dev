const fs = require("fs");
const File = require("../models/file");
const path = require("path");

exports.create_file = (req, res) => {
  let username = req.profile.username;
  if (req.files) {
    let file = req.files.file;
    let ext = path.extname(file.name);
    fs.writeFile(`./public/${username}/${file.name}`, file.data, (err) => {
      if (err) {
        res.status(501).json({
          message: "File Not Uploaded!",
        });
      } else {
        File.find({ username, name: file.name }).then((data, err) => {
          if (data.length === 0) {
            const newFile = new File({
              username,
              name: file.name,
              size: file.size,
              mimetype: file.mimetype,
              ext,
            });
            newFile.save(async (err, data) => {
              if (err) {
                fs.rm(`./public/${username}/${req.body.filename}`, (err) => {
                  if (err) {
                    res.status(501).json({
                      message: "server error",
                    });
                  } else {
                    res.status(501).json({
                      message: `database error`,
                    });
                  }
                });
              } else {
                let files = [];
                await File.find({username}).sort({updatedAt: 'desc'}).then((data,err)=>{
                  if(data){
                    files = data;
                  }
                });
                res.status(200).json({
                  files,
                  message: `${file.name} uploaded!`,
                });
              }
            });
          }else{
            res.status(200).json({
                message: `${file.name} uploaded!`,
              });
          }
        });
      }
    });
  }
  else {
    res.status(301).json({
      message: "File Not Uploaded! Please Re-Upload.",
    });
  }
};

exports.delete_file = (req, res) => {
  let username = req.profile.username;
  const filename = req.params.filename;
  if (filename) {
    fs.rm(`./public/${username}/${filename}`, (err) => {
      if (err) {
        res.status(501).json({
          message: "File Not Found!",
        });
      } else {
        File.findOneAndRemove({ name: filename }).exec(async (err, data) => {
          if (err) {
            return res.status(400).json({
              error: errorHandler(err),
            });
          }
          let files = [];
                await File.find({username}).sort({updatedAt: 'desc'}).then((data,err)=>{
                  if(data){
                    files = data;
                  }
                });
          res.status(200).json({
            files,
            message: `${req.body.filename} deleted!`,
          });
        });
      }
    });
  } else {
    res.status(301).json({
      message: "File Not Found!",
    });
  }
};

exports.read_all_files = (req, res) => {
  let username = req.profile.username;
  File.find({ username }).sort({updatedAt: 'desc'}).exec((err, data) => {
    if (err) {
      res.status(400).json({
        error: errorHandler(err),
      });
    } else {
      res.status(200).json({
        data,
      });
    }
  });
};
