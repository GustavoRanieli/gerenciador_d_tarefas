let idUser;
let url;
let urlDia;
let Bt_delet;

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
            container.innerHTML = ""
            if(data.length == 0){
                container.innerHTML = `<h1>Usuário não tem tarefa</h1>`
            }else{
                data.forEach(element => {
                    container.innerHTML += `
                        <div class="div_tarefas">
                            <div class="div_tarefas_diaSeman">
                                <a href="/tarefa/${element.id_tarefa}"><p>${element.nome_tarefa}</p></a>
                            </div>
                            <div>
                                <p>${element.dia_semana}</p>
                            </div>
                            <div>
                                <p>${element.condominio}</p>
                            </div>
                            <div>
                                <p>Feita: ${element.concluido == 1 ? "✔️" : "❌"}</p>
                            </div>
                            <div>
                                <a href="/editTask/${element.id_tarefa}" href=""><button>Editar</button></a>
                                <button id="Bt_delete" id_task="${element.id_tarefa}">Deletar</button>
                            </div>
                        </div>
                    `
                })
                Bt_delet = document.querySelectorAll('#Bt_delete');
                Bt_delet.forEach(botão => {
                    botão.addEventListener('click', () => {
                        let id = botão.getAttribute('id_task')
                        let confirmacao = confirm('Deseja excluir tarefa?')
                        if(confirmacao){
                            window.location.href = `/deleteTarefa/${id}`
                        }else{
                            console.log('Tarefa não deletada!')
                        }
                    })
                });
            }
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
            if(data.length == 0){
                container.innerHTML = `<h1>Usuário não tem tarefa</h1>`
            }else{
                data.forEach(element => {
                    container.innerHTML += `
                        <div class="div_tarefas">
                            <div class="div_tarefas_diaSeman">
                                <a href="/tarefa/${element.id_tarefa}"><p>${element.nome_tarefa}</p></a>
                            </div>
                            <div>
                                <p>${element.dia_semana}</p>
                            </div>
                            <div>
                                <p>${element.condominio}</p>
                            </div>
                            <div>
                                <p>Feita: ${element.concluido == 1 ? "✔️" : "❌"}</p>
                            </div>
                            <div>
                                <a href="/editTask/${element.id_tarefa}" href=""><button>Editar</button></a>
                                <button id="Bt_delete" id_task="${element.id_tarefa}">Deletar</button>
                            </div>
                        </div>
                    `
                })
                Bt_delet = document.querySelectorAll('#Bt_delete');
                Bt_delet.forEach(botão => {
                    botão.addEventListener('click', () => {
                        let id = botão.getAttribute('id_task')
                        let confirmacao = confirm('Deseja excluir tarefa?')
                        if(confirmacao){
                            window.location.href = `/deleteTarefa/${id}`
                        }else{
                            console.log('Tarefa não deletada!')
                        }
                    })
                });
            }
        })
        .catch( err => {
            console.log(`Erro ao consultar url cache:  ${ err }`)
        })
 }
