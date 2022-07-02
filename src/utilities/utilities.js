export const errorHandler = (error) => {
  return (
    (error.response && error.response.data && error.response.data.message) ||
    error.message ||
    error.message.toString()
  );
};

export const getAge = (birthString, deathString) => {
  const birthDate = new Date(birthString);

  let todayOrDeathDate = new Date();
  if (deathString) {
    todayOrDeathDate = new Date(deathString);
  }

  let age = todayOrDeathDate.getFullYear() - birthDate.getFullYear();
  const m = todayOrDeathDate.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && todayOrDeathDate.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
};
