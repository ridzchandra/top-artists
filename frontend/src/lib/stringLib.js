// Uppercase first letter of first world and lowercase the rest
export const capitalize = (str) => {
  return str[0].toUpperCase() + str.slice(1).toLowerCase();
};
