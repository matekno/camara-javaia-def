const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

// Nombres internos (en la app se muestran con nombres codificados):
// ALEF -> "Puro instinto"
// BET -> "Repetir patrones"
// GUIMEL -> "Una cicatriz"
// DALET -> "¿Qué ves cuando te ves?"
// VAV -> "¿Imitar o copiar?"

const users = [
  {
    username: 'ALEF',
    colors: ['Rojo', 'Rosa', 'Amarillo', 'Gris', 'Celeste']
  },
  {
    username: 'BET',
    colors: ['Rosa', 'Amarillo', 'Gris', 'Celeste', 'Rojo']
  },
  {
    username: 'GUIMEL',
    colors: ['Amarillo', 'Gris', 'Celeste', 'Rojo', 'Rosa']
  },
  {
    username: 'DALET',
    colors: ['Gris', 'Celeste', 'Rojo', 'Rosa', 'Amarillo']
  },
  {
    username: 'VAV',
    colors: ['Celeste', 'Rojo', 'Rosa', 'Amarillo', 'Gris']
  }
]

async function main() {
  console.log('Iniciando seed...')

  // Limpiar datos existentes
  await prisma.rotation.deleteMany()
  await prisma.user.deleteMany()
  await prisma.gameState.deleteMany()

  // Crear estado inicial del juego
  await prisma.gameState.create({
    data: {
      currentRound: 1
    }
  })

  // Crear usuarios y rotaciones
  for (const userData of users) {
    const user = await prisma.user.create({
      data: {
        username: userData.username
      }
    })

    // Crear rotaciones para cada ronda (1 a 5)
    for (let round = 1; round <= 5; round++) {
      await prisma.rotation.create({
        data: {
          userId: user.id,
          round: round,
          color: userData.colors[round - 1]
        }
      })
    }

    console.log(`Usuario ${userData.username} creado con sus rotaciones`)
  }

  console.log('Seed completado exitosamente')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

