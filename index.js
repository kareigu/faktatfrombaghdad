import { Client, DMChannel } from 'discord.js';
import fs from 'fs';
import axios from 'axios';
const client = new Client();
import dotenv from 'dotenv';
dotenv.config();
import GCC from '@google-cloud/translate';
const {Translate} = GCC.v2;

const TOKEN = process.env.TOKEN;
const CHANNEL_NAME = process.env.CHANNEL_NAME;

const translator = new Translate()


const translateText = async (text) => {
  const target = 'fi'
  let [translations] = await translator.translate(text, target);

  translations = Array.isArray(translations) ? translations : [translations];
  return translations[0];
}

const getFile = (roll = false) => {
  let files = [];
  const regex = RegExp('mp4$|mp3$', 'g');
  fs.readdirSync('./sound/').forEach(file => {
    if(regex.test(file))
      files.push(file);
  })
  //console.log(files);

  if(roll) {
    const roll = Math.floor(Math.random() * files.length);
    console.log('Rolled ' + roll)
    return files[roll];
  }
  return files;
}

const endlessDispatcher = (connection, volume, msg) => {
  const song = getFile(true);

  const dispatcher = connection.play(`./sound/${song}`, { 
    volume,
    bitrate: 'auto',
  })

  dispatcher.on('speaking', (speaking) => {
    if(!speaking)
      playPrayer(msg, volume);
  })

  msg.channel.send(`تشغيل الأغنية | ${song}`);
  return dispatcher;
}

const playPrayer = (msg, volume) => {
  msg.member.voice.channel.join()
            .then(connection => {
              const dispatcher = endlessDispatcher(connection, volume, msg);
            });
}

const getArticle = () => {
  return axios.get('https://ar.wikipedia.org/w/api.php?action=query&format=json&prop=langlinks&continue=grncontinue%7C%7C&generator=random&lllang=ar&llinlanguagecode=ar&lllimit=100&grnnamespace=0&grnfilterredir=nonredirects&grnlimit=50')
              .then(res => {
                const list = res.data.query.pages;
                const keys = Object.keys(list);

                let validArticles = []
                for (const key of keys) {
                  validArticles.push(list[key]['pageid']);
                }
                return validArticles
              })
              .catch(err => console.error(err));
}

const getText = (ids) => {
  let idString = '';
  for (let i = 0; i < ids.length; i++) {
    idString = idString + ids[i];
    
    if(i != (ids.length - 1))
      idString = idString + '|'
  }
  return axios.get(`https://ar.wikipedia.org/w/api.php?action=query&format=json&uselang=ar&prop=extracts&pageids=${idString}&exsentences=2&exsectionformat=plain`)
              .then(res => {
                const articles = res.data.query.pages;
                const keys = Object.keys(articles);

                let extract = '';
                for (let key of keys) {
                  if(articles[key]['extract'])
                    extract = articles[key]['extract'];
                }
                return(extract.replace(/<[^>]*>?/gm, ''))
              })
              .catch(err => console.error(err));
}


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
  client.user.setPresence({
    activity: {
        name: 'facts | عب الحقائق',
    },
    status: 'online'
  });
});

client.on('message', msg => {
  if (msg.channel.name === CHANNEL_NAME || msg.type === 'dm') {
    if (msg.content === '?fakta') {
      msg.channel.startTyping();
      getArticle().then(title => {
        console.log(title);
        getText(title).then(fakta => {
          console.log(fakta);
  
          translateText(fakta)
            .then(translation => {
              msg.reply(`${fakta} \n ${translation}`);
              msg.channel.stopTyping();
            });
        })
      })
    }

    if (msg.content === '?jose') {
      msg.channel.startTyping();
      const roll = Math.floor(Math.random() * 3) + 1;
      console.log(roll);
      msg.channel.send('En tunne', {
        files: [{
          attachment: `./img/faktatfrombaghdad${roll}.png`,
          name: 'faktatfrombaghdad${roll}.png'
        }]
      }).then(() => msg.channel.stopTyping());
    }

    if (msg.content === '?prayer') {
      if(msg.member.voice.channel) {
        playPrayer(msg, 0.32);
      } else
        msg.reply('الانضمام إلى قناة');
    }

    if (msg.content === '?prayerlist') {
      msg.channel.startTyping();
      const regex = RegExp('mp4$|mp3$', 'g');
      let prayers = ' \n';
      getFile().forEach(el => {
        prayers = `${prayers} \n ${el.replace(/.mp3$|.mp4$/g, '')}`
      });
      console.log(prayers);
      msg.channel.send(prayers).then(() => msg.channel.stopTyping());
    }

    if (msg.content === '?haram') {
      if(msg.member.voice.channel) {
        if(msg.member.id === '128685552450011137')
          playPrayer(msg, 5);
      } else
        msg.reply('الانضمام إلى قناة');
    }

    if (msg.content === '?shalom') {
      client.voice.connections.array().forEach(el => {
        if(el.channel.guild === msg.guild)
          el.channel.leave();
      })
    }

    if (msg.content === '?help') {
      msg.channel.startTyping();
      msg.member.createDM().then(DMChannel => {
        DMChannel.send('اطلب الحكمة يا صديقي \n Pyydä viisautta, ystäväni', {
          files: [{
            attachment: `./files/The Holy Quran.pdf`,
            name: 'The Holy Quran.pdf'
          }]
        });
        msg.reply('أرسل لك رسالة مباشرة تحتوي على معلومات. \n Lähetä sinulle suora viesti.')
        msg.channel.stopTyping();
      })
    }

  }
});

client.login(TOKEN);