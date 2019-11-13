const fs = require('fs');
const ini = require('ini');
const Discord = require('discord.js');
const client = new Discord.Client();
const config = ini.parse(fs.readFileSync('./config.ini', 'utf-8'));
module.exports.config = config;
let Parser = require('rss-parser');
let parser = new Parser({
    customFields: {
        item: ['category'],
      }
}
);
const channelid = 'channel-id'
var lastContent = "";

process.on('unhandledRejection', (reason, promise) => {
	console.log('Unhandled Rejection at:', promise, 'reason:', reason);
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
        client.user.setActivity('Reading forum posts at your forum')
		.then(presence => console.log(`Activity set`))
        .catch(console.error);


        setInterval(() => {
            (async () => {
                let feed = await parser.parseURL('https://www.x-null.net/forums/external.php?type=rss2&lastpost=1');
                //First launch
                if(lastContent == ""){
                    lastContent = feed.items[0].content;
                    console.log(lastContent);

                    var embed = new Discord.RichEmbed()
                    .setColor('#0099ff')
                    .setURL(feed.items[0].link)
                    .setTitle(feed.items[0].title)
                    .setDescription(feed.items[0].content)
                    .setAuthor(feed.items[0].creator + ' posted in: ' + feed.items[0].title)
                    .setFooter('Posted by ' + feed.items[0].creator)
                    .setTimestamp(feed.items[0].pubDate);
                    client.channels.get(channelid).send(embed);
                }
                else if(lastContent != feed.items[0].content){
                    lastContent = feed.items[0].content;
                    console.log(lastContent);
                    var embed = new Discord.RichEmbed()
                    .setColor('#0099ff')
                    .setURL(feed.items[0].link)
                    .setTitle(feed.items[0].title)
                    .setDescription(feed.items[0].content)
                    .setAuthor(feed.items[0].creator + ' posted in: ' + feed.items[0].title)
                    .setFooter('Posted by ' + feed.items[0].creator)
                    .setTimestamp(feed.items[0].pubDate);
                    client.channels.get(channelid).send(embed);
                }
            })();
        }, 5000);
});

client.login(process.env.TOKEN || config.bot.TOKEN);
