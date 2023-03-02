export interface Region {
  codigo: string;
  label: string;
}

export const regiones: Region[] = [
  { codigo: 'EU', label: ' European Union' },
  { codigo: 'EFTA', label: ' European Free Trade Association' },
  { codigo: 'CARICOM', label: ' Caribbean Community' },
  { codigo: 'PA', label: ' Pacific Alliance' },
  { codigo: 'AU', label: ' African Union' },
  { codigo: 'USAN', label: ' Union of South American Nations' },
  { codigo: 'EEU', label: ' Eurasian Economic Union' },
  { codigo: 'AL', label: ' Arab League' },
  { codigo: 'ASEAN', label: ' Association of Southeast Asian Nations' },
  { codigo: 'CAIS', label: ' Central American Integration System' },
  { codigo: 'CEFTA', label: ' Central European Free Trade Agreement' },
  { codigo: 'NAFTA', label: ' North American Free Trade Agreement' },
  {
    codigo: 'SAARC',
    label: ' South Asian Association for Regional Cooperation',
  },
];
