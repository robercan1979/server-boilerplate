"use stric";
module.exports = class User{
    constructor(email, password){
        this.email = email;
        this.password = password;
    }

    login() {
        console.log('Intento de login email: ' + this.email + ' pass: ' + this.password);
        if(this.email === "robercan1979@gmail.com") return true;
        return false;
    }
}