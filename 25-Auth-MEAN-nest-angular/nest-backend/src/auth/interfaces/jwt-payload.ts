export interface JwtPayload {
  idUsuario: string;
  /**
   *Generado por jwt, fecha creacion y fecha expiracion
   */
  iat?: number;
  exp?: number;
}
