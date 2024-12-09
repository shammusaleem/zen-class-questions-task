//1.Find all the topics and tasks which are thought in the month of October

db.topics.find({ "date": { $gte: ISODate("2020-10-01"), $lt: ISODate("2020-11-01") } });
db.tasks.find({ "date": { $gte: ISODate("2020-10-01"), $lt: ISODate("2020-11-01") } });


//2.Find all the company drives which appeared between 15 oct-2020 and 31-oct-2020

db.company_drives.find({
    "date": { $gte: ISODate("2020-10-15"), $lte: ISODate("2020-10-31") }
  });
  

//3.Find all the company drives and students who are appeared for the placement.

db.company_drives.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "drive_id",
        foreignField: "drive_id",
        as: "students"
      }
    }
  ]);
  

//4.Find the number of problems solved by the user in codekata

db.codekata.aggregate([
    { $group: { _id: "$user_id", total_solved: { $sum: 1 } } }
  ]);
  

//5.Find all the mentors with who has the mentee's count more than 15

db.mentors.aggregate([
    { $match: { mentees_count: { $gt: 15 } } }
  ]);
  

//6.Find the number of users who are absent and task is not submitted  between 15 oct-2020 and 31-oct-2020

db.attendance.aggregate([
    { $match: { "date": { $gte: ISODate("2020-10-15"), $lte: ISODate("2020-10-31") }, "status": "absent" } },
    {
      $lookup: {
        from: "tasks",
        localField: "user_id",
        foreignField: "user_id",
        as: "tasks"
      }
    },
    { $match: { "tasks.submitted": false } }
  ]);
  