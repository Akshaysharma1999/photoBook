export const validate = formValues => {
  const errors = {};

  if (!formValues.password) {
    errors.password = 'You must enter a password';
  }

  if (!formValues.confirmPassword) {
    errors.confirmPassword = 'You must enter a password';
  } else if (formValues.password !== formValues.confirmPassword) {
    errors.confirmPassword = 'Password should match';
  }

  return errors;
};
