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
const campo_tarefa = document.querySelector('#Tarefa');
const campo_dia = document.querySelector('#Dia');
const campo_condominio = document.querySelector('#Condominio');
const buttons_delete_edit = document.querySelector('#ButtonsEditDelete')

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
                campo_tarefa.innerHTML += `<h1>${element.descricao_tarefa}</h1>`;
                campo_condominio.innerHTML += `<h1>${element.dia_semana}</h1>`;
                campo_dia.innerHTML += `<h1>${element.condominio}</h1>`;
                buttons_delete_edit.innerHTML += `<a href="/editTask/${element.id_tarefa}" href=""><button>Editar</button></a>
                                                <a href="/deleteTarefa/${element.id_tarefa}"><button>Deletar</button></a>`
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
            console.log(data)
            campo_tarefa.innerHTML = "";
            campo_condominio.innerHTML = "";
            campo_dia.innerHTML = "";
            buttons_delete_edit.innerHTML = ""

            data.forEach(element => {
                campo_tarefa.innerHTML += `<h1>${element.descricao_tarefa}</h1>`;
                campo_condominio.innerHTML += `<h1>${element.dia_semana}</h1>`;
                campo_dia.innerHTML += `<h1>${element.condominio}</h1>`;
                buttons_delete_edit.innerHTML += `<a href="/editarTarefa/${element.id}" href=""><button>Editar</button></a>
                                                <a href="/deleteTarefa/${element.id}"><button>Deletar</button></a>`
            })
        })
        .catch( err => {
            console.log(`Erro ao consultar url cache:  ${ err }`)
        })
 }

