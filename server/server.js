import express from "express";
import React from "react";
import ReactDOMServer from "react-dom/server";
import App from "../src/App";

const app = express();

app.get("/", async (req, res) => {
  const response = await fetch("https://fakestoreapi.com/products");
  const products = await response.json();
  const html = ReactDOMServer.renderToString(<App list={products} />);
  res.send(`<!doctype html>${html}`);
});

app.listen(3002, () => {
  console.log("App is running on http://localhost:3002");
});
