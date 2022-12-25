# Because im on windows i have to add git to my path here
export PATH=/c/Program\ Files/Git:$PATH
# Start database, mine is installed in ~/pgsql, yours may not be, change the path as needed
git-bash.exe -c 'export PGDATA=~/pgsql-data-4 && PG_INSTALL_DIR=~/pgsql && ${PG_INSTALL_DIR}/bin/postgres' & > /dev/null