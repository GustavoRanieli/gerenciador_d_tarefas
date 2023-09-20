{/*  */}


const urlId = "http://localhost:3000/userIdent";
const container = document.querySelector('#Container');
const dia_da_semana = document.querySelector('#Dia_da_semana');
let idUser;
let urlDia;

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
                                        </div>
                                </form>`
                        })
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
    
                data.forEach(element => {
                        container.innerHTML += `
                        <form action="/atualizarTarefaUser/${element.id_tarefa}" method="post" enctype="application/x-www-form-urlencoded"">
                                <div class="container_individualTask">
                                        <div>
                                                <a href="/tarefa/${element.id_tarefa}"><h1>${element.nome_tarefa}</h1></a>
                                                <input type="text" name="nome_tarefa" value="${element.nome_tarefa}" style="display: none">
                                        </div>

                                        <div id="Dia">
                                                <h1>${element.dia_semana}</h1>
                                                <input type="text"  value="${element.dia_semana}" name="dia" style="display: none">         
                                        </div>
                                </div>
                        </form>`
                })
            })
            .catch( err => {
                console.log(`Erro ao consultar url cache:  ${ err }`)
            })
     }

//      <div id="Justificativa" name="justificativa">
//      <label>Justificar:<br>
//      <textarea name="justificativa"></textarea></label>
// </div>

// <div id="Condicao">
//      <select name="concluido">
//              <option value="0">Incompleto</option>
//              <option value="1">Completo</option>
//      </select>
// </div>

// <div id="BtSubmit">
//      <button type="submit">Enviar</button>
// </div>
