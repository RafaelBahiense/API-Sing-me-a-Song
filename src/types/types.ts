export interface Recommendation {
  id: number;
  name: string;
  youtubeLink: string;
  score: number;
};

export interface RecommendationResponse extends Recommendation {
  genres: Genre[];
};

export type Genre = {
  id: number;
  name: string;
};
