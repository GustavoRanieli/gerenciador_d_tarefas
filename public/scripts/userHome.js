{/*  */}


const urlId = "http://localhost:3000/userIdent";
const container = document.querySelector('#Container')
let idUser;

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
                        consultarTasks(data);
                })
                .catch( err => {
                        console.log( err );
                })
}

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
                        data.forEach( element => {
                                container.innerHTML += `
                                <form action="/atualizarTarefa/${element.id_tarefa}" method="post" enctype="application/x-www-form-urlencoded"">
                                        <div>
                                                <a href="/tarefa/${element.id_tarefa}"><h1>${element.nome_tarefa}</h1></a>
                                        </div>

                                        <div id="Dia">
                                                <input type="text" value="${element.dia_semana}" name="dia">         
                                        </div>

                                        <div id="Justificativa" name="justificativa">
                                                <input name="justificativa" type="text">
                                        </div>

                                        <div id="Condicao">
                                                <select name="concluido">
                                                        <option value="0">Incompleto</option>
                                                        <option value="1">Completo</option>
                                                </select>
                                        </div>

                                        <div id="BtSubmit">
                                                <button type="submit">Enviar</button>
                                        </div>
                                </form>`
                        })
                })
                .catch( err => {
                        console.log( err );
                })
}
