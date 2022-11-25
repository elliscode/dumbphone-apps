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
    - `secret-key.txt` &mdash; automatically generated on the startup of the server, see `/dumbphoneapps/settings.py`

```python
# We will check if there exists a secret, if not, write out a
# randomly generated key, and use it
home = Path.home()
secret_path = home / 'dumbphone-apps' / 'secret-key.txt'
if not os.path.isfile(secret_path):
    secret_file = open(secret_path, 'w')
    secret_file.write(secrets.token_urlsafe())
    secret_file.close()
secret_file = open(secret_path, 'r')
SECRET_KEY = secret_file.readline()
```