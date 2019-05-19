# api-console-builder
This project can be used to automatically generate web based documentation for RAML Service Contracts.

## Running api-console-builder
### Prerequisites
Depending on your development environment, you will need either [Docker](https://www.docker.com) or [Git](https://git-scm.com/) and [Node.js](https://nodejs.org/) ```(^8.10.0)``` to be properly installed on your computer before api-console-builder can be run.

### Running using Docker
1. Navigate to the directory containing your RAML Service Contract.
2. Execute api-console-builder by running the following command:
```
sudo docker run --init --rm --volume $(pwd):/usr/src/app/api-source "mikeyryan/api-console-builder:latest"
```

### Running from source code
1. Clone the source code repository:
  ```git clone https://github.com/Mike-Gough/api-console-builder```
1. Navigate to the cloned folder:
  ```cd api-console-builder```
1. Install the project dependancies using NPM:
  ```npm install```
1. Execute api-console-builder by running the following command:
  ```
  node --max-old-space-size=8192 build.js <raml-source-path> <destination-path> <main-file-name>
  ```

## Further reading
* [RAML Enforcer - Official Docker Image](https://cloud.docker.com/u/mikeyryan/repository/docker/mikeyryan/raml-enforcer)
* [Linting RESTful API Modelling Language (RAML)](https://mike.gough.me/posts/linting/raml-enforcer/)
* [Creating a docker image to run a Node.js script](https://mike.gough.me/posts/docker/npm/create-image/)
* [Git pre-commit hook for Linting RESTful API Modelling Language (RAML)](https://mike.gough.me/posts/linting/raml-enforcer/git/hooks/)

## Useful links
* [raml.org](https://raml.org/)
* [raml-js-parser-2](https://github.com/raml-org/raml-js-parser-2)
* [lodash](https://lodash.com)
* [commander](https://github.com/tj/commander.js)
* [color](https://github.com/Qix-/color)
