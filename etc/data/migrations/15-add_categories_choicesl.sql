CREATE TABLE categories_choices
(
    category_id UUID,
    choice_id UUID,
    PRIMARY KEY (category_id, choice_id),
    CONSTRAINT categories_choices_categories_id_fk FOREIGN KEY (category_id) REFERENCES categories (id),
    CONSTRAINT categories_choices_choices_id_fk FOREIGN KEY (choice_id) REFERENCES choices (id)
);
