const url = "http://localhost:3000/consultarUser"

// Variaveis do HTML Users
let opcao_d_consulta = document.querySelector("#Opcao_d_consulta");
let nome_list = document.querySelector("#Nome_d_usuarios");
let cpf_list = document.querySelector("#CPF")
let funcao_list = document.querySelector("#Função")



// Pesquisando o usuario no banco
const inputSearch = document.querySelector('#Search')

inputSearch.addEventListener("input", () => {
    if(inputSearch.value == ''){
        nome_list.innerHTML = '';
        cpf_list.innerHTML = '';
        funcao_list.innerHTML = '';
    }
    consultarBanco(opcao_d_consulta.value, inputSearch.value)
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
            data.forEach(element => {
                nome_list.innerHTML += `<a href="/tarefas/${element.id}"><h1>${element.nome}</h1></a>`;
                cpf_list.innerHTML += `<h1>${element.cpf}</h1>`;
                funcao_list.innerHTML += `<h1>${element.funcao}</h1>`;
            });
        })
}