require('dotenv').config();


var mysql = require('mysql2');
const express = require('express');
const cors = require('cors');

const app = express();


app.use(express.static('public')); 
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



app.post('/deletar-registro', (req, res) => {
    const idParaExcluir = req.body.id;
    

    const sql = "DELETE FROM `parking` WHERE `ID` = ?";

    db.query(sql, [idParaExcluir], (err, result) => {
        if (err) {
            console.error("Erro SQL:", err.message);
            return res.status(500).json({ erro: err.message });
        }
        
       
        res.status(200).json({ 
            mensagem: "Excluído com sucesso!", 
            afetados: result.affectedRows 
        });
    });
});








app.post('/estacionamento', (req, res) => { 
   // Os dados chegam aqui dentro de req.body
   var {nome, empresa, veiculo, placa} = req.body;

   nome = nome.trim().replace(/\s+/g, ' ');
   

   const regex  = /^[a-zA-Z0-9]{7}$/;
   const regex2 = /^[A-Za-zÀ-ÿ ]{3,45}$/;
   const regex3 = /^[A-Za-zÀ-ÿ ]{3,45}$/;
   const regex4 = /^(carro|moto)$/;

  if (!nome || !regex2.test(nome)) {
    return res.status(400).json({
        mensagem: "Nome: 3 a 30 letras, sem espaços duplos.",
        campo: 'nome'
    });
  }

  
  if (!empresa || !regex3.test(empresa)) {
    return res.status(400).json({
        mensagem: "Empresa: 3 a 30 letras, sem espaços duplos.",
        campo: 'empresa'
    });
  }
   
   
  
  if (!veiculo || !regex4.test(veiculo)) {
    return res.status(400).json({
        mensagem: "Veiculo: carro ou moto",
        campo: 'veiculo'
    });
  }
  


    
    if (!placa || !regex.test(placa)) {
        return res.status(400).json({ 
            mensagem: 'Placa: 7 Caracteres, sem espaços.',
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





