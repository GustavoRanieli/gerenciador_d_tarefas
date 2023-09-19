const url = "http://localhost:3000/consultarUser"
const urlAllUsers = "http://localhost:3000/allUsers"

// Variaveis do HTML Users
let opcao_d_consulta = document.querySelector("#Opcao_d_consulta");
const container = document.querySelector('#Section_user_dados');


document.addEventListener('DOMContentLoaded', async () => {
    await consultarTodosUsers();
})


// Pesquisando o usuario no banco
const inputSearch = document.querySelector('#Search')

inputSearch.addEventListener("input", async () => {
    if(inputSearch.value == ''){
        container.innerHTML = ""
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
            container.innerHTML = ""

                // Adicionando valores ao HTML
                data.forEach(element => {
                    container.innerHTML += `
                        <div class="user_container">
                            <div id="Nome_d_usuarios">
                                <a href="/tarefas/${element.id}"><p>${element.nome}</p></a>
                            </div>
                            <div class="section_user_Svgs"  id="Svgs">
                                <a href="/editUser/${element.id}"><button>Editar</button></a>
                                <button id_delete="${element.id}"><img class="img_lixo" src="../public/image/icons8-trash-48.png" alt="lixo"></button>
                            </div>
                        </div>
                    `
                });
                let bts_delete = document.querySelectorAll("#bt_deleteAdmin")
                bts_delete.forEach( bt => {
                    bt.addEventListener('click', (e) => {
                        let confirmDel = confirm(`Deseja excluir o usuário: ${bt.getAttribute("nome_user")}`)
                        if(confirmDel){
                            window.location.href = `/deleteUser/${bt.getAttribute("id_delete")}`
                        }else{
                            console.log("Não deletei")
                        }
                    })
                })
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
                container.innerHTML += `
                        <div class="user_container">
                            <div id="Nome_d_usuarios">
                                <a href="/tarefas/${element.id}"><h1>${element.nome}</h1></a>
                            </div>
                            <div class="section_user_Svgs"  id="Svgs">
                                <a href="/editUser/${element.id}"><button><img src="../public/image/icons8-edit-48.png" alt="lápis"></button></a>
                                <button id_delete="${element.id}" nome_user="${element.nome}" id="bt_deleteAdmin"><img class="img_lixo" src="../public/image/icons8-trash-48.png" alt="lixo"></button>
                            </div>
                        </div>
                    `
            });
            let bts_delete = document.querySelectorAll("#bt_deleteAdmin")
            bts_delete.forEach( bt => {
                bt.addEventListener('click', (e) => {
                    let confirmDel = confirm(`Deseja excluir o usuário: ${bt.getAttribute("nome_user")}`)
                    if(confirmDel){
                        window.location.href = `/deleteUser/${bt.getAttribute("id_delete")}`
                    }else{
                        console.log("Não deletei")
                    }
                })
            })
        })
}