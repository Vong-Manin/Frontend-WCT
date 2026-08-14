'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { assertOwner } = require('../src/utils/ownership');

test('review owner may update or delete their review', () => {
  assert.doesNotThrow(() =>
    assertOwner({ documentId: 'owner-document' }, { documentId: 'owner-document' }),
  );
});

test('another authenticated user cannot update or delete the review', () => {
  assert.throws(
    () => assertOwner({ documentId: 'owner-document' }, { documentId: 'attacker-document' }),
    /only change your own review/i,
  );
});

test('an unowned historical review cannot be claimed by a browser user', () => {
  assert.throws(
    () => assertOwner(null, { documentId: 'attacker-document' }),
    /only change your own review/i,
  );
});
