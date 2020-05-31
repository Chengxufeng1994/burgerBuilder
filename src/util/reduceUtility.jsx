export const updateObject = (oldObject, updateProerties) => {
  return {
    ...oldObject,
    ...updateProerties,
  };
};
