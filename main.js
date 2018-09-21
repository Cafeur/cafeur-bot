const Discord = require('discord.js');
const low = require('lowdb')
const FileSync = require ('lowdb/adapters/FileSync')

const adapter = new FileSync('database.json')
const db = low(adapter)

db.defaults({ histoires: [], xp: []}).write()

var bot = new Discord.Client();
var prefix = ("/")
var randnum = 0;

var storynumber = db.get('histoires').map('story_value').value();

bot.on('ready', () =>{
    bot.user.setPresence({ game: { name: '[Fait : /help]'}})
    console.log("Bot Prêt");
});

bot.login(process.env.TOKEN);

bot.on("guildMemberAdd", member => {
    let role = member.guild.roles.find("name", "Membres");
  member.guild.channels.find("name", "arrivéedepart").send(`:clap:  ${member.user.username} Cela serait une nouvelle personne ?`)
  member.addRole(role)
})

bot.on("guildMemberRemove", member => {
  member.guild.channels.find("name", "arrivéedepart").send(`:ski: ${member.user.username} Nous quitte dommage plus de gateau pour nous !`)
})

bot.on('message', message => {

var msgauthor = message.author.id;

if(message.author.bot)return;

if(!db.get("xp").find({user: msgauthor}).value()){
    db.get("xp").push({user: msgauthor, xp: 1}).write();

}else{
    var userxpdb = db.get("xp").filter({user: msgauthor}).find('xp').value();
    console.log(userxpdb);
    var userxp = Object.values(userxpdb)
    console.log(userxp);
    console.log(`Nombre d'xp : ${userxp[1]}`)

    db.get("xp").find({user: msgauthor}).assign({user: msgauthor, xp: userxp[1] += 1}).write();
}

    if (message.content === "Bonjour"){
        message.reply("Bonjour");
        console.log('Bonjour auto');
    }

    if (!message.content.startsWith(prefix)) return;
    var args = message.content.substring(prefix.length).split(" ")

    switch (args[0].toLowerCase()){

        case "newstory":
        var value = message.content.substr(10);
        var author = message.author.toString();
        var number = db.get('histoires').map('id').value();
        //var storyid = number +1;
        console.log(value)
        message.reply("Ajout de l'histoire à la base de données")

        db.get('histoires')
        .push({story_value: value, story_author: author})
        .write();

        break;

        case "tellstory" :

        story_random();

        var story = db.get(`histoires[${randnum}].story_value`).toString().value();
        var author_story = db.get(`histoire[${randnum}].story_author`).toString().value();
        console.log(story)

        message.channel.send(`Voici l'histoire : ${story} (histoire de ${author_story})`)

        break;

        case "stats":

        var userXpDB = db.get("xp").filter({user: msgauthor}).find("xp").value()
        var userXP = Object.values(userXpDB)
        var userCreateDate = message.author.createdAt.toString().split(' ');

            var stats_embed = new Discord.RichEmbed()
                .setTitle(`Stats Utilisateur : ${message.author.username}`)
                .addField("Vos nombre d'xp", `${userXP[1]} XP`, true)
                .addField("Votre ID :", msgauthor, true)
                .addField("Date de création de votre compte :", userCreateDate[1]+ ' ' + userCreateDate[2] + ', ' + userCreateDate[3])
                .setColor('#2E2EFE')
                .setThumbnail(message.author.avatarURL)
                message.author.send({embed: stats_embed});

        break;
    }



if (message.content === prefix + "xpstat"){
    var xp = db.get("xp").filter({user: msgauthor}).find('xp').value()
    var xpfinal = Object.values(xp);
    var xp_embed = new Discord.RichEmbed()
        .setColor('#35E511')
        .setTitle(`XP de : ${message.author.username}`)
        .setDescription("Voici votre nombre d'xp : ")
        .addField("XP :", `${xpfinal[1]} xp`)
    message.channel.send({embed: xp_embed});
}

if (message.content === prefix + "help"){
    var help_embed = new Discord.RichEmbed()
    .setColor("#FE2E64")
    .setTitle("Commande du bot :")
    .setThumbnail(message.author.avatarURL)
    .setDescription("Je suis un bot trop beau voici mes commandes :")
    .addField("Aide", "Affiche les commandes")
    .addField("Bonjour / Bonsoir", "Le bot répond !")
    .addField("/stats", "le bot envois vous info !")
    .addField("/info", "Le bot envois les informations")
    .addField("/dog", "Vous affiche des GIF de chien (aléatoire)")
    .addField("/cat", "Vous affiche des GIF de chat (aléatoire)")
    .addField("/clear", "COMMANDES ADMIN: Vous permet de clear les messages")
    .setFooter("Crée par Cafeur")
    message.channel.sendMessage(help_embed);
     //message.channel.sendMessage("Voici les commandes :\n - /help Pour afficher l'interface help \n - Pour toutes commandes vous devez rajoutez le prefix : / \n  -/stats pour voir vos statistiques \n -Bientôt un shop spéciale, commandes admin")
    console.log('help')
  }

  if(message.content === prefix + "info") {
      var info_embed = new Discord.RichEmbed()
      .setColor("#F3F781")
      .setTitle("Information du Bot/Serveur :")
      .addField(" :robot: Nom :", `${bot.user.tag}`, true)
      .addField(" Id :id:", `${bot.user.id}`)
      .addField("Nombres de membres :", message.guild.members.size)
      .addField("Nombre de catégories/Salon ", message.guild.channels.size)
      .setFooter("Bot Crée par Cafeur")
    message.channel.sendMessage(info_embed)
    console.log("Info demandée")
  }

  if(message.content.startsWith(prefix + "dog")) {

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
  }

  if(message.content.startsWith(prefix + "cat")) {

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
}

if(message.content.startsWith(prefix + "clonewars")) {

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
}

if(message.content.startsWith(prefix + "clear")) {
    if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return message.channel.send("Vous n'avez pas la permission ");

    let args = message.content.split(" ").slice(1);

    if(!args[0]) return message.channel.send("Tu doit préciser le nombre de message a supprimé")
    message.channel.bulkDelete(args[0]).then(() => {
        message.channel.send(`${args[0]} message on été supprimés`);
    })
}

});

bot.on('message', message =>{
    if (message.content === "Bonsoir"){
        message.reply("Bonsoir");
        console.log('Bonsoir auto');
    }

});

function story_random(min, max) {
    min =  Math.ceil(0);
    max = Math.floor(storynumber);
    randnum = Math.floor(Math.random() * (max - min +1) + min);
}

function random(min, max) {
    min =  Math.ceil(0);
    max = Math.floor(3);
    randnum = Math.floor(Math.random() * (max - min +1) + min);
}
