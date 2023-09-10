const express   = require("express");
const mongoose  = require('mongoose');

const Thing     = require('./models/things');




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

// Middleware anciennement appeler bodyparser, Intercepte les requêtes, ici ayant un entête Content-Type application/json
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



// Placer la route POST au-dessus du middleware pour les requêtes GET,
// car la logique GET interceptera toutes les requêtes envoyées à notre endpoint /api/stuff
// Toujours envoyer une reponse à une requête pour qu'elle soit valide

// Create (création de ressources)
// save()  enregistre un Thing dans la BDD
app.post('/api/stuff', (req, res, next) => {
  delete req.body._id;                            // je supprime le faux id generer par le front-end
  const thing = new Thing({                       // je crée une instance du model Thing
    ...req.body                                   // Je recupere le corps de la requete et crée des varibales à la volé coorespondant à chaque champ du schéma de donné
  });
  thing.save()
    .then(() => res.status(201).json({message: "Objet enregistrer !" }))   // ce Thing est ensuite retourné dans une Promise et envoyé au front-end ;
    .catch(() => res.status(400).json({ error }));                         // Si aucun Thing n'est trouvé ou si une erreur se produit, nous envoyons une erreur 404 au front-end,
})

// Update (modification de ressources)
// updateOne() dans notre modèle Thing . Nous permet de mettre à jour le Thing qui correspond à l'objet que nous passons comme premier argument.
// Nous utilisons aussi le paramètre id passé dans la demande, et le remplaçons par le Thing passé comme second argument.
app.put('/api/stuff/:id', (req, res, next) => {
  Thing.updateOne({_id: req.params.id}, {...req.body, _id:req.params.id})
    .then(() => res.status(200).json({message: "Objet modifier"}))
    .catch(() => res.status(400).json(error));
});


// Delete (suppression de ressources).
// deleteOne() dans notre modèle Thing , nous permet de supprimer un objet
app.delete('/api/stuff/:id', (req, res, next) => {
  Thing.deleteOne({_id: req.params.id})
    .then(() => res.status(200).json({message: "Message supprimé !"}))
    .catch(() => res.status(400).json(error));
});

// Read (lecture d'une seule ressource)
// findOne() retourne un seul Thing basé sur la fonction de comparaison
// qu'on lui passe (souvent pour récupérer un Thing par son identifiant unique).
app.get('/api/stuff/:id', (req, res, next) => {       // : en face du segment dynamique de la route pour la rendre accessible en tant que paramètre ;
  Thing.findOne({_id: req.params.id})                 // {_id: req.params.id} permet de filtrer les Things
    .then(thing => res.status(200).json(thing))
    .catch(error => res.status(404).json({error}));
});

// Read (lecture des ressources)
// La méthode find() retourne tous les Things de la BDD
app.get('/api/stuff', (req, res, next) => {
    Thing.find()
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({ error }));
  });


module.exports = app;

