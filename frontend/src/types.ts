export interface User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  profilePictureUrl: string | null;
  email: string;
  bio: string | null;
  dateRegistered: Date;
  password: string;
}

export interface Cookbook {
  id: number;
  authorId: number;
  title: string;
  description: string | null;
  coverImageUrl: string | null;
  isPrivate: boolean;
  datePublished: Date;
  dateUpdated: Date;
  viewsCount: number;
}

export interface Recipe {
  id: number;
  authorId: number;
  cookbookId: number;
  title: string;
  description: string | null;
  imageUrl: string | null;
  ingredients: string[] | null;
  instructions: { summary: string; details: string }[] | null;
  tags: string[] | null;
  expectedDuration: number | null;
  datePublished: Date;
  dateUpdated: Date;
  viewsCount: number;
}
