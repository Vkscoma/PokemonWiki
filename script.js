const pokemonSprite = document.querySelector('#pokemon-sprite'),
    pokemonName = document.querySelector('#pokemon-name'),
    pokemonType = document.querySelector('#pokemon-type'),
    pokemonHP = document.querySelector('#pokemon-hp'),
    pokemonDescription = document.querySelector('#pokemon-description'),
    pokemonList = document.querySelector('#pokemon-list'),
    menuIcon = document.querySelector('.hamburger-menu')

// Generate all Pokemon and sort alphabetically
fetch(`https://pokeapi.co/api/v2/pokemon?limit=151`)
    .then(response => response.json())
    .then(pokemoneData => {
        pokemoneData.results.forEach(pokemon => {
            let pokemonTitle = pokemon.name
            pokemonTitle = pokemonTitle.charAt(0).toUpperCase() + pokemonTitle.slice(1)
            pokemonList.innerHTML += `<li>${pokemonTitle}</li>`
            pokemonList.addEventListener('click', () => {
                document.querySelector('aside').classList.toggle('show-aside')

            })
        })

        //Get name of pokemon from aside list
        pokemonList.addEventListener('click', (event) => {
            const pokemonID = event.target.innerText.toLowerCase()
            fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonID}`)
                .then(response => response.json())
                .then(pokemoneData => {
                    let pokemonTitle = pokemoneData.name
                    let newPokemonType = pokemoneData.types[0].type.name

                    pokemonTitle = pokemonTitle.charAt(0).toUpperCase() + pokemonTitle.slice(1)
                    newPokemonType = newPokemonType.charAt(0).toUpperCase() + newPokemonType.slice(1)

                    pokemonSprite.innerHTML = `<img src="${pokemoneData.sprites.front_default}">`
                    pokemonName.innerHTML = `<th>${pokemonTitle}</th>`
                    pokemonType.innerHTML = `<td>${newPokemonType}</td>`
                    pokemonHP.innerHTML = `<td>${pokemoneData.stats[0].base_stat}</td>`
                    pokemonDescription.innerHTML = `<td>${pokemoneData.weight} lbs</td>`
                })
        })


        menuIcon.addEventListener('click', () => {
            const aside = document.querySelector('aside')
            aside.classList.toggle('show-aside')
        })
    })