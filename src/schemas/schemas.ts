import Joi from "joi";

const ytRegExp =
  /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;

export const RecommendationSchema = Joi.object({
  name: Joi.string().min(1).required(),
  youtubeLink: Joi.string().regex(ytRegExp).required(),
  genresId: Joi.array().items(Joi.number()).min(1).required(),
});

export const GenreSchema = Joi.string().min(1).required();
