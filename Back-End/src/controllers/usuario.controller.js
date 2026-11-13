const prisma = require('../data/prisma');

async function listarUsuarios(req, res) {
    try {
        const usuarios = await prisma.usuario.findMany();
        res.json(usuarios);
    } catch (erro) {
        res.status(500).json({
            error: 'Não foi possivel listar os usuarios!'
        });
    }
}

async function cadastrarUsuario(req, res) {
    try {
        const { nome, email } = req.body;

        if (!nome || !email || !email.includes('@')) {
            return res.status(400).json({
                error: 'Preencha todos os campos!'
            });
        }

        const usuario = await prisma.usuario.create({
            data: {
                nome: nome,
                email: email
            }
        });

        res.status(201).json(usuario);

    } catch (erro) {
        res.status(500).json({
            error: 'Não foi possivel cadastrar um usuario!'
        });
    }
}

module.exports = {
    listarUsuarios,
    cadastrarUsuario
};

