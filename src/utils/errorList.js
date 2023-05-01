// Esse arquivo é usado para mapear os erros de validação do Joi 
// para os erros que o errorMap espera receber
const errorList = {
  'any.required': 'BAD_REQUEST',
  'string.min': 'INVALID_DATA',
  'number.min': 'INVALID_DATA',
};

const mapError = (type) => errorList[type];

module.exports = {
  errorList,
  mapError,
};
