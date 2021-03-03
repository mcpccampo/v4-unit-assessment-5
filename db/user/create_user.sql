INSERT INTO helo_users (
  USER_NAME ,
  password
) VALUES (
  ${USER_NAME},
  ${hash}
)
returning *;
