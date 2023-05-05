import express from "express";
import fs from "fs/promises";
import {Pool} = require('pg');

const server = express();
const PORT = 3000;

const db = new Pool({
database: "petshop",
})

server.get("/", (req, res)=>{
    db.query("SELECT * FROM pet", [], (err, result)=>{
        console.log(result.rows)
    })
})