CREATE TABLE exam_responses
(
    id UUID PRIMARY KEY NOT NULL,
    exams_id UUID NOT NULL REFERENCES exams(id),
    users_id UUID NOT NULL REFERENCES users(id),
    questions_id UUID NOT NULL REFERENCES questions(id),
    choices_id UUID NOT NULL REFERENCES choices(id),
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP
);
