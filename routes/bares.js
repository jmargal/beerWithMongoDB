const express = require("express");
const router = express.Router();

const { addBar, getBares, getBar, deleteBar, editBar } = require("../controllers/bares");

router.get("/", getBares);
router.get("/:Nombre", getBar);
router.delete("/:nombre", deleteBar);
router.post("/", addBar);
router.put("/:nombre",editBar)

module.exports = router;
