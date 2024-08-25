# SURBANA CODING TEST

## Business requirements

Build a simple restful API system (just Backend, no
requires frontend) to allow users can create/update/delete locations.

## Technical requirements

Database design: have to support the address location tree (PostgreSQL require).

## Document for project

Link: https://drive.google.com/file/d/1A9zg3cVP5ZllGBZuogkRYzl8NdqwilW5/view

## API Document

Run the project successfully by following the instructions below and open `http://${host}:${port}/api/docs/`

## Installation

1. Clone the Repo:

```sh
git clone https://github.com/nqqduy/surbana-coding-test.git surbana
```

2. Navigate to the project directory:

```sh
cd surbana
```

3. Install dependencies

```sh
npm i
```

4. Install and set up database

If you haven't installed Docker, please install Docker from the following [here](https://docs.docker.com/engine/install/)

Set up database with Docker

```
docker compose up -d
```

6. Fill database configuration in .env file

```
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=surbana
DATABASE_PASSWORD='abcd1xyz2345#$!@'
DATABASE_DB_NAME=surbana
```

You can change configuration in docker-compose.yml

7. Run migration

```sh
npm run build
npm run migration:run
```

Note: you can check the package.json file for more commands \
If you want to create a migration

```sh
npm run migration:create <file_name>
```

If you want to revert:

```sh
npm run migration:revert
```

## USAGE

1. First of all, please fill configuration in .env file

```
HOST=localhost
PORT=3000
SERVER_PREFIX=api

DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=surbana
DATABASE_PASSWORD='abcd1xyz2345#$!@'
DATABASE_DB_NAME=surbana
```

2. Start project with dev mode

```
npm run dev
```

## Deploy

You should build before starting

```sh
npm run build
npm start
```
