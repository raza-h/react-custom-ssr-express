import express from "express";
import React from "react";
import ReactDOMServer from "react-dom/server";
import App from "../src/App";

const app = express();

app.get("/", async (req, res) => {

  const response = await fetch("https://fakestoreapi.com/products");
  const products = await response.json(); 

  const entryPoint = ["/main.js"];

  const { pipe, abort: _abort } = ReactDOMServer.renderToPipeableStream(
      <App list={products} />
    ,
    {
      bootstrapScripts: entryPoint,
      onShellReady() {
        res.statusCode = 200;
        res.setHeader("Content-type", "text/html");
        pipe(res);
      },
      onShellError() {
        res.statusCode = 500;
        res.send("<!doctype html><p>Loading...</p>");
      },
    }
  );
});

app.listen(3002, () => {
  console.log("App is running on http://localhost:3002");
});
