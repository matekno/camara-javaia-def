export interface User {
  id: number
  username: string
}

export interface GameState {
  id: number
  currentRound: number
  updatedAt: Date
}

export interface Rotation {
  id: number
  userId: number
  round: number
  color: string
}

export interface GameStateResponse {
  currentRound: number
  color: string
}

export interface LoginResponse {
  success: boolean
  userId: number
  username: string
}

export interface ErrorResponse {
  error: string
}

