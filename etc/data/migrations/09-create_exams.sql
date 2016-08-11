CREATE TABLE exams
(
    id UUID PRIMARY KEY NOT NULL,
    exam_templates_id UUID NOT NULL,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now(),
    CONSTRAINT exam_exam_templates_id_fk FOREIGN KEY (exam_templates_id) REFERENCES exam_templates (id)
);
