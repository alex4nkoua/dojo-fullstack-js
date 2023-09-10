const Thing = require('../models/things')


// Toujours envoyer une reponse à une requête pour qu'elle soit valide

// save()  enregistre un Thing dans la BDD
exports.createThing = (req, res, next) => {
    delete req.body._id;                            // je supprime le faux id generer par le front-end
    const thing = new Thing({                       // je crée une instance du model Thing
      ...req.body                                   // Je recupere le corps de la requete et crée des varibales à la volé coorespondant à chaque champ du schéma de donné
    });
    thing.save()
      .then(() => res.status(201).json({message: "Objet enregistrer !" }))   // ce Thing est ensuite retourné dans une Promise et envoyé au front-end ;
      .catch(() => res.status(400).json({ error }));                         // Si aucun Thing n'est trouvé ou si une erreur se produit, nous envoyons une erreur 404 au front-end,
  }


// updateOne() dans notre modèle Thing . Nous permet de mettre à jour le Thing qui correspond à l'objet que nous passons comme premier argument.
// Nous utilisons aussi le paramètre id passé dans la demande, et le remplaçons par le Thing passé comme second argument.
exports.modifyThing = (req, res, next) => {
  Thing.updateOne({_id: req.params.id}, {...req.body, _id:req.params.id})
    .then(() => res.status(200).json({message: "Objet modifier"}))
    .catch(() => res.status(400).json(error));
}

// deleteOne() dans notre modèle Thing , nous permet de supprimer un objet
exports.deleteThing = (req, res, next) => {
  Thing.deleteOne({_id: req.params.id})
    .then(() => res.status(200).json({message: "Message supprimé !"}))
    .catch(() => res.status(400).json(error));
}


// findOne() retourne un seul Thing basé sur la fonction de comparaison
// qu'on lui passe (souvent pour récupérer un Thing par son identifiant unique).
exports.getOneThing = (req, res, next) => {       // : en face du segment dynamique de la route pour la rendre accessible en tant que paramètre ;
  Thing.findOne({_id: req.params.id})                 // {_id: req.params.id} permet de filtrer les Things
    .then(thing => res.status(200).json(thing))
    .catch(error => res.status(404).json({error}));
}

// La méthode find() retourne tous les Things de la BDD
exports.getAllThing = (req, res, next) => {
  Thing.find()
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({ error }));
}