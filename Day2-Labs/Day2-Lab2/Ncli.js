import * as fs from "fs/promises";

//async we await 3a4an mytl34 pending fe el result

async function getall() {
  const info = await fs.readFile("file.json", "utf-8");
  return info;
}

//try we catch 3a4an n7ded el id mawgod wala la2
async function getone(arg) {
  try {
    const info = await fs.readFile("file.json", "utf-8");
    const filteredinfo = JSON.parse(info);
    const person = filteredinfo.find(
      (person) => person.id === parseInt(arg[0])
    );
    if (!person) {
      throw new Error("Id not found");
    } else {
      return person;
    }
  } catch (error) {
    return "ID not found";
  }
}

//7ot el name bas el id hyb2a auto 3ala a5er 7aga fe el length

async function add(arg) {
  const info = await fs.readFile("file.json", "utf-8");
  const filteredinfo = JSON.parse(info);
  const all_ids = filteredinfo.map((person) => person.id); //hat array feha kol el ids
  let willbeid;
  if (all_ids.length === 0) {
    willbeid = 1; //law el file fady
  } else {
    willbeid = Math.max(...all_ids) + 1; //han7ot 3ala akbr id 1
  }
  const newperson = {
    id: willbeid,
    name: arg[0],
  };
  console.log("New Person:", newperson);
  filteredinfo.push(newperson);
  await fs.writeFile("file.json", JSON.stringify(filteredinfo, null, 2));
  return newperson;
}

async function remove(arg) {
  const info = await fs.readFile("file.json", "utf-8");
  const filteredinfo = JSON.parse(info); // el object el mawgod fe el file
  const newinfo = filteredinfo.filter(
    (person) => person.id !== parseInt(arg[0])
  ); // el object el ba2y bona2n 3ala el filter
  if (newinfo.length === filteredinfo.length) {
    return "id not found";
  } else {
    await fs.writeFile("file.json", JSON.stringify(newinfo, null, 2));
    return "user removed";
  }
}

async function edit(arg) {
  const info = await fs.readFile("file.json", "utf-8");
  const filteredinfo = JSON.parse(info);
  const personIndex = filteredinfo.findIndex(
    (person) => person.id === parseInt(arg[0])
  ); // el id el han8ayro
  if (personIndex === -1) {
    return "Id not found"; //law mal2nash el id 3a4an el find index bytl3 -1 law mal2a4
  } else {
    filteredinfo[personIndex].name = arg[1];
    await fs.writeFile("file.json", JSON.stringify(filteredinfo, null, 2));
    return filteredinfo[personIndex];
  }
}

const [, , action, ...arg] = process.argv;

let result;
switch (action) {
  case "add":
    result = await add(arg);
    break;
  case "remove":
    result = await remove(arg);
    break;
  case "getall":
    result = await getall();

    break;
  case "getone":
    result = await getone(arg);
    break;
  case "edit":
    result = await edit(arg);
    break;

  default:
    break;
}

console.log("Result:", result);
