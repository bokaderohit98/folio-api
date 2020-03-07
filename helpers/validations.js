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
  if (dob) body.dob = Date(dob.trim());
  body.social = social;

  return {
    body,
    error: null
  };
};

/**
 * Validates Education details
 * @param {Object} - request body
 * @returns {Object} - containing request body and error object
 */
exports.validateEducation = ({
  from,
  to,
  institute,
  degree,
  specialization
}) => {
  let errorMessage = "";

  if (!from || !from.trim()) errorMessage = "Missing starting date";
  else if (!to || !to.trim()) errorMessage = "Missing ending date";
  else if (from && to && Date().valueOf(to) < Date().valueOf(from))
    errorMessage = "Invalid date range";
  else if (!institute || !institute.trim())
    errorMessage = "Missing institute name";
  else if (!degree || !degree.trim()) errorMessage = "Missing Degree";

  if (errorMessage) return { body: null, error: { error: errorMessage } };
  return {
    body: {
      from: Date(from.trim()),
      to: Date(to.trim()),
      institute: institute.trim(),
      degree: degree.trim(),
      specialization: specialization && specialization.trim()
    },
    error: null
  };
};

/**
 * Validates Updated Education details
 * @param {Object} - request body
 * @returns {Object} - containing request body and error object
 */
exports.validateUpdatedEducation = ({
  from,
  to,
  institute,
  degree,
  specialization
}) => {
  let errorMessage = "";

  if (from && !from.trim()) errorMessage = "Invalid starting date";
  else if (to && !from.trim()) errorMessage = "Invalid ending date";
  else if (Date().valueOf(to) < Date().valueOf(from))
    errorMessage = "Invalid date range";
  else if (institute && !institute.trim())
    errorMessage = "Invalid institute name";
  else if (degree && !degree.trim()) errorMessage = "Invalid degree";

  if (errorMessage) return { body: null, error: { error: errorMessage } };

  const body = {};
  if (from) body.from = Date(from.trim());
  if (to) body.to = Date(to.trim());
  if (institute) body.institute = institute;
  if (degree) body.degree = degree;
  body.specialization = specialization;

  return {
    body,
    error: null
  };
};

/**
 * Validates Work details
 * @param {Object} - request body
 * @returns {Object} - containing request body and error object
 */
exports.validateWork = ({ from, to, organization, position }) => {
  let errorMessage = "";

  if (!from || !from.trim()) errorMessage = "Missing starting date";
  else if (!to || !to.trim()) errorMessage = "Missing ending date";
  else if (from && to && Date().valueOf(to) < Date().valueOf(from))
    errorMessage = "Invalid date range";
  else if (!organization || !organization.trim())
    errorMessage = "Missing organization name";
  else if (!position || !position.trim()) errorMessage = "Missing Position";

  if (errorMessage) return { body: null, error: { error: errorMessage } };
  return {
    body: {
      from: Date(from.trim()),
      to: Date(to.trim()),
      organization: organization.trim(),
      position: position.trim()
    },
    error: null
  };
};

/**
 * Validates Updated Education details
 * @param {Object} - request body
 * @returns {Object} - containing request body and error object
 */
exports.validateUpdatedWork = ({ from, to, organization, position }) => {
  let errorMessage = "";

  if (from && !from.trim()) errorMessage = "Invalid starting date";
  else if (to && !from.trim()) errorMessage = "Invalid ending date";
  else if (Date().valueOf(to) < Date().valueOf(from))
    errorMessage = "Invalid date range";
  else if (organization && !organization.trim())
    errorMessage = "Invalid organization name";
  else if (position && !position.trim()) errorMessage = "Invalid Position";

  if (errorMessage) return { body: null, error: { error: errorMessage } };

  const body = {};
  if (from) body.from = Date(from.trim());
  if (to) body.to = Date(to.trim());
  if (organization) body.organization = organization;
  if (position) body.position = position;

  return {
    body,
    error: null
  };
};

/**
 * Validates achivement details
 * @param {Object} - request body
 * @returns {Object} - containing request body and error object
 */
exports.validateAchivement = ({ date, title, description }) => {
  let errorMessage = "";

  if (!date || !date.trim()) errorMessage = "Missing date";
  else if (!title || !title.trim()) errorMessage = "Missing title";

  if (errorMessage) return { body: null, error: { error: errorMessage } };

  return {
    body: {
      date: Date(date.trim()),
      title: title.trim(),
      description: description && description.trim()
    },
    error: null
  };
};

/**
 * Validates Updated achivement details
 * @param {Object} - request body
 * @returns {Object} - containing request body and error object
 */
exports.validateUpdatedAchivement = ({ date, title, description }) => {
  let errorMessage = "";

  if (date && !date.trim()) errorMessage = "Invalid date";
  else if (title && !title.trim()) errorMessage = "Invalid title";

  if (errorMessage) return { body: null, error: { error: errorMessage } };

  const body = {};
  if (date) body.date = Date(date.trim());
  if (title) body.title = title;
  body.description = description;

  return {
    body,
    error: null
  };
};
