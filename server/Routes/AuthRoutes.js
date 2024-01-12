const { register, login } = require("../controllers/AuthControllers");
const { checkUser } = require("../Middelwares/AuthMiddleware");
const router = require("express").Router();
const ideasController = require('../controllers/IdeasController'); // Corrected import

// Create a new post
router.post('/ideas', ideasController.createNewPost);

// Get all posts
router.get('/ideas', ideasController.getAllPosts);

// Get a specific post by ID
router.get('/ideas/:id', ideasController.getOnePost);

// Update a post by ID
router.put('/ideas/:id', ideasController.updatePost);

// Delete a post by ID
router.delete('/ideas/:id', ideasController.deleteExistingPost);
router.post("/register",register);
router.post("/login",login);
router.post("/",checkUser);

module.exports = router;
