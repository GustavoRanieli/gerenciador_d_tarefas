let idUser;
let url;
let urlDia;

// Puxando o id do usuário para consulta
document.addEventListener('DOMContentLoaded', async () => {
   await fetch('http://localhost:3000/userTaksIdent')
        .then(response => {
            if(!response){
                console.log('Falha ao puxar Id, Id vazio')
            }
            return response.json();
        })
        .then(data => {
            idUser = data;
            url = `http://localhost:3000/consultarTarefa/${idUser}`
            urlDia = `http://localhost:3000/consultarTarefaEspecifica/${idUser}`
            consultarTarefas()
        })
        .catch(err => {
            console.log("Erro ao consultar cache!");
            console.log(err)
        })
})

// Variaveis
const dia_da_semana = document.querySelector('#Dia_da_semana');
const container = document.querySelector('#Container_Tasks');

// Consultando
dia_da_semana.addEventListener('change', (e) => {
    consultarTarefasPesquisa( idUser, dia_da_semana.value);
})


// Puxando todas as tarefas
const config = {
    method: "POST",
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: ''
};

 async function consultarTarefas(){
    await fetch(url, config)
        .then( response => {
            if(!response){
                console.log(`Falha ao receber dados da consulta!`);
            }
            return response.json();
        })
        .then( data => {
            data.forEach(element => {
                container.innerHTML += `
                    <div>
                        <div>
                            <a href="/tarefa/${element.id_tarefa}"><h1>${element.nome_tarefa}</h1></a>
                        </div>
                        <div>
                            <h1>${element.dia_semana}</h1>
                        </div>
                        <div>
                            <h1>${element.condominio}</h1>
                        </div>
                        <div>
                            <a href="/editTask/${element.id_tarefa}" href=""><button>Editar</button></a>
                            <a href="/deleteTarefa/${element.id_tarefa}"><button>Deletar</button></a>
                        </div>
                    </div>
                `
            })
        })
        .catch( err => {
            console.log(`Erro ao consultar url cache:  ${ err }`)
        })
 }

// Puxando um dado expecifico
 async function consultarTarefasPesquisa(id, dia_semana){
    const formData = new URLSearchParams

    formData.append('id', id);
    formData.append('dia', dia_semana);

    const config_fetch = {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formData
    };

    await fetch(urlDia, config_fetch)
        .then( response => {
            if(!response){
                console.log(`Falha ao receber dados da consulta!`);
            }
            return response.json();
        })
        .then( data => {
            container.innerHTML = ""

            data.forEach(element => {
                container.innerHTML += `
                    <div>
                        <div>
                            <h1>${element.nome_tarefa}</h1>
                        </div>
                        <div>
                            <h1>${element.dia_semana}</h1>
                        </div>
                        <div>
                            <h1>${element.condominio}</h1>
                        </div>
                        <div>
                            <a href="/editTask/${element.id_tarefa}" href=""><button>Editar</button></a>
                            <a href="/deleteTarefa/${element.id_tarefa}"><button>Deletar</button></a>
                        </div>
                    </div>
                `
            })
        })
        .catch( err => {
            console.log(`Erro ao consultar url cache:  ${ err }`)
        })
 }

