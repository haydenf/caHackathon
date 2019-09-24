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
            char.setAttribute("data-id", character);
            char.appendChild(img);
            char.appendChild(name);

            container.appendChild(char);
        }    

        document.querySelectorAll(".character").forEach(function(el){
            el.addEventListener("click", () => window.location.hash = el.dataset.id);
        });
    }


    async function getCharacterProfile()
    {
        if (window.location.hash === "" || window.location.hash === "#_") return;

        let id = window.location.hash.split("#")[1];

        const data = await fetch(`http://127.0.0.1:3000/character/${id}`);
        const res = await data.json();

        // Update profile element here
        document.getElementById("profile-name").innerHTML = res.name;
        document.getElementById("profile-description").innerHTML = res.description;
        document.getElementById("profile-img").src = res.thumbnail;
        document.getElementById("profile-img").alt = res.name;

        let profileContainer = document.getElementById("profile-container");
        profileContainer.classList = "visible";

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

    let profile = document.getElementById("profile-container");
    document.getElementById("profile-close").addEventListener("click", () => closeProfile() );
    document.addEventListener("keydown", (e) => 
    {
        if (e.key === "Escape") closeProfile();
    });

    function closeProfile()
    {
        window.location.hash = "_";
        profile.classList.remove("visible");
    }

    window.onhashchange = getCharacterProfile;
    window.onload = getCharacterProfile;

    getCharacters();

})();



