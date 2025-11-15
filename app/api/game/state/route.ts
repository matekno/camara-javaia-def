import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get('userId')

    if (!userId) {
      return NextResponse.json(
        { error: 'Por favor, proporcionar ID de usuario' },
        { status: 400 }
      )
    }

    const gameState = await prisma.gameState.findFirst()
    
    if (!gameState) {
      return NextResponse.json(
        { error: 'No se encontró el estado del juego' },
        { status: 404 }
      )
    }

    const rotation = await prisma.rotation.findUnique({
      where: {
        userId_round: {
          userId: parseInt(userId),
          round: gameState.currentRound
        }
      }
    })

    if (!rotation) {
      return NextResponse.json(
        { error: 'No se encontró la rotación' },
        { status: 404 }
      )
    }

    // Obtener el lugar asociado al color desde las variables de entorno
    const colorKey = rotation.color.toUpperCase()
    const lugar = process.env[`LUGAR_${colorKey}`] || ''

    return NextResponse.json({
      currentRound: gameState.currentRound,
      color: rotation.color,
      lugar: lugar
    })
  } catch (error) {
    console.error('Error obteniendo estado:', error)
    return NextResponse.json(
      { error: 'No se pudo obtener el estado del juego' },
      { status: 500 }
    )
  }
}

