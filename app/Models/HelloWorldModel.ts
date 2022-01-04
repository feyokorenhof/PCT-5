var observable = require("data/observable");
var applicationSettings = require("application-settings");

export default class HelloWorldModel {
    username: string;
    pfp_url: string;
    name: string;
    email: string;
    password: string;
    loginbool: Boolean;
    
    constructor(Username: string, ProfilePicture: string, Name: string, Email: string, Password: string, Loginbool: Boolean) {
        this.username = Username;
        this.pfp_url = ProfilePicture;
        this.name = Name;
        this.email = Email;
        this.password = Password;
        this.loginbool = Loginbool;
    }
};