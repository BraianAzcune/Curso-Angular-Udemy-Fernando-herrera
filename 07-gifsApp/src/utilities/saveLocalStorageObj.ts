export function saveArray(clave: string, obj: any[]) {
  localStorage.setItem(clave, JSON.stringify(obj));
}

export function loadArray(clave: string): any[] {
  try {
    const v = JSON.parse(localStorage.getItem(clave) ?? '[]');
    if (Array.isArray(v)) {
      return v;
    } else {
      console.warn(
        `la clave ${clave} no contiene un array. Se ignora y envia array vacio`
      );
      return [];
    }
  } catch (error) {
    console.error(
      'fallo en el parseo, JSON no puede convertirlo. Ignorado y enviado array vacio'
    );
    return [];
  }
}
