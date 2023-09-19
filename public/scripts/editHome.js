const IdEdit = document.querySelector('#IdEdit')
const nomeEdit = document.querySelector('#NomeEdit')
const senhaEdit = document.querySelector('#SenhaEdit')
const funcaoEdit = document.querySelector('#FuncaoEdit')
const cpfEdit = document.querySelector('#CpfEdit')
const btSubmit = document.querySelector('#BtSubmit')
const idadeEdit = document.querySelector('#IdadeEdit')
const url = `http://localhost:3000/consultarUser`

document.addEventListener('DOMContentLoaded', () => {
    const fetchBody = new URLSearchParams
    fetchBody.append('tabela', 'id');
    fetchBody.append('valor', IdEdit.value);


    const configFetch = {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: fetchBody
    }

    fetch(url, configFetch)
        .then( response => {
            if( !response ){
                console.log( `Falha ao consultar! ${response}` )
            };
            return response.json()
        })
        .then( data => {
            console.log(data)
            nomeEdit.value = data[0].nome
            senhaEdit.value = data[0].senha
            funcaoEdit.value = data[0].funcao
            cpfEdit.value = data[0].cpf
            idadeEdit.value = data[0].idade
        })
        .catch( err => {
            console.log(err)
        })
})

async function editarUsuario(){
    const configFetch = {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: fetchBody
    }

    const fetchBody = new URLSearchParams
    formData.append('nome', nomeEdit.value);
    formData.append('senha', senhaEdit.value);
    formData.append('funcao', funcaoEdit.value);
    formData.append('cpf', cpfEdit.value);
    formData.append('idade', idadeEdit.value);

    fetch(url, configFetch)
        .then( response => {
            if( !response ){
                console.log( `Falha ao consultar! ${response}` )
            };
            return response.json()
        })
        .then( data => {
            console.log(data)
        })
        .catch( err => {
            console.log(err)
        })
};

btSubmit.addEventListener('click', (e) => {
    let confirmEdit = confirm('Deseja alterar as informações?')
    if(confirmEdit){}else{
        e.preventDefault()
    }
})