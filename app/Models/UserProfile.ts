export default class UserProfile {
    username: String;
    pfp_url: String;
    role: String;
    email: String;
    gebruikerinfo: String;

    public constructor(username: String, pfp_url: any, role: string, email: string, gebruikersinfo: string) {
      this.username = username;
      this.pfp_url = pfp_url;
      this.role = role;
      this.email = email;
      this.gebruikerinfo = gebruikersinfo;
    }
}
