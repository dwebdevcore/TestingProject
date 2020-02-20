const users = []; // Array as "DB"- just for this test case.

class User {
  constructor(name, userName) {
    let sameName = users.filter( (item) => item.name == name);

    if(sameName.length > 0) throw new Error('name exists');

    this.id = null;
    this.name = name;
    this.userName = userName;
    this.followers = [];
  }

  save() {
    if(!this.id) {
      this.id = users.length;

      users.push(this);
    }
  }

  follow(id) {
    let idx = this.followers.indexOf(id);
    if(idx === -1) this.followers.push(id);
  }

  unfollow(id) {
    let idx = this.followers.indexOf(id);
    if(idx !== -1) this.followers = this.followers.splice(idx, 1);
  }

  hasFollowers() {
    return this.followers.length > 0;
  }

  myFollowers() {
    return users.filter( (item) => this.followers.indexOf(item.id) !== -1 );
  }

  static findById(id) {
    let user = users.filter( (item) => item.id == id);
    if(user.length > 0) return user[0];
    else return null;
  }
}

function followers() {
  return users;
}

function follows() {
  return users.filter( (item) => item.hasFollowers() );
}

module.exports = {
  User: User,
  follows: follows,
  followers: followers
};

