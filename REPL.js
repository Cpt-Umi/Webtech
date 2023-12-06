import { db } from "./models/index.js";

// (async () => {
//     const heads = await db.Head.find();
//     heads.forEach(async (head) => {
//         const result = await db.Mark.updateMany(
//             { hid: head.hid },
//             {
//                 $set: {
//                     head: head._id,
//                 },
//             }
//         );
//         console.log(result);
//     });
//     //process.exit();
// })();

// db.Student.find().then((students) => {
//     students.forEach(async (student) => {
//         let result = await db.Mark.updateMany(
//             { regno: student.regno },
//             {
//                 $set: {
//                     student: student._id,
//                 },
//             }
//         );
//         console.log(result);
//     });
// });

// (async () => {
//     const students = await db.Student.find();

//     students.forEach(async (student) => {
//         let ids = await db.Mark.find({ regno: student.regno });

//         //console.log(ids);

//         let result = await db.Student.updateOne(
//             { regno: student.regno },
//             {
//                 $push: {
//                     marks: ids,
//                 },
//             }
//         );
//         console.log(result);
//     });
// })();

// db.Student.find()
//     .populate({
//         path: "marks",
//         select: { marks: 1, _id: 1, hid: 1 },
//     })
//     .then((courses) => console.log(JSON.stringify(courses, null, 4)))
//     .then(() => process.exit());

// db.Mark.find()
//     .then((res) => console.log(JSON.stringify(res, null, 4)))
//     .then(() => process.exit());

db.Student.aggregate([
    { $lookup: { from: "marks", foreignField: "regno", localField: "regno", as: "obtain" } },
    // { $unwind: "$obtain" },
    // { $group: { _id: { regno: "$regno", name: "$name" }, total: { $sum: "$obtain.marks" } } },
    // { $project: { _id: 0, regno: "$_id.regno", name: "$_id.name", total: 1 } },
    // {
    //     $lookup: {
    //         from: "grades",
    //         let: { score: "$total" },
    //         pipeline: [{ $match: { $expr: { $and: [{ $gte: ["$$score", "$start"] }, { $lte: ["$$score", "$end"] }] } } }],
    //         as: "grade",
    //     },
    // },
    // { $unwind: "$grade" },
    // { $project: { regno: 1, name: 1, total: 1, grade: "$grade.grade" } },
])
    .then((res) => console.log(JSON.stringify(res, null, 4)))
    .then(() => process.exit());
//0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789

// {
//     $lookup:
//        {
//          from: "warehouses",
//          let: { order_item: "$item", order_qty: "$ordered" },
//          pipeline: [
//             { $match:
//                { $expr:
//                   { $and:
//                      [
//                        { $eq: [ "$stock_item",  "$$order_item" ] },
//                        { $gte: [ "$instock", "$$order_qty" ] }
//                      ]
//                   }
//                }
//             },
//             { $project: { stock_item: 0, _id: 0 } }
//          ],
//          as: "stockdata"
//        }
//   }
