# abnamro-assignment

## To see how works

After starting the docker services, the dependencies will be installed. And if you want, you can run the migration to have the database seeded with sample data.

##### Included Applications

| Application | URL                             |
| ----------- | ------------------------------- |
| API         | `http://localhost:8080`         |
| Client      | `http://localhost:3000`         |
| Neo4j DB    | `http://localhost:7474/browser` |

---

## Commands

### Start docker services

```shell
make up
```

or

```shell
docker-compose up -d
```

This will start the Neo4j database, API, and client docker services.

### Down docker services

```shell
make down
```

or

```shell
docker-compose down
```

### Run API project

```shell
make api-run-dev
```

or

```shell
docker-compose exec api npm run dev
```

This will run the API project on `http://localhost:8080`.

### Run Client project

```shell
make client-run-start
```

or

```shell
docker-compose exec client npm run start
```

This will run the Client project on `http://localhost:3000`.

### Run eslint

```shell
make {api|client}-run-lint
```

or

```shell
docker-compose exec {api|client} npm run lint
```

Run eslint for either {api|client} projects.

### Run prettier

```shell
make {api|client}-run-format
```

or

```shell
docker-compose exec {api|client} npm run format
```

Run prettier for either {api|client} projects.

### Run tests

```shell
make {api|client}-run-test
```

or

```shell
docker-compose exec {api|client} npm run test
```

Run tests for either {api|client} projects.

---

## Migrations

### Run migrations

```shell
make migrate
```

or

```shell
docker-compose exec api npm run migrate
```
