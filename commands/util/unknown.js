const { Command } = require('discord.js-commando');

class UnknownCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'unknown',
      group: 'util',
      memberName: 'unknown',
      description: '',
      unknown: true,
      hidden: true
    });

    this.logger = client.logger;
  }

  run(msg, prefix) {
    if(msg.content === `${prefix}israel`) {
      this.logger.info(`${msg.author.tag} (${msg.author.id}) asked about Israel`); 
      return msg.channel.send('Not recognized | ليست معروفة')
    } else
      return msg.reply('Unknown command | طلب مجهول');
  }
}

module.exports = UnknownCommand;