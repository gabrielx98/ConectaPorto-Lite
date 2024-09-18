const $ = require('jquery');


export function showCadCliente() {
    const cadCliente = document.getElementById('cadastroCliente')
    cadCliente.style.display = 'block'
    const parentes = $(cadCliente).siblings()
    parentes.css({ "display": "none" })
    showTitle('Cadastro de Clientes')
}
export function showCadContainer() {
    const cadContainer = document.getElementById('cadastroContainer')
    cadContainer.style.display = 'block'
    const parentes = $(cadContainer).siblings()
    parentes.css({ "display": "none" })
    showTitle('Cadastro de Containers')
    const opcaoClientes = document.getElementById('inputCliente')
    if(opcaoClientes.children.length < 2){

        $.get(url("/clientes"), function (resultado) {
            
            for (let i = 0; resultado.length > i; i++) {
                let opcao = document.createElement('option')
                
                opcao.value = resultado[i].ID_CLIENTE
                opcao.innerText = resultado[i].NOME
                opcaoClientes.appendChild(opcao)
                
            }
        })
    }

}
export function showCadMov() {
    const cadMov = document.getElementById('cadastroMovimentacao')
    cadMov.style.display = 'block'
    const parentes = $(cadMov).siblings()
    parentes.css({ "display": "none" })
    showTitle('Cadastro de Movimentações')
    const opcaoClientes = document.getElementById('inputCliente2')
    if(opcaoClientes.children.length < 2 ){

        $.get(url("/clientes"), function (resultado) {
            for (let i = 0; resultado.length > i; i++) {
                let opcao = document.createElement('option')
                opcao.value = resultado[i].ID_CLIENTE
                opcao.innerText = resultado[i].NOME
                opcaoClientes.appendChild(opcao)
                
            }
        })
    }

}
function showTitle(fonteTitulo) {
    const titulo = document.getElementById('pageTitle')
    titulo.innerHTML = fonteTitulo
}
export function showDashboard() {
    const dashboard = document.getElementById('dashboard')
    
    dashboard.style.display = 'block'
    const parentes = $(dashboard).siblings()
    parentes.css({ "display": "none" })
    showTitle('Overview')
    const opcaoClientes = document.getElementById('inputCliente3')
    if(opcaoClientes.children.length < 2){

    $.get(url("/clientes"), function (resultado) {
        

            for (let i = 0; resultado.length > i; i++) {
                let opcao = document.createElement('option')
                opcao.value = resultado[i].ID_CLIENTE
                opcao.innerText = resultado[i].NOME
                opcaoClientes.appendChild(opcao)
                
            }
            
        })
    }

    let opcao = document.getElementById('inputCliente3')
    opcao.onchange = function () {

        ajaxDados('Iconteudo', 'IMPORTAÇÃO')
        ajaxDados('Econteudo', 'EXPORTAÇÃO')

    }
    function ajaxDados(id, categoria) {
        $.post(url('/consulta/movimentacao/categoria'), {
            //aqui eu mando o argumento
            cliente: opcao.value,
            categoria: categoria
        }).done(function dados(data) {
            //aqui eu pego o valor de volta
            const tabela = document.getElementById(id).children

            let dados = quantidade(data)
            let total = 0

            for (let i = 0; i < dados.length; i++) {
                tabela[i].innerHTML = dados[i]
                total = total + dados[i]

            }
            tabela[7].innerHTML = total
        })
    }

    function quantidade(data) {
        let QTD = 0
        let dadosSaida = []
        const dados = ['REPOSICIONAMENTO', 'EMBARQUE', 'DESCARGA', 'GATE IN', 'GATE OUT', 'PESAGEM', 'SCANNER']
        for (let e = 0; e < dados.length; e++) {
            for (let i = 0; i < data.length; i++) {
                if (data[i].MOVIMENTACAO == dados[e]) {
                    QTD++
                }
            }
            dadosSaida[e] = QTD
            QTD = 0
        }
        return dadosSaida
    }
}


function deletar() {

    console.log(this.id)

    $.ajax({
        method: 'DELETE',
        url: url('/deletar/movimentacao'),
        data: {
            id: this.id
        }
    })

    window.location.reload()

}


export function showRegistros() {

    const registros = document.getElementById('registros')
    


        registros.style.display = 'block'
        const parentes = $(registros).siblings()
        parentes.css({ "display": "none" })

        showTitle('Registros')

        
        $.post(url('/consulta/movimentacoes'), {

        }).done(function (resultado) {
            const tabela = document.getElementById('tbody')
            
            if(tabela.children.length == 0){

            
            for (let i = 0; i < resultado.length; i++) {
                let td1 = document.createElement('td')
                let td2 = document.createElement('td')
                let td3 = document.createElement('td')
                let td4 = document.createElement('td')
                let td5 = document.createElement('td')
                let td6 = document.createElement('td')
                let tr = document.createElement('tr')
                let botao = document.createElement('button')

                botao.className = " btn btn-danger mx-1 deletar"
                botao.innerHTML = "Deletar"
                botao.onclick = deletar
                for (let j = 0; j < 4; j++) {
                    botao.id = resultado[i].ID_MOVIMENTACAO
                    td1.innerHTML = resultado[i].ID_MOVIMENTACAO
                    td2.innerHTML = resultado[i].ID_CONTAINER
                    td3.innerHTML = resultado[i].CATEGORIA
                    td4.innerHTML = resultado[i].DATA_INICIO.replace(/T/, ' ').replace('.000Z', ' ')
                    td5.innerHTML = resultado[i].DATA_FIM.replace(/T/, ' ').replace('.000Z', ' ')

                }
                tr.appendChild(td1)
                tr.appendChild(td2)
                tr.appendChild(td3)
                tr.appendChild(td4)
                tr.appendChild(td5)
                td6.appendChild(botao)
                tr.appendChild(td6)
                tabela.appendChild(tr)
            }}

        })

        const opcaoClientes = document.getElementById('alterCliente')
        if(opcaoClientes.children.length < 2){

            $.get(url("/clientes"), function (resultado) {
                
                for (let i = 0; resultado.length > i; i++) {
                    let opcao = document.createElement('option')
                    opcao.value = resultado[i].ID_CLIENTE
                    opcao.innerText = resultado[i].NOME
                    opcaoClientes.appendChild(opcao)
                    
                }
            })
        }

        
    
}
$(document).ready(function () {

    const inputCodContainer2 = document.getElementById('inputCodContainer2')
    const inputCodContainer1 = document.getElementById('inputCodContainer1')
    const inputCodContainer3 = document.getElementById('inputCodContainer3')
    $(inputCodContainer1).mask('SSSS0000000')
    $(inputCodContainer2).mask('SSSS0000000')
    $(inputCodContainer3).mask('SSSS0000000')



})

function url(prefix) {
    return `http://localhost:3000${prefix}`
}
function valor(id) {
    return document.getElementById(id).value.toUpperCase()
}



export function cadCliente() {
    let nome = valor('nomeCliente')
    $.post(url("/cadastro/cliente"), {
        nome: nome
    })

}

export function cadContainer() {

    let codigo = valor('inputCodContainer1')
    let cliente = valor('inputCliente')
    let tamanho = valor('inputTamanho')
    let volume = valor('inputCondicao')
    let categoria = valor('inputCategoria')

    $.post(url("/cadastro/container"), {
        codigo: codigo,
        cliente: cliente,
        tamanho: tamanho,
        volume: volume,
        categoria: categoria

    })
}

export function cadMovimentacao() {
    let codigo = valor('inputCodContainer2')
    let categoria = valor('inputCategoria2')
    let cliente = valor('inputCliente2')
    let dataInicio = valor('inputDataInicial')
    let horaInicio = valor('inputHoraInicial')
    let horaFinal = valor('inputHoraFinal')
    let dataFinal = valor('inputDataFinal')
    
    $.post(url('/cadastro/movimentacao'), {
        codigo: codigo,
        categoria: categoria,
        cliente,
        dataInicio: dataInicio,
        horaInicio: horaInicio,
        dataFinal,
        horaFinal
    })
}

export function alterMov() {
    let numero = valor('alterCodMov')
    let codigo = valor('inputCodContainer3')
    let categoria = valor('alterCategoria')
    let cliente = valor('alterCliente')
    let dataInicio = valor('alterDataInicial')
    let horaInicio = valor('alterHoraInicial')
    let horaFinal = valor('alterHoraFinal')
    let dataFinal = valor('alterDataFinal')

    $.ajax({
        method: 'PATCH',
        url: url('/alterar/movimentacao'),
        data: {
            numero,
            codigo,
            categoria,
            cliente,
            dataInicio,
            horaInicio,
            dataFinal,
            horaFinal
        }
    })
}



