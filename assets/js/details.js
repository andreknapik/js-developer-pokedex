// details.js

const pokemonImage = document.getElementById('pokemonImage');
const pokemonNameDetails = document.getElementById('pokemonName');
const pokemonNumber = document.getElementById('pokemonNumber');
const pokemonExperience = document.getElementById('pokemonExperience');
const pokemonTypes = document.getElementById('pokemonTypes');
const pokemonAbilities = document.getElementById('pokemonAbilities');

// Função para carregar os detalhes do Pokémon com base no nome
function loadPokemonDetails(pokemonName) {
    pokeApi.getPokemonByName(pokemonName).then((pokemon) => {
        pokemonImage.src = pokemon.photo;
        pokemonNameDetails.textContent = `${pokemon.name}`;
        pokemonNumber.textContent = `#${pokemon.number}`;
        pokemonExperience.textContent = `Experience: ${pokemon.base_experience}`;

        const typeList = pokemon.types.map((type) => `<li>${type}</li>`).join('');
        pokemonTypes.innerHTML = typeList;

        const abilitieList = pokemon.abilities.map((abilitie) => `<li>${abilitie}</li>`).join('');
        pokemonAbilities.innerHTML = abilitieList;

    }).catch((error) => {
        console.error(error.message);
    });
}

// Função para obter o valor do parâmetro 'name' da URL
function getParameterByName(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Obtenha o nome do Pokémon da URL
const pokemonNameFromURL = getParameterByName('name');

// Verifique se o nome do Pokémon da URL está presente e, em seguida, carregue os detalhes
if (pokemonNameFromURL) {
    loadPokemonDetails(pokemonNameFromURL);
}

const backButton = document.getElementById('backButton');

// Adicione um ouvinte de evento para o botão de volta
backButton.addEventListener('click', () => {
    // Redirecione de volta para a página de índice
    window.location.href = '/index.html'; // Substitua 'index.html' pelo nome correto do seu arquivo de índice
});