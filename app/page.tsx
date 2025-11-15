'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const [username, setUsername] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username.toUpperCase() }),
      })

      const data = await response.json()

      if (response.ok) {
        localStorage.setItem('userId', data.userId)
        localStorage.setItem('username', data.username)
        router.push('/camera')
      } else {
        setError(data.error || 'No se pudo iniciar sesión')
      }
    } catch (err) {
      setError('No se pudo conectar con el servidor')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container login-container">
      <h1>Cámara Javaia</h1>
      <h2>Iniciar Sesión</h2>
      
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="username">Nombre de Usuario</label>
          <select
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          >
            <option value="">Seleccionar usuario...</option>
            <option value="ALEF">ALEF</option>
            <option value="BET">BET</option>
            <option value="GUIMEL">GUIMEL</option>
            <option value="DALET">DALET</option>
            <option value="VAV">VAV</option>
          </select>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Ingresando...' : 'Ingresar'}
        </button>
      </form>

      {error && <div className="error">{error}</div>}

      <div style={{ marginTop: '30px', paddingTop: '20px', borderTop: '1px solid #e0e0e0' }}>
        <p style={{ color: '#888', marginBottom: '10px' }}>¿Administrador?</p>
        <button 
          onClick={() => router.push('/admin')}
          style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}
        >
          Acceder al Panel de Admin
        </button>
      </div>
    </div>
  )
}

