const { Command } = require('discord.js-commando');

class UnknownCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'unknown-command',
      group: 'util',
      memberName: 'unknown-command',
      description: '',
      unknown: true,
      hidden: true
    });
  }

  run(msg, prefix) {
    if(msg.content === `${prefix}israel`)
      return msg.reply('Not recognized | ليست معروفة');
    else
      return msg.reply('Unknown command | طلب مجهول');
  }
}

module.exports = UnknownCommand;