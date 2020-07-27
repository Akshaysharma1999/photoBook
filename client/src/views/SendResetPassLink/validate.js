export const validate = formValues => {
  const errors = {};

  if (!formValues.email) {
    errors.email = 'You must enter a email';
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formValues.email)
  ) {
    errors.email = 'Email is not valid';
  }
  
  return errors;
};
