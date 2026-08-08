/**
 * Punto de entrada del servidor.
 * Carga variables de entorno y arranca el servidor Express en el puerto configurado.
 */
import 'dotenv/config';
import app from './src/app.js';

const port = Number(process.env.PORT ?? 3000);

app.listen(port, () => {
  console.log(`MCP server iniciado en http://localhost:${port}`);
});
