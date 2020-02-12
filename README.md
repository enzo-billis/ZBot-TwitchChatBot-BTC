# ZBot

*A useless twitch chatbot*

ZBot a été crée dans le but de s’entraîner dans le développement NodeJS. Il permet aujourd'hui quelques fonctionnalités sur un chat Twitch. Chaque streamer peut l'utiliser comme il veut.

## Pré-requis

 - Node JS
 - NPM
 - Un compte twitch pour votre bot
## Installation
 - Téléchargez les sources du projet et installez les dépendances avec la commande ***npm i***.
 - Renommer le fichier ***params.json.EXEMPLE*** en ***params.json***
 - Ouvrez ***params.json*** et remplissez les informations comme ci-dessous : 
	 - Token : Il s'agit du token du compte twitch du bot. Vous pouvez le récupérer avec https://twitchapps.com/tmi
	 - Username : Il s'agit du nom de votre bot ***sans majuscule***. ATTENTION: il s'agit du ***nom du compte par lequel vous avez récupéré le token.*** Si il s'agit du token de votre compte de twitch, alors le bot portera le même nom. 
	 - Channels : C'est la liste des streams sur lequel votre bot se connectera au lancement. Rentrez simplement le nom de la ou les chaînes visées. *Exemple : "channels": ["DarkWador", "Choubi","JohnSnow"]*
- Enfin lancez le bot avec la commande : ***node index.js***
	 
Vous devez laissez le bot tourner, sinon il se déconnectera des chaînes.

## Commandes

### Conversion
La commande !conv permet de convertir une valeur en euro ou ubtc.

Si le premier paramètres est un chiffre alors vous aurez une conversion ubtc -> euro

Sinon si le premier paramètres est un "e" et le deuxième un chiffre vous aurez une conversion euro -> ubtc.

    !conv 650
 

>   zouzouil_bot says 650 μbtc ⇒ 1.95 €.


    !conv e 20
 

>   zouzouil_bot says 20 € ⇒ 6675.57 μbtc.

 Thank's to StackEdit for the markdown editor : [StackEdit](https://stackedit.io/).
