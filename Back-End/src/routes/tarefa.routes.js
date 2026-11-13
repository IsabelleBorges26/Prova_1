const express = require('express');
const router = express.Router();
const tarefaController = require('../controllers/tarefa.controller');

router.get('/tarefas', tarefaController.listarTarefas);
router.get('/tarefas/:id', tarefaController.buscarTarefa);
router.post('/tarefas', tarefaController.cadastrarTarefa);
router.put('/tarefas/:id', tarefaController.editarTarefa);
router.patch('/tarefas/:id/status', tarefaController.alterarStatus);
router.delete('/tarefas/:id', tarefaController.excluirTarefa);

module.exports = router;

