const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("loadsh");
//const date = require(__dirname + "/date.js");

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));
app.set('view engine', 'ejs');

mongoose.connect("mongodb://localhost:27017/todolist", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

//Schema
const itemSchema = {
  name: String,
}

const listSchema = {
  name: String,
  items: [itemSchema],
}

//Models
const Item = mongoose.model("Item", itemSchema);
const List = mongoose.model("List", listSchema);

//Documents
const item1 = new Item({
  name: "Welcome to your todo list.",
});

const item2 = new Item({
  name: "Hit + to add a new item.",
});

const item3 = new Item({
  name: "<- Hit this to delete an item.",
});

const defaultItems = [item1, item2, item3];


/// GET
app.get("/", function(req, res) {
  //let day = date.getDate();
  Item.find({}, function(err, foundItems) {
    if (foundItems.length === 0) {
      Item.insertMany(defaultItems, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log("successfully saved defaults items");
        }
      })
    }
    res.render("list", {
      listTitle: "Today",
      newListItem: foundItems
    });
  });
  //res.sendFile(__dirname + "/index.html");
});

app.get("/:customListName", function(req, res) {
  const customListName = _.capitalize(req.params.customListName);

  List.findOne({
    name: customListName
  }, function(err, foundList) {
    if (!err) {
      if (!foundList) {
        const list = new List({
          name: customListName,
          items: defaultItems,
        });
        list.save();
        res.redirect("/" + customListName);
      } else {
        res.render("list", {
          listTitle: foundList.name,
          newListItem: foundList.items
        });
      }
    }
  });
});


///POST
app.post("/", function(req, res) {
  let itemName = req.body.newItem;
  let listName = req.body.button;
  const item = new Item({
    name: itemName,
  });
  if (listName === "Today") {
    item.save();
    res.redirect("/");
  } else {
    List.findOne({
      name: listName
    }, function(err, findList) {
      findList.items.push(item);
      findList.save();
      res.redirect("/" + listName);
    });
  }

});

app.post("/delete", function(req, res) {
  const checkedItemId = req.body.checkbox;
  const listName = req.body.listName;
  if (listName === "Today") {
    Item.findByIdAndRemove(checkedItemId, function(err) {
      if (!err) {
        console.log("deleted successfully");
      }
    });
    res.redirect("/");
  } else {
    List.findOneAndUpdate({ name: listName }, {$pull: {items: {_id: checkedItemId}}}, function(err, foundList) {
      if(!err)
        res.redirect("/" + listName);
    });
  }

});

// let port = process.env.PORT;
// if (port == null || port = ""){
//   port = 3000;
// }
//
app.listen(3000, function() {
  console.log("Server started successfully.");
})
