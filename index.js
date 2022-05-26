/*
This script is made by github.com/revenant-coding
If you want to use it, please mention me.
*/

const Discord = require('discord.js');
const client = new Discord.Client()
const request = require('request')
var servers = []

client.on("ready", () => {
    console.log("Bot started")
})

function getRageMPData(msg, args) {
    request({
        url: "https://cdn.rage.mp/master/",
        json: true
    }, (err, response, body) => {
        if (err) return;
        servers = [];
        var i = -1;
        var server = Object.values(body)
        const embed = new Discord.MessageEmbed()

        server.forEach(() => {
            i++
            if (JSON.stringify(server[i]).toLowerCase().includes(args.toLowerCase())) {
                var serverdata = { ip: Object.keys(body)[i], name: server[i].name, gamemode: server[i].gamemode, players: server[i].players, maxplayers: server[i].maxplayers, language: server[i].lang }
                embed.addField("\n" + serverdata.name, `IP: ${serverdata.ip}\nPlayers: ${serverdata.players}/${serverdata.maxplayers}`)
            }
        })
        embed.setAuthor("Rage:MP Servers with: " + args)
        embed.setTimestamp()
        embed.setFooter("Rage:MP Masterlist")
        msg.channel.send(embed)
    })
}

function getAltVData(msg, args) {
    request({
        url: "https://api.altv.mp/servers/list",

    }, (err, response, body) => {
        if (err) return;
        var servers = JSON.parse(body)
        const embed = new Discord.MessageEmbed()
        servers.forEach(element => {
            if (JSON.stringify(element).toLocaleLowerCase().includes(args.toLocaleLowerCase())) {
                var serverdata = { ip: element.host, port: element.port, name: element.name, players: element.players, maxPlayer: element.maxPlayers }

                embed.addField("\n" + serverdata.name, `IP: ${serverdata.ip}:${serverdata.port}\nPlayers: ${serverdata.players}/${serverdata.maxPlayer}`)
            }
        })
        embed.setAuthor("Alt:V Servers with: " + args)
        embed.setTimestamp()
        embed.setFooter("Alt:V Masterlist")
        msg.channel.send(embed)
    })
}

client.on("message", msg => {
    if (msg.content.startsWith(".ragemp")) {
        var name = msg.content.substr(`.ragemp `.length)
        getRageMPData(msg, name)
    } else if (msg.content.startsWith(".altv")) {
        var name = msg.content.substr(`.altv `.length)
        getAltVData(msg, name)
    }
})

client.login("TOKEN HERE")
