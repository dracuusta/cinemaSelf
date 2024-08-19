const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const Director = require("../models/director");

exports.director_list = asyncHandler(async (req, res, next) => {
  let directors = await Director.find({}).sort({ first_name: 1 });
  directors = directors.filter(
    (director, ind, self) =>
      self.map((x) => x.name).indexOf(director.name) === ind,
  );
  res.render("director_list", {
    title: "Director List",
    directors: directors,
    name: "director_list",
  });
});
exports.director_detail = asyncHandler(async (req, res, next) => {
  const director = await Director.findById(req.params.id).exec();

  if (director == null) {
    const err = new Error("Director details not available");
    err.status = 404;
    next(err);
  }

  res.render("director_detail", {
    title: director.name,
    director: director,
  });
});
exports.director_create_get = asyncHandler(async (req, res, next) => {
  res.render("director_form", {
    title: "Create Director",
  });
});
exports.director_create_post = [
  body("first_name", "First Name must be at least 3 character")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body("last_name", "Field Name must be at least 3 characters")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body("date_of_birth", "Field Name must be at least 3 characters")
    .optional({ values: "falsy" })
    .isISO8601()
    .toDate(),
  body("date_of_death", "Field Name must be at least 3 characters")
    .optional({ values: "falsy" })
    .isISO8601()
    .toDate(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req.params);
    const director = new Director({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      date_of_birth: req.body.date_of_birth,
      date_of_death: req.body.date_of_death,
    });

    if (!errors.isEmpty()) {
      console.log(errors);
      res.render("director_form", {
        title: "Create Director",
        director: director,
        errors: errors,
      });
      return;
    } else {
      /* Valid Form */
      const directorExists = await Director.find({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        date_of_birth: req.body.date_of_birth,
        date_of_death: req.body.date_of_death,
      }).collation({ locale: "en", strength: 2 });
      if (directorExists.length) {
        res.render("director_form", {
          title: "Create Director",
          director: directorExists,
        });
      } else {
        await director.save();
        res.redirect(director.url);
      }
    }
  }),
];
exports.director_update_get = asyncHandler(async (req, res, next) => {
  const director = await Director.findById(req.params.id).exec();
  if (director === null) {
    const error = new Error("Director could not be found");
    error.status = 404;
    next(error);
  }

  res.render("director_form", {
    title: "Update Director",
    director: director,
  });
});
exports.director_update_post = [
  body("first_name", "First Name must be at least 3 character")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body("last_name", "Field Name must be at least 3 characters")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body("date_of_birth", "Field Name must be at least 3 characters")
    .optional({ values: "falsy" })
    .isISO8601()
    .toDate(),
  body("date_of_death", "Field Name must be at least 3 characters")
    .optional({ values: "falsy" })
    .isISO8601()
    .toDate(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req.params);
    const director = new Director({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      date_of_birth: req.body.date_of_birth,
      date_of_death: req.body.date_of_death,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      console.log(errors);
      res.render("director_form", {
        title: "Create Director",
        director: director,
        errors: errors,
      });
      return;
    } else {
      const updatedDirector = await Director.findByIdAndUpdate(
        req.params.id,
        director,
        {},
      );
      res.redirect(updatedDirector.url);
    }
  }),
];

exports.director_delete_get = asyncHandler(async (req, res, next) => {
  const director = await Director.findById(req.params.id);
  res.render("director_delete", {
    title: "Delete Director",
    director: director,
  });
});
exports.director_delete_post = asyncHandler(async (req, res, next) => {
  await Director.findByIdAndDelete(req.params.id);
  res.redirect("/catalog/directors");
});
