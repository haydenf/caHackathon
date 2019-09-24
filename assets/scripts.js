/* jshint esversion: 8 */
(() => 
{
    // Get list of characters
    async function getCharacters()
    {
        const data = await fetch("http://127.0.0.1:3000/characters");
        const res = await data.json();
        const container = document.getElementById("character-container");

        for (let character in res.characters)
        {
            let curChar = res.characters[character];

            let char = document.createElement("div");
            let img = document.createElement("img");
            let name = document.createElement("div");

            name.innerHTML = curChar.name;
            name.className = "name";

            img.src = curChar.thumbnail;

            char.className = "character";
            char.appendChild(img);
            char.appendChild(name);

            container.appendChild(char);
        }           
    }
    

// Get list of all Comics by character
    async function getComics(character)
    {
        let comics = fetch(`${apiUrl}characters/${character}/comics?apikey=${apiKey}`);

        await console.log(comics);
    }


// Get list of all Series by character
    async function getSeries(character)
    {
        let series = fetch(`${apiUrl}characters/${character}/series?apikey=${apiKey}`);

        await console.log(series);
    }

    getCharacters();
})();



