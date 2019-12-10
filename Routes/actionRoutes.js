const express = require("express");
const router = express.Router();
const db = require("../data/helpers/actionModel");
const projects = require("../data/helpers/projectModel");

// create an action
router.post("", async (req, res) => {
  const { project_id, description, notes } = req.body;

  if (!project_id)
    return res.status(400).json({ msg: "please provide project id" });

  if (!description || !notes)
    return res.status(400).json({ msg: "please provide full information" });

  const exists = await projects.get(project_id);

  if (exists) {
    const result = await db.insert({ project_id, description, notes });
    return res.status(201).json(result);
  } else {
    return res.status(404).json({ msg: "project with that id does not exist" });
  }
});

// get an action
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const result = await db.get(id);

  return result
    ? res.status(200).json(result)
    : res.status(404).json({ msg: "no action found" });
});

// update an action
router.put("/:id", async (req, res) => {
  const { description, notes } = req.body;
  const { id } = req.params;

  if (
    (description !== undefined && description.length === 0) ||
    (notes !== undefined && notes.length === 0)
  )
    return res.status(400).json({ msg: "please provide full information" });

  const result = await db.update(id, { description, notes });

  return result
    ? res.status(201).json(result)
    : res.status(404).json({ msg: "action not found" });
});

// delete an action
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const result = await db.remove(id);

  return result
    ? res.status(200).json(result)
    : res.status(404).json({ msg: "action not found" });
});

module.exports = router;
