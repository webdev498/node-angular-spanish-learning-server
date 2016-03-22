ALTER TABLE public.categories DROP COLUMN IF EXISTS parent_id;
DROP INDEX IF EXISTS "Categories_parent_id_index";
