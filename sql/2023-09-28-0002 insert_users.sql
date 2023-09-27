INSERT INTO public.users(
	id, sns_id, email, name, birth, address, birthday, age, nickname, gender, password, phone, picture, is_adult, options, provider_data, email_verified_at, phone_verified_at, created_at, updated_at, last_sign_in_at, blocked_at, deleted_at)
	VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);