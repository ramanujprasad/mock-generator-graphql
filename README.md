# mock-generator-graphql
A code generator plugin for creating stubs of an API

- **GraphQL**: I have used open graphql playground url for countries https://countries.trevorblades.com/

## Context

This is the practical demo for generating the mock data (__files) and mappings for graphql based applications.

<p align="center">
<img src="https://github.com/ramanujprasad/mock-generator-graphql/blob/main/src/assets/images/graphql.png" alt="Graphql playground">
</p> 

## Add mappings

Add mappings and configurations in codegen.yml file to generate the mocks

## How to generate the mocks

Run `npm install` to install the dependencies 

Run `npm run build:watch` to generate the mock folder. You can find the mappings and files generated in this folder.

> Generated folder:

### A typical layout
    .
    mock
    ├── build                   # Generated mock json files
    └── README.md               # Generated mapping based on codegen.yml file

    .
mock
    ├── __files                   # Generated mock json files
    └── mappings                  # Generated mapping based on codegen.yml file

> You could also see `dist` folder generated for compiles libraries.