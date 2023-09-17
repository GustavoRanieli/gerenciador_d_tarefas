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
                                <form>
                                        <div id="Tarefas">
                                                ${element.descricao_tarefa}
                                        </div>

                                        <div id="Dia">
                                                ${element.dia_semana}
                                        </div>

                                        <div id="Justificativa">
                                                <input name="justificativa" type="text">
                                        </div>

                                        <div id="Condicao">
                                                ${element.concluido}
                                        </div>

                                        <div id="BtSubmit">
                                                <button>Enviar</button>
                                        </div>
                                </form>`
                        })
                })
                .catch( err => {
                        console.log( err );
                })
}
