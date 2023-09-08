const express = require("express");



// création de l'application express
// Une application Express est une série de fonctions appelées middleware
const app = express();


// Chaque élément de middleware reçoit les objets request et response ,elle  peut les lire, les analyser et les manipuler
// Le middleware Express reçoit également la méthode next , qui permet à chaque middleware de passer l'exécution au middleware suivant.

app.use((req, res, next) => {
    console.log(`Requète reçu`);
    next();
});

app.use((req, res, next ) => {
    res.status(201);
    next();
});

app.use((req, res, next) => {
    res.json(`Votre réquêtes à bien été reçu`);
    next();
});

app.use((req, res, next) => {
    console.log(`Réponse envoyer avec succes`);
})

module.exports = app;

