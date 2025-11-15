import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()

    if (!password) {
      return NextResponse.json(
        { error: 'Por favor, ingresar contraseña' },
        { status: 400 }
      )
    }

    const adminPassword = process.env.ADMIN_PASSWORD || 'MajonGuesher'

    if (password !== adminPassword) {
      return NextResponse.json(
        { error: 'Contraseña incorrecta' },
        { status: 401 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error en login admin:', error)
    return NextResponse.json(
      { error: 'No se pudo procesar la solicitud' },
      { status: 500 }
    )
  }
}

