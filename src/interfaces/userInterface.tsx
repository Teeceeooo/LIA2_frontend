interface User {
  username: string;
  password: string;
  enabled: boolean;
  name : string;
  roles : [
    {
      username: string,
      authority: string
    }
  ]
}

export default User;
