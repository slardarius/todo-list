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
      update_at: {
        type: Date,
        require: false,
      },
      user_image: {
        type: String,
        required: false,
      },
      auth_token: {
        type: String,
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

    this.userSchema.method('transform', () => {
      const obj = this.toObject();
      obj.id = obj._id;
    });
  }

  connectToTable() {
    return model('User', this.userSchema);
  }
}

module.exports = User;
