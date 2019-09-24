/* jshint esversion: 8 */
(() => 
{
    // Node Requires
    const fs = require('fs');
    const path = require('path');
    const fetch = require('node-fetch'); // npm install node-fetch --save
    const crypto = require('crypto');
    const express = require('express'); // npm install express --save
    const app = express();

    // API Credentials
    const apiUrl = "http://gateway.marvel.com/v1/public/";
    const apiKey = "8a291b98a1bef1b182731afaf46f4ace";
    const priKey = "d31d5f19b0c51a10bdf421c405bf956eca9fa79e";

    // Routes
    app.use('/assets', express.static('assets'));
    app.get('/', (req, res) => res.sendFile(path.join(__dirname+'/index.html')));
    app.get('/characters', (req, res) => res.json(marvel));
    app.get('/character/:id', (req, res) => res.json(marvel.characters[req.params.id]));


    app.listen(3000, () => console.log("listening at http://127.0.0.1:3000"));
    
    // Update Character list is expired.
    let data = fs.readFileSync('./data.json');
    let marvel = JSON.parse(data);
    let expiry = 86400000; // 24 hours 

    

    if (Date.now() - marvel.modified > expiry)
    {
        getCharacters();
    } else 
    {
        console.log("Data not updated.")    
    }


    // Get list of characters
    async function getCharacters()
    {
        marvel = {};
        marvel.characters = {};

        let offset = 0;
        let loop = true;
        
        while (loop)
        {
            const time = Date.now();
            const hash = crypto.createHash('md5').update(time + priKey + apiKey).digest("hex");

            try
            {
                let data = await fetch(`${apiUrl}characters?&orderBy=name&limit=100&offset=${offset}&ts=${time}&apikey=${apiKey}&hash=${hash}`);
                let result = await data.json();
                let total = result.data.total;

                console.log(offset);
                offset += 100;

                if (offset >= total) { loop = false; console.log("done"); }     ////////CHANGE TO TOTAL

                let characters = result.data.results;
                
                for (let character in characters)
                {
                    let id           = characters[character].id;
                    let name         = characters[character].name;
                    let thumbnail    = characters[character].thumbnail.path + "." + characters[character].thumbnail.extension;
                    let description  = characters[character].description;

                    marvel.characters[id] = {name, thumbnail, description};
                }

            } catch(err)
            {
                console.log(err);
            }
        }

        marvel.modified = Date.now();

        fs.writeFile("./data.json", JSON.stringify(marvel), err => 
        {
            if (err) return console.log(err);
            console.log("data.json has been saved.");
        }); 
    }
    
})();



