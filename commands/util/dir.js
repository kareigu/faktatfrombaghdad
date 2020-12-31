const { Command } = require('discord.js-commando');
const fs = require('fs');

class DirCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'dir',
      group: 'util',
      memberName: 'dir',
      description: 'Print song directory | طباعة دليل الأغاني',
      ownerOnly: true
    });
  }
  
  run(msg) {
    const regex = RegExp('Zone.Identifier$');
    let files = '';
    fs.readdirSync('./sound/').forEach(file => {
        if(!regex.test(file))
            files = `${files} \n ${file}`
    })

    return msg.channel.send(files);
  }
}

module.exports = DirCommand;