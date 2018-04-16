// @flow

function MutationError(errors: Array<{ field: string, message: string }>) {
  this.name = "MutationError";
  if (errors.length === 1 && !errors[0].field) {
    this.message = errors[0].message;
  } else {
    this.message = errors
      .map(error => `Field \`${error.field}\` ${error.message}.`)
      .join("\n");
  }
  this.errors = errors;
}

// $FlowFixMe
MutationError.prototype = Error.prototype;

export default MutationError;
