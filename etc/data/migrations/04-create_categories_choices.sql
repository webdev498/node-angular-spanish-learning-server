CREATE TABLE categories_choices
(
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now(),
    category_id UUID REFERENCES categories(id),
    choice_id UUID REFERENCES choices(id)
);
