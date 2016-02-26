ALTER SCHEMA public OWNER TO cgi;

/* This section is probably not necessary, but it is robust*/
ALTER TABLE categories OWNER TO cgi;
ALTER TABLE categories_choices OWNER TO cgi;
ALTER TABLE choices OWNER TO cgi;
ALTER TABLE exam_responses OWNER TO cgi;
ALTER TABLE exam_results OWNER TO  cgi;
ALTER TABLE exam_templates OWNER TO cgi;
ALTER TABLE exams OWNER TO cgi;
ALTER TABLE question_templates OWNER TO cgi;
ALTER TABLE question_types OWNER TO cgi;
ALTER TABLE questions OWNER TO cgi;
ALTER TABLE users OWNER TO cgi;

GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO cgi;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO cgi;