import process from "node:process";
import fs from "node:fs";
const subcommand = process.argv[2];
//$.get("somepai/something"), (data =>{})
//read the pets.json
if (subcommand === "read") {
  // console.log(subcommand);
  const petIndexStr = process.argv[3];
  const petIndex = Number(petIndexStr);
  fs.readFile("pets.json", "utf8", (error, string) => {
    if (error) {
      throw error; //if it fails, throw the error
    }
    const pets = JSON.parse(string);
    //Read all
    if (petIndexStr === undefined) {
      console.log(pets);
    } else if (
      petIndex >= pets.length ||
      petIndex < 0 ||
      Number.isNaN(petIndex)
    ) {
      console.error("Usage: node pets.js read INDEX");
      process.exit(1); //log it to the console
      //read single
    } else {
      console.log(pets[petIndex]);
    }
    //parse its contents
  });
} else if (subcommand === "create") {
  const age = parseInt(process.argv[3]); //set variable for each pet, index parseInt since its a number not string
  const kind = process.argv[4]; //these are the input items from the terminal and will be tied into the .js file on line 37/38
  const name = process.argv[5];
  const newPet = { age, kind, name }; //then we create a variable which allows us to hold data to be pushed up

  if (age === undefined || kind === undefined || name === undefined) {
    console.error("Usage: node pets.js create age kind name error"); //makes sure they input data
    process.exit(1);
  } else {
    fs.readFile("pets.json", "utf8", (error, string) => {
      //if it passes then we are going to set the language and get the location
      if (error) {
        //if the file doesn't exist then we will get an error
        throw error;
      }
      const pets = JSON.parse(string); //we now need to parse the string so that we can add data to it
      pets.push(newPet); //now we push it up
      fs.writeFile("pets.json", JSON.stringify(pets), (error) => {
        //now we need to return it back to normal and not parsed.
        if (error) {
          throw error; //if we can't put the parsed up then this will tell us
        }
        console.log(`${name} (${kind}) added to the pets.`); //this confirms that it was added
      });
    });
  }
} else if (subcommand === "update") {
  // console.log(subcommand);
  const petIndex = process.argv[3];
  const age = parseInt(process.argv[4]); //set variable for each pet, index parseInt since its a number not string
  const kind = process.argv[5]; //these are the input items from the terminal and will be tied into the .js file on line 37/38
  const name = process.argv[6];
  if (petIndex === undefined || age === undefined || name === undefined) {
    console.error("Usage: node pets.js create age kind name error"); //makes sure they input data
    process.exit(1);
  }
  fs.readFile("pets.json", "utf8", (error, string) => {
    if (error) {
      //here we are reading the json file and if it doesn't exist then we get an error
      throw error;
    }
    const pets = JSON.parse(string); //now we need to parse the data aka string
    const petToUpdate = pets[petIndex]; //now we are creating a constant to hold the value of the certain index point of each of the items
    if (petToUpdate === undefined) {
      //here we are saying if we put an index in and it doesn't exist to give an error
      console.error(`Pet with index ${petIndex} not found.`);
      process.exit(1);
    }
    petToUpdate.age = age; //here we are resetting the values of the petToUpdate data points
    petToUpdate.kind = kind;
    petToUpdate.name = name;
    fs.writeFile("pets.json", JSON.stringify(pets), (error) => {
      //finally with all of these we need to convert it back into stringify by writing the file
      if (error) {
        throw error;
      }
      console.log(
        `Pet with index ${petIndex} updated to ${age} ${kind} ${name}`
      );
    });
  });
} else {
  console.error("Usage: node pets.js [read | create | update | destroy]");
  process.exit(1);
}
