import { Command } from "commander";
import * as fs from "fs/promises";

async function getall() {
  const info = await fs.readFile("file.json", "utf-8");
  return info;
}

async function getone(id) {
  try {
    const info = await fs.readFile("file.json", "utf-8");
    const filteredinfo = JSON.parse(info);
    const person = filteredinfo.find((person) => person.id === parseInt(id));
    if (!person) {
      throw new Error("Id not found");
    } else {
      return person;
    }
  } catch (error) {
    return "ID not found";
  }
}

async function add(name) {
  const info = await fs.readFile("file.json", "utf-8");
  const filteredinfo = JSON.parse(info);
  const all_ids = filteredinfo.map((person) => person.id);
  let willbeid;
  if (all_ids.length === 0) {
    willbeid = 1;
  } else {
    willbeid = Math.max(...all_ids) + 1;
  }
  const newperson = {
    id: willbeid,
    name,
  };
  filteredinfo.push(newperson);
  await fs.writeFile("file.json", JSON.stringify(filteredinfo, null, 2));
  return newperson;
}

async function remove(id) {
  const info = await fs.readFile("file.json", "utf-8");
  const filteredinfo = JSON.parse(info);
  const newinfo = filteredinfo.filter((person) => person.id !== parseInt(id));
  if (newinfo.length === filteredinfo.length) {
    return "id not found";
  } else {
    await fs.writeFile("file.json", JSON.stringify(newinfo, null, 2));
    return "user removed";
  }
}

async function edit(id, name) {
  const info = await fs.readFile("file.json", "utf-8");
  const filteredinfo = JSON.parse(info);
  const personIndex = filteredinfo.findIndex(
    (person) => person.id === parseInt(id)
  );
  if (personIndex === -1) {
    return "Id not found";
  } else {
    filteredinfo[personIndex].name = name;
    await fs.writeFile("file.json", JSON.stringify(filteredinfo, null, 2));
    return filteredinfo[personIndex];
  }
}

const program = new Command();

program.command("getall").action(async () => {
  const result = await getall();
  console.log("Result:", result);
});

program.command("getone <id>").action(async (id) => {
  const result = await getone(id);
  console.log("Result:", result);
});

program.command("add <name>").action(async (name) => {
  const result = await add(name);
  console.log("Result:", result);
});

program.command("remove <id>").action(async (id) => {
  const result = await remove(id);
  console.log("Result:", result);
});

program.command("edit <id> <name>").action(async (id, name) => {
  const result = await edit(id, name);
  console.log("Result:", result);
});

program.parse(process.argv);
