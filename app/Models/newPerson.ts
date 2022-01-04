export default class newPerson {
    username: string;
    pfp_url: string;
    name: string;
    email: string;
    password: string;
    description: string;
    
    constructor(Username: string, ProfilePicture: string, Name: string, Email: string, Password: string, Description: string) {
        this.username = Username;
        this.pfp_url = ProfilePicture;
        this.name = Name;
        this.email = Email;
        this.password = Password;
        this.description = Description;
    }
}