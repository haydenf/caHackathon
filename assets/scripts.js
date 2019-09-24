/* jshint esversion: 8 */
(() => 
{
    const apiUrl = "https://gateway.marvel.com/v1/public/";
    const apiKey = "8a291b98a1bef1b182731afaf46f4ace";

    // Get list of characters
    async function getCharacters()
    {
        const data = await fetch("/characters");
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

        const data = await fetch(`/character/${id}`);
        const res = await data.json();

        getComics(id);

        // Update profile element here
        document.getElementById("profile-name").innerHTML = res.name;
        document.getElementById("profile-description").innerHTML = res.description;
        document.getElementById("profile-img").src = res.thumbnail;
        document.getElementById("profile-img").alt = res.name;

        let profileContainer = document.getElementById("profile-container");
        let header = document.querySelector("header");
        
        document.getElementById("container").style.display = "none";
        profileContainer.classList = "visible";
        header.classList = "visible";
    }

// Get list of all Comics by character
    async function getComics(character)
    {
        const data = await fetch(`${apiUrl}characters/${character}/comics?orderBy=title&formatType=comic&limit=100&apikey=${apiKey}`);
        const res = await data.json();
        let comics = res.data.results;

        for (let comic in comics)
        {
            console.log(comics)
            let title = comics[comic].title;
            let thumbnail = comics[comic].thumbnail.path + "." + comics[comic].thumbnail.extension;
            let url = comics[comic].urls[0].url;

            let container = document.createElement("a");
            container.className = "comic-container";
            container.target = "_blank";
            container.href = url;

            let img = document.createElement("img");
            let name = document.createElement("div");

            img.src = thumbnail;
            name.innerHTML = title;

            container.appendChild(img);
            document.getElementById("comics").appendChild(container);
        }
    }


// Get list of all Series by character
    // async function getSeries(character)
    // {
    //     const data = await fetch(`${apiUrl}characters/${character}/series?apikey=${apiKey}`);
    //     const res = await data.json();

    //     console.log(res);
    // }

    document.getElementById("profile-close").addEventListener("click", () => closeProfile());
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeProfile(); });

    function closeProfile()
    {
        let container = document.getElementById("container");
        let profile = document.getElementById("profile-container");
        let header = document.querySelector("header");
        container.style.display = "flex";
        window.location.hash = "_";
        profile.classList.remove("visible");

        document.getElementById("profile-name").innerHTML = "";
        document.getElementById("profile-description").innerHTML = "";
        document.getElementById("profile-img").src = "";
        document.getElementById("profile-img").alt = "";
        document.getElementById("comics").innerHTML = "";
    }

    document.getElementById("random-character").addEventListener("click", () => window.location.hash = 1017840);

    window.onhashchange = getCharacterProfile;
    window.onload = getCharacterProfile;

    getCharacters();

})();



