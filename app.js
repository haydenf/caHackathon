/* jshint esversion: 8 */
(() => 
{
    
    const apiUrl = "http://gateway.marvel.com/v1/public/";
    const apiKey = "8a291b98a1bef1b182731afaf46f4ace";


// Get list of characters
    async function getCharacters(offset)
    {

        let data = await fetch(`${apiUrl}characters?limit=20&offset=${offset}&apikey=${apiKey}`);
        let result = await data.json();

        let characters = result.data.results;

        for(let character in characters)
        {
            let name = characters[character].name;
            let thumbnail = characters[character].thumbnail.path;
            let extension = characters[character].thumbnail.extension;
        
            let elCharacter = `<div class="character">
                <div class="img-container">
                    <img src="${thumbnail}.${extension}" alt="${name}">
            </div>
                <div class="info">
                    <span class="name">${name}</span>
                </div>
             </div>`
            document.getElementById("character-container").innerHTML += elCharacter
            console.log(name, thumbnail, extension)
        }

        // for(let picture in characterPictures)
        // {
            
            
            
        // }

       


        // let characters = fetch(`${apiUrl}characters?limit=20&offset=${offset}&apikey=${apiKey}`).then(async (response)=> {
        //     return await response.json();
        // });
        // name =  characters.data
        // // let data = await characters.json();
        // await console.log(name);
             
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
    getCharacters(20);
})();



