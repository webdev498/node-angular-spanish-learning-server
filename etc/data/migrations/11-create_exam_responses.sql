CREATE TABLE exam_responses
(
    id UUID PRIMARY KEY NOT NULL,
    exams_id UUID NOT NULL,
    users_id UUID NOT NULL,
    questions_id UUID NOT NULL,
    choices_id UUID NOT NULL,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now(),
    CONSTRAINT exam_responses_exams_id_fk FOREIGN KEY (exams_id) REFERENCES exams (id),
    CONSTRAINT exam_responses_users_id_fk FOREIGN KEY (users_id) REFERENCES users (id),
    CONSTRAINT exam_responses_questions_id_fk FOREIGN KEY (questions_id) REFERENCES questions (id),
    CONSTRAINT exam_responses_choices_id_fk FOREIGN KEY (choices_id) REFERENCES choices (id)
);
CREATE UNIQUE INDEX "exam_responses_id_uindex" ON exam_responses (id);
