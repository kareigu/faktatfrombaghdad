const { Command } = require('discord.js-commando');
const fs = require('fs');

class PrayerCommandBase extends Command {
  constructor(client, info = {
    name: 'prayer-command-base',
    group: 'prayers',
    memberName: 'prayer-command-base',
    description: 'PrayerCommandBase',
    hidden: true
  }) 
  {
    super(client, info);
    this.logger = client.logger;
  }

  getFile(roll = false) {
    let files = [];
    const regex = RegExp('Zone.Identifier$');
    fs.readdirSync('./volume/sound/').forEach(file => {
      if(!regex.test(file))
        files.push(file);
    })
  
    if(roll) {
      const roll = Math.floor(Math.random() * files.length);
      this.logger.info(`Rolled file number: ${roll} | ${files[roll]}`);
      return files[roll];
    }
    return files;
  }

  endlessDispatcher(connection, msg) {
    const song = this.getFile(true);
  
    const dispatcher = connection.play(`./volume/sound/${song}`, { 
      volume: this.volume,
      bitrate: 'auto',
    })
  
    dispatcher.on('speaking', (speaking) => {
      if(!speaking)
        this.playPrayer(msg);
    })
  
    msg.channel.send(`تشغيل الأغنية | ${song}`);
  }

  playPrayer(msg) {
    msg.member.voice.channel.join()
      .then(connection => {
        this.endlessDispatcher(connection, msg);
      });
  }
}

module.exports = PrayerCommandBase;