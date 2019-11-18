const mongoose = require('mongoose');

class DataBase {
  static connect() {
    return mongoose.connect(process.env.URL_TO_DB
        + process.env.DATA_BASE_NAME, { userNewUrlParser: true });
  }

  static randomValue() {
     const UserModel =  mongoose.model('User', new mongoose.Schema({
          user_name: {
              type: String,
              required: false,
          },
          email: {
              type: String,
              required: false,
          },
          create_at: {
              type: Date,
              required: false,
          },
          user_image: {
              type: String,
              required: false,
          },
      }));

      return UserModel.insertMany({
          user_name: 'Artem',
          email: 'slardarius@icloud.com',
          create_at: new Date(),
          user_image: '',
      }, (err, small) => {
          if (err) throw Error(err);
          console.log(small);
      });
  }
}

module.exports = DataBase;
