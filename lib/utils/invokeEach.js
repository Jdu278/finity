"use strict";

exports.__esModule = true;

exports.default = async function invokeEach(fns, ...args) {
  return await Promise.all(fns.map(async fn => await fn(...args)));
};