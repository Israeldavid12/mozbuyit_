import express, { json } from 'express';
import pkg from 'pg';  // Alteração aqui
const { Pool } = pkg; // Obter Pool a partir do pkg

const app = express();
const pool = new Pool({
    user: 'postgres',
    host: 'database-1.czsci0o28yzv.eu-north-1.rds.amazonaws.com',
    database: 'moz_buy_it_db',
    password: '00Bc12aa4',
    port: 5432,
    ssl: {
        rejectUnauthorized: false  // Desabilita a verificação do certificado para conexões SSL
    }
});

// Verificação de conexão com o banco de dados
pool.connect()
    .then(client => {
        console.log('Conexão com o banco de dados estabelecida!');
        client.release();
    })
    .catch(err => {
        console.error('Erro ao conectar ao banco de dados:', err.stack);
    });

// Middleware para permitir CORS de todas as origens
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");  // Permitir todas as origens
    res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    
    // Permitir que o preflight (OPTIONS) passe sem problemas
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    next();
});

// Middleware para processar JSON no corpo das requisições
app.use(json());


// Endpoint para salvar usuário no banco de dados
app.post('/api/saveuser', async (req, res) => {
    const { uid, name, email, createDate } = req.body;

    // Log dos dados recebidos
    console.log('Dados recebidos para inserção:', { uid, name, email, createDate });

    try {
        const query = 'INSERT INTO public.users (uid, name, email, create_date) VALUES ($1, $2, $3, $4)';
        
        // Executando a consulta
        await pool.query(query, [uid, name, email, createDate]);

        // Retorno com sucesso
        res.status(200).send('Usuário salvo com sucesso');
    } catch (error) {
        // Log do erro
        console.error('Erro ao salvar usuário:', error);

        // Resposta com erro
        res.status(500).send('Erro ao salvar usuário');
    }
});




// Rota para salvar o código de recarga
app.post('/api/saveRechargeCode', async (req, res) => {
    const { code, name, type, status, createDate } = req.body;
    
    try {
        const query = `
            INSERT INTO recharge_codes (code, name, type, status, create_date)
            VALUES ($1, $2, $3, $4, $5)
        `;
        await pool.query(query, [code, name, type, status, createDate]);
        res.status(200).send('Código de recarga salvo com sucesso');
    } catch (error) {
        console.error('Erro ao salvar código de recarga:', error);
        res.status(500).send('Erro ao salvar código de recarga');
    }
});







// Iniciando o servidor na porta 3000
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
