const Discord = require('discord.js');

module.exports.run = (client, message, args) => {

    var chien = [
        "https://media.giphy.com/media/l1J9FiJzykshjePiU/giphy.gif",
        "https://media.giphy.com/media/l1J9FiJzykshjePiU/giphy.gif",
        "https://media.giphy.com/media/1Zu1LMKF4T71FQeeZX/giphy.gif",
        "https://media.giphy.com/media/1Zu1LMKF4T71FQeeZX/giphy.gif"
    ];

    var gif = chien[Math.floor(Math.random() * chien.length)];

    var dog_embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle(' :dog: Chien :')
    .setImage(gif)
    .setFooter('Crée Par Cafeur aidé par Kioxi')
    message.channel.send(dog_embed);
};

module.exports.help = {
    name: 'dog'
};

module.exports.run = (client, message, args) => {
    var chat = [
        "https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif",
        "https://media.giphy.com/media/mlvseq9yvZhba/giphy.gif",
        "https://media.giphy.com/media/33OrjzUFwkwEg/giphy.gif",
        "https://media.giphy.com/media/p4xp4BjHIdane/giphy.gif"
    ];

    var gif = chat[Math.floor(Math.random() * chat.length)];

    var cat_embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle(' :cat: Chat :')
    .setImage(gif)
    .setFooter('Crée Par Cafeur aidé par Kioxi')
    message.channel.send(cat_embed);
};
 module.exports.help = {
        name: 'cat'
    };

module.exports.run = (client, message, args) => {

        var wars = [
            "https://media.giphy.com/media/Y8X3efsILKD3G/giphy.gif",
            "https://media.giphy.com/media/2iPxilu8q8cqA/giphy.gif",
            "https://media.giphy.com/media/5PnoadUQvwZxu/giphy.gif",
            "https://media.giphy.com/media/SwWArXxnlG6Bi/giphy.gif"
        ];
    
        var gif = wars[Math.floor(Math.random() * wars.length)];
    
        var wars_embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setTitle(' :clone:  CloneWars :')
        .setImage(gif)
        .setFooter('Crée Par Cafeur aidé par Kioxi')
        message.channel.send(wars_embed);
    };
module.exports.help = {
        name: 'clonewars'
    };