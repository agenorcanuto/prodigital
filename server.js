const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configuração do banco de dados
const db = mysql.createConnection({
    host: 'localhost',
    user: 'seu_usuario',   // Substitua por seu nome de usuário do MySQL
    password: 'sua_senha', // Substitua por sua senha do MySQL
    database: 'nome_do_banco' // Substitua pelo nome do seu banco de dados
});

db.connect(err => {
    if (err) {
        throw err;
    }
    console.log('Conectado ao banco de dados MySQL');
});

// Rota para cadastro de usuários
app.post('/register', (req, res) => {
    const { name, email, phone, address } = req.body;
    const sql = 'INSERT INTO users (name, email, phone, address) VALUES (?, ?, ?, ?)';
    db.query(sql, [name, email, phone, address], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send('Usuário cadastrado com sucesso!');
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

