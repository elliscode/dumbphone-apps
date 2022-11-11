# Converting to python

currently converting to python, this will be my notepad

# Running

```
export PGDATA=~/pgsql-data && ./postgres.exe
```

```
export JAVA_HOME=~/.ellis-artifacts/jdk-11.0.2/ && ~/.ellis-artifacts/gradle-7.5.1/bin/gradle bootRun
```

# Cache and secrets folder layout

- `$HOME/dumbphone-apps`
    - `grocery-list`
        - `list.txt` &mdash; automatically generated on the first call to the `/grocery-list` endpoint
    - `weather`
        - `forecast.json` &mdash; automatically generated on the first call to the `/weather` endpoint
        - `weather.json` &mdash; automatically generated on the first call to the `/weather` endpoint
        - `weather.key` &mdash; needs to be populated with your valid API key for [the OpenWeatherMap.org API](https://openweathermap.org/api)
    - `remember.key` &mdash; automatically generated on the startup of the program, a random UUID used for the **Remember Me** login checkbox