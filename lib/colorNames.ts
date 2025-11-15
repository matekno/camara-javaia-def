export const COLOR_DISPLAY_NAMES: Record<string, string> = {
  'Rojo': 'Naranja',
  'Rosa': 'Rosa',
  'Amarillo': 'Verde',
  'Gris': 'Gris',
  'Celeste': 'Azul'
}

export const COLOR_CSS_CLASSES: Record<string, string> = {
  'Rojo': 'naranja',
  'Rosa': 'rosa',
  'Amarillo': 'verde',
  'Gris': 'gris',
  'Celeste': 'azul'
}

export const getDisplayColor = (dbColor: string): string => {
  return COLOR_DISPLAY_NAMES[dbColor] || dbColor
}

export const getColorCssClass = (dbColor: string): string => {
  return COLOR_CSS_CLASSES[dbColor] || dbColor.toLowerCase()
}

