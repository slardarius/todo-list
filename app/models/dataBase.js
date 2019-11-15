const mongoose = require('mongoose');
const environment = require('../../environment');

class DataBase {
  static connect() {
    return mongoose.connect(environment.uerToDB
        + environment.dataBaseName, { userNewUrlParser: true });
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