import fs from "node:fs/promises";
import express from "express";

const server = express();
const port = 3000;

server.use(express.json());

server.get("/pets", (req, res, next) => {
  fs.readFile("pets.json", "utf-8")
    .then((string) => {
      const pets = JSON.parse(string);
      res.send(pets);
    })
    .catch(next);
});

server.get("/pets/:petIndex", (req, res, next) => {
  const petIndex = Number(req.params.petIndex);
  fs.readFile("pets.json", "utf-8")
    .then((string) => {
      const pets = JSON.parse(string);
      res.send(pets[petIndex]);
    })
    .catch(next);
});

server.post("/pets", (req, res, next) => {
  const pet = req.body;
  const age = pet.age;
  const kind = pet.kind;
  const name = pet.name;

  const newPet = { age, kind, name };

  if (age === undefined || kind === undefined || name === undefined) {
    console.log("Error not all data provided.");
    res.status(400).send("Error: Not all data provided");
  } else {
    fs.readFile("pets.json", "utf-8")
      .then((petList) => {
        const pets = JSON.parse(petList);
        pets.push(newPet);
        return pets;
      })
      .then((pets) => {
        fs.writeFile("pets.json", JSON.stringify(pets)).then(() => {
          console.log(`${name} ${kind} added to the pets.`);
          res.send(pets);
        });
      })
      .catch(next);
  }
});

server.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Internal Server Error");
});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
