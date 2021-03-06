const bodyParser = require("body-parser");
const express = require("express");
var routes = require("./routes.js");
const cors = require("cors");

const app = express();

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/* ---------------------------------------------------------------- */
/* ------------------- Route handler registration ----------------- */
/* ---------------------------------------------------------------- */

/* ---- (Dashboard) ---- */
// The route localhost:8081/genres is registered to the function
// routes.getAllGenres, specified in routes.js.
app.get("/genres", routes.getAllGenres);

// get search result for a certain search term
app.get("/search/:mediaType/:genre/:searchTitle", routes.titleSearch);

// get advanced search result for a certain search term
app.get("/searchAdvanced/:mediaType/:genre/:searchTitle", routes.advancedSearch);

// Get a media's recommendations based on Media ID
app.get("/recommendations/:searchType/:searchId", routes.getRecs);

// Get a media's information based on Media ID
app.get("/media/:id", routes.getMediaInfo);

// Get media's information based on an array of Media IDs
app.get("/mediaMultiple", routes.getMultipleMediaInfo);

/* FUN FACTS */
app.get("/funfact1", routes.getLongestMovie);
app.get("/funfact2", routes.getShortestMovie);
app.get("/funfact3", routes.getMostExpensiveMovie);
app.get("/funfact4", routes.getAuthorWithMostBooks);

/* USER REGISTRATION AND LOGIN */
// Created a new user in User table
app.post("/register/:username/:password", routes.createNewUser);

// Check username/password for user
app.get("/login/:username", routes.getPassword);

/* SAVED PAGE */
// Create a new entry in Saved_media table
app.post("/savePage/:username/:media_id", routes.addToSavedMedia);

// Get array of media_id for a user's savedPage
app.get("/getSavedPage/:username", routes.getMediaFromUser);

// Delete a savedMedia from Saved_media table
app.put("/deleteSavedPage/:username/:media_id", routes.deleteFromSavedMedia);

process.once("SIGTERM", process.exit);
process.once("SIGINT", process.exit);

app.listen(8081, () => {
  console.log(`Server listening on PORT 8081`);
});
