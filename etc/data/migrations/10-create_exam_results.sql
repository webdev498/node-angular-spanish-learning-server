CREATE TABLE exam_results
(
    score INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP,
    id UUID PRIMARY KEY NOT NULL,
    exams_id UUID REFERENCES exams(id),
    users_id UUID REFERENCES users(id)
);
