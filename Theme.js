import { I18nManager } from "react-native";

//importing images


const home_n = require("./assets/images/lightmode/home_n.png");
const home_f = require("./assets/images/lightmode/home_f.png");
const inbox_n = require("./assets/images/lightmode/inbox_n.png");
const inbox_f = require("./assets/images/lightmode/inbox_f.png");
const create_n = require("./assets/images/lightmode/create_n.png");
const create_f = require("./assets/images/lightmode/create_f.png");
const calendar_n = require("./assets/images/lightmode/calendar_n.png");
const calendar_f = require("./assets/images/lightmode/calendar_f.png");
const user_n = require("./assets/images/lightmode/user_n.png");
const user_f = require("./assets/images/lightmode/user_f.png");
const message = require("./assets/images/lightmode/message.png");
const mapimage = require("./assets/images/lightmode/mapimage.png");
const mapshare = require("./assets/images/lightmode/mapshare.png");
const locationgrey2 = require("./assets/images/lightmode/locationgrey2.png");
const heard = require("./assets/images/lightmode/heard.png");
const calendar = require("./assets/images/lightmode/calendar.png");
const calendar2 = require("./assets/images/lightmode/calendar2.png");
const upload2 = require("./assets/images/lightmode/upload2.png");

const gmail_outline = require("./assets/images/lightmode/gmail_outline.png");
const twitter_outline = require("./assets/images/lightmode/twitter_outline.png");
const facebook_outline = require("./assets/images/lightmode/facebook_outline.png");
const pencil = require("./assets/images/lightmode/pencil.png");
const profilelogo = require("./assets/images/lightmode/profilelogo.png");
const back = require("./assets/images/lightmode/back.png");
const enter = require("./assets/images/lightmode/enter.png");
const Filters = require("./assets/images/lightmode/Filters.png");
const loginpoint = require("./assets/images/lightmode/login_point.png");
const google = require("./assets/images/lightmode/google.png");
const fb = require("./assets/images/lightmode/facebook.png");
const user = require("./assets/images/lightmode/user.png");
const password = require("./assets/images/lightmode/password.png");
const filter = require("./assets/images/filter.png");
const logofull = require("./assets/images/lightmode/logo_full.png");
const logo = require("./assets/images/lightmode/logo.png");
const location = require("./assets/images/Location.png");
const star = require("./assets/images/star.png");
const locationgrey = require("./assets/images/locationgrey.png");
const arrowleft = require("./assets/images/arrow-left.png");

export default {
  //default colors
  white: "#fff",
  background: '#F2F2F2',
  black: "#000",
  primary: "#00438B",
  primaryLight: "#FF657E",
  secondary: "#FF8800",
  third: "#FF4400",
  textTabFocus: "#FF8800",
  textTab: "#FF8800",
  // third: "#6E7FAA",
  green: "#63E98C",
  red: "red",
  blue: "#2680EB",
  fontTitle: 20,
  fontSubTitle: 18,
  fontBtn: 16,
  fontText: 14,
  fontSmall: 12,

  gray1: '#F2F2F2',
  gray2: '#D5D8DB',
  gray3: '#F2F4F9',
  gray4: '#ADB5BD',
  gray5: '#AAAAAA',
  gray6: '#7E8387',
  gray7: '#1D2338', //black light
  gray8: '#E2E2E2', //White-text dark
  gray9: '#A2A2A2', //gray4 dark
  gray10: '#616161', //gray6 dark
  gray11: '#1E1E1E', //bg-second dark
  gray12: '#121212', //bg-black dark
  gray13: '#2C2C2C', //bg-third dark

  //font
  poppins: I18nManager.isRTL ? "JFFlat-Regular" : "JosefinSans-Regular",
  poppinsbold: I18nManager.isRTL ? "JFFlat-Regular" : "JosefinSans-Bold",
  
  //assets
  google: google,
  fb: fb,
  user: user,
  password: password,
  filter: filter,
  logofull: logofull,
  logo: logo,
  location: location,
  Filters: Filters,
  profilelogo: profilelogo,
  pencil: pencil,
  gmail_outline: gmail_outline,
  twitter_outline: twitter_outline,
  facebook_outline: facebook_outline,
  back: back,
  enter: enter,
  star: star,
  locationgrey: locationgrey,
  loginpoint: loginpoint,
  arrowleft,
  calendar: calendar,
  calendar2: calendar2,
  upload2: upload2,
  heard: heard,
  locationgrey2: locationgrey2,
  mapshare: mapshare,
  mapimage: mapimage,
  home_f: home_f,
  home_n: home_n,
  inbox_n: inbox_n,
  inbox_f: inbox_f,
  create_n: create_n,
  create_f: create_f,
  calendar_n: calendar_n,
  calendar_f: calendar_f,
  user_n: user_n,
  user_f: user_f,
  message: message,
};
