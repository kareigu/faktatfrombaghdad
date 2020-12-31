const { Command } = require('discord.js-commando');

class HelpCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'help',
      group: 'util',
      memberName: 'help',
      description: 'Seek help | طلب المساعدة',
    });
  }
  
  run(msg) {
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

module.exports = HelpCommand;