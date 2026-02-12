‎const axios = require("axios");
‎const yts = require("yt-search");
‎
‎/* 🔐 Credits Lock */
‎function checkCredits() {
‎  if (module.exports.config.credits !== "ARIF-BABU") {
‎    throw new Error("❌ Credits Locked By ARIF-BABU");
‎  }
‎}
‎
‎/* 🎞 Loading Frames */
‎const frames = [
‎  "🎵 ▰▱▱▱▱▱▱▱▱▱ 10%",
‎  "🎶 ▰▰▱▱▱▱▱▱▱▱ 20%",
‎  "🎧 ▰▰▰▰▱▱▱▱▱▱ 40%",
‎  "💿 ▰▰▰▰▰▰▱▱▱▱ 60%",
‎  "❤️ ▰▰▰▰▰▰▰▰▰▰ 100%"
‎];
‎
‎/* 🌐 API */
‎const baseApiUrl = async () => {
‎  const res = await axios.get(
‎    "https://raw.githubusercontent.com/Mostakim0978/D1PT0/refs/heads/main/baseApiUrl.json"
‎  );
‎  return res.data.api;
‎};
‎
‎(async () => {
‎  global.apis = { diptoApi: await baseApiUrl() };
‎})();
‎
‎async function getStreamFromURL(url, name) {
‎  const res = await axios.get(url, { responseType: "stream" });
‎  res.data.path = name;
‎  return res.data;
‎}
‎
‎function getVideoID(url) {
‎  const r =
‎    /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|shorts\/))([\w-]{11})/;
‎  const m = url.match(r);
‎  return m ? m[1] : null;
‎}
‎
‎/* ⚙ CONFIG */
‎module.exports.config = {
‎  name: "song",
‎  version: "1.3.5",
‎  credits: "ARIF-BABU",
‎  hasPermssion: 0,
‎  cooldowns: 5,
‎  description: "YouTube MP3 Downloader",
‎  commandCategory: "media",
‎  usages: "song <name | link>"
‎};
‎
‎/* ================= PREFIX ONLY ================= */
‎module.exports.run = async function ({ api, args, event }) {
‎  try {
‎    checkCredits();
‎
‎    if (!args[0]) {
‎      return api.sendMessage(
‎        "❌ Song ka naam ya YouTube link do",
‎        event.threadID,
‎        event.messageID
‎      );
‎    }
‎
‎    const input = args.join(" ");
‎
‎    const loading = await api.sendMessage(
‎      "🔍 Processing...",
‎      event.threadID
‎    );
‎
‎    for (const f of frames) {
‎      await new Promise(r => setTimeout(r, 400));
‎      await api.editMessage(f, loading.messageID);
‎    }
‎
‎    let videoID;
‎
‎    if (input.includes("youtu")) {
‎      videoID = getVideoID(input);
‎      if (!videoID) throw new Error("Invalid URL");
‎    } else {
‎      const res = await yts(input);
‎      videoID = res.videos[0]?.videoId;
‎      if (!videoID) throw new Error("No result");
‎    }
‎
‎    const { data } = await axios.get(
‎      `${global.apis.diptoApi}/ytDl3?link=${videoID}&format=mp3`
‎    );
‎
‎    const short = (
‎      await axios.get(
‎        `https://tinyurl.com/api-create.php?url=${encodeURIComponent(
‎          data.downloadLink
‎        )}`
‎      )
‎    ).data;
‎
‎    api.unsendMessage(loading.messageID);
‎
‎    return api.sendMessage(
‎      {
‎        body: `🎵 ${data.title}\n🔗 ${short}`,
‎        attachment: await getStreamFromURL(
‎          data.downloadLink,
‎          `${data.title}.mp3`
‎        )
‎      },
‎      event.threadID,
‎      event.messageID
‎    );
‎
‎  } catch (err) {
‎    console.error(err);
‎    return api.sendMessage(
‎      "⚠️ Server busy ya API down 😢",
‎      event.threadID,
‎      event.messageID
‎    );
‎  }
‎};
