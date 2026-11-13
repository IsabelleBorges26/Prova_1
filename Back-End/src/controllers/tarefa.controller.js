const prisma = require('../data/prisma');

async function listarTarefas(req, res) {
    try {
        const tarefas = await prisma.tarefa.findMany({
            include: {
                usuario: true
            }
        });

        res.json(tarefas);
    } catch (erro) {
        res.status(500).json({
            error: 'Não foi possivel listar as tarefas'
        });
    }
}

async function buscarTarefa(req, res) {
    try {
        const id = Number(req.params.id);

        const tarefa = await prisma.tarefa.findUnique({
            where: {
                id: id
            }
        });

        res.json(tarefa);
    } catch (erro) {
        res.status(500).json({
            error: 'Não foi possivel buscar a tarefa'
        });
    }
}

async function cadastrarTarefa(req, res) {
    try {
        const {
            usuarioId,
            descricao,
            setor,
            prioridade
        } = req.body;

        if (!usuarioId || !descricao || !setor || !prioridade) {
            return res.status(400).json({
                error: 'Preencha todos os campos.'
            });
        }

        const tarefa = await prisma.tarefa.create({
            data: {
                usuarioId: Number(usuarioId),
                descricao: descricao,
                setor: setor,
                prioridade: prioridade
            }
        });

        res.status(201).json(tarefa);

    } catch (erro) {
        res.status(500).json({
            error: 'Não foi possivel cadastrar essa tarefa'
        });
    }
}

async function editarTarefa(req, res) {
    try {
        const id = Number(req.params.id);

        const {
            usuarioId,
            descricao,
            setor,
            prioridade
        } = req.body;

        const tarefa = await prisma.tarefa.update({
            where: {
                id: id
            },
            data: {
                usuarioId: Number(usuarioId),
                descricao: descricao,
                setor: setor,
                prioridade: prioridade
            }
        });

        res.json(tarefa);

    } catch (erro) {
        res.status(500).json({
            error: 'Não foi possivel editar essa tarefa!'
        });
    }
}

async function alterarStatus(req, res) {
    try {
        const id = Number(req.params.id);

        const tarefa = await prisma.tarefa.update({
            where: {
                id: id
            },
            data: {
                status: req.body.status
            }
        });

        res.json(tarefa);

    } catch (erro) {
        res.status(500).json({
            error: 'Não foi possivel alterar o status!'
        });
    }
}

async function excluirTarefa(req, res) {
    try {
        const id = Number(req.params.id);

        await prisma.tarefa.delete({
            where: {
                id: id
            }
        });

        res.status(204).end();

    } catch (erro) {
        res.status(500).json({
            error: 'Não foi possivel apagar essa tarefa'
        });
    }
}

module.exports = {
    listarTarefas,
    buscarTarefa,
    cadastrarTarefa,
    editarTarefa,
    alterarStatus,
    excluirTarefa
};

