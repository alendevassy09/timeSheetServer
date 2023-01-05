const user = require("../models/userModel");
const task = require("../models/taskModel");
var mongoose = require("mongoose");
const ObjectId = new Object();
module.exports = {
  addUser: (body) => {
    return new Promise((resolve, reject) => {
      user.create(body).then((response) => {
        resolve(response);
      });
    });
  },
  remove: (id) => {
    return new Promise((resolve, reject) => {
      task.deleteOne({ _id: mongoose.Types.ObjectId(id) }).then((response) => {
        resolve(response);
      });
    });
  },
  finish: (id) => {
    return new Promise((resolve, reject) => {
      task.updateOne({ _id: mongoose.Types.ObjectId(id) },{$set:{status:true}}).then((response) => {
        resolve(response);
      });
    });
  },
  getUser: () => {
    return new Promise((resolve, reject) => {
      user
        .find()
        .sort({ createdAt: -1 })
        .lean()
        .then((response) => {
          resolve(response);
        });
    });
  },
  stats: () => {
    return new Promise(async (resolve, reject) => {
      const now = new Date();

      const dayOfWeek = now.getDay();

      const startOfWeek = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() - (dayOfWeek - 1)
      );

      const dates = [];

      for (let i = 0; i <= dayOfWeek; i++) {
        dates.push(new Date(startOfWeek.getTime() + i * 24 * 60 * 60 * 1000));
      }

      let weekTask = await task.find({
        createdAt: {
          $gte: new Date(dates[0]),
          $lte: new Date(dates[dates.length - 1]),
        },
      });
      let pending = await task
        .find({
          $and: [
            {
              status: false,
              createdAt: {
                $gte: new Date(dates[0]),
                $lte: new Date(dates[dates.length - 1]),
              },
            },
          ],
        })
        .count();
      let complete = await task
        .find({
          $and: [
            {
              status: true,
              createdAt: {
                $gte: new Date(dates[0]),
                $lte: new Date(dates[dates.length - 1]),
              },
            },
          ],
        })
        .count();
      let incomplete = await task
        .find({
          $and: [
            {
              incomplete: true,
              createdAt: {
                $gte: new Date(dates[0]),
                $lte: new Date(dates[dates.length - 1]),
              },
            },
          ],
        })
        .count();
      //   console.log(pending, complete, incomplete);
      resolve({ pending, complete, incomplete });
    });
  },

  monthstats: () => {
    return new Promise(async (resolve, reject) => {
      var today = new Date();
      var startDate = new Date(today.getFullYear(), today.getMonth(), 1);

      let pending = await task
        .find({
          $and: [
            {
              status: false,
              createdAt: {
                $gte: new Date(startDate),
                $lte: new Date(today),
              },
            },
          ],
        })
        .count();
      let complete = await task
        .find({
          $and: [
            {
              status: true,
              createdAt: {
                $gte: new Date(startDate),
                $lte: new Date(today),
              },
            },
          ],
        })
        .count();

      console.log(pending, complete);
      resolve({ pending, complete });
    });
  },
  getTask: () => {
    return new Promise((resolve, reject) => {
      task
        .find()
        .sort({ createdAt: -1 })
        .populate("users")
        .lean()
        .then((response) => {
          resolve(response);
        });
    });
  },
  todayTask: () => {
    return new Promise((resolve, reject) => {
      const today = new Date();
      //   const year = today.getFullYear();
      //   const month = today.getMonth();
      //   const date = today.getDate();
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);
      console.log(today,yesterday);
      task
        .find({ createdAt: { $gte: new Date(yesterday), $lte: new Date(today) } })
        .sort({ createdAt: -1 })
        .populate("users")
        .lean()
        .then((response) => {
          console.log(response);
          resolve(response);
        });
    });
  },
  addTask: (body) => {
    return new Promise((resolve, reject) => {
      let users = [];
      user.find().then((response) => {
        for (let i = 0; i < response.length; i++) {
          for (let j = 0; j < body.users.length; j++) {
            if (response[i].fname == body.users[j]) {
              users.push(response[i]._id);
            }
          }
        }
        body.users = users;
        task.create(body).then((response) => {
          task
            .find()
            .sort({ createdAt: -1 })
            .populate("users")
            .lean()
            .then((response) => {
              resolve(response);
            });
        });
      });
    });
  },
};
