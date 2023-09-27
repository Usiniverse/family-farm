INSERT INTO public.posts(
	id, user_id, sns_id, title, content, posting_password, images, options, created_at, updated_at, deleted_at)
	VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);