const users = [];

const addUser = ({ name, room }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const existingUser = users.find((user) => user.room === room && user.name === name);

  if(!name || !room) return { error: 'Username and room are required.' };
  if(existingUser) return { error: 'Username is taken.' };

  const id = Math.floor(Math.random() * 10000)

  const user = { id, name, room };

  users.push(user);

  return { user };
}

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if(index !== -1) return users.splice(index, 1)[0];
}

const getUser = (id) => {
  console.log('Finding user -> id = ' + id);
  const user = users.find((user) => user.id === Number(id));
  return user
}

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, removeUser, getUser, getUsersInRoom };