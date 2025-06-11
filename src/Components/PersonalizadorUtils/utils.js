// Asocia nombre de malla (nombre del nodo) con zona ID
export const zonaMap = {
  'Object_4': 104,
  'Object_6': 105,
  'Object_8': 106,
  'Object_10': 107,
  'Object_12': 108,
  'Object_14': 109,
  'Object_16': 110,
  'Object_18': 111,
  'Object_20': 112,
};

// Diccionario de nombres amigables para mostrar al usuario
export const zonaDisplayNames = {
  'Object_4': 'Lengüeta',
  'Object_6': 'Laterales',
  'Object_8': 'Lateral Exterior',
  'Object_10': 'Lateral Interior',
  'Object_12': 'Talón',
  'Object_14': 'Lengüeta',
  'Object_16': 'Cordones',
  'Object_18': 'Ojetes',
  'Object_20': 'Plantilla',
};

export function getZonaIdFromName(name) {
  return zonaMap[name] || null;
}

export function getColorHexFromStore(zonaId, colores, personalizacion) {
  const colorId = personalizacion[zonaId]?.colorId;
  return colores.find((c) => c.id_color === colorId)?.codigo_hax || null;
}
