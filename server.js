require('dotenv').config();

var mysql = require('mysql2');

app.use(express.static('public')); 

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); // Libera o acesso para o front-end
app.use(express.json()); // Configura GLOBALMENTE
app.use(express.urlencoded({ extended: true }));


var db = mysql.createConnection({
        host: 'localhost',
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
});

db.connect(function(err) {
         if (err) throw err;
        console.log('boa');
});








/*  app.get('/estacionamento', (req, res) => {
    // Aqui você executa sua query SQL (Ex: SELECT * FROM parking)
    // Supondo que 'resultados' seja o array vindo do banco:
    db.query('SELECT * FROM parking', (err, resultados) => {
        if (err) return res.status(500).send(err);
        res.json(resultados); // Envia os dados para o navegador
    });
});*/







app.get('/estacionamento', (req, res) => {
    const termo = req.query.busca;

    let sql = 'SELECT * FROM parking';
    let params = [];

    if (termo) {
        // Busca em todas as colunas usando OR
        sql += ` WHERE ID LIKE ? 
                 OR nome LIKE ? 
                 OR empresa LIKE ? 
                 OR veiculo LIKE ? 
                 OR placa LIKE ?`;
        
        // Criamos o padrão de busca (ex: %termo%)
        const filtro = `%${termo}%`;
        // Passamos o filtro 5 vezes, uma para cada '?' na ordem da query
        params = [filtro, filtro, filtro, filtro, filtro];
    }

    db.query(sql, params, (err, resultados) => {
        if (err) return res.status(500).json(err);
        res.json(resultados);
    });
});






app.post('/estacionamento', (req, res) => {
    // Os dados chegam aqui dentro de req.body
    var {nome, empresa, veiculo, placa} = req.body;
    
   const regex = /^[a-zA-Z0-9]{7}$/;
   
    if (!placa || !regex.test(placa)) {
        return res.status(400).json({ 
            mensagem: 'A placa deve ter 7 caracteres.',
            campo: 'placa'
        

         }); 
    
     }


        
     
        const sql = "INSERT INTO parking (nome, empresa, veiculo, placa) VALUES (?, ?, ?, ?)";

        db.query(sql, [nome, empresa, veiculo, placa], (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(201).json({
             mensagem: "Gravado com sucesso!",
             id: result.insertId 
        });
    });
   


    

         
 



     

    

});






app.listen(3000, () => console.log("Servidor rodando na porta 3000"));





