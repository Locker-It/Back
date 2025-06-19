const { isFunction } = require('../constants/types');

const normalizeDoc = (doc) => {
  const getObject = () => {
    try {
      return isFunction(doc.toObject) ? doc.toObject() : doc;
    } catch (e) {
      return doc;
    }
  };

  const obj = getObject();
  const { _id, ...rest } = obj;
  return { id: _id.toString(), ...rest };
};

const normalizeMany = (docs) => docs.map(normalizeDoc);

module.exports = {
  normalizeDoc,
  normalizeMany,
};
