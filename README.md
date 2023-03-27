# Database initialization

```
initdb --encoding=UTF8 --pgdata=${HOME}/pgsql-data --username=user --pwfile=${HOME}/dumbphone-apps/database-password.txt
```

# Setup

```
pipenv lock
```

```
pipenv sync
```

```
pipenv run manage.py collectstatic
```

```
pipenv run manage.py migrate
```

# Run

```
export PGDATA=~/pgsql-data && PG_INSTALL_DIR=~/pgsql && ${PG_INSTALL_DIR}/bin/postgres
```

```
pipenv run server.py
```

# Cache and secrets folder layout

- `$HOME/dumbphone-apps`
    - `database-password.txt` &mdash; should contain the password to your database initialized in step 1
    - `reddit-credentials.txt` &mdash; should contain the username, password, app_id, and app_secret
    - `reddit-token.json` &mdash; automatically generated when the reddit app is accessed
    - `secret-key.txt` &mdash; automatically generated on the startup of the server, see `/dumbphoneapps/settings.py`
    - `twilio-credentials.txt` &mdash; should contain the credentials for your twilio account, [see django-twilio documentation](https://django-twilio.readthedocs.io/en/latest/settings.html)
    - `weather-key.txt` &mdash; should contain the API key for [Weather API](https://weatherapi.com/) 