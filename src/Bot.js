import tmi from 'tmi.js'
import axios from 'axios'
import moment from 'moment'

export default class Bot {
    constructor(params) {
        this.converterTimeout = null
        this.params = params
        this.ubtcValue = null
        this.commands = {
            "echo": this.echo,
            "c": this.converter,
            "conv": this.converter,
            "convert": this.converter,
            "value": this.getValue,
            "h": this.help,
            "help": this.help,
        }

        this.onMessageHandler = this.onMessageHandler.bind(this)

        this.init()
    }

    init() {
        const options = {
            options: {
                debug: true
            },
            connection: {
                secure: true,
                reconnect: true
            },
            identity: {
                username: this.params['username'],
                password: this.params['token']
            },
            channels: this.params['channels']
        }

        this.client = new tmi.client(options)

        this.client.on('message', this.onMessageHandler)
        this.client.on('connected', this.onConnectedHandler)
        this.client.on('disconnected', this.onDisconnectHandler)

        this.params.currencySymbole = this.defineCurrencySymbol();

        this.refreshBtcValue().then(r => this.client.connect())
        setInterval(this.refreshBtcValue.bind(this), this.params['refreshEvery'] * 1000)
    }

    defineCurrencySymbol() {
        switch (this.params.currency) {
            case 'EUR':
                return '€'
                break
            case 'USD':
                return '$'
                break
            case 'GBP':
                return '£'
                break
            default:
                return '€'
        }
    }

    onConnectedHandler(addr, port) {
        console.log(`* Connected to ${addr}:${port}`)
    }

    onDisconnectHandler(reason) {
        console.log(`Disconnected: ${reason}`)
        process.exit(1)
    }

    onMessageHandler (target, context, msg, self) {
        //If this is a bot message, ignore
        if(self) {return}

        //If the message is not a command (doesn't start with !) then ignore
        if(msg.substr(0,1) !== "!") {
            return
        }

        //Split message to retrieve parameters
        const parse = msg.slice(1).split(' ')
        const command = parse[0]
        const params = parse.splice(1);

        if(!!this.commands[command]) {
            this.commands[command](target, context, params).then(() => {
                console.log(`${moment().toISOString()} | ${context.username} executed command ${command} successfully.`)
            })
        } else {
            console.warn(`${moment().toISOString()} WARNING: UNKNOWN COMMAND | ${context.username} says ${msg}`)
        }
    }

    echo = async (target, context, params) => {
        this.client.say(target, "Echo")
    }

    help = async (target, context, params) => {
        this.client.say(target, "https://github.com/enzo-billis/TwitchChatBot-BTC/blob/master/README.md#commandes")
    }

    converter = async (target, context, params) => {
        const {currencySymbole, convertTimeout, currency: rawCurrency} = this.params
        const value = parseFloat(params[0])
        const currency = rawCurrency.toLocaleLowerCase()

        if(this.converterTimeout) {
            return
        }

        if(!params[1] || params[1] === "u" || params[1].includes('btc')) {
            const convertedValue = value * this.ubtcValue;

            let decimal = convertedValue < 10 ? 100 : 1;
            decimal = convertedValue < 1 ? 10000 : decimal;

            this.client.say(target, `${value} μbtc -> ${Math.round(convertedValue * decimal) / decimal} ${currencySymbole} :)`);
        }

        else if(params[1] && params[1] === currency[0] || params[1] === currencySymbole || params[1].includes(currency)) {
            const convertedValue = value / this.ubtcValue;
            this.client.say(target, `${value} ${currencySymbole} -> ${Math.round(convertedValue)} μbtc :)`);
        }

        return this.converterTimeout = setTimeout(() => this.converterTimeout = null, convertTimeout * 1000)
    }

    async refreshBtcValue() {
        const {currency, currencySymbole} = this.params
        const {data} = await axios.get('https://api.coindesk.com/v1/bpi/currentprice.json')
        const btcValue = parseFloat(data.bpi[currency].rate.replace(',',''))
        this.ubtcValue = btcValue / 1000000
        console.log(`${moment().toISOString()} | Bitcoin value refreshed. New value is ${btcValue} ${currencySymbole}`)
    }

    getValue = async (target, context, params) => {
        const {currencySymbole} = this.params
        this.client.say(target, `1 BTC -> ${Math.round(this.ubtcValue * 1000000)} ${currencySymbole}`);
    }
}
