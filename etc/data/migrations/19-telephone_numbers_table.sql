CREATE TABLE telephones (
  id UUID PRIMARY KEY,
  country_code VARCHAR(3),
  area_code VARCHAR(3),
  number VARCHAR(7),
  extension VARCHAR(10),
  user_id UUID,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now(),
  CONSTRAINT telephones_user_id_fk FOREIGN KEY (user_id) REFERENCES users (id)
);