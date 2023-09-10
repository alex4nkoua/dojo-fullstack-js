const express   =  require('express');
const router    = express.Router();

const stuffCtrl = require('../controllers/stuff');


// Placer la route POST avant la route GET, car la logique GET interceptera toutes les requêtes envoyées à endpoint /api/stuff

router.post('/', stuffCtrl.createThing);      // Create (création de ressources)
router.put('/:id',stuffCtrl.modifyThing);     // Update (modification de ressources)
router.delete('/:id',stuffCtrl.deleteThing);  // Delete (suppression de ressources).
router.get('/:id', stuffCtrl.getOneThing);    // Read (lecture d'une seule ressource)
router.get('/',stuffCtrl.getAllThing);        // Read (lecture des ressources)

module.exports = router;