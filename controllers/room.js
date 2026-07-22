const Room = require("../models/Room");

async function getRooms() {
  const rooms = await Room.find({ reservation: false });
  if (rooms) {
    return rooms;
  } else {
    throw new Error("Не удалось получить номера");
  }
}

async function roomReservation(res, idRoom, user_reservation, reservation) {
  const reservationRoom = await Room.findByIdAndUpdate(
    idRoom,
    {
      user_reservation,
      reservation,
    },
    { returnDocument: "after" },
  );
  if (reservationRoom) {
    return reservationRoom;
  } else {
    res.send({ error: "Неудалось забронировать номер, попробуйте ещё раз.." });
  }
}

async function getRoom(numberRoom) {
  return await Room.findOne({ number_room: numberRoom });
}

async function getUserRoom(userLogin) {
  const userRooms = await Room.find({
    "user_reservation.userLogin": userLogin,
  });
  if (Array.isArray(userRooms) && userRooms.length > 0) {
    return userRooms;
  } else {
    return [];
  }
}

async function deletedReservationUser(
  res,
  idRoom,
  user_reservation,
  reservation,
) {
  const resultDeletedReservationUser = await Room.findByIdAndUpdate(
    idRoom,
    {
      user_reservation,
      reservation,
    },
    { returnDocument: "after" },
  );
  if (resultDeletedReservationUser) {
    return resultDeletedReservationUser;
  } else {
    res.send({ error: "Неудалось удалить бронь номера, попробуйте ещё раз.." });
  }
}

async function deletedReservationisAdmin(
  res,
  idRoom,
  user_reservation,
  reservation,
) {
  const resultDeletedReservationIsUser = await Room.findByIdAndUpdate(
    idRoom,
    {
      user_reservation,
      reservation,
    },
    { returnDocument: "after" },
  );
  if (resultDeletedReservationIsUser) {
    return resultDeletedReservationIsUser;
  } else {
    res.send({ error: "Неудалось удалить бронь номера, попробуйте ещё раз.." });
  }
}

async function editReservationUser(res, idRoom, user_reservation) {
  const resultEditReservationUser = await Room.findByIdAndUpdate(
    idRoom,
    {
      user_reservation,
    },
    { returnDocument: "after" },
  );
  if (resultEditReservationUser) {
    return resultEditReservationUser;
  } else {
    res.send({
      error: "Неудалось изменить бронь номера, попробуйте ещё раз..",
    });
  }
}

async function getRoomsForAdmin() {
  const roomsForAdmin = await Room.find();
  if (roomsForAdmin) {
    return roomsForAdmin;
  } else {
    throw new Error("Не удалось получить номера");
  }
}

async function getReservRoomsForAdmin() {
  const rooms = await Room.find({ reservation: true });
  if (rooms) {
    return rooms;
  } else {
    throw new Error("Не удалось получить номера");
  }
}

module.exports = {
  getRooms,
  getRoom,
  roomReservation,
  getUserRoom,
  deletedReservationUser,
  getRoomsForAdmin,
  getReservRoomsForAdmin,
  editReservationUser,
  deletedReservationisAdmin,
};
