import dotenv from "dotenv";
dotenv.config();
import contentstack from "@contentstack/management";

const client = contentstack.client({
  authtoken: process.env.CONTENTSTACK_MANAGEMENT_TOKEN,
});

const stack = client.stack({
  api_key: process.env.CONTENTSTACK_API_KEY,
  management_token: process.env.CONTENTSTACK_MANAGEMENT_TOKEN,
});


export default stack;
