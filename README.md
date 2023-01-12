# Database initialization

```
~/pgsql/bin/initdb.exe --encoding=UTF8 --pgdata=${HOME}/pgsql-data --username=user --pwfile=${HOME}/dumbphone-apps/database-password.txt
```

# Setup

```
~/Python311/Scripts/pipenv lock
```

```
~/Python311/Scripts/pipenv sync
```

```
~/Python311/Scripts/pipenv run manage.py collectstatic
```

```
~/Python311/Scripts/pipenv run manage.py migrate
```

# Run

```
export PGDATA=~/pgsql-data && PG_INSTALL_DIR=~/pgsql && ${PG_INSTALL_DIR}/bin/postgres
```

```
~/Python311/Scripts/pipenv run server.py
```

# Cache and secrets folder layout

- `$HOME/dumbphone-apps`
    - `grocery-list`
        - `list.txt` &mdash; automatically generated on the first call to the `/lists` endpoint
    - `weather`
        - `api-key.txt` &mdash; should contain the API key for [Open Weather Map](https://openweathermap.org/)
    - `secret-key.txt` &mdash; automatically generated on the startup of the server, see `/dumbphoneapps/settings.py`
    - `database-password.txt` &mdash; should contain the password for the database you initialized in step 1 
    - `twilio-credentials.txt` &mdash; should contain the credentials for your twilio account, [see django-twilio documentation](https://django-twilio.readthedocs.io/en/latest/settings.html)