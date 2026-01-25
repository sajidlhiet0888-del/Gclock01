‎const axios = require("axios");
‎const fs = require("fs-extra");
‎const path = require("path");
‎
‎module.exports.config = {
‎  name: "gemini",
‎  version: "1.0.0",
‎  hasPermssion: 0,
‎  credits: "ARIF BABU",
‎  description: "Gemini AI DP / Image Generator",
‎  commandCategory: "ai",
‎  usages: ".dp <prompt>",
‎  cooldowns: 10
‎};
‎
‎const API_KEY = "AIzaSyDovkaX1DV-mlKEi5ywX7kxBC3cLsCVTZ4";
‎const MODEL = "gemini-1.5-flash";
‎const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;
‎
‎module.exports.run = async function ({ api, event, args }) {
‎  try {
‎    const prompt = args.join(" ");
‎    if (!prompt) {
‎      return api.sendMessage(
‎        "❌ Prompt do bhai\nExample:\n.dp cute anime girl dp",
‎        event.threadID,
‎        event.messageID
‎      );
‎    }
‎
‎    api.sendMessage("🎨 AI DP generate ho rahi hai...", event.threadID);
‎
‎    const res = await axios.post(API_URL, {
‎      contents: [
‎        {
‎          parts: [
‎            { text: `Generate a high quality profile picture: ${prompt}` }
‎          ]
‎        }
‎      ]
‎    });
‎
‎    const imageBase64 =
‎      res.data.candidates[0].content.parts.find(p => p.inlineData)?.inlineData
‎        ?.data;
‎
‎    if (!imageBase64) {
‎      return api.sendMessage(
‎        "❌ Image generate nahi hui, prompt change karo",
‎        event.threadID
‎      );
‎    }
‎
‎    const imgBuffer = Buffer.from(imageBase64, "base64");
‎    const cachePath = path.join(__dirname, "cache");
‎    if (!fs.existsSync(cachePath)) fs.mkdirSync(cachePath);
‎
‎    const imgPath = path.join(cachePath, "dp.png");
‎    fs.writeFileSync(imgPath, imgBuffer);
‎
‎    api.sendMessage(
‎      {
‎        body: "✅ Gemini AI DP Ready",
‎        attachment: fs.createReadStream(imgPath)
‎      },
‎      event.threadID,
‎      () => fs.unlinkSync(imgPath)
‎    );
‎  } catch (err) {
‎    console.error(err);
‎    api.sendMessage("❌ Error aaya, baad me try karo", event.threadID);
‎  }
‎};