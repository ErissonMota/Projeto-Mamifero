import fastify from 'fastify';
import { PrismaClient } from '@prisma/client';

const server = fastify();
const prisma = new PrismaClient();

server.get('/camelos', async (request, reply) => {
  const { search } = request.query as { search?: string };
  let camelos;
  
  if (search) {
    camelos = await prisma.camelo.findMany({
      where: {
        OR: [
          { nome: { contains: search, mode: 'insensitive' } },
          { descricao: { contains: search, mode: 'insensitive' } }
        ]
      }
    });
  } else {
    camelos = await prisma.camelo.findMany();
  }

  return camelos;
});

server.post('/camelos', async (request, reply) => {
  const { nome, descricao, idade, temCorcova } = request.body as {
    nome: string;
    descricao: string;
    idade: number;
    temCorcova: boolean;
  };

  const camelo = await prisma.camelo.create({
    data: {
      nome,
      descricao,
      idade,
      temCorcova,
    },
  });

  return camelo;
});

server.put('/camelos/:id', async (request, reply) => {
  const { id } = request.params as { id: string };
  const { nome, descricao, idade, temCorcova } = request.body as {
    nome: string;
    descricao: string;
    idade: number;
    temCorcova: boolean;
  };

  const updatedcamelo = await prisma.camelo.update({
    where: { id: parseInt(id, 10) },
    data: {
      nome,
      descricao,
      idade,
      temCorcova,
    },
  });

  return updatedcamelo;
});

server.delete('/camelos/:id', async (request, reply) => {
  const { id } = request.params as { id: string };

  await prisma.camelo.delete({
    where: { id: parseInt(id, 10) },
  });

  return { message: 'camelo deletado com sucesso!' };
});

const start = async () => {
  try {
    await prisma.$connect();
    await server.listen(3000);
    console.log(`Servidor rodando em http://localhost:3000`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
