import express from "express";
import fs from "fs/promises";

const server = express();
const PORT = 3000;

server.use(express.json());
//everything below this should be the methods
server.get("/pets", (req, res) => {
  fs.readFile("pets.json", "UTF-8").then((data) => {
    res.json(JSON.parse(data));
  });
});
//this gets all

server.post("/pets", (req, res) => {
  console.log(req.body);
  const { age, name, kind } = req.body;
  const pet = { age, name, kind };
  if (!kind || !age || !name) {
    res.sendStatus(422);
    console.log(`422 error`);
    return;
  }
  fs.readFile("pets.json", "utf-8")
    .then((petList) => {
      const pets = JSON.parse(petList);
      pets.push(pet);
      return pets;
    })
    .then((pets) => {
      fs.writeFile("pets.json", JSON.stringify(pets)).then(() => {
        console.log(`${name} ${kind} added to the pets.`);
        res.send(pets);
      });
    });
});
//this allows for posts on pets
server.get("/pets/:petIndex", (req, res) => {
  const petIndex = Number(req.params.petIndex);
  fs.readFile("pets.json", "UTF-8").then((string) => {
    const pets = JSON.parse(string);
    res.send(pets[petIndex]);
  });
});
//req/res that allows us to get at an index

server.patch("/pets/:petIndex", (req, res) => {
  const petIndex = Number(req.params.petIndex);
  const { age, name, kind } = req.body;
  if (!Number.isInteger(age) || !name || !kind) {
    res.sendStatus(422);
    console.log(`422 error`);
    return;
  }
  fs.readFile("pets.json", "UTF-8")
    .then((data) => {
      const pets = JSON.parse(data);
      pets.splice(petIndex, 1, { age, name, kind });
      return fs.writeFile("pets.json", JSON.stringify(pets));
    })
    .then(() => {
      res.status(200).send({ age, name, kind });
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});
/*req/res that allows us to patch at an index
NOTE: The PATCH route handler must only update the record if age is an integer, 
if kind is not missing, or if name is not missing.*/
server.delete("/pets/:petIndex", (req, res) => {
  const petIndex = req.params.petIndex;
  fs.readFile("pets.json", "utf-8").then((data) => {
    const pets = JSON.parse(data);
    if (petIndex < 0 || petIndex >= pets.length) {
      return res.status(400).send("Invalid pet index");
    }
    const deletedPet = pets.splice(petIndex, 1)[0];
    fs.writeFile("pets.json", JSON.stringify(pets), "utf-8", (err) => {
      if (err) {
        return res.status(500).send("Error writing to pets.json");
      }
    });
    res.send(deletedPet);
  });
});
//req/res that allows us to delete at an index

server.use((req, res, next) => {
  console.log("ERROR 404");
  res.status(404).send("Page Not found");
});
//404 error
server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
//listening on port
