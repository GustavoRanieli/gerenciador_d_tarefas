let idUser;
let url;

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
            consultarTarefas()
        })
        .catch(err => {
            console.log("Erro ao consultar cache!");
            console.log(err)
        })
})

// Variaveis
const input_pesquisa = document.querySelector('#Search');
const dia_da_semana = document.querySelector('#Dia_da_semana').value;
const campo_tarefa = document.querySelector('#Tarefa');
const campo_dia = document.querySelector('#Dia');
const campo_condominio = document.querySelector('#Condominio');

// Consultando
input_pesquisa.addEventListener('input', () => {
    consultarTarefas()
})


// COnfigurando Fetch
const formData = new URLSearchParams

let config_fetch = {
    method: "POST",
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: ''
}

// Puxando todas as tarefas
 async function consultarTarefas(){
    await fetch(url, config_fetch)
        .then( response => {
            if(!response){
                console.log(`Falha ao receber dados da consulta!`);
            }
            console.log(response)
            return response.json();
        })
        .then( data => {
            console.log(data)
            data.forEach(element => {
                campo_tarefa.innerHTML += `<h1>${element.descricao_tarefa}</h1>`;
                campo_condominio.innerHTML += `<h1>${element.dia_semana}</h1>`;
                campo_dia.innerHTML += `<h1>${element.condominio}</h1>`;
            })
        })
        .catch( err => {
            console.log(`Erro ao consultar url cache:  ${ err }`)
        })
 }

// Puxando um dado expecifico
 async function consultarTarefas(id, condominio, dia_semana){
    formData.append('id', idUser);
    formData.append('condominio', condominio);
    formData.append('dia', dia_semana);

    await fetch(url, config_fetch)
        .then( response => {
            if(!response){
                console.log(`Falha ao receber dados da consulta!`);
            }
            console.log(response)
            return response.json();
        })
        .then( data => {
            console.log(data)
            data.forEach(element => {
                campo_tarefa.innerHTML = `<h1>${element.descricao_tarefa}</h1>`;
                campo_condominio.innerHTML = `<h1>${element.dia_semana}</h1>`;
                campo_dia.innerHTML = `<h1>${element.condominio}</h1>`;
            })
        })
        .catch( err => {
            console.log(`Erro ao consultar url cache:  ${ err }`)
        })
 }

