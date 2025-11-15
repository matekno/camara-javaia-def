'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminPage() {
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentRound, setCurrentRound] = useState<number>(1)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated) {
      fetchCurrentRound()
    }
  }, [isAuthenticated])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/auth/admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      })

      const data = await response.json()

      if (response.ok) {
        setIsAuthenticated(true)
        setPassword('')
      } else {
        setError(data.error || 'No se pudo iniciar sesión')
      }
    } catch (err) {
      setError('No se pudo conectar con el servidor')
    } finally {
      setLoading(false)
    }
  }

  const fetchCurrentRound = async () => {
    try {
      const response = await fetch('/api/game/round')
      const data = await response.json()

      if (response.ok) {
        setCurrentRound(data.currentRound)
      }
    } catch (err) {
      console.error('Error obteniendo ronda:', err)
    }
  }

  const handleRoundChange = async (round: number) => {
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      const response = await fetch('/api/game/round', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ round, adminAuth: true }),
      })

      const data = await response.json()

      if (response.ok) {
        setCurrentRound(data.currentRound)
        setSuccess(`Ronda actualizada a ${data.currentRound}`)
        setTimeout(() => setSuccess(''), 3000)
      } else {
        setError(data.error || 'No se pudo actualizar la ronda')
      }
    } catch (err) {
      setError('No se pudo conectar con el servidor')
    } finally {
      setLoading(false)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="container login-container">
        <h1>Panel de Administración</h1>
        
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresar contraseña de administrador"
              required
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'Verificando...' : 'Ingresar'}
          </button>
        </form>

        {error && <div className="error">{error}</div>}

        <div style={{ marginTop: '20px' }}>
          <button onClick={() => router.push('/')}>
            Volver al Login
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <h1>Panel de Administración</h1>
      
      <div className="info-box">
        <p><strong>Ronda Actual:</strong> {currentRound}</p>
      </div>

      <div className="admin-controls">
        <h2>Cambiar Ronda</h2>
        
        <div className="round-buttons">
          {[1, 2, 3, 4, 5].map((round) => (
            <button
              key={round}
              onClick={() => handleRoundChange(round)}
              disabled={loading}
              className={`round-btn ${currentRound === round ? 'active' : ''}`}
            >
              Ronda {round}
            </button>
          ))}
        </div>

        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}

        <button 
          onClick={() => router.push('/')}
          className="logout-btn"
        >
          Salir del Panel
        </button>
      </div>
    </div>
  )
}

