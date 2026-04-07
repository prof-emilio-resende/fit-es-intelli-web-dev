import { test } from "node:test";
import assert from "node:assert/strict";
import { Block, Blockchain } from "./index";

test("Block has correct properties", () => {
  const block = new Block(1, { valor: 10 }, "abc123");
  assert.equal(block.index, 1);
  assert.deepEqual(block.data, { valor: 10 });
  assert.equal(block.hashAnterior, "abc123");
  assert.ok(block.hash);
  assert.ok(block.timestamp);
});

test("Block hash is deterministic given fixed inputs", () => {
  const b1 = new Block(1, "test", "prev");
  const b2 = new Block(1, "test", "prev");
  assert.equal(b1.hash, b1.calcularHash());
  assert.equal(b2.hash, b2.calcularHash());
});

test("Blockchain starts with genesis block", () => {
  const bc = new Blockchain();
  assert.equal(bc.chain.length, 1);
  assert.equal(bc.chain[0]!.index, 0);
  assert.equal(bc.chain[0]!.hashAnterior, "0");
});

test("adicionarBloco appends a block linked to the previous", () => {
  const bc = new Blockchain();
  bc.adicionarBloco({ de: "Alice", para: "Bob", valor: 50 });
  assert.equal(bc.chain.length, 2);
  assert.equal(bc.chain[1]!.hashAnterior, bc.chain[0]!.hash);
  assert.equal(bc.chain[1]!.index, 1);
});

test("isValida returns true for a valid chain", () => {
  const bc = new Blockchain();
  bc.adicionarBloco("tx1");
  bc.adicionarBloco("tx2");
  assert.equal(bc.isValida(), true);
});

test("isValida returns false when a block's data is tampered", () => {
  const bc = new Blockchain();
  bc.adicionarBloco("tx1");
  bc.chain[1]!.data = "tampered";
  assert.equal(bc.isValida(), false);
});

test("isValida returns false when hashAnterior is broken", () => {
  const bc = new Blockchain();
  bc.adicionarBloco("tx1");
  bc.chain[1]!.hashAnterior = "fakehash";
  assert.equal(bc.isValida(), false);
});
