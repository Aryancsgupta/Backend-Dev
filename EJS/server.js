import express from "express";
const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.render("index");
});
const userData = [
    ];


app.get("/user", (req, res) => {
  

  res.render("user", {userData});
});

app.post("/api/user", (req, res) => {
  const{name, age} = req.body;
  let newUserData = {
    id:userData.length + 1,
    name,
    age,
  };
  userData.push(newUserData);
  res.redirect("/user");
});
app.get("/delete/:id", (req, res) => {
  const id = req.params.id;
  const index = userData.findIndex((ele) => ele.id == id);
  if (index !== -1) {
    userData.splice(index, 1);
  }else{
    return res.send("User not found");
  }
  res.redirect("/user");  
});
app.get("/list", (req, res) => {
  const arr = ["Ankur", "Rohan", "Sohan", "Mohan", "Mahesh"];

  arr.forEach((ele) => {
    console.log(ele);
  });
  app.get("/list", (req, res) => {
  const arr = [];

  if (arr.length>0) {
    res.render("list",{arr});
  } else {
    res.send("Array khali hai");
  }
});


  res.render("list", { arr });
});
app.listen(3000, () => {
  console.log("Server daud raha hai port no. 3000");
});
