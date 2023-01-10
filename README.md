# Database initialization

```
~/pgsql/bin/initdb.exe --encoding=UTF8 --pgdata=${HOME}/pgsql-data --username=user --pwfile=${HOME}/dumbphone-apps/database-password.txt
```

# Setup

```
python -m venv env
```

```
cd env/Scripts/ && . activate && cd ../../
```

```
pip install -r requirements.txt
```

```
python manage.py collectstatic
```

```
python server.py
```

# Cache and secrets folder layout

- `$HOME/dumbphone-apps`
    - `grocery-list`
        - `list.txt` &mdash; automatically generated on the first call to the `/lists` endpoint
    - `weather`
        - `api-key.txt` &mdash; should contain the API key for [Open Weather Map](https://openweathermap.org/)
    - `email-credentials.txt` &mdash; automatically generated on the startup of the server, [populate with credentials for your email address](https://docs.djangoproject.com/en/4.1/topics/email/), see `/dumbphoneapps/settings.py`
    - `secret-key.txt` &mdash; automatically generated on the startup of the server, see `/dumbphoneapps/settings.py`
    - `database-password.txt` &mdash; should contain the password for the database you initialized in step 1 