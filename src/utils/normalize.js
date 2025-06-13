const normalizeDoc = (doc) => {
  const obj = doc.toObject ? doc.toObject() : doc;
  const { _id, ...rest } = obj;
  return { id: _id.toString(), ...rest };
};

const normalizeMany = (docs) => docs.map(normalizeDoc);

module.exports = {
  normalizeDoc,
  normalizeMany,
};
