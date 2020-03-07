/**
 * Validates the basic details
 * @param {Object} - request body
 * @returns {Object} - containing request body and error object
 */
exports.validateBasicDetails = ({
  name,
  email,
  password,
  dob,
  gender,
  social
}) => {
  const emailRegExp = RegExp(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  let errorMessage = "";

  if (!name || !name.trim()) errorMessage = "Missing name";
  else if (!email || !email.trim() || !emailRegExp.test(email.trim()))
    errorMessage = "Missing or invalid email";
  else if (!password || !password.trim()) errorMessage = "Missing Password";
  else if (!dob || !dob.trim())
    errorMessage = "Missing or invalid Date of Birth";
  else if (!gender || !gender.trim()) errorMessage = "Missing gender";

  if (errorMessage) return { body: null, error: { error: errorMessage } };
  return {
    body: {
      name: name.trim(),
      email: email.trim(),
      password: password.trim(),
      dob: Date(dob.trim()),
      gender: gender.trim(),
      social: social || {}
    },
    error: {}
  };
};

/**
 * Validate updated details
 * @param {Object} - request body
 * @returns {Object} - containing request body and error object
 */
exports.validateUpdatedDetails = ({ name, gender, dob, social }) => {
  let errorMessage = "";

  if (name && !name.trim()) errorMessage = "Invalid name";
  else if (gender && !gender.trim()) errorMessage = "Invalid gender";
  else if (dob && !dob.trim()) errorMessage = "Invalid Date of Birth";

  if (errorMessage) return { body: null, error: { error: errorMessage } };

  const body = {};
  if (name) body.name = name;
  if (gender) body.gender = gender;
  if (dob) body.dob = Date(dob);
  body.social = social;

  return {
    body,
    error: null
  };
};
