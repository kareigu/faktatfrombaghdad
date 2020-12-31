const PrayerCommandBase = require('../../classes/PrayerCommandBase');

class HaramCommand extends PrayerCommandBase {
  constructor(client) {
    super(client, {
      name: 'haram',
      group: 'prayers',
      memberName: 'haram',
      description: 'Play haram | لعب الحرام',
      hidden: false,
      ownerOnly: true
    });

    this.volume = 5;
    this.logger = client.logger;
  }

  

  run(msg) {
    if(msg.member.voice.channel)
      this.playPrayer(msg);
    else
      msg.reply('الانضمام إلى قناة');
  }
}

module.exports = HaramCommand;