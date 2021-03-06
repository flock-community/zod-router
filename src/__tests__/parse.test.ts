// @ts-ignore TS6133
import { expect, test } from "@jest/globals";

import * as z from "../index";

test("parse bigint", () => {
  const bigint = z.bigint();
  const res = bigint.parse(BigInt(2));
  expect(res).toEqual(BigInt(2));
});

test("parse pet", () => {
  const Pet = z.object({
    id: z.bigint(),
    name: z.string(),
    tag: z.string().optional(),
  });
  const Pets = z.array(z.reference("Pet", Pet));

  const arr = [
    { id: BigInt(0), name: "a", tag: "Test" },
    { id: BigInt(1), name: "b", tag: "Test" },
  ];

  expect(Pets.parse(arr)).toEqual([
    { id: BigInt(0), name: "a", tag: "Test" },
    { id: BigInt(1), name: "b", tag: "Test" },
  ]);
});
