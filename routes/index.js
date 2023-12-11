import express from "express";
import mongoose from "mongoose";
const router = express.Router();
import { db } from "../models/index.js";

router.get("/msg", (req, res) => {
  res.json({ msg: "Hello World" });
});

router.get("/student", async (req, res) => {
  const student = await db.Student.aggregate([
    {
      $lookup: {
        from: "marks",
        foreignField: "regno",
        localField: "regno",
        as: "marks",
      },
    },
  ]);

  res.status(200).json(student);
});

router.get("/grade", async (req, res) => {
  const grade = await db.Student.aggregate([
    {
      $lookup: {
        from: "marks",
        foreignField: "regno",
        localField: "regno",
        as: "obtain",
      },
    },
    { $unwind: "$obtain" },
    {
      $group: {
        _id: { regno: "$regno", name: "$name" },
        total: { $sum: "$obtain.marks" },
      },
    },
    { $project: { _id: 0, regno: "$_id.regno", name: "$_id.name", total: 1 } },
    {
      $lookup: {
        from: "grades",
        let: { score: "$total" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $gte: ["$$score", "$start"] },
                  { $lte: ["$$score", "$end"] },
                ],
              },
            },
          },
        ],
        as: "grade",
      },
    },
    { $unwind: "$grade" },
    { $project: { regno: 1, grade: "$grade.grade" } },
  ]);

  res.status(200).json(grade);
});

router.get("/student/:regno", async (req, res) => {
  const regno = req.params.regno;

  try {
    const [student] = await db.Student.aggregate([
      {
        $match: {
          regno: regno,
        },
      },
      {
        $lookup: {
          from: "marks",
          foreignField: "regno",
          localField: "regno",
          as: "marks",
        },
      },
    ]);

    res.status(200).json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/heads", async (req, res) => {
  try {
    const heads = await db.Head.find();
    res.status(200).json(heads);
  } catch (error) {
    console.log(error);
  }
});

export default router;
