module.exports.config = {
  name: "war",
  version: "1.0.0",
  hasPermssion: 2, // Only admin can use
  credits: "ARIF-BABU",
  description: "Enables war mode where the bot replies only to messages from a specific user",
  commandCategory: "Admin",
  usages: "war on [UID] / war off",
  cooldowns: 5,
};

let warMode = false; // Tracks if war mode is active
let targetUID = null; // Stores the UID of the user to target in war mode
const botAdminUIDs = ["61551447140312", ""]; // Replace with the actual bot admin UIDs

module.exports.handleEvent = async function({ api, event, Users }) {
  const { threadID, senderID, messageID, body } = event;

  // If war mode is active, reply only to messages from the targeted user
  if (warMode && senderID === targetUID) {
    const name = await Users.getNameUser(senderID);
    const replies = [
      "AB3 MAA K3 DINN3 T3RI MAA KI CH00T KI CHATNI BANA K3 MAI APN3 L0WD3 S3 US3 P33SH P33SH K3 T3R3 GAAND M3 LAGA DU B3H3N CH0UD K3 DINN3 T0 T3RI GAAND M3 JALAN H0GI KI NAHI B3H3N CH0UD BATA MUJH3 TU B3H3N CH0UD",
      "B3H3N CH0UD K3 L0WDA K3 T0P3 T3RI MAA KA BH0SDA MAI SAMSHAAN GHAT M3 CH0R K3 AAJAU 0R TUJH3 RAAT K3 12 BAJ3 US3 L3N3 BH3JU T0 MAA K3 DINN3 TU US3 L3N3 JAY3GA KI US3 WAHI CH0R D3GA BATA BH00T0 K3 B33CH L0WDA K3 BACCH3",
      "‎CHAMAR K3 BACCH3 T3RI MAAKI CH00T K0 MAI APN3 CYCL3 KI S3AT K3 HANDL3 M3 DAAL K3 CH0UDU T0 B3H3N CH0UD TUJH3 F33L H0GA KI NAHI B3H3N CH0UD K3 DINN3 BATA MUJH3 H3H3H3 ", "AB3 B3H3N CH0UD K3 BACCH3 T3RI MAA KI CH00T K33L TH0K K3 MAA K3 L0WDA K3 BACCH3 T3RI MAA 0R B3H3N KI CHADII TANG DUNGA B3H3N CH0UD USM3 MAA K3 DINN3 JAK3 USI K0 S00NGHNA B3H3N CH0UD DIN RAAT MAA K3 L0WD3 K3 BACCH3 TU APN3 BAAP S3 LADN3 CHALA HAI B3H3N CH0UD K3 BACCH3", "AMMA CHUD JAY3GI B3H3N CH0UD BATA RAHA HU MAA K3 DINN3 CHALA JA NAHI T0 APNI MAA YAHI P3 CHUDWA MUJH3 KYA MUJH3 CH0UDN3 M3 MAZA AATA HAI", "B3H3N CH0UD BAJI BAJI KARTA RAHTA HAI B3H3N CH0UD T3RI MAA KI JHAANT KI BHAJI BANA DUNGA L0WDA S3 APN3 USK3 BAAD BAJI KI JAGAHA BHAJI BHAJI KARNA B3H3N K3 L0WDA CHALA HAI APN3 BAAP K3 SAAMN3 R0N3 K3 LIY3 MAA K3 DINN3 ", "AB3 BAHNCH0UD K3 BACCH3 3K BAAT BATA B3H3N CH0UD K3 BACCH3 T3R3 K0 LADN3 K0N BH3JA HAI MAA K3 DINN3 T3R3 S3 LIKHA JA NAHI RAHA HAI MAA K3 DINN3 L0AD3R LAGA K3 MAA CHUD GAI HAI B3H3N CH0UD T3RI YAHA P3 MAA K3 DINN3 3K 3K LIN3 M3 R0N3 WALA", "MAA CHUD GAI HAI B3H3N CH0UD AB B3H3NA BANA RAHA HAI YAHA WAHA K3 MAA K3 DINN3 CH0UD CH0UD K3 BHARTA BANA BANA K3 T3RI HI MAA KI GAAND M3 DAAL K3 B3H3N CH0UD WAHI P3 TAND00RI R0TI DAAL DUNGA B3H3N K3 L0WDA K3 BACCH3 MAR JAY3GA🤣✍️", "‎RANDII K3 BACCH3 T3RI MAA KI CHUD MAAR DI MAIN3 L0WDA K3 BAAL AB TU YAHA BAITH K3 TAM00RA BAJA B3H3N CH0UD K3 BACCH3 MAA CHUD GAI HAI👅✍️", "तेरी माँ क़ो दारू पीकर चोदुँगा और इतना चोदुँगा इलाज भी उसके भोसड़े का सम्भव नहीं होगा किसी अस्पताल के भीतर 🤣✍️👅", "ज़ब तेरी बूढी माँ छोटी थी उसे टॉफी देकर चोदा करता था मे यकीन नहीं तो जाकर पूछ उस बहन की लंडी से 🤣✍️", "तेरी माँ की चुत पर पत्थर मार मार के पिचका दुगा 🙄✍️ लंड के टोपे टाइप करता जा", "तेरी बहन क़ो गन्ने के खेतो मे चोदुँगा और गन्ना उसकी चुत मे डाल दुगा 👅✍️", "तेरी बहन की सील तोड़ दुगा बहन के लंड ओयो ने पटा कर लेजा कर 😂✍️", "तेरी माँ की आँखों मे लंड रख कर सोऊंगा ज़ब नींद आएगी आज मुझे 👅✍️", "तेरी माँ क़ो शिलाजीत खाकर चोदुँगा पूर्ण शक्तियों के साथ 👅✍️ मेरे पुत्र", "तेरी माँ की चुत लिख रहा हु भग मत जाना 🤣✍️ तुझे तेरी बूढी माँ का वास्ता 😂", "तेरी माँ की गांड मे बेलन डाल दूंगा जिससे तुझे रोटियां बेल बेल कर खिलाती है और ज़ब मेरी झाट का बाल तेरे खाने मे आ जाता है उसपे चिल्लाता है तू 😂✍️", "तेरी बहन क़ो घोड़ी बना कर चोदुँगा उसकी गांड मोटी कर दूंगा चोद चोद कर 😂✍️", "तेरी बहन के चुचे दबा दबा कर निचोड़ दुगा और सारा दूदू पी जाउगा 👅✍️ यम यम", "तेरी माँ चुद चुद कर आज 🙄 मुझ से बेहोस हो जायगी भगना मत लिखता जा वरना उसे कौन अस्पताल ले जायगा उठा कर रंडी के बीज 👅🤣", "दया आ रही है तुझ पर की रंडी के तू असहाय है अपनी माँ क़ो चुदने से बचाने क़ो 🤣✍️", "तेरी माँ चोदने मे हमको आनंद आता है ऐसे ही रोज अपनी माँ क़ो हमारे आगे प्रस्तुत कर दिया करो 🙄✍️",
      // ... (same as before)
    ];

    // Generate a random reply
    const reply = replies[Math.floor(Math.random() * replies.length)];

    // Send the reply
    return api.sendMessage(reply.replace("{name}", name), threadID, messageID);
  }
};

module.exports.run = async function({ api, event, args }) {
  const { threadID, messageID, senderID } = event;
  const command = args[0];

  // Check if the sender is the bot admin
  if (!botAdminUIDs.includes(senderID)) {
    return api.sendMessage("Only the bot admin can use this command.", threadID, messageID);
  }

  // Command to turn war mode on
  if (command === "on") {
    const uid = args[1]; // Get the UID from the command

    // Ensure a UID was provided
    if (!uid) {
      return api.sendMessage("Please provide a UID to target.", threadID, messageID);
    }

    // Set war mode to active and save the target UID
    warMode = true;
    targetUID = uid;

    return api.sendMessage(`War mode activated! Now targeting UID: ${uid}`, threadID, messageID);
  }

  // Command to turn war mode off
  if (command === "off") {
    // Disable war mode
    warMode = false;
    targetUID = null;

    return api.sendMessage("War mode deactivated.", threadID, messageID);
  }

  return api.sendMessage("Invalid command. Use 'war on [UID]' or 'war off'.", threadID, messageID);
};
