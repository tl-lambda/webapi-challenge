const express = require("express");
const router = express.Router();
const db = require("../data/helpers/projectModel");

// create a new post
router.post("", async (req, res) => {
  const { name, description } = req.body;

  if (!name || !description)
    return res.status(400).json({ msg: "please provide full information" });

  const result = await db.insert({ name, description });

  return res.status(201).json(result);
});

// get a project by id
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const result = await db.get(id);

  return result
    ? res.status(200).json(result)
    : res.status(404).json({ msg: "no project found" });
});

// update a project
router.put("/:id", async (req, res) => {
  const { name, description } = req.body;
  const { id } = req.params;

  if (
    (name !== undefined && name.length === 0) ||
    (description !== undefined && description.length == 0)
  )
    return res.status(400).json({ msg: "please provide full information" });

  const result = await db.update(id, { name, description });

  return result
    ? res.status(201).json(result)
    : res.status(404).json({ msg: "no project located" });
});

// delete a project
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const result = await db.remove(id);

  return result
    ? res.status(200).json({ msg: "project deleted" })
    : res.status(404).json({ msg: "no project to delete" });
});

module.exports = router;
