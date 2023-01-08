import { ChatGPTAPIBrowser } from "chatgpt";
import puppeteer from "puppeteer";
import env from "dotenv"
env.config();

const browser = await puppeteer.launch({
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});

const api = new ChatGPTAPIBrowser({
  email: process.env.OPENAI_EMAIL,
  password: process.env.OPENAI_PASSWORD,
  session: process.env.SESSION_TOKEN,
});

await api.initSession();

async function Ans(prompt) {
  let result = await api.sendMessage(prompt);
  return result.response;
}

export default Ans;
