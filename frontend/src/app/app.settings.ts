import { environment } from "src/environments/environment";

export class AppSettings {
  public static readonly APP_NAME = "Open Conference Manager";
  public static readonly APP_LOCALSTORAGE_TOKEN = "OCM_Token";
  public static readonly APP_VERSION = "0.1.0";
  public static readonly API_ENDPOINT = environment.APIENDPOINT_BACKEND;
  public static readonly API_ENDPOINT_SPEAKERS = `${environment.APIENDPOINT_BACKEND}/speakers`;
  public static readonly API_ENDPOINT_TALKS = `${environment.APIENDPOINT_BACKEND}/talks`;
  public static readonly API_ENDPOINT_COSPEAKERS = `${environment.APIENDPOINT_BACKEND}/cospeaker`;
  public static readonly API_ENDPOINT_ADMIN = `${environment.APIENDPOINT_BACKEND}/admin`;
}
