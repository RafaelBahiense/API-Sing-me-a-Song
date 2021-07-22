CREATE TABLE "recommendations" (
	"id" serial NOT NULL,
	"genreId" integer NOT NULL,
	"name" TEXT NOT NULL,
	"youtubeLink" TEXT NOT NULL UNIQUE,
	"votes" integer NOT NULL,
	CONSTRAINT "recommendations_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);