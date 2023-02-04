const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 4000;
let db;

app.get("/api/a", async (req, res) => {
  try {
    const result = await db
      .collection("companies")
      .find({
        email_address: { $regex: "@twitter.com" },
      })
      .limit(15)
      .toArray();
    res.status(200).json({
      ok: true,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      message: error.message,
    });
  }
});

app.get("/api/b", async (req, res) => {
  try {
    const result = await db
      .collection("companies")
      .find({
        founded_year: {
          $gte: 2006,
          $lte: 2008,
        },
      })
      .limit(20)
      .toArray();

    res.status(200).json({
      ok: true,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      message: error.message,
    });
  }
});

app.get("/api/c", async (req, res) => {
  try {
    const result = await db
      .collection("companies")
      .find({
        name: { $eq: "Technorati" },
      })
      .limit(15)
      .toArray();
    res.status(200).json({
      ok: true,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      message: error.message,
    });
  }
});

app.get("/api/d", async (req, res) => {
  try {
    const result = await db
      .collection("companies")
      .find({
        $and: [{ category_code: "advertising" }, { founded_year: 2002 }],
      })
      .limit(15)
      .toArray();
    res.status(200).json({
      ok: true,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      message: error.message,
    });
  }
});

app.get("/api/e", async (req, res) => {
  try {
    const result = await db
      .collection("companies")
      .find({
        $or: [
          {
            category_code: "messaging",
          },
          {
            category_code: "games_video",
          },
        ],
      })
      .sort({ funded_year: 1 })
      .limit(10)
      .toArray();
    res.status(200).json({
      ok: true,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      message: error.message,
    });
  }
});

app.get("/api/f", async (req, res) => {
  try {
    console.log(req.query);

    const founded_year = parseInt(req.query.founded_year);

    const result = await db
      .collection("companies")
      .find({ founded_year })
      .limit(10)
      .toArray();

    res.status(200).json({
      ok: true,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      message: error.message,
    });
  }
});

app.post("/api/g", async (req, res) => {
  try {
    console.log(req.body);
    const result = await db
      .collection("companies")
      .find(req.body)
      .limit(10)
      .toArray();

    res.status(200).json({
      ok: true,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      message: error.message,
    });
  }
});

mongoose
  .connect(
    "mongodb+srv://root:toor@cluster0.dyvadcq.mongodb.net/sample_training?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Mongo DB Connected!");
    db = mongoose.connection.db;
  })
  .catch(() => {
    console.log("Connection Failed!");
  });
// .finally(()=>{
//   console.log("Request finished!");
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
