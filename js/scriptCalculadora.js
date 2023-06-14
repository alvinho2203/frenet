// Função para calcular o frete
function calculateFreight(weight, length, width, height) {
    // Cálculos fictícios para ilustrar o exemplo
    const freightOptions = [
        { company: "Jadlog", price: 10 },
        { company: "Correio Pac", price: 15 },
        { company: "Correio Sedex", price: 12 },
        { company: "Jadlog Express", price: 18 },
        { company: "Kangu", price: 9 }
    ];

    // Cálculo do frete para cada opção
    const freightResults = freightOptions.map(option => {
        const totalPrice = option.price * weight * length * width * height;
        return {
            company: option.company,
            price: totalPrice.toFixed(2)
        };
    });

    // Ordenação dos resultados pelo preço
    freightResults.sort((a, b) => a.price - b.price);

    return freightResults;
}

// Função para exibir os resultados dos fretes em cards
function displayFreightResults(results) {
    const resultsContainer = document.getElementById("results");
    resultsContainer.innerHTML = "";

    results.forEach(result => {
        const card = document.createElement("div");
        card.classList.add("card");

        const companyHeading = document.createElement("h2");
        companyHeading.textContent = result.company;

        const priceParagraph = document.createElement("p");
        priceParagraph.textContent = `Preço: R$ ${result.price}`;

        card.appendChild(companyHeading);
        card.appendChild(priceParagraph);
        resultsContainer.appendChild(card);
    });
}

// Manipulador de evento para o envio do formulário
document.getElementById("freightForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // Obtenção dos valores do formulário
    const weight = parseFloat(document.getElementById("weight").value);
    const length = parseFloat(document.getElementById("length").value);
    const width = parseFloat(document.getElementById("width").value);
    const height = parseFloat(document.getElementById("height").value);

    // Cálculo do frete
    const results = calculateFreight(weight, length, width, height);

    // Exibição dos resultados
    displayFreightResults(results);
});