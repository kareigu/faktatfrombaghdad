const Commando = require('discord.js-commando');
const winston = require('winston');
require('dotenv').config();
const { join } = require('path');

const TOKEN = process.env.TOKEN;
const owner = process.env.OWNER;
const commandPrefix = process.env.CMD_PREFIX;

const client = new Commando.CommandoClient({
  owner,
  commandPrefix,
  presence: {
    activity: {
      name: 'facts | عب الحقائق'
    },
    status: 'online'
  }
});

client.logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'DD.MM.YYYY HH:mm:ss'
    }),
    winston.format.printf(info => `[${info.timestamp}] ${info.level}: ${info.message}`)
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: './logs/faktat.log' })
  ]
});

client
  .on('ready', () => client.logger.info(`Logged in as ${client.user.tag}`))
  .on('warn', client.logger.warn)
  .on('error', client.logger.error)
  .on('commandRun', (cmd, promise, msg, args) => client.logger.info(`${msg.author.tag} (${msg.author.id}) ran command ${cmd.groupID}:${cmd.memberName}`))
  .on('commandError',(cmd, err) => client.logger.error(`Error occurred when running command ${cmd.groupID}:${cmd.memberName}`, err));

client.registry
  .registerGroups([
    ['general', 'General commands'],
    ['prayers', 'Several prayers']
  ])
  .registerDefaultTypes()
  .registerDefaultGroups()
  .registerDefaultCommands({
    help: false,
    prefix: false,
    unknownCommand: false
  })
  .registerCommandsIn(join(__dirname, 'commands'));


client.login(TOKEN);