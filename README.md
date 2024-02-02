# Suspicious electricity line
## Table of Contents
- [Suspicious electricity line](#suspicious-electricity-line)
  - [Table of Contents](#table-of-contents)
  - [General info](#general-info)
  - [Technologies](#technologies)
  - [Installation and Execution](#installation-and-execution)
    - [Installation](#installation)
    - [Execution](#execution)

## General info
This project aims to detect suspicious electricity lines by analyzing the median of the readings throughout the year and identifying lines that fall outside a predefined threshold relative to the median. The code follows a structured hexagonal architecture.

## Technologies
***
A list of technologies used within the project:
* [Node.js](https://nodejs.org/en) Version: 20.11.0
* [Npm](https://www.npmjs.com/) Version: 10.2.4
* [Docker](https://www.docker.com/) Version: 20.10.20

## Installation and Execution
### Installation
```
git clone git@github.com:fervalnav/suspicious-electricity-line.git
cd suspicious-electricity-line
npm i
```
### Execution
Run tests: ``` npm run test ```
Run development version with CSV or XML data: ``` npm run dev:csv ``` or  ```npm run dev:xml```

Build and run the final version with Docker:

```
npm run build
docker build -t suspicious-reading-detector:1.0.0 .
docker run -ti suspicious-reading-detector:1.0.0
```

Alternatively, you can execute all quickly with: ```sh run.sh```



