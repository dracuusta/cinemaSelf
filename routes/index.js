var express = require('express');
var router = express.Router();

//Require controller modules
const actorController=require("../controller/actorController")
const directorController=require("../controller/directorController")
const genreController=require("../controller/genreController")
const movieController=require("../controller/movieController")
const moviedvdController=require("../controller/moviedvdController")

/*Controller for movie */
router.get('/', movieController.index);
router.get('/movies', movieController.movie_list);
router.get('/create',movieController.movie_create_get)
router.post('/:id/delete',movieController.movie_create_post)
router.post('/:id/delete',movieController.movie_delete_get)
router.post('/:id/delete',movieController.movie_delete_post)
router.get('/:id/update',movieController.movie_update_get)
router.post('/:id/update',movieController.movie_update_post)

/* Controller for MovieDVD */
router.get('/moviedvd/', moviedvdController.moviedvd_detail);
router.get('/moviedvds/', moviedvdController.moviedvd_list);
router.get('/moviedvd/create',moviedvdController.moviedvd_create_get)
router.post('/moviedvd/create',moviedvdController.moviedvd_create_post)
router.get('/moviedvd/:id/delete',moviedvdController.moviedvd_delete_get)
router.post('/moviedvd/:id/delete',moviedvdController.moviedvd_delete_post)
router.get('/moviedvd/:id/update',moviedvdController.moviedvd_update_get)
router.post('/moviedvd/:id/update',moviedvdController.moviedvd_update_post)

/* Controller for Genre */
router.get('genre/', genreController.genre_detail);
router.get('genres/', genreController.genre_list);
router.get('genre/create',genreController.genre_create_get)
router.post('genre/create',genreController.genre_create_post)
router.get('genre/:id/delete',genreController.genre_delete_get)
router.delete('genre/:id/delete',genreController.genre_delete_get)
router.get('genre/:id/update',genreController.genre_update_get)
router.post('genre/:id/update',genreController.genre_update_post)

/* Controller for Actor */
router.get('actor/', actorController.actor_detail);
router.get('actors/', actorController.actor_list);
router.get('actor/create',actorController.actor_create_get)
router.post('actor/create',actorController.actor_create_post)
router.get('actor/:id/delete',actorController.actor_delete_get)
router.post('actor/:id/delete',actorController.actor_delete_get)
router.get('actor/:id/update',actorController.actor_update_get)
router.post('actor/:id/update',actorController.actor_update_post)

/* Controller for director */
router.get('director/', directorController.director_detail);
router.get('directors/', directorController.director_list);
router.get('director/create',directorController.director_create_get)
router.post('director/delete',directorController.director_create_post)
router.post('director/create',directorController.director_delete_get)
router.post('director/delete',directorController.director_delete_get)
router.post('director/create',directorController.director_update_get)
router.post('director/update',directorController.director_update_post)
module.exports = router;
