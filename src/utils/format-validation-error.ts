export const formatValidationError = (errors: any) => {
  if (!Array.isArray(errors)) {
    return Object.values(errors.constraints);
  } else {
    const result = {};
    errors.map((item) => {
      if (item.children.length === 0) {
        result[item.property] = Object.values(item.constraints);
      } else {
        result[item.property] = formatValidationError(item.children);
      }
    });
    return result;
  }
};
