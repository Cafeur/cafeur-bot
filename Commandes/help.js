const Discord = require('discord.js');

module.exports.run = (client, message, args) => {
        var help_embed = new Discord.RichEmbed()
        .setColor("#FE2E64")
        .setTitle("Commande du bot :")
        .setThumbnail(message.author.avatarURL)
        .setDescription("**Voici mes commandes** : ")
        .addField("!help", "Affiche les commandes")
        .addField("!stats", "le bot envois vous info !")
        .addField("!ping", "Le bot envois vos pings")
        .addField("!dog", "Vous affiche des GIF de chien (aléatoire)")
        .addField("!cat", "Vous affiche des GIF de chat (aléatoire)")
        .addField("!clonewars", "Vous affiche des GIF de clones (aléatoire)")
        .addField("!clear", "COMMANDES ADMIN: Vous permet de clear les messages")
        .addField("!kick <<NOM>>", "COMMANDES ADMIN: Pour Kick une personne")
        .addField("!ban <<NOM>>", "COMMANDES ADMIN: Pour bannir une personne")
        .addField("!addrole <<NOM>>", "COMMANDES ADMIN: Pour rajouter un rôle à une personne")
        .addField("!delrole <<NOM>>", "COMMANDES ADMIN: Pour retirer un rôle à une personne")
        .setFooter("Crée par Cafeur")
        message.channel.sendMessage(help_embed);
         //message.channel.sendMessage("Voici les commandes :\n - /help Pour afficher l'interface help \n - Pour toutes commandes vous devez rajoutez le prefix : / \n  -/stats pour voir vos statistiques \n -Bientôt un shop spéciale, commandes admin")
        console.log('help')
      };

      module.exports.help = {
        name: 'help'
    };