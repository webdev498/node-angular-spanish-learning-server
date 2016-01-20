CREATE TABLE questions
(
    id UUID PRIMARY KEY NOT NULL,
    question_template_id UUID NOT NULL,
    question_type_id UUID NOT NULL,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now(),
    CONSTRAINT questions_question_templates_id_fk FOREIGN KEY (question_template_id) REFERENCES question_templates (id),
    CONSTRAINT questions_question_types_id_fk FOREIGN KEY (question_type_id) REFERENCES question_types (id)
);
CREATE UNIQUE INDEX questions_id_uindex ON questions (id);
