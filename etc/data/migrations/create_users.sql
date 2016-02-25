CREATE TABLE users
(
    id UUID PRIMARY KEY NOT NULL,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    email VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255),
    password_salt VARCHAR(255),
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now(),
    active BOOLEAN DEFAULT TRUE
);
CREATE UNIQUE INDEX "user_id_uindex" ON users (id);
CREATE UNIQUE INDEX "user_email_uindex" ON users (email);
