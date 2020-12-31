const PrayerCommandBase = require('../../classes/PrayerCommandBase');

class PrayerCommand extends PrayerCommandBase {
  constructor(client) {
    super(client, {
      name: 'prayer',
      group: 'prayers',
      memberName: 'prayer',
      description: 'Play a prayer | العب صلاة',
      hidden: false
    });

    this.volume = 0.32;
    this.logger = client.logger;
  }

  

  run(msg) {
    if(msg.member.voice.channel)
      this.playPrayer(msg);
    else
      msg.reply('الانضمام إلى قناة');
  }
}

module.exports = PrayerCommand;