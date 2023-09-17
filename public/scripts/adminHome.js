const url = "http://localhost:3000/consultarUser"
const urlAllUsers = "http://localhost:3000/allUsers"

// Variaveis do HTML Users
let opcao_d_consulta = document.querySelector("#Opcao_d_consulta");
let nome_list = document.querySelector("#Nome_d_usuarios");
let cpf_list = document.querySelector("#CPF");
let funcao_list = document.querySelector("#Função");
let div_svgs = document.querySelector('#Svgs');


document.addEventListener('DOMContentLoaded', async () => {
    await consultarTodosUsers();
})


// Pesquisando o usuario no banco
const inputSearch = document.querySelector('#Search')

inputSearch.addEventListener("input", async () => {
    if(inputSearch.value == ''){
        nome_list.innerHTML = '';
        // cpf_list.innerHTML = '';
        // funcao_list.innerHTML = '';
        div_svgs.innerHTML = '';
        consultarTodosUsers();
    }
    await consultarBanco(opcao_d_consulta.value, inputSearch.value)
});


// Fetch de consulta
function consultarBanco(whereUser, valorWhere){
    let tabela = `${whereUser}`;
    let valor = `${valorWhere}`

    const formData = new URLSearchParams();
    formData.append('tabela', tabela);
    formData.append('valor', valor);  


    const corpoFetch = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formData
    };

    fetch(url, corpoFetch)
        .then( response => {
            if( !response ){
                console.log(`Falha ao consultar! ${response}`)
            }
            return response.json()
        })
        .then( data => {
            console.log(data)
            nome_list.innerHTML = ``;
            cpf_list.innerHTML = ``;
            funcao_list.innerHTML = ``;
            div_svgs.innerHTML = '';

                // Adicionando valores ao HTML
                data.forEach(element => {
                    nome_list.innerHTML += `<a href="/tarefas/${element.id}"><p>${element.nome}</p></a>`;
                    cpf_list.innerHTML += `<p>${element.cpf}</p>`;
                    funcao_list.innerHTML += `<p>${element.funcao}</p>`;
                    div_svgs.innerHTML += `<button>Editar</button>
                                 <a href="/deleteUser/${element.id}"><button><img class="img_lixo" src="../public/image/icons8-trash-48.png" alt="lixo"></button></a>`
                });
        })
}

// Trazendo todos os usuários

async function consultarTodosUsers(){
    await fetch(urlAllUsers)
        .then( response => {
            if( !response ){
                console.log(`Falha ao consultar! ${response}`)
            }
            return response.json()
        })
        .then( data => {
            console.log(data)
            data.forEach(element => {
                nome_list.innerHTML += `<a class="name_user" href="/tarefas/${element.id}"><h1>${element.nome}</h1></a>`;
                // cpf_list.innerHTML += `<h1>${element.cpf}</h1>`;
                // funcao_list.innerHTML += `<h1>${element.funcao}</h1>`;
                div_svgs.innerHTML += `<a href="/editUser/${element.id}"><img width=30% class="img_editar" src="../public/image/icons8-edit-48.png" alt="lixo"></a>
                            <a href="/deleteUser/${element.id}"><img width=30% class="img_lixo" src="../public/image/icons8-trash-48.png" alt="lixo"></a>`
            });
        })
}