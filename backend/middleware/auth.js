import jwt from "jsonwebtoken";

/**
 * Extrae el token JWT desde:
 * - Authorization: Bearer <token>
 * - Cookie: token (opcional si usas cookies)
 */
function getTokenFromRequest(req) {
  const auth = req.headers?.authorization || "";
  if (auth.startsWith("Bearer ")) return auth.substring(7).trim();
  // Si usas cookies y tienes cookie-parser:
  if (req.cookies?.token) return req.cookies.token;
  return null;
}

/**
 * Middleware: requiere autenticación
 * Decodifica el JWT y lo coloca en req.user
 */
export function requireAuth(req, res, next) {
  try {
    const token = getTokenFromRequest(req);
    if (!token) {
      return res.status(401).json({ error: "No autenticado: falta token" });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return res
        .status(500)
        .json({ error: "Falta JWT_SECRET en variables de entorno" });
    }

    const payload = jwt.verify(token, secret);
    // payload típico: { uid, rol, email, iat, exp }
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Token inválido o expirado" });
  }
}

/**
 * Middleware de autorización por roles.
 * Uso: router.get('/ruta', requireAuth, requireRole('ADMIN', 'MEDICO'), handler)
 */
export function requireRole(...rolesPermitidos) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: "No autenticado" });
    }
    if (rolesPermitidos.length > 0 && !rolesPermitidos.includes(req.user.rol)) {
      return res.status(403).json({
        error: "No autorizado",
        detalle: `Se requiere rol: ${rolesPermitidos.join(", ")}`,
      });
    }
    next();
  };
}

// alias si en algunos archivos lo importas como `authorize(...)`
export const authorize = requireRole;
