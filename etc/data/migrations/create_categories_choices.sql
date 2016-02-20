CREATE TABLE categories_choices
(
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now(),
    category_id UUID,
    choice_id UUID,
    CONSTRAINT categories_choices_categories_id_fk FOREIGN KEY (category_id) REFERENCES categories (id),
    CONSTRAINT categories_choices_choices_id_fk FOREIGN KEY (choice_id) REFERENCES choice (id)
);
