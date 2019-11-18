const { Schema, model } = require('mongoose');

class User {
  constructor() {
    this.userSchema = Schema({
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
      user_tabs: [
        {
          id: Schema.Types.ObjectId,
          title: String,
          ids_of_task: [
            {
              title: String,
              id: Schema.Types.ObjectId,
              is_complete: Boolean,
            }
          ]
        }
      ]
    });
  }

  connectToTable() {
    return model('User', this.userSchema);
  }
}

module.exports = User;
