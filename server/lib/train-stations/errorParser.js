/**
 * Takes different error responses and converts them to uniform error response.
 * @param {Object} responseData
 * @return {Object}}
 */
function errorParser(responseData) {
  if (responseData.error_description) {
    return {
      error: responseData.error,
      description: responseData.error_description,
    };
  }
  return { error: 'Generic error occurred!' };
}

module.exports = errorParser;
