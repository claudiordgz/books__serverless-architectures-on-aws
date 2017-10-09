## Repository for Code Notes for book
# Serverless Architectures on AWS

Main differences from book: I'm using `serverless` instead of `awscli`.

Lambdas are kept light, handled from this folder.

## Deploy 

No `npm install` is required for deployment.

```
$ serverless deploy
```

## Test

`npm install` is required for testing as well as `standard`. 

```
$ npm test
```
