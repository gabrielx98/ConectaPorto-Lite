const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000; //porta padrão
const mssql = require('mssql');
const connStr = "Server=localhost;Database=Controle de Containers;User Id=sa;Password=171298;trustServerCertificate=true";
var cors = require('cors');
const { Router } = require('express');

app.use(cors())


mssql.connect(connStr)
    .then(conn => global.conn = conn)
    .catch(err => console.log(err));

//configurando o body parser para pegar POSTS mais tarde
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//definindo as rotas
const router = express.Router();
router.get('/', (req, res) => res.json({ message: 'Funcionando!' }));
app.use('/', router);

//inicia o servidor
app.listen(port);
console.log('API funcionando!');

function execInputSQLQuery(sqlQry, res){
    global.conn.request()
               .query(sqlQry)
               //.catch(err => res.json(err));
}

function execSelectSQLQuery(sqlQry, res){
    global.conn.request()
               .query(sqlQry)
               .then(result => res.json(result.recordset))
               //.catch(err => res.json(err));
}

router.get('/clientes', (req, res) =>{
    execSelectSQLQuery('SELECT * FROM CLIENTE', res);
    
})
router.get('/consulta/registros',(req,res) => {
    execSelectSQLQuery('SELECT * FROM MOVIMENTACAO ORDER BY ID_CLIENTE ',res)
})


// Rotas Post
router.post('/consulta/movimentacao/categoria', (req,res)=>{
    let cliente = req.body.cliente
    let categoria = req.body.categoria
    execSelectSQLQuery(`SELECT MOVIMENTACAO.ID_CONTAINER,MOVIMENTACAO.ID_CLIENTE,CONTAINER.CATEGORIA, MOVIMENTACAO.CATEGORIA AS MOVIMENTACAO FROM MOVIMENTACAO,CONTAINER WHERE CONTAINER.ID_CLIENTE = ${cliente} AND CONTAINER.CATEGORIA = '${categoria}' AND MOVIMENTACAO.ID_CLIENTE = ${cliente} AND MOVIMENTACAO.ID_CONTAINER = CONTAINER.ID_CONTAINER`,res)
    
})
router.post('/consulta/movimentacoes',(req,res)=> {
    execSelectSQLQuery('SELECT * FROM MOVIMENTACAO',res)
})

router.post('/cadastro/cliente',(req,res) => {
    const nome = req.body.nome
    execInputSQLQuery(`IF NOT EXISTS(SELECT NOME FROM CLIENTE WHERE NOME='${nome}') BEGIN INSERT INTO CLIENTE VALUES ('${nome}') END`)
    
})


router.post('/cadastro/container',(req,res)=>{
    const codigo = req.body.codigo
    const cliente = req.body.cliente
    const tamanho = req.body.tamanho
    const estado = req.body.volume
    const categoria = req.body.categoria
    console.log(req.body)
    execInputSQLQuery(`IF NOT EXISTS(SELECT ID_CONTAINER FROM CONTAINER WHERE ID_CONTAINER='${codigo}' AND ID_CLIENTE='${cliente}') BEGIN INSERT INTO CONTAINER (ID_CONTAINER,ID_CLIENTE,TAMANHO,ESTADO,CATEGORIA) VALUES ('${codigo}',${cliente},${tamanho},'${estado}','${categoria}') END`)
})

router.post('/cadastro/movimentacao',(req,res)=>{
    const codigo = req.body.codigo
    const categoria = req.body.categoria
    const cliente = req.body.cliente
    const dataInicio = req.body.dataInicio
    const dataFinal = req.body.dataFinal
    const horaInicio = req.body.horaInicio
    const horaFinal = req.body.horaFinal
    console.log(req.body)
    execInputSQLQuery(`INSERT INTO MOVIMENTACAO (ID_CONTAINER,CATEGORIA,ID_CLIENTE,DATA_INICIO,DATA_FIM) VALUES ('${codigo}','${categoria}',${cliente},'${dataInicio} ${horaInicio}:00','${dataFinal} ${horaFinal}:00')`)
    
})
router.patch('/alterar/movimentacao',(req,res)=>{
    const numero = req.body.numero
    const codigo = req.body.codigo
    const categoria = req.body.categoria
    const cliente = req.body.cliente
    const dataInicio = req.body.dataInicio
    const dataFinal = req.body.dataFinal
    const horaInicio = req.body.horaInicio
    const horaFinal = req.body.horaFinal
    execInputSQLQuery(`UPDATE MOVIMENTACAO SET ID_CONTAINER = '${codigo}', ID_CLIENTE = ${cliente}, CATEGORIA = '${categoria}', DATA_INICIO = '${dataInicio} ${horaInicio}:00', DATA_FIM = '${dataFinal} ${horaFinal}:00' WHERE ID_MOVIMENTACAO = ${numero}`,res) 
})
router.delete('/deletar/movimentacao',(req,res)=>{
    
    const id = req.body.id
    execInputSQLQuery(`DELETE MOVIMENTACAO WHERE ID_MOVIMENTACAO = ${id}`)
})