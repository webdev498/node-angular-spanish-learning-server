ALTER TABLE choices ADD COLUMN category_id UUID;
ALTER TABLE choices ADD FOREIGN KEY (category_id) REFERENCES public.categories (id);