import { fetchStrapi } from "../components/Strapi";
import { API_URL, USERS } from "../constant";

const getCurrentUser = () =>
  fetchStrapi.request("GET", `${API_URL}${USERS}/me`);
export default getCurrentUser;
