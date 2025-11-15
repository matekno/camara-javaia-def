export const USER_DISPLAY_NAMES: Record<string, string> = {
  'ALEF': 'Puro instinto',
  'BET': 'Repetir patrones',
  'GUIMEL': 'Una cicatriz',
  'DALET': '¿Qué ves cuando te ves?',
  'VAV': '¿Imitar o copiar?'
}

export const getDisplayName = (username: string): string => {
  return USER_DISPLAY_NAMES[username] || username
}

export const getInternalName = (displayName: string): string => {
  const entry = Object.entries(USER_DISPLAY_NAMES).find(([_, display]) => display === displayName)
  return entry ? entry[0] : displayName
}

