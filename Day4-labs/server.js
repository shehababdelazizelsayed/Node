const express = require("express");
const fs = require("fs/promises");
const path = require("path");
const morgan = require("morgan");
const Router = require('./routes/index')
const app = express();
const port = 3000;

const logger = (req,res, next)=>{

  console.log('request started');
  next("fgdfg");
}
// console.log(path.join(__dirname, "public"));
// app.use(morgan('tiny'))
app.use(express.static(path.join(__dirname, "public")));
app.get("/", async (req, res) => {
  const content = await fs.readFile("./public/index.html", "utf-8");
  console.log("🚀 ~ content:", content);
  res.send(content);
  return;
});
app.use(logger);

// app.get("/users", async (req, res) => {
//   try {
//     const users = await fs.readFile("users.json");
//     const parsedUsers = JSON.parse(users);
//     res.send(parsedUsers);
//   } catch (error) {
//     res.status(404).send({ error: "no users found" });
//   }
// });
app.use('/users', Router)
// app.get("/users/:id", async (req, res) => {
//   try {
//     console.log(req.params.id);
//     const { id } = req.params;
//     const users = await fs.readFile("users.json");
//     const parsedUsers = JSON.parse(users);
//     const user = parsedUsers.find((u) => u.id === parseInt(id));
//     if (!user) {
//       res.status(404).send({ error: "user not found" });
//     }
//     res.send(user);
//   } catch (error) {
//     res.status(400).send({ error: "bad request" });
//   }
// });
const errorHandler = (err, req,res,next) =>{
  console.log(err);
  res.status(400).send({error: "something went wrong"})
  return;
}
app.use(errorHandler)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});



// aray of paths
// error handler (4)
// post/express.json
// router
// DB
// hashing