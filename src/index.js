import Bot from './Bot'

const fs = require('fs')

let params = null
const availableCurrency = ['EUR', 'GBP', 'USD']

function check() {
    try {
        const content = fs.readFileSync('params.json', 'utf8')
        params = JSON.parse(content)
    } catch (e) {
        console.log('Params file not found or not readable.')
        return exit()
    }

    if (!params.token || params.token === ' ' || params.token === 'oauth:qsd574qsd54qsd5') {
        console.log('Token not found. Please find it here: https://twitchapps.com/tmi and add it to your params.json file')
        return exit()
    }

    if (!availableCurrency.includes(params.currency)) {
        console.log('Invalid currency, please use "EUR", "GBP" or "USD".')
        return exit()
    }

    if (!params.username || params.username === ' ') {
        console.log('Invalid username.')
        return exit()
    }

    if (!params.channels || params.channels.length <= 0) {
        console.log('Invalid channel(s) in your params.json file.')
        return exit()
    }

    if (!params.refreshEvery || params.refreshEvery < 60) {
        console.log('Invalid refresh delay in params.json file (minimum is 60 seconds)')
        return exit()
    }

    if (!params.convertTimeout || params.convertTimeout <= 0) {
        console.log('Invalid timeout in params.json file.')
        return exit()
    }
}

function exit() {
    console.log('Press any key to exit')
    process.stdin.setRawMode(true)
    process.stdin.resume()
    process.stdin.on('data', process.exit(1))
}

check();
new Bot(params);
