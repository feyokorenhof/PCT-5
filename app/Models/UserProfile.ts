export default class UserProfile {
    username: String;
    pfp_url: String;
    role: String;
    email: String;
    gebruikerinfo: String;

    public constructor(username: String, pfp_url: String) {
      this.username = username;
      this.pfp_url = pfp_url;

      this.role= "Sponsor"; //Aanpassen: moet als input gegeven worden
      this.email = "Generic.Email@gmail.com"; //Aanpassen: moet als input gegeven worden
      this.gebruikerinfo = "Hier komt wat tekst te staan die de gebruiker zelf kan instellen. Denk aan Status of een quote. In iedergeval kan dit veel tekst zijn, maar ook erg weinig" //Aanpassen: moet als input gegeven worden
    }
}
