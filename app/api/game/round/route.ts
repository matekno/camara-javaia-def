import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const { round, adminAuth } = await request.json()

    // Verificar autenticación de admin
    if (!adminAuth) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      )
    }

    if (!round || round < 1 || round > 5) {
      return NextResponse.json(
        { error: 'Por favor, proporcionar ronda válida (1-5)' },
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

    const updatedState = await prisma.gameState.update({
      where: { id: gameState.id },
      data: { currentRound: round }
    })

    return NextResponse.json({
      success: true,
      currentRound: updatedState.currentRound
    })
  } catch (error) {
    console.error('Error actualizando ronda:', error)
    return NextResponse.json(
      { error: 'No se pudo actualizar la ronda' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const gameState = await prisma.gameState.findFirst()
    
    if (!gameState) {
      return NextResponse.json(
        { error: 'No se encontró el estado del juego' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      currentRound: gameState.currentRound
    })
  } catch (error) {
    console.error('Error obteniendo ronda:', error)
    return NextResponse.json(
      { error: 'No se pudo obtener la ronda actual' },
      { status: 500 }
    )
  }
}

