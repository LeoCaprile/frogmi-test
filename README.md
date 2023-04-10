# Incident store test
This is a test of a class, built with typescript and tested with vitest (better than jest, 0 config needed).
- [Incident store test](#incident-store-test)
  - [Install](#install)
  - [test](#test)
  - [folder structure](#folder-structure)
  - [docs](#docs)


## Install

- open terminal
- clone repo (`git clone`)
- cd into the repo folder
- execute `yarn install`

## test

- execute `yarn test`

## folder structure

- "__tests__" : has the tests for the class.
- index.ts: has the logic.

## docs

class:

- Store: takes an incidents array as argument.
  - properties:
    - incidents (public)
  - methods:
    - incident_status (public): takes 2 optional parameters, which are Dates objects, and return the incident resume object, which counts open/closed cases, average time solution of open cases, and maximum time solution of open cases.
  - types: see interfaces inside index.ts
