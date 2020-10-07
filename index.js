const Discord = require(`discord.js`);
const config = require("./config/config.json");
let prefix = config.prefix;
const client = new Discord.Client();
const fs = require('fs');
var datasub = ["697717795227697173", "448052818314526721", "676690539126718467", "364759830944153605", "639501477420990494", "328925921283145729", "278211495915945985", "358551694654832642", "364758930615828490", "340046482357092354"];
var datachannel = ["750369888366755910"]
var version = "2.0.3"

client.on('ready', () => {
    console.log(`${client.user.username} prêt !`)
    client.user.setPresence({
        activity: {
            name: 'des jeux gratuits !',
            type: "PLAYING",
        },
        status: "dnd"
    });
});

client.on('message', msg => {

    // announce
    if (msg.content.toLowerCase().startsWith(prefix + "ann")) {
        if (msg.author.id !== "448052818314526721") return;
        const arg = msg.content.slice(prefix.length).split(' ');
        ann = ""
        for (let i = 1; i < arg.length; i++) {
            if (i === 1) { ann = ann + arg[i] } else { ann = ann + " " + arg[i] }
        }
        for (let i = 0; i < datasub.length; i++) {
            let authoruser = client.users.cache.get(datasub[i])
            authoruser.send(ann)
        }
    }

    // game (admins can use it)
    if (msg.content.toLowerCase().startsWith(prefix + "f")) {
        // rights
        if (msg.author.id !== "448052818314526721") return;
        // type
        if (msg.content.toLowerCase().startsWith(prefix + "fdlc")) {
            typedecontenu = "DLC"
        } else if (msg.content.toLowerCase().startsWith(prefix + "fkey")) {
            typedecontenu = "tirage de clefs"
        } else if (msg.content.toLowerCase().startsWith(prefix + "fftp")) {
            typedecontenu = "jeu FTP"
        } else { typedecontenu = "jeu" }

        desc = ""
        msg.channel.send("Allons-y, quel est son **titre** ?\n*Si vous voulez annuler la commande, attendez 60 secondes !*")
        msg.channel.awaitMessages(m => m.author.id == msg.author.id, { max: 1, time: 60000 }).then(collected => {
            gamename = collected.first().content
            msg.channel.send("Parfait, et sur quelle **plateforme** est-il ?\n*Si vous voulez annuler la commande, attendez 60 secondes !*")
            msg.channel.awaitMessages(m => m.author.id == msg.author.id, { max: 1, time: 60000 }).then(collected => {
                plateform = collected.first().content
                msg.channel.send("Très bien, quand est-ce que **l'offre se termine (UTC+2)** ?\n*Si vous voulez annuler la commande, attendez 60 secondes !*")
                msg.channel.awaitMessages(m => m.author.id == msg.author.id, { max: 1, time: 60000 }).then(collected => {
                    enddate = collected.first().content
                    msg.channel.send("Ca marche, quel était **son prix initial** ? Tapez `FTP` si c'est un jeu gratuit de base.\n*Si vous voulez annuler la commande, attendez 60 secondes !*")
                    msg.channel.awaitMessages(m => m.author.id == msg.author.id, { max: 1, time: 60000 }).then(collected => {
                        price = collected.first().content
                        msg.channel.send("Ok, quel est **le lien** vers cette offre ?\n*Si vous voulez annuler la commande, attendez 60 secondes !*")
                        msg.channel.awaitMessages(m => m.author.id == msg.author.id, { max: 1, time: 60000 }).then(collected => {
                            gamelink = collected.first().content
                            msg.channel.send("Et pour finir, si vous le souhaitez, avez-vous **le lien d'une image** ? Si non, tapez `NON`!\n*Si vous voulez annuler la commande, attendez 60 secondes !*")
                            msg.channel.awaitMessages(m => m.author.id == msg.author.id, { max: 1, time: 60000 }).then(collected => {
                                if (collected.first().content.toLocaleLowerCase() === "non") { imagelink = "" } else { imagelink = collected.first().content }
                                msg.channel.send("Voulez-vous confirmer l'envoi ?\nTapez `OUI` ou `NON` !")
                                msg.channel.awaitMessages(m => m.author.id == msg.author.id, { max: 1, time: 60000 }).then(collected => {
                                    if (collected.first().content.toLowerCase() === "oui") {
                                        // send to all channels ...
                                        for (let i = 0; i < datachannel.length; i++) {
                                            let customchannel = client.channels.cache.get(datachannel[i])
                                            customchannel.send({
                                                embed: {
                                                    color: 15990579,
                                                    thumbnail: {
                                                        url: imagelink
                                                    },
                                                    author: {
                                                        name: "Nouveau " + typedecontenu + " récupérable gratuitement !\n­"
                                                    },
                                                    title: "⇒ " + gamename + " sur " + plateform + " ⇐\n­",
                                                    url: gamelink,
                                                    description: desc,
                                                    fields: [{
                                                        name: "💰  ­  Prix  ­  💰",
                                                        value: "GRATUIT !\n~~" + price + "~~",
                                                        inline: true
                                                    }, {
                                                        name: "🕛  ­  Date de fin  ­  🕛",
                                                        value: enddate + "\n     UTC+2\n­",
                                                        inline: true
                                                    }],
                                                    footer: {
                                                        text: "Gratis Version " + version + " par Nekewo#3347 | Tapez *aide pour plus d'informations !"
                                                    }
                                                }
                                            }).then(msg2 => {
                                                msg2.react("745999683335225444")
                                            })
                                            if (datachannel[i] === "750369888366755910") {
                                                customchannel.send("<@&750654847874891877>")
                                            }
                                        }
                                    }
                                    msg.channel.send("Merci, ça marche !")
                                }).catch(() => { message.reply('Annulé.'); });
                            }).catch(() => { message.reply('Annulé.'); });
                        }).catch(() => { message.reply('Annulé.'); });
                    }).catch(() => { message.reply('Annulé.'); });
                }).catch(() => { message.reply('Annulé.'); });
            }).catch(() => { message.reply('Annulé.'); });
        })
    }

    // help
    if (msg.content.toLowerCase().startsWith(prefix + "aide") || msg.content.toLowerCase().startsWith(prefix + "help")) {
        msg.channel.send({
            embed: {
                color: 7506394,
                thumbnail: {
                    url: "https://i.imgur.com/RIRj172.png"
                },
                author: {
                    name: "Commande d'aide",
                    icon_url: msg.author.avatarURL()
                },
                title: "Voilà quelques commandes avec leurs significations !\n­",
                description: "Gratis est un robot développé dans le but de vous informer à la sortie d'offres gratuites plus que vous ne puissiez plus rien rater !\n­",
                fields: [{
                    name: "`" + prefix + "channel [on/off]`",
                    value: "Si vous l'activez en mettant \"on\", vous serez informé des offres gratuites dans le salon où vous avez entré la commande. Si vous le désactivez en mettant \"off\", vous désactiverez cet option dans le salon où vous l'avez entré. Vous avez besoin de la permission administrateur pour utiliser cette commande !"
                }, {
                    name: "`" + prefix + "invitation`",
                    value: "Grâce à ça, vous pourrez inviter le robot sur votre serveur ! Vous pouvez aussi taper " + prefix + "inv\n"
                }, {
                    name: "`" + prefix + "serveur`",
                    value: "Permet d'avoir l'invitation du serveur de Nekewo, créateur de Gratis, pour pouvoir recevoir une mention à chaque sortie d'offre.\n­"
                }],
                timestamp: new Date(),
                footer: {
                    text: "Gratis Version " + version + " | Demande d'aide réclamé par " + msg.author.tag
                }
            }
        })
    }

    // channels
    if (msg.content.toLowerCase().startsWith(prefix + "channel") || msg.content.toLowerCase().startsWith(prefix + "salon")) {
        const arg = msg.content.slice(prefix.length).split(' ');
        if (!msg.member.hasPermission('ADMINISTRATOR')) return msg.channel.send("Vous n'êtes pas administrateur !");
        result = 0
        if (arg[1] === "on") {
            for (let i = 0; i < datachannel.length; i++) {
                if (datachannel[i] === msg.channel.id) {
                    result = 1
                }
            }
            if (result = 1) { msg.channel.send("Le salon est déjà inscrit, tapez `" + prefix + "channel off` pour le désinscrire.") } else {
                msg.channel.send("Fait !")
                datachannel.push(msg.channel.id)
                let wilfre = client.users.cache.get('448052818314526721')
                wilfre.send(`➕ Le salon ${msg.channel.id} veut être enregistré par ${msg.author} !`)
            }
        } else if (arg[1] === "off") {
            for (let i = 0; i < datachannel.length; i++) {
                if (datachannel[i] === msg.channel.id) {
                    result = 1
                }
            }
            if (result === 0) { msg.channel.send("Le salon n'est pas inscrit, tapez `" + prefix + "channel on` pour l'inscrire.") } else {
                msg.channel.send("Compris ! Cela peut prendre du temps, donc merci de patienter.")
                datachannel.push(msg.channel.id)
                let wilfre = client.users.cache.get('448052818314526721')
                wilfre.send(`➖ Le salon ${msg.channel.id} veut être supprimé par ${msg.author} !`)
            }
        } else { msg.channel.send("Tapez `" + prefix + "channel on` pour l'inscrire, ou `" + prefix + "channel off` pour le désinscrire.") }
    }

    // invite
    if (msg.content.toLowerCase().startsWith(prefix + "inv")) return msg.channel.send(`Voici le lien si vous souhaitez que j'aille dans votre serveur !\nhttps://discord.com/oauth2/authorize?client_id=745956285391831110&scope=bot&permissions=604368121`)

    // serveur FWT
    if (msg.content.toLowerCase().startsWith(prefix + "serv")) return msg.channel.send(`Voici le lien pour vous rendre sur le serveur de FWT, géré notamment par Nekewo !\nhttps://discord.gg/TqsPtnT`)

})

//client.login(process.env.TOKEN);
client.login("NzQ1OTU2Mjg1MzkxODMxMTEw.Xz5T7Q.OG0O2npMJIfQmKsqp0KR6oJFFhw");