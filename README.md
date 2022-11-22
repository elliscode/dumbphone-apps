# Prerequisites

- python installed on your system

```
pip install django
```

```
pip install psycopg2
```

- make sure you have a postgres database running on port `5431`

```
python manage.py migrate
```

# Running

```
python manage.py runserver 8080
```

# Cache and secrets folder layout

- `$HOME/dumbphone-apps`
    - `grocery-list`
        - `list.txt` &mdash; automatically generated on the first call to the `/lists` endpoint
    - `secret-key.txt` &mdash; automatically generated on the startup of the server, see `/dumbphoneapps/settings.py`