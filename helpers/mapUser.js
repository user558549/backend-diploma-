module.exports = function mapUser(user) {
  return {
    id: user.id,
    login: user.login,
    role: user.role,
  };
};
