const express = require("express");



// création de l'application express
// Une application Express est une série de fonctions appelées middleware
const app = express();



// Un middleware est un bloc de code qui traite les requêtes et réponses de votre application
// Chaque élément de middleware peut les lire, les analyser et les manipuler
// Le middleware Express reçoit également la méthode next , qui permet à chaque middleware de passer l'exécution au middleware suivant.

// Middleware anciennement appeler bodyparser, Intercepte les requêtes ayant un entête Content-Type application/json
// Permet de nous donner accès au corps d'une requete dans le callback requete.body ou req.body
app.use(express.json());



// Le CORS définit comment les serveurs et les navigateurs interagissent, en spécifiant quelles ressources peuvent être demandées de manière légitime
// -  par défaut, les requêtes AJAX sont interdites -
// le middleware ne prend pas d'adresse en premier paramètre, afin de s'appliquer à toutes les routes
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');   // Accéder à notre API depuis n'importe quelle origine
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');  // les headers mentionnés peuvent envoyer des requêtes vers notre API
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');        // d'envoyer ete receveoir des requêtes avec les méthodes mentionnées
    next();
  });



// placer la route POST au-dessus du middleware pour les requêtes GET,
// car la logique GET interceptera actuellement toutes les requêtes envoyées à votre endpoint /api/stuff
// Toujours envoyer une reponse à une requête pour qu'elle soit valide
// cet route interceptera uniquement les requetes POST avec cette endpoint
app.post('/api/stuff', (req, res, next) => {
    console.log(req.body);
    res.status(201).json({
        message : 'Objet crée !'
    })
    next();
})


// la route ou endpoint renvoie un tableau d'objet en json  avec le code 200
// Nous créons un groupe d'articles avec le schéma de données spécifique requis par le front-end
app.get('/api/stuff', (req, res, next) => {
    const stuff = [
      {
        _id: 'oeihfzeoi',
        title: 'Mon premier objet',
        description: 'Les infos de mon premier objet',
        imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
        price: 4900,
        userId: 'qsomihvqios',
      },
      {
        _id: 'oeihfzeomoihi',
        title: 'Mon deuxième objet',
        description: 'Les infos de mon deuxième objet',
        imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
        price: 2900,
        userId: 'qsomihvqios',
      },
    ];
    res.status(200).json(stuff);
  });

//   Le dernier middleware d'une chaîne doit renvoyer la réponse au client pour empêcher la requête d'expirer.

module.exports = app;

