'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { getDisplayColor, getColorCssClass } from '@/lib/colorNames'

export default function CameraPage() {
  const [currentColor, setCurrentColor] = useState<string>('Ninguno')
  const [displayColor, setDisplayColor] = useState<string>('Ninguno')
  const [colorCssClass, setColorCssClass] = useState<string>('ninguno')
  const [currentRound, setCurrentRound] = useState<number>(1)
  const [displayName, setDisplayName] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const animationRef = useRef<number | null>(null)
  const router = useRouter()

  useEffect(() => {
    const userId = localStorage.getItem('userId')
    const storedDisplayName = localStorage.getItem('displayName')

    if (!userId || !storedDisplayName) {
      router.push('/')
      return
    }

    setDisplayName(storedDisplayName)
    fetchGameState(userId)
    startCamera()

    // Polling cada 20 segundos
    const interval = setInterval(() => {
      fetchGameState(userId)
    }, 20000)

    return () => {
      clearInterval(interval)
      stopCamera()
    }
  }, [router])

  useEffect(() => {
    if (videoRef.current && canvasRef.current && !loading) {
      applyFilter()
    }
  }, [currentColor, loading])

  useEffect(() => {
    setDisplayColor(getDisplayColor(currentColor))
    setColorCssClass(getColorCssClass(currentColor))
  }, [currentColor])

  const fetchGameState = async (userId: string) => {
    try {
      const response = await fetch(`/api/game/state?userId=${userId}`)
      const data = await response.json()

      if (response.ok) {
        setCurrentRound(data.currentRound)
        setCurrentColor(data.color)
      } else {
        setError(data.error || 'No se pudo obtener el estado del juego')
      }
    } catch (err) {
      setError('No se pudo conectar con el servidor')
    }
  }

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480 }
      })
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play()
          setLoading(false)
          applyFilter()
        }
      }
    } catch (err) {
      setError('No se pudo acceder a la cámara. Por favor, verificar los permisos.')
      setLoading(false)
    }
  }

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
    }
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }
  }

  const applyFilter = () => {
    if (!videoRef.current || !canvasRef.current) return

    const video = videoRef.current
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    if (!ctx || !video.videoWidth || !video.videoHeight) return

    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    const drawFrame = () => {
      if (!video.videoWidth || !video.videoHeight) return
      
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

      const filterKey = currentColor.toLowerCase()
      if (filterKey !== 'ninguno') {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const data = imageData.data

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i]
          const g = data[i + 1]
          const b = data[i + 2]
          const avg = (r + g + b) / 3

          switch (filterKey) {
            case 'rojo': // Naranja
              data[i] = avg + (r * 0.7)
              data[i + 1] = avg + (g * 0.4)
              data[i + 2] = b * 0.2
              break
            case 'rosa':
              data[i] = avg + (r * 0.6)
              data[i + 1] = g * 0.4
              data[i + 2] = avg + (b * 0.5)
              break
            case 'amarillo': // Verde
              data[i] = r * 0.3
              data[i + 1] = avg + (g * 0.7)
              data[i + 2] = g * 0.4
              break
            case 'gris':
              data[i] = avg
              data[i + 1] = avg
              data[i + 2] = avg
              break
            case 'celeste': // Azul
              data[i] = r * 0.3
              data[i + 1] = g * 0.4
              data[i + 2] = avg + (b * 0.7)
              break
          }
        }

        ctx.putImageData(imageData, 0, 0)
      }

      animationRef.current = requestAnimationFrame(drawFrame)
    }

    drawFrame()
  }

  const handleRefresh = async () => {
    const userId = localStorage.getItem('userId')
    if (userId) {
      await fetchGameState(userId)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('userId')
    localStorage.removeItem('username')
    localStorage.removeItem('displayName')
    router.push('/')
  }

  return (
    <div className="container">
      <h1>Cámara Javaia</h1>

      <div className="info-box">
        <p><strong>Identidad:</strong> {displayName}</p>
        <p><strong>Ronda:</strong> {currentRound}</p>
        <div className={`current-filter filter-${colorCssClass}`}>
          Filtro actual: {displayColor}
        </div>
      </div>

      {loading && <div className="loading">Cargando cámara...</div>}

      {error && <div className="error">{error}</div>}

      {!error && (
        <div className="video-container">
          <video ref={videoRef} autoPlay playsInline muted></video>
          <canvas ref={canvasRef}></canvas>
        </div>
      )}

      <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
        <button onClick={handleRefresh} style={{ flex: 1, background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
          Actualizar Estado
        </button>
        <button onClick={handleLogout} className="logout-btn" style={{ flex: 1 }}>
          Cerrar Sesión
        </button>
      </div>
    </div>
  )
}

