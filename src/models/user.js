export default class User {
    constructor(id, login, password, firstName, lastName, patronymic) {
        this.id = id;
        this.login = login;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.patronymic = patronymic;
    }
}