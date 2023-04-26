import http from "node:http";
import fs from "node:fs";

http
  .createServer(function (request, response) {
    //get request method
    console.log(request.method);
    //get request path
    console.log(request.url);
    const petRegExp = /^\/pets\/(\d+)$/;
    const match = request.url.match(petRegExp);
    //If GET to /pets, return pets
    if (request.method === "GET" && request.url === "/pets") {
      //read pets file and return result
      fs.readFile("pets.json", "utf8", (err, string) => {
        if (err) {
          console.error(err.stack);
          response.statusCode = 500;
          response.setHeader("Content-Type", "text/plain");
          return response.end("Internal Server Error");
        }
        response.setHeader("Content-Type", "application/json");
        response.write(string);
        response.end();
      });
    } else if (request.method === "GET" && match) {
      const petIndex = parseInt(match[1]);
      fs.readFile("pets.json", "utf8", (err, string) => {
        if (err) {
          console.error(err.stack);
          response.statusCode = 500;
          response.setHeader("Content-Type", "text/plain");
          return respond.end("Internal Server Error");
        }
        var pet = JSON.parse(string);
        if (petIndex >= 0 && petIndex < pet.length) {
          var petJSON = JSON.stringify(pet[petIndex]);
          response.setHeader("Content-Type", "application/json");
          response.end(petJSON);
        } else {
          response.statusCode = 404;
          response.setHeader("Content-Type", "text/plain");
          response.end("Not Found");
          console.log(response.statusCode);
        }
      });
    } else {
      response.statusCode = 404;
      response.setHeader("Content-Type", "text/plain");
      response.end("Not Found"); //wont send the above out until it hits .end
      console.log(response.statusCode);
    }
  })
  .listen(3000);
