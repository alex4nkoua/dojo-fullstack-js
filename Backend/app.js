const express     = require("express");
const mongoose    = require('mongoose');


const stuffRoutes = require('./routes/stuff');


// création de l'application express
// Une application Express est une série de fonctions appelées middleware
const app = express();


// Connection à BDD
mongoose.connect('mongodb+srv://Alex4testeur1:dojofullstackjs4testeur1@cluster0.vlghqkm.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


// Un middleware est un bloc de code qui traite les requêtes et réponses de notre application
// Chaque élément de middleware peut lire, analyser et les manipuler les requetes
// Le middleware Express reçoit également la méthode next , qui permet à chaque middleware de passer l'exécution au middleware suivant.
// Le dernier middleware d'une chaîne doit renvoyer la réponse au client pour empêcher la requête d'expirer.

// Ce Middleware anciennement appeler bodyparser, Intercepte les requêtes, ici ayant un entête Content-Type application/json
// Permet de nous donner accès au corps d'une requete dans le callback requete.body ou req.body
app.use(express.json());



// Le CORS définit comment les serveurs et les navigateurs interagissent, en spécifiant quelles ressources peuvent être demandées de manière légitime
// -  par défaut, les requêtes AJAX sont interdites -
// le middleware ne prend pas d'adresse en premier paramètre, afin de s'appliquer à toutes les routes
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');                                                                        // Accéder à notre API depuis n'importe quelle origine
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');  // les headers mentionnés peuvent envoyer des requêtes vers notre API
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');                                  // d'envoyer ete receveoir des requêtes avec les méthodes mentionnées
    next();
  });


app.use('/api/stuff', stuffRoutes);

module.exports = app;

