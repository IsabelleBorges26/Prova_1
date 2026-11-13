require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('../Front-End'));

const usuarioRoutes = require('./src/routes/usuario.routes');
const tarefaRoutes = require('./src/routes/tarefa.routes');

app.use('/', usuarioRoutes);
app.use('/', tarefaRoutes);
app.listen(3000, () => {
    console.log('Online na porta 3000');
});
