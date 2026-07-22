const express = require("express");
const {
  getRooms,
  getRoom,
  roomReservation,
  getUserRoom,
  deletedReservationUser,
  getRoomsForAdmin,
  getReservRoomsForAdmin,
  editReservationUser,
  deletedReservationisAdmin,
} = require("../controllers/room");
const authenticated = require("../middlewares/authenticated");
const hasRole = require("../middlewares/hasRole");
const ROLES = require("../constants/roles");

const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  try {
    const rooms = await getRooms();

    res.send(rooms);
  } catch (e) {
    res.send({ error: e.message || "Unknown error" });
  }
});

router.get("/user-room", authenticated, async (req, res) => {
  try {
    const userRooms = await getUserRoom(req.user.login);

    res.send(userRooms);
  } catch (e) {
    res.send({ error: e.message || "Unknown error" });
  }
});

router.get(
  "/rooms-for-admin",
  authenticated,
  hasRole([ROLES.ADMIN]),
  async (req, res) => {
    try {
      const roomsForAdmin = await getRoomsForAdmin();
      res.send(roomsForAdmin);
    } catch (error) {
      res.send({ error: error.message || "Ошибка сети" });
    }
  },
);

router.get(
  "/reserved-rooms-for-admin",
  authenticated,
  hasRole([ROLES.ADMIN]),
  async (req, res) => {
    try {
      const reservedRoomsForAdmin = await getReservRoomsForAdmin();
      res.send(reservedRoomsForAdmin);
    } catch (error) {
      res.send({ error: error.message || "Ошибка сети" });
    }
  },
);

router.get("/:number_room", async (req, res) => {
  const room = await getRoom(req.params.number_room);
  res.send(room);
});

router.patch("/:idRoom", authenticated, async (req, res) => {
  try {
    const { idRoom } = req.params;
    const { user_reservation, reservation } = req.body;
    const reservationRoom = await roomReservation(
      res,
      idRoom,
      user_reservation,
      reservation,
    );
    res.send(reservationRoom);
  } catch (error) {
    res.send({ error: error.message || "Ошибка сети" });
  }
});

router.patch(
  "/deleted-reservation-user-is-admin/:idRoom",
  authenticated,
  hasRole([ROLES.ADMIN]),
  async (req, res) => {
    try {
      const { idRoom } = req.params;
      const { user_reservation, reservation } = req.body;
      const resultDeletedReservationAdmin = await deletedReservationisAdmin(
        res,
        idRoom,
        user_reservation,
        reservation,
      );
      res.send(resultDeletedReservationAdmin);
    } catch (error) {
      res.send({ error: error.message || "Ошибка сети" });
    }
  },
);

router.patch(
  "/deleted-reservation-user/:idRoom",
  authenticated,
  async (req, res) => {
    try {
      const { idRoom } = req.params;
      const { user_reservation, reservation } = req.body;
      const resultDeletedReservationUser = await deletedReservationUser(
        res,
        idRoom,
        user_reservation,
        reservation,
      );
      res.send(resultDeletedReservationUser);
    } catch (error) {
      res.send({ error: error.message || "Ошибка сети" });
    }
  },
);

router.patch(
  "/edit-reservation-user/:idRoom",
  authenticated,
  hasRole([ROLES.ADMIN]),
  async (req, res) => {
    try {
      const { idRoom } = req.params;
      const { user_reservation } = req.body;
      const resultEditReservationUser = await editReservationUser(
        res,
        idRoom,
        user_reservation,
      );
      res.send(resultEditReservationUser);
    } catch (error) {
      res.send({ error: error.message || "Ошибка сети" });
    }
  },
);

module.exports = router;
