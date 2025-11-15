'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { USER_DISPLAY_NAMES, getInternalName } from '@/lib/userNames'

export default function Home() {
  const [displayName, setDisplayName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const internalName = getInternalName(displayName)
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: internalName }),
      })

      const data = await response.json()

      if (response.ok) {
        localStorage.setItem('userId', data.userId)
        localStorage.setItem('username', data.username)
        localStorage.setItem('displayName', displayName)
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
          <label htmlFor="username">Seleccionar Identidad</label>
          <select
            id="username"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            required
          >
            <option value="">Seleccionar...</option>
            {Object.values(USER_DISPLAY_NAMES).map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Ingresando...' : 'Ingresar'}
        </button>
      </form>

      {error && <div className="error">{error}</div>}
    </div>
  )
}

