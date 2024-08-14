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
router.get('/movie/create',movieController.movie_create_get)
router.post('/movie/create',movieController.movie_create_post)
router.post('/movie/:id/delete',movieController.movie_create_post)
router.post('/movie/:id/delete',movieController.movie_delete_get)
router.post('/movie/:id/delete',movieController.movie_delete_post)
router.get('/movie/:id/update',movieController.movie_update_get)
router.post('/movie/:id/update',movieController.movie_update_post)
router.get('/movie/:id',movieController.movie_detail)

/* Controller for MovieDVD */
router.get('/moviedvds/', moviedvdController.moviedvd_list);
router.get('/moviedvd/create',moviedvdController.moviedvd_create_get)
router.post('/moviedvd/create',moviedvdController.moviedvd_create_post)
router.get('/moviedvd/:id/delete',moviedvdController.moviedvd_delete_get)
router.post('/moviedvd/:id/delete',moviedvdController.moviedvd_delete_post)
router.get('/moviedvd/:id/update',moviedvdController.moviedvd_update_get)
router.post('/moviedvd/:id/update',moviedvdController.moviedvd_update_post)
router.get('/moviedvd/:id', moviedvdController.moviedvd_detail);

/* Controller for Genre */
router.get('/genres/', genreController.genre_list);
router.get('/genre/create',genreController.genre_create_get)
router.post('/genre/create',genreController.genre_create_post)
router.get('/genre/:id/delete',genreController.genre_delete_get)
router.delete('/genre/:id/delete',genreController.genre_delete_get)
router.get('/genre/:id/update',genreController.genre_update_get)
router.post('/genre/:id/update',genreController.genre_update_post)
router.get('/genre/:id', genreController.genre_detail);

/* Controller for Actor */
router.get('/actors/', actorController.actor_list);
router.get('/actor/create',actorController.actor_create_get)
router.post('/actor/create',actorController.actor_create_post)
router.get('/actor/:id/delete',actorController.actor_delete_get)
router.post('/actor/:id/delete',actorController.actor_delete_post)
router.get('/actor/:id/update',actorController.actor_update_get)
router.post('/actor/:id/update',actorController.actor_update_post)
router.get('/actor/:id', actorController.actor_detail);

/* Controller for director */
router.get('/directors/', directorController.director_list);
router.get('/director/create/',directorController.director_create_get)
router.post('/director/create/',directorController.director_create_post)
router.post('/director/delete/',directorController.director_delete_post)
router.get('/director/delete/',directorController.director_delete_get)
router.get('/director/update/',directorController.director_update_get)
router.post('/director/update/',directorController.director_update_post)
router.get('/director/:id/', directorController.director_detail);
module.exports = router;
