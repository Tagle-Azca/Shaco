import 'dotenv/config';

const BASE = `http://${process.env.DGRAPH_HTTP || 'localhost:8080'}`;

export async function query(dql, vars = {}) {
  const hasVars = Object.keys(vars).length > 0;
  const res = await fetch(`${BASE}/query`, {
    method: 'POST',
    headers: { 'Content-Type': hasVars ? 'application/json' : 'application/dql' },
    body: hasVars ? JSON.stringify({ query: dql, variables: vars }) : dql,
  });
  if (!res.ok) throw new Error(`Dgraph query failed: ${await res.text()}`);
  const json = await res.json();
  return json.data;
}

export async function mutate(payload) {
  const res = await fetch(`${BASE}/mutate?commitNow=true`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ set: Array.isArray(payload) ? payload : [payload] }),
  });
  if (!res.ok) throw new Error(`Dgraph mutate failed: ${await res.text()}`);
  return res.json();
}

export async function alter(schema) {
  const res = await fetch(`${BASE}/alter`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/dql' },
    body: schema,
  });
  if (!res.ok) throw new Error(`Dgraph alter failed: ${await res.text()}`);
  return res.json();
}

export async function dropAll() {
  const res = await fetch(`${BASE}/alter`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ drop_all: true }),
  });
  if (!res.ok) throw new Error(`Dgraph dropAll failed: ${await res.text()}`);
  return res.json();
}
