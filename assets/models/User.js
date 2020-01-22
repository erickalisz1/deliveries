class User {
    constructor(UserID, firstName, lastName, password, username) {
        this.UserID = UserID;
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
    }
}

export default User;