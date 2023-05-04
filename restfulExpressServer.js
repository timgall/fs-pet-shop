import express from "express";
import fs from "fs/promises";

const server = express();
const PORT = 3000;

server.use(express.json());

server.get("/pets", (req, res) => {
  fs.readFile("pets.json", "UTF-8").then((data) => {
    res.json(JSON.parse(data));
  });
});

server.post("/pets", (req, res) => {
  console.log(req.body);
  const { age, name, type } = req.body;
  const pet = { age, name, type };
  if (!type || !age || !name) {
    res.sendStatus(422);

    console.log(`422 error`);
    return;
  }
  fs.readFile("pets.json", "UTF-8").then((data) => {
    res.status(201).send(pet);
  });
});
server.use((req, res, next) => {
  console.log("ERROR 404");
  res.status(404).send("Page Not found");
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
