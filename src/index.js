import Bot from './Bot'

let params = null
const availableCurrency = ['EUR', 'GBP', 'USD']

try {
    params = require('../params')
}
catch (e) {
    console.error("Params file not found or not readable.")
    process.exit(1)
}

if(!params.token || params.token === " " || params.token === "oauth:qsd574qsd54qsd5") {
    console.error("Token not found. Please find it here: https://twitchapps.com/tmi and add it to your params.json file")
    process.exit(1)
}

if(!availableCurrency.includes(params.currency)) {
    console.error('Invalid currency, please use "EUR", "GBP" or "USD".')
    process.exit(1)
}

if(!params.username || params.username === " ") {
    console.error('Invalid username.')
    process.exit(1)
}

if(!params.channels || params.channels.length <= 0) {
    console.error("Invalid channel(s) in your params.json file.")
    process.exit(1)
}

new Bot(params);
