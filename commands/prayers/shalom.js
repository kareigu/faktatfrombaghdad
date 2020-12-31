const { Command } = require('discord.js-commando');

class ShalomCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'shalom',
      group: 'prayers',
      memberName: 'shalom',
      description: '🏃🏿‍♂️ Shalom?! | !?شالوم',
    });
  }

  run(msg) {
    let response;
    this.client.voice.connections.array().forEach(el => {
      if(el.channel.guild === msg.guild) {
        console.log('asda')
        el.channel.leave();
        response = msg.channel.send(this.description);
      }
    })

    if(response === undefined)
      return msg.channel.send('Go away jew | اذهب بعيدا يهودي');
  }
}

module.exports = ShalomCommand;