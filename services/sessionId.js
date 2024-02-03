const record = new Map();

function setUser(id, user) {
  record.set(id, user);
}
function getUser(id) {
  record.get(id);
}

module.exports = {
  setUser,
  getUser,
};
