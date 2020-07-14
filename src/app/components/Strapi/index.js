import Strapi from "strapi-js-sdk";
import { API_URL } from "../../constant";

export const fetchStrapi = new Strapi(API_URL);
