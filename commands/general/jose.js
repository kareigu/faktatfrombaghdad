const { Command } = require('discord.js-commando');

class JoseCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'jose',
      group: 'general',
      memberName: 'jose',
      description: 'Ask about Jose | اسأل عن جوزيه',
    });

    this.logger = client.logger;
  }

  run(msg) {
    msg.channel.startTyping();
    const roll = Math.floor(Math.random() * 3) + 1;
    this.logger.info(`${msg.author.tag} (${msg.author.id}) rolled ${roll} for Jose`);
    msg.channel.send('En tuntea | لا أعرف', {
      files: [{
        attachment: `./img/faktatfrombaghdad${roll}.png`,
        name: 'faktatfrombaghdad${roll}.png'
      }]
    }).then(() => msg.channel.stopTyping());
  }
}

module.exports = JoseCommand;