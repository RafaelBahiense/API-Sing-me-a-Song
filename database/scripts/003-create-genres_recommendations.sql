CREATE TABLE "genres_recommendations" (
	"id" serial NOT NULL,
	"genreId" integer NOT NULL,
	"recommendationId" integer NOT NULL,
	CONSTRAINT "genres_recommendations_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);