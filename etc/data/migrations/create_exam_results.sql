CREATE TABLE exam_results
(
    score INTEGER,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now(),
    id UUID PRIMARY KEY NOT NULL,
    exams_id UUID NOT NULL,
    users_id UUID NOT NULL,
    CONSTRAINT exam_results_exams_id_fk FOREIGN KEY (exams_id) REFERENCES exams (id),
    CONSTRAINT exam_results_users_id_fk FOREIGN KEY (users_id) REFERENCES users (id)
);
CREATE UNIQUE INDEX exam_results_id_uindex ON examresults (id);
