class User {
  constructor(userName = '', email = '') {
    this.userName = userName;
    this.email = email;
  }

  saveUser() {
    console.log(this);
  }

  getUserById(userId) {
    console.log(this, userId);
  }

  createUserTab() {
    console.log(this, 'createUserTab');
  }

  removeUserTab() {
    console.log(this, 'removeUserTab');
  }

  getInfoUserTab() {
    console.log(this, 'getInfoUserTab');
  }

  createUserTask() {
    console.log(this, 'createUserTask');
  }
}

//
module.exports = User;
