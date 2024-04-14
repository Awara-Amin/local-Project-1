export class GlobalConstants {
  //message
  public static genericErorr: string =
    'Something went wrong, please try again later SHEX';

  //Regex
  public static nameRegex: string = '[a-zA-Z0-9 ]*';
  public static emailRegex: string =
    '[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}';
  public static contactRegex: string = '^[e0-9]{10,10}$';

  public static error: string = 'error';
}
