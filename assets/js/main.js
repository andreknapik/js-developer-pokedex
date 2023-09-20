const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;


function convertPokemonToLi(pokemon) {

    return `
        <li class="pokemon ${pokemon.type}" data-name="${pokemon.name}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <span class="xp">XP:${pokemon.base_experience}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('');
        pokemonList.innerHTML += newHtml;

        // Adicione um ouvinte de evento a cada elemento <li> para redirecionar para details.html
        const pokemonItems = document.querySelectorAll('.pokemon');
        pokemonItems.forEach((pokemonItem) => {
            const pokemonName = pokemonItem.getAttribute('data-name');
            console.log(pokemonName);
            pokemonItem.addEventListener('click', () => {
                // Redirecione para details.html com o nome do Pokémon como parâmetro na URL
                window.location.href = `/details.html?name=${pokemonName}`;
            });
        });
    });
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})


const searchInput = document.getElementById('searchInput');

searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    filterPokemonList(searchTerm);
});


function filterPokemonList(searchTerm) {
    const pokemons = document.querySelectorAll('.pokemon');

    pokemons.forEach((pokemon) => {
        const name = pokemon.querySelector('.name').textContent.toLowerCase();
        if (name.includes(searchTerm)) {
            pokemon.style.display = 'block';
        } else {
            pokemon.style.display = 'none';
        }
    });
}