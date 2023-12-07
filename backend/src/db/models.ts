import { model } from "mongoose";
import { UrlSchema } from "./schemas/url.js";
import { UrlTestSchema } from "./schemas/url_test.js";

export const Url = model('url', UrlSchema)
export const Test_Url = model('test-url', UrlTestSchema)