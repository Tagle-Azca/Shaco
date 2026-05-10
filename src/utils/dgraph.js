require('dotenv').config();
const dgraph = require('dgraph-js');
const grpc = require('@grpc/grpc-js');

const DGRAPH_URL = process.env.DGRAPH_URL || 'localhost:9080';

const stub = new dgraph.DgraphClientStub(DGRAPH_URL, grpc.credentials.createInsecure());
const client = new dgraph.DgraphClient(stub);

async function query(dql, vars = {}) {
  const txn = client.newTxn({ readOnly: true });
  try {
    const res = Object.keys(vars).length > 0
      ? await txn.queryWithVars(dql, vars)
      : await txn.query(dql);
    return res.getJson();
  } finally {
    await txn.discard();
  }
}

async function mutate(payload) {
  const txn = client.newTxn();
  try {
    const mu = new dgraph.Mutation();
    mu.setSetJson(JSON.stringify(payload));
    mu.setCommitNow(true);
    await txn.mutate(mu);
  } catch (err) {
    await txn.discard();
    throw err;
  }
}

async function alter(schema) {
  const op = new dgraph.Operation();
  op.setSchema(schema);
  await client.alter(op);
}

module.exports = { query, mutate, alter };
