const express = require('express')
const mysql = require('mysql')
const bp = require('body-parser')

const app = express()
const port = 3000

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'database'
});

try {
    db.connect((err) => {
        if (err) throw err;
        console.log('DataBase connected')
    
    });
} catch (error) {
    console.log(`Erro ao conectar ao banco de dados ${error}`)
}

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

app.get('/cadastro', (req, res) => {

    const jogo = req.query.jogo;
    const categoria = req.query.categoria;
    const valor = req.query.valor;
    
    console.log('valore recebidos:' + jogo, categoria, valor)

    const sql = `INSERT INTO produtos (nome, descricao, valor) VALUES (?,?,?);`

    db.query(sql, [jogo, categoria, valor], (err, result) => {
        if (err) throw err;
        console.log("jogo adicionado:" + result.affectedRows)

    });
    
    res.end();
});

app.post('/cadastro', (req, res) => {
    const {jogo} = req.body;
    const {categoria} = req.body;
    const {valor} = req.body;
    
    console.log(`Valores recebidos: ${jogo}, ${categoria}, ${valor}`, req.body)

    const sql = `INSERT INTO produtos (nome, descricao, valor) VALUES (?,?,?);`

    db.query(sql, [jogo, categoria, valor], (err, result) => {
        if (err) throw err;
        console.log("jogo adicionado:" + result.affectedRows)

    });
    res.status = 200
    res.end()
});

app.listen(port, () => console.log(`Seridor iniciado ouvindo na porta: ${port}!`))