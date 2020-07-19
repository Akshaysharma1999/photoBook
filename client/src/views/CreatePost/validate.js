export const validate = formValues => {  
  const errors = {};

  if (!formValues.title) {
    errors.title = 'You must enter a title';
  }

  if (!formValues.body) {
    errors.body = 'You must enter something in the description';
  }

  // if (!formValues.file) {
  //   errors.file = 'You must choose a Photo';
  // }

  return errors;
};
