-- Function to increment likes count for projects
CREATE OR REPLACE FUNCTION increment_likes(project_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE projects 
  SET likes = likes + 1 
  WHERE id = project_id;
END;
$$ LANGUAGE plpgsql;

-- Function to decrement likes count for projects
CREATE OR REPLACE FUNCTION decrement_likes(project_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE projects 
  SET likes = GREATEST(likes - 1, 0)
  WHERE id = project_id;
END;
$$ LANGUAGE plpgsql; 