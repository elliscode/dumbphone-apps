# Setup

Create virtual environment:

```
python -m venv env
```

Activate virtual environment:

```
cd env/Scripts/ && . activate && cd ../../
```

Install requirements:

```
pip install -r requirements.txt
```

Collect static files:

```
python manage.py collectstatic
```

Run WSGI server:

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