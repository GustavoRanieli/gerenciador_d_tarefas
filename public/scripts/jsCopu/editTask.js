const url = `http://localhost:3000/consultarTarefa/`;
const idUser = document.querySelector('#value_id_user').value;
const idTask= document.querySelector('#value_id_task').value;

// HTML Inputs
const title = document.querySelector('#TituloEdit');
const nomeInput = document.querySelector('#NomeEdit');
const descricaoInput = document.querySelector('#DescricaoInput');
const condominioInput = document.querySelector('#CondominioInput');


document.addEventListener('DOMContentLoaded', () => {
    const fetchBody = new URLSearchParams

    const configFetch = {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: fetchBody
    }

    fetch(url + idUser, configFetch)
        .then( result => {
            if(!result){
                console.log('Falha ao consultar tarefa!')
            }
           return result.json()
        })
        .then( data => {
            data.forEach( task => {
                if( task.id_tarefa == idTask){
                    title.innerHTML = task.nome_tarefa;
                    nomeInput.value = task.nome_tarefa;
                    descricaoInput.value = task.descricao_tarefa;
                    condominioInput.value = task.condominio;
                    return
                }
            })
        })
        .catch( err => {
            console.log(err)
        })
})