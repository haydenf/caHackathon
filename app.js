/* jshint esversion: 8 */

(() => 
{
    const apiUrl = "http://gateway.marvel.com/v1/public/";
    const apiKey = "8a291b98a1bef1b182731afaf46f4ace";


// Get list of characters
    async function getCharacters()
    {
        let characters = fetch(`${apiUrl}characters?apikey=${apiKey}`);

        await console.log(characters);
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


    

})();