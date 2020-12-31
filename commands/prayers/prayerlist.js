const PrayerCommandBase = require('../../classes/PrayerCommandBase');

class PrayerListCommand extends PrayerCommandBase {
  constructor(client) {
    super(client, {
      name: 'prayerlist',
      group: 'prayers',
      memberName: 'prayerlist',
      description: 'List prayers | قائمة الصلاة',
    });

    this.volume = 0;
    this.logger = client.logger;
  }

  

  run(msg) {
    msg.channel.startTyping();;
    let prayers = ' \n';
    this.getFile().forEach(el => {
      prayers = `${prayers} \n ${el.replace(/.mp3$|.mp4$/g, '')}`
    });
    this.logger.info(`List of prayers: ${prayers}`);
    msg.channel.send(prayers).then(() => msg.channel.stopTyping());
  }
}

module.exports = PrayerListCommand;