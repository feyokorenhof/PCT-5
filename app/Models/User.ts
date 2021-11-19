export default class User {
    username: String;
    pfp_url: String;
    role: String;
    email: String;
    gebruikerinfo: String;

    constructor(username: String, pfp_url: String) {
      this.username = username;
      this.pfp_url = pfp_url;

      this.role= "Sponsor"; //Aanpassen: moet als input gegeven worden
      this.email = "Generic.Email@gmail.com"; //Aanpassen: moet als input gegeven worden
      this.gebruikerinfo = "Ik wil kaas. Ik ben ook gewoon een klant. Jazeker, je leest dit goed. Dit is een Nederlandse memerij. References zijn altijd leuk" //Aanpassen: moet als input gegeven worden
    }
}
