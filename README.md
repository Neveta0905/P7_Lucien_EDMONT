# Groupomania
Projet n°7 réalisé dans le cadre de la formation de Développeur Web d'OpenClassroom.

## Pour commencer

### Pré-requis

Il est nécéssaire que certaines technologies soient installées sur votre machine si vous souhaitez lancer ce projet.

- Node.JS
- MySQL

### Installation

Dans le dossier frontend, comme dans le dossier backend, executez la commande ``npm install``.
Créer un dossier config avec un fichier config.js contenant : 
	{
	  "development": {
	    "username": "Votre nom utilisateur de base de donées",
	    "password": "Votre mot de passe de base de données",
	    "database": "database_development",
	    "host": "127.0.0.1",
	    "dialect": "mysql"
	  }
	}

Créer un fichier .env contenant les deux variables suivantes :
	PORT=votre port
	TokenCrypter='VOTRE CLEF SECRETE'


Ensuite :

- Créez une base de donnée MySQL appelée **database_development** avec la commande ``CREATE DATABASE database_development CHARACTER SET 'utf8';``.
- Travaillez dans la base de donnée **database_development** avec la commande ``USE database_development``.
- Executez le script **database_development.sql** avec la commande ``SOURCE PATH_OF_database_development.sql;``.

## Démarrage

- Lancez le backend et le frontend en utilisant dans chaque dossier la commande ``npm start``.

## Précisions

Les identifiants de l'admin sont :
- email : Admin@groupomania.fr
- mdp : 12345678

## Auteurs
- [@Neveta0905](https://github.com/Neveta0905)
