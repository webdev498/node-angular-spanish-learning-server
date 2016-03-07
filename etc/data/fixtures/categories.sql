INSERT INTO categories
  (id, name, parent_id, active) VALUES
  ('1f20733c-c497-41f7-8dbf-501cc9786835', 'Anatomy', NULL, TRUE ),
  ('7aafca37-1798-46c8-8ece-12e360eea258', 'Circulatory System','1f20733c-c497-41f7-8dbf-501cc9786835', TRUE ),
  ('6fbb1331-263f-473e-ac4b-dc740caf942a', 'Skeletal System', '1f20733c-c497-41f7-8dbf-501cc9786835', TRUE ),
  ('cecc10cf-a641-44a5-bfa0-5d89700c9f22', 'Long Bones', '6fbb1331-263f-473e-ac4b-dc740caf942a', TRUE);