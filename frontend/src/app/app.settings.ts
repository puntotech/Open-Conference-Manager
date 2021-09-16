import { environment } from 'src/environments/environment';

export class AppSettings {
  public static readonly APP_NAME = 'Open Conference Manager';
  public static readonly APP_LOCALSTORAGE_TOKEN = 'OCM_Token';
  public static readonly APP_VERSION = '0.1.0';
  public static readonly API_ENDPOINT = environment.APIENDPOINT_BACKEND;

}
