import { Client } from 'discord.js';
import axios from 'axios';
const client = new Client();
import dotenv from 'dotenv';
dotenv.config();
import GCC from '@google-cloud/translate';
const {Translate} = GCC.v2;

const TOKEN = process.env.TOKEN;

const translator = new Translate()


const translateText = async (text) => {
  const target = 'fi'
  let [translations] = await translator.translate(text, target);

  translations = Array.isArray(translations) ? translations : [translations];
  return translations[0];
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
});

client.on('message', msg => {
  if (msg.content === '?fakta') {
    getArticle().then(title => {
      console.log(title);
      getText(title).then(fakta => {
        console.log(fakta);

        translateText(fakta)
          .then(translation => {
            msg.reply(`${fakta} \n ${translation}`);
          });
      })
    })
  }
});

client.login(TOKEN);