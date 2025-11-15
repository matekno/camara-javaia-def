import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const { username } = await request.json()

    if (!username) {
      return NextResponse.json(
        { error: 'Por favor, ingresar nombre de usuario' },
        { status: 400 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { username: username.toUpperCase() }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Usuario no válido' },
        { status: 401 }
      )
    }

    return NextResponse.json({ 
      success: true, 
      userId: user.id,
      username: user.username 
    })
  } catch (error) {
    console.error('Error en login:', error)
    return NextResponse.json(
      { error: 'No se pudo procesar la solicitud' },
      { status: 500 }
    )
  }
}

