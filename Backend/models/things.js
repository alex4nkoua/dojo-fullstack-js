const mongoose = require('mongoose');


// structure de données
// nous créons un schéma de données qui contient les champs souhaités pour chaque Thing,
// On indique leur type ainsi que leur caractère (obligatoire ou non).
// Pas besoin de mettre un champ pour l'Id puisqu'il est automatiquement généré par Mongoose
const thingSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  userId: { type: String, required: true },
  price: { type: Number, required: true },
});

module.exports = mongoose.model('Thing', thingSchema);