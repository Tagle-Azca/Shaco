import dotenv from 'dotenv';
import cassandra from 'cassandra-driver';

dotenv.config();

// Configuración desde variables de entorno
const CONTACT_POINTS = (process.env.CASSANDRA_POINTS || 'localhost').split(',');
const LOCAL_DATA_CENTER = process.env.CASSANDRA_DATACENTER || 'datacenter1';
const KEYSPACE = process.env.CASSANDRA_KEYSPACE || 'shaco_analytics';

// Crear el cliente
const client = new cassandra.Client({
  contactPoints: CONTACT_POINTS,
  localDataCenter: LOCAL_DATA_CENTER,
  keyspace: KEYSPACE,
  queryOptions: { prepare: true }
});

/**
 * Ejecuta una consulta (SELECT) y retorna las filas
 */
export async function query(cql, params = []) {
  try {
    const result = await client.execute(cql, params);
    return result.rows;
  } catch (err) {
    console.error('Error en Cassandra Query:', err);
    throw err;
  }
}

/**
 * Ejecuta una mutación (INSERT, UPDATE, DELETE)
 */
export async function mutate(cql, params = []) {
  try {
    await client.execute(cql, params);
  } catch (err) {
    console.error('Error en Cassandra Mutation:', err);
    throw err;
  }
}

/**
 * Ejecuta comandos de definición de datos (CREATE TABLE, ALTER, etc.)
 */
export async function alter(cql) {
  try {
    await client.execute(cql);
  } catch (err) {
    console.error('Error en Cassandra Alter:', err);
    throw err;
  }
}

/**
 * Cierra la conexión de forma segura
 */
export async function shutdown() {
  await client.shutdown();
}

export { client };
