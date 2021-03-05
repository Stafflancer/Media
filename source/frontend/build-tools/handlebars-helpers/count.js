module.exports = function (array, foo) {
  const length = array.length;
  const copy = length < 2 ? foo.singular : foo.plural;
  return `${array.length}  ${copy}`;
};
