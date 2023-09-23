const urlAllUsers = "http://localhost:3000/allUsers";


const Id_users = document.querySelector('#Id_users')
const ifId_user = document.querySelector('#IfUser').value

document.addEventListener('DOMContentLoaded', async () => {
    await consultarTodosUsers();
});

async function consultarTodosUsers(){
    await fetch(urlAllUsers)
        .then( response => {
            if( !response ){
                console.log(`Falha ao consultar! ${response}`)
            }
            return response.json()
        })
        .then( data => {
            if(ifId_user != ''){
                data.forEach(element => {
                    if(element.id == ifId_user){
                        Id_users.innerHTML = `<option value="${element.id}">${element.nome}</option>`
                    }
                })
            }else{
                data.forEach(element => {
                    Id_users.innerHTML += `<option value="${element.id}">${element.nome}</option>`
                });
            }
        })
};

const input_date = document.querySelector('#Dia_da_tarefa');
const input_hour = document.querySelector('#Horario_tarefa');

const dataAtual = new Date();

const dia = dataAtual.getDate();
const mes = dataAtual.getMonth() + 1;
const ano = dataAtual.getFullYear();

const hora = dataAtual.getHours();
const minuto = dataAtual.getMinutes();

input_date.value = `${dia}/${mes}/${ano}`;
input_hour.value = `${hora}:${minuto}`;
