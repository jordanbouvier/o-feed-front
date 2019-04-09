export const getUsername = (user, displayName = null, realName = null) => {
  if (!user) {
    if (displayName) {
      return displayName;
    }
    if (realName) {
      return realName;
    }
    return 'Username';
  }
  if (user.display_name) {
    return user.display_name;
  }
  if (user.real_name) {
    return user.real_name;
  }
  return 'Username';
};
export const getRealName = (user) => {
  if (!user) {
    return 'Username';
  }
  if (user.real_name) {
    return user.real_name;
  }
  if (user.display_name) {
    return user.display_name;
  }
  return 'Username';
};
