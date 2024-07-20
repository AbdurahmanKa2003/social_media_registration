const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const {
  registerFacebook,
  registerTwitter,
  registerInstagram,
  registerVK,
  registerTikTok,
  registerLinkedIn,
  registerYouTube,
  registerTelegram,
  registerMymir,
  registerOdnoklassniki,
  registerLikee,
  registerDiscord,
  registerSteam,
  registerGmail,
  registerMailru,
  registerReddit,
  registerYandexzen,
  registerWhatsapp,
  registerViber,
  registerHhru
} = require('./automation');
const { registerOnPlatform } = require('./automation');

const app = express();
const port = 3020;

app.use(bodyParser.json());

// Убедитесь, что директория 'public' используется для статических файлов
app.use(express.static(path.join(__dirname,)));

// Маршрут для обработки GET-запросов на главную страницу
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/register', async (req, res) => {
  const data = req.body;
  const platforms = data.socials;

  for (const platform of platforms) {
    try {
      switch (platform) {
        case 'facebook':
          await registerFacebook(data);
          break;
        case 'twitter':
          await registerTwitter(data);
          break;
        case 'instagram':
          await registerInstagram(data);
          break;
        case 'vk':
          await registerVK(data);
          break;
        case 'tiktok':
          await registerTikTok(data);
          break;
        case 'linkedin':
          await registerLinkedIn(data);
          break;
        case 'youtube':
          await registerYouTube(data);
          break;
        case 'telegram':
          await registerTelegram(data);
          break;
        case 'mymir':
          await registerMymir(data);
          break;
        case 'odnoklassniki':
          await registerOdnoklassniki(data);
          break;
        case 'likee':
          await registerLikee(data);
          break;
        case 'discord':
          await registerDiscord(data);
          break;
        case 'steam':
          await registerSteam(data);
          break;
        case 'gmail':
          await registerGmail(data);
          break;
        case 'mailru':
          await registerMailru(data);
          break;
        case 'reddit':
          await registerReddit(data);
          break;
        case 'yandexzen':
          await registerYandexzen(data);
          break;
        case 'whatsapp':
          await registerWhatsapp(data);
          break;
        case 'viber':
          await registerViber(data);
          break;
        case 'hhru':
          await registerHhru(data);
          break;
        default:
          console.log(`Unknown platform: ${platform}`);
      }
    } catch (error) {
      console.error(`Error registering on ${platform}:`, error);
    }
  }

  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});