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

    return NextResponse.json({
      currentRound: gameState.currentRound,
      color: rotation.color
    })
  } catch (error) {
    console.error('Error obteniendo estado:', error)
    return NextResponse.json(
      { error: 'No se pudo obtener el estado del juego' },
      { status: 500 }
    )
  }
}

