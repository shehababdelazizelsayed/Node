import fs from "fs/promises";

const data = await fs.readFile("./users.json", "utf-8");
let parsedData = JSON.parse(data);
console.log("🚀 ~ parsedData:", parsedData);
// const [,, action, id] = process.argv;
// function getOne(id){
//     console.log(parsedData.find((user)=> user.id === parseInt(id)));
// }

// switch (action) {
//     case 'getone':
//         getOne(id)
//         break;

//     default:
//         break;
// }
const newUser = {
  id: 3,
  Name: "Mona",
};
let arr = [];
if (Array.isArray(parsedData)) parsedData.push(newUser);
else parsedData = [parsedData, newUser];
console.log("🚀 ~ parsedData:", parsedData);

await fs.writeFile("./users.json", JSON.stringify(parsedData, null, 2));

switch (action) {
  case "add":
    break;
  case "remove":
    break;
  case "getall":
    break;
  case "getone":
    break;
  case "edit":

  default:
    break;
}

// add name -> unique id
// remove id
// edit id www
