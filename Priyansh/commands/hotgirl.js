module.exports.config = {
  name: "hotgirl",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "PREM BABU",
  description: "hot photos",
  commandCategory: "Random-IMG",
  usages: "hot dp",
  cooldowns: 2,
  dependencies: {
    "request":"",
    "fs-extra":"",
    "axios":""
  }

};

module.exports.run = async({api,event,args,Users,Threads,Currencies}) => {
const axios = global.nodemodule["axios"];
const request = global.nodemodule["request"];
const fs = global.nodemodule["fs-extra"];
    var link = ["https://i.imgur.com/gKWzHOP.jpeg","https://i.imgur.com/gZrGLyK.jpeg","https://i.imgur.com/5z2jOZN.jpeg","https://i.imgur.com/oFkTZB3.jpeg","https://i.imgur.com/uAS4YLQ.jpeg","https://i.imgur.com/cztAfST.jpeg","https://i.imgur.com/W973evA.jpeg","https://i.imgur.com/szj1rCO.jpeg","https://i.imgur.com/16FmEgv.jpeg","https://i.imgur.com/MOCrlgy.jpeg","https://i.imgur.com/TN18c6C.jpeg","https://i.imgur.com/x5iPqv0.jpeg","https://i.imgur.com/LmwirR9.jpeg","https://i.imgur.com/exCU2an.jpeg","https://i.imgur.com/hsKNXkN.jpeg","https://i.imgur.com/CqhYs4w.jpeg","https://i.imgur.com/Yeu70HZ.jpeg","https://i.imgur.com/rNQ6kZC.jpeg","https://i.imgur.com/IP8nowW.jpeg","https://i.imgur.com/GUFo4A7.jpeg","https://i.imgur.com/bOElXYl.jpeg"
         ];
         var callback = () => api.sendMessage({body`★━━━━━━━━━━━━★    💜𝐇𝐨𝐭 𝐦𝐰𝐥🥵💜★━━━━━━━━━━━━★`,attachment: fs.createReadStream(__dirname + "/cache/1.jpg")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.jpg"));  
          return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname+"/cache/1.jpg")).on("close",() => callback());
       };
