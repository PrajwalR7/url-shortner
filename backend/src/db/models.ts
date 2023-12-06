import { model } from "mongoose";
import { UrlSchema } from "./schemas/url.js";

export const Url = model('url', UrlSchema)