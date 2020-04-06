let tmi = require('tmi.js');
let btcValue = require('btc-value');
let params = require('./params')

let options = {
    options: {
        debug: true
    },
    connection: {
        secure: true,
        reconnect: true
    },
    identity: {
        username: params["username"],
        password: params["token"]
    },
    channels: params["channels"]
};

//Variable contains the micro btc value
let ubtcvalue;

let client = new tmi.client(options);

let commandsKnow = {conv, zhelp};

client.on('message', onMessageHandler)
client.on('connected', onConnectedHandler)
client.on('disconnected', onDisconnectHandler)

client.connect();

async function onConnectedHandler(addr, port) {
    await btcValue.setApiKey(params["token-api-btc"]);
    await refreshBtcValue();
    console.log(`* Connected to ${addr}:${port}`)
}

function onMessageHandler (target, context, msg, self) {
    if(self) {return}
    refreshBtcValue();

    if(msg.substr(0,1) !== "!") {
        return
    }

    const parse = msg.slice(1).split(' ')

    const commandName = parse[0]

    const params = parse.splice(1);

    if(commandName in commandsKnow) {
        const command = commandsKnow[commandName]

        command(target, context, params)
        console.log(`* Executed ${commandName} command for ${context.username}`)
    } else {
        console.log(`* Unknown command ${commandName} from ${context.username}`)
    }
}

function conv (target, context, params) {
    let convertedValue = 0
    if(params[0] && !isNaN(params[0])){
        convertedValue = params[0]*ubtcvalue
        console.log(params[0])
        client.say(target, params[0]+" μbtc ⇒ "+roundToTwo(convertedValue)+" €.")
    }
    else if(params[0] && params[0] == "e" && !isNaN(params[1])) {
        convertedValue = params[1]/ubtcvalue
      client.say(target, params[1]+" € ⇒ "+roundToTwo(convertedValue)+" μbtc.")
    }
}

function zhelp (target, context, params) {
    client.say(target, "https://github.com/enzo-billis/TwitchChatBot-BTC/blob/master/README.md#commandes")
}

function onDisconnectHandler (reason) {
    console.log(`Disconnected: ${reason}`)
    process.exit(1)
}

function refreshBtcValue(){
    btcValue({currencyCode: 'EUR'}).then(value => {
        ubtcvalue = value / 1000000
    })
}

function roundToTwo(num) {
    return +(Math.round(num + "e+2")  + "e-2");
}
