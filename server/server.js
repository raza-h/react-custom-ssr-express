import express from "express";
import React from "react";
import ReactDOMServer from "react-dom/server";
import App from "../src/App";
// import livereload from 'livereload';
// import connectLiveReload from 'connect-livereload';
import path from "path";
import fs from 'fs';

const app = express();

// const liveReloadServer = livereload.createServer();
// liveReloadServer.watch(path.join(__dirname, '../'));

// app.use(connectLiveReload());

// liveReloadServer.server.once("connection", () => {
//   setTimeout(() => {
//     liveReloadServer.refresh("/");
//   }, 100);
// });


app.get("/", async (req, res) => {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const products = await response.json();
    const html = ReactDOMServer.renderToString(<App list={products} />);
    fs.readFile(path.join(__dirname, '../src/index.html'), "utf8", (err, data) => {
      if (err) {
        throw new Error("Internal Server Error");
      }
      
      return res.send(data.replace('<div id="root"></div>', `<div id="root">${html}</div>`).replace("<title>Template Title</title>", "<meta name=\"description\" content=\"Fakestore's Products]\"><title>Products - FakeStore</title>"));
    });
  }
  catch(err)
  {
    res.status(500).send('Internal Server Error');
  }
});

app.listen(3002, () => {
  console.log("App is running on http://localhost:3002");
});
