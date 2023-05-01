// Esse arquivo mapeia os erros para seus status code correspondentes.
// Por exemplo, se o erro for NOT_FOUND, o status code retornado deve ser 404. 
// Se o erro for INVALID_DATA, o status code retornado deve ser 422. 
// Se o erro não estiver mapeado, o status code retornado deve ser 500.
const errorMap = {
  NOT_FOUND: 404,
  BAD_REQUEST: 400,
  INVALID_DATA: 422,
};

const mapError = (type) => errorMap[type] || 500;

module.exports = {
  errorMap,
  mapError,
};
