{/*  */}


const urlId = "http://localhost:3000/userIdent";
const container = document.querySelector('#Container');
const dia_da_semana = document.querySelector('#Dia_da_semana');
const urlEstado = 'http://localhost:3000/atualizarEstado'
let idUser;
let urlDia;
let inputComplete;
let inputNoComplete;


document.addEventListener("DOMContentLoaded", () => {
        consultarId()
})

// Consultando Id Do Usuário
async function consultarId(){
        await fetch(urlId)
                .then( response => {
                        if( !response ){
                                console.log("Não foi possível consultar o cache");
                        }
                        return response.json();
                })
                .then( data => {
                        idUser = data
                        urlDia = `http://localhost:3000/consultarTarefaEspecifica/${idUser}`
                        consultarTasks(data);
                })
                .catch( err => {
                        console.log( err );
                })
}

dia_da_semana.addEventListener('change', (e) => {
        dia_da_semana.value == "" ? consultarTasks( idUser ) : consultarTarefasPesquisa( idUser, dia_da_semana.value);
})

// Consultando Tarefas
async function consultarTasks(id){
        let fetchConfig = {
                method: "POST",
                headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: ''
        }

        await fetch(`http://localhost:3000/consultarTarefa/${id}`, fetchConfig)
                .then( response => {
                        if( !response ){
                                console.log("Não foi possível consultar o cache");
                        }
                        return response.json();
                })
                .then( data => {
                        container.innerHTML = ""

                        data.forEach( element => {
                                if(element.concluido == 1){
                                        container.innerHTML += `
                                        <form action="/atualizarTarefaUser/${element.id_tarefa}" method="post" enctype="application/x-www-form-urlencoded"">
                                                <div class="container_individualTask">
                                                        <div>
                                                                <a href="/tarefaUser/${element.id_tarefa}"><h1>${element.nome_tarefa}</h1></a>
                                                                <input type="text" name="nome_tarefa" value="${element.nome_tarefa}" style="display: none">
                                                        </div>
        
                                                        <div id="Dia">
                                                                <h1>${element.dia_semana}</h1>
                                                                <input type="text"  value="${element.dia_semana}" name="dia" style="display: none">         
                                                        </div>
                                                        <div id="Cheked">
                                                                <input type="radio" name="concluido" value="1" id="Concluido"  id_task="${element.id_tarefa}" checked>
                                                                <label for="Concluido">✔️</label>
                                                                <input type="radio" name="concluido" value="0" id="Incompleto" id_task="${element.id_tarefa}">
                                                                <label for="Incompleto">❌</label>  
                                                        </div>
                                                </div>
                                                <button style="display: none" type="submit" id="Submit"></button>
                                        </form>`
                                }else{
                                        container.innerHTML += `
                                        <form action="/atualizarTarefaUser/${element.id_tarefa}" method="post" enctype="application/x-www-form-urlencoded"">
                                                <div class="container_individualTask">
                                                        <div>
                                                                <a href="/tarefaUser/${element.id_tarefa}"><h1>${element.nome_tarefa}</h1></a>
                                                                <input type="text" name="nome_tarefa" value="${element.nome_tarefa}" style="display: none">
                                                        </div>
        
                                                        <div id="Dia">
                                                                <h1>${element.dia_semana}</h1>
                                                                <input type="text"  value="${element.dia_semana}" name="dia" style="display: none">         
                                                        </div>
                                                        <div id="Cheked">
                                                                <input type="radio" name="concluido" value="1" id="Concluido" id_task="${element.id_tarefa}">
                                                                <label for="Concluido">✔️</label>
                                                                <input type="radio" name="concluido" value="0" id="Incompleto" id_task="${element.id_tarefa}" checked>
                                                                <label for="Incompleto">❌</label>  
                                                        </div>
                                                </div>
                                                <button style="display: none" type="submit" id="Submit"></button>
                                        </form>`
                                };    
                        });
                        inputComplete = document.querySelectorAll('#Concluido')
                        inputNoComplete = document.querySelectorAll('#Incompleto')
                        checkInputs()
                })
                .catch( err => {
                        console.log( err );
                })
};


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
    
                data.forEach( element => {
                        if(element.concluido == 1){
                                container.innerHTML += `
                                <form action="/atualizarTarefaUser/${element.id_tarefa}" method="post" enctype="application/x-www-form-urlencoded"">
                                        <div class="container_individualTask">
                                                <div>
                                                        <a href="/tarefaUser/${element.id_tarefa}"><h1>${element.nome_tarefa}</h1></a>
                                                        <input type="text" name="nome_tarefa" value="${element.nome_tarefa}" style="display: none">
                                                </div>

                                                <div id="Dia">
                                                        <h1>${element.dia_semana}</h1>
                                                        <input type="text"  value="${element.dia_semana}" name="dia" style="display: none">         
                                                </div>
                                                <div id="Cheked">
                                                        <input type="radio" name="concluido" value="1" id="Concluido"  id_task="${element.id_tarefa}" checked>
                                                        <label for="Concluido">✔️</label>
                                                        <input type="radio" name="concluido" value="0" id="Incompleto" id_task="${element.id_tarefa}">
                                                        <label for="Incompleto">❌</label>  
                                                </div>
                                        </div>
                                        <button style="display: none" type="submit" id="Submit"></button>
                                </form>`
                        }else{
                                container.innerHTML += `
                                <form action="/atualizarTarefaUser/${element.id_tarefa}" method="post" enctype="application/x-www-form-urlencoded"">
                                        <div class="container_individualTask">
                                                <div>
                                                        <a href="/tarefaUser/${element.id_tarefa}"><h1>${element.nome_tarefa}</h1></a>
                                                        <input type="text" name="nome_tarefa" value="${element.nome_tarefa}" style="display: none">
                                                </div>

                                                <div id="Dia">
                                                        <h1>${element.dia_semana}</h1>
                                                        <input type="text"  value="${element.dia_semana}" name="dia" style="display: none">         
                                                </div>
                                                <div id="Cheked">
                                                        <input type="radio" name="concluido" value="1" id="Concluido" id_task="${element.id_tarefa}">
                                                        <label for="Concluido">✔️</label>
                                                        <input type="radio" name="concluido" value="0" id="Incompleto" id_task="${element.id_tarefa}" checked>
                                                        <label for="Incompleto">❌</label>  
                                                </div>
                                        </div>
                                        <button style="display: none" type="submit" id="Submit"></button>
                                </form>`
                        };    
                });
                inputComplete = document.querySelectorAll('#Concluido')
                inputNoComplete = document.querySelectorAll('#Incompleto')
                checkInputs()
            })
            .catch( err => {
                console.log(`Erro ao consultar url cache:  ${ err }`)
            })
     }

 function checkInputs(){
        inputComplete.forEach( input => {
                if(input.checked){
                        let container = input.parentNode.parentNode
                        container.classList.add('Checked')
                }
                input.addEventListener('change', (e) => {
                        let container = e.target.parentNode.parentNode
                        container.classList.add('Checked')
                        id = e.target.getAttribute('id_task')
                        atualizarEstado(id, 1)
                })
        })

        inputNoComplete.forEach( input => {
                input.addEventListener('change', (e) => {
                        let container = e.target.parentNode.parentNode
                        container.classList.remove('Checked')
                        id = e.target.getAttribute('id_task')
                        atualizarEstado(id, 0)
                })
        })
}

function atualizarEstado(idTask, condicao){
        const fetchBody = new URLSearchParams
        fetchBody.append('estado', condicao);
        fetchBody.append('id', idTask);


        const configFetch = {
                method: "POST",
                headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: fetchBody
        }

        fetch(urlEstado, configFetch)
}


