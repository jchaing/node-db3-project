const db = require('../data/db-config.js');

function find() {
  return db('schemes');
}

function findById(id) {
  return db('schemes')
    .where({ id })
    .first();
}

function findSteps(id) {
  return db('schemes as sc')
    .join('steps as st', 'sc.id', 'st.scheme_id')
    .select('st.id', 'sc.scheme_name', 'st.step_number', 'st.instructions')
    .where({ scheme_id: id })
    .orderBy('step_number');
}

function add(schemeData) {
  return db('schemes').insert(schemeData);
}

function update(changes, id) {
  return db('schemes')
    .where({ id })
    .update(changes);
}

function remove(id) {
  return db('schemes')
    .where({ id })
    .del();
}

function addStep(stepData, id) {
  return db('steps as st')
    // .join('schemes as sc', 'sc.id', 'st.scheme_id')
    .insert({ ...stepData, scheme_id: id })
    .where({ scheme_id: id });
}

module.exports = {
  find,
  findById,
  findSteps,
  add,
  update,
  remove,
  addStep
};
