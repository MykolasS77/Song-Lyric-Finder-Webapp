import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://api.lyrics.ovh/v1"; 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


app.get("/", (req, res) => {
    res.render("index.ejs");
  });

app.post('/submit', async (req, res) => {
     
    try {
        const artist = req.body["artist"];
        const song = req.body["song"];

        const result = await axios.get(API_URL + "/" + artist + "/" + song);
        console.log(result.data.lyrics);
        res.render("index.ejs", {
        lyrics: result.data.lyrics,
    });
      } catch (error) {
        console.error(error);
        var error_message = "Lyrics not found. Please try again." 
        res.render("index.ejs", {
          error_message: error_message
        })
      }

  });


  app.listen(port, function(err){
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", port);
});