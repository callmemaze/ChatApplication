const users = [];

export const addUser = ({ id, userName, room }) => {
  room = room.trim().toLowerCase();
  userName = userName.trim().toLowerCase();
  const existingUser = users.find(
    (user) => user.room === room && user.userName === userName
  );
  if (existingUser) {
    return { error: "Username is taken" };
  }
  const user = { id, userName, room };
  users.push(user);
  return {
    user,
  };
};

export const removeUser = (id) => {
  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex !== -1) {
    return users.splice(userIndex, 1)[0];
  }
};

export const getUsers = (id) => users.find((user) => user.id === id);

export const getRoomUsers = (room) =>
  users.filter((user) => user.room === room);
