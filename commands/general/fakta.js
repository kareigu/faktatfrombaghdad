const { Command } = require('discord.js-commando');
const axios = require('axios');
const { Translate } = require('@google-cloud/translate').v2;

const translator = new Translate;


class FaktaCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'fakta',
      group: 'general',
      memberName: 'fakta',
      description: 'Get a fact | الحصول على حقيقة',
    });

    this.logger = client.logger;
  }

  async translateText(text) {
    const target = 'fi'
    let [translations] = await translator.translate(text, target);
  
    translations = Array.isArray(translations) ? translations : [translations];
    return translations[0];
  }

  getArticle() {
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
      .catch(err => this.logger.error(err));
  }

  getText(ids) {
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
      .catch(err => this.logger.error(err));
  }

  run(msg) {
    msg.channel.startTyping();
    this.getArticle().then(title => {
      this.getText(title).then(fakta => {
        this.translateText(fakta)
          .then(translation => {
            msg.reply(`${fakta} \n ${translation}`);
            msg.channel.stopTyping();
          });
      })
    })
  }
}

module.exports = FaktaCommand;