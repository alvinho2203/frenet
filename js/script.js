$(document).ready(function() {
    // URL base da API Frenet
    const apiUrl = 'https://frontend-test.frenet.dev/v1/user';

    // Carregar usuários ao carregar a página
    loadUsers();

    // Submeter o formulário de usuário
    $('#userForm').submit(function(e) {
        e.preventDefault();

        const username = $('#username').val();
        const firstName = $('#firstName').val();
        const lastName = $('#lastName').val();
        const email = $('#email').val();
        const password = $('#password').val();
        const phone = $('#phone').val();
        const userStatus = $('#userStatus').val();

        if ($('#updateBtn').css('display') === 'none') {
            // Cadastrar novo usuário
            createUser(username, firstName, lastName, email, password, phone, userStatus);
        } else {
            // Atualizar usuário existente
            const userId = $('#updateBtn').data('user-id');
            updateUser(userId, username, firstName, lastName, email, password, phone, userStatus);
        }

        // Limpar o formulário
        resetForm();
    });

    // Função para carregar os usuários
    function loadUsers() {
        $.ajax({
            url: apiUrl,
            method: 'GET',
            success: function(users) {
                let rows = '';

                users.forEach(function(user) {
                    rows += `<tr>
                        <td>${user.firstName} ${user.lastName}</td>
                        <td>${user.username}</td>
                        <td>${user.email}</td>
                        <td>
                          <button type="button" class="btn btn-primary btn-sm" onclick="editUser(${user.id})">Editar</button>
                          <button type="button" class="btn btn-danger btn-sm" onclick="deleteUser(${user.id})">Excluir</button>
                        </td>
                      </tr>`;
                });

                $('#userTableBody').html(rows);
            }
        });
    }

    // Função para criar um novo usuário
    function createUser(username, firstName, lastName, email, password, phone, userStatus) {
        $.ajax({
            url: apiUrl,
            method: 'POST',
            data: {
                username: username,
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                phone: phone,
                userStatus: userStatus
            },
            success: function() {
                loadUsers();
            }
        });
    }

    // Função para atualizar um usuário existente
    function updateUser(userId, username, firstName, lastName, email, password, phone, userStatus) {
        $.ajax({
            url: `${apiUrl}/${userId}`,
            method: 'PUT',
            data: {
                username: username,
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                phone: phone,
                userStatus: userStatus
            },
            success: function() {
                loadUsers();
            }
        });
    }

    // Função para excluir um usuário
    function deleteUser(userId) {
        $.ajax({
            url: `${apiUrl}/${userId}`,
            method: 'DELETE',
            success: function() {
                loadUsers();
            }
        });
    }

    // Função para editar um usuário
    function editUser(userId) {
        $.ajax({
            url: `${apiUrl}/${userId}`,
            method: 'GET',
            success: function(user) {
                $('#username').val(user.username);
                $('#firstName').val(user.firstName);
                $('#lastName').val(user.lastName);
                $('#email').val(user.email);
                $('#password').val(user.password);
                $('#phone').val(user.phone);
                $('#userStatus').val(user.userStatus);
                $('#updateBtn').show().data('user-id', user.id);
                $('#deleteBtn').show();
                $('#userNotFoundMsg').hide();
            },
            error: function() {
                // Limpar o formulário e exibir mensagem de usuário não encontrado
                resetForm();
                $('#userNotFoundMsg').show();
            }
        });
    }

    // Função para consultar um usuário
    function getUser() {
        const userId = $('#userId').val();

        $.ajax({
            url: `${apiUrl}/${userId}`,
            method: 'GET',
            success: function(user) {
                $('#username').val(user.username);
                $('#firstName').val(user.firstName);
                $('#lastName').val(user.lastName);
                $('#email').val(user.email);
                $('#password').val(user.password);
                $('#phone').val(user.phone);
                $('#userStatus').val(user.userStatus);
                $('#updateBtn').show().data('user-id', user.id);
                $('#deleteBtn').show();
                $('#userNotFoundMsg').hide();
            },
            error: function() {
                // Limpar o formulário e exibir mensagem de usuário não encontrado
                resetForm();
                $('#userNotFoundMsg').show();
            }
        });
    }

    // Função para redefinir o formulário
    function resetForm() {
        $('#username').val('');
        $('#firstName').val('');
        $('#lastName').val('');
        $('#email').val('');
        $('#password').val('');
        $('#phone').val('');
        $('#userStatus').val(0);
        $('#updateBtn').hide().removeData('user-id');
        $('#deleteBtn').hide();
        $('#userNotFoundMsg').hide();
    }
});

// Função para calcular o frete
function calculateFreight(weight, length, width, height) {
    // Cálculos fictícios para ilustrar o exemplo
    const freightOptions = [
        { company: "Empresa A", price: 10 },
        { company: "Empresa B", price: 15 },
        { company: "Empresa C", price: 12 },
        { company: "Empresa D", price: 18 },
        { company: "Empresa E", price: 9 }
    ];

    // Cálculo do frete para cada opção
    const freightResults = freightOptions.map(option => {
        const totalPrice = option.price * weight;
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