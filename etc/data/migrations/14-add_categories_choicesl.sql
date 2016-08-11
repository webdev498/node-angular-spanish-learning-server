CREATE TABLE IF NOT EXISTS categories_choices
(
    category_id UUID REFERENCES categories(id),
    choice_id UUID REFERENCES choices(id),
    PRIMARY KEY (category_id, choice_id)
);