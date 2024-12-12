-- Users Table
DROP TABLE IF EXISTS Users;

CREATE TABLE
    IF NOT EXISTS Users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        profile_picture_url TEXT,
        email VARCHAR(255) UNIQUE NOT NULL,
        bio TEXT,
        date_registered TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        password_hash TEXT NOT NULL
    );

-- Cookbooks Table
DROP TABLE IF EXISTS Cookbooks;

CREATE TABLE
    IF NOT EXISTS Cookbooks (
        id SERIAL PRIMARY KEY,
        author_id INT NOT NULL REFERENCES Users (id) ON DELETE CASCADE,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        cover_image_url TEXT,
        is_private BOOLEAN DEFAULT FALSE,
        date_published TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        date_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        views_count INT DEFAULT 0
    );

-- Recipes Table
DROP TABLE IF EXISTS Recipes;

CREATE TABLE
    IF NOT EXISTS Recipes (
        id SERIAL PRIMARY KEY,
        author_id INT NOT NULL REFERENCES Users (id) ON DELETE CASCADE,
        cookbook_id INT REFERENCES Cookbooks (id) ON DELETE CASCADE,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        instructions TEXT,
        tags TEXT, -- Can be stored as a comma-separated string or JSON array
        image_url TEXT,
        expected_duration INT, -- Time in minutes
        ingredients TEXT, -- Can be stored as a JSON array
        date_published TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        date_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        views_count INT DEFAULT 0
    );

-- SavedCookbooks Table (Bridge Table for m-m)
DROP TABLE IF EXISTS SavedCookbooks;

CREATE TABLE
    IF NOT EXISTS SavedCookbooks (
        id SERIAL PRIMARY KEY,
        author_id INT NOT NULL REFERENCES Users (id) ON DELETE CASCADE,
        cookbook_id INT NOT NULL REFERENCES Cookbooks (id) ON DELETE CASCADE
    );

-- FavoritedRecipes Table (Bridge Table for m-m)
DROP TABLE IF EXISTS FavoritedRecipes;

CREATE TABLE
    IF NOT EXISTS FavoritedRecipes (
        id SERIAL PRIMARY KEY,
        author_id INT NOT NULL REFERENCES Users (id) ON DELETE CASCADE,
        recipe_id INT NOT NULL REFERENCES Recipes (id) ON DELETE CASCADE
    );

-- Friends Table
DROP TABLE IF EXISTS Friends;

CREATE TABLE
    IF NOT EXISTS Friends (
        id SERIAL PRIMARY KEY,
        user_id INT NOT NULL REFERENCES Users (id) ON DELETE CASCADE,
        friend_id INT NOT NULL REFERENCES Users (id) ON DELETE CASCADE,
        date_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE (user_id, friend_id)
    );