# FranGPT

- This project is in Beta and under a lot of test :)

## Functions and cool information:
- Allows to ingest many docs the user wish
- Can talk in multiple languages according the conversation
- U are able to ask FranGPT which themes she can talk about

## Warnings⚠️: 
- Make sure your local node version is above 18 🤗

## For installation in your own pc, you'll have to clone this repo

Install dependencies: 

```javascript
yarn
```

To ingest new data, you'll have to run the ingestion command, by typin':


```javascript
npm run ingest
```

## Thriggers
- Don't forget you have to create your account in both Pinecone (vectordatabase) & OpenAI API, that means u also have to create a .env file to put your privacy-data. In the .env insert your OPENAI API KEY, PINECONE API KEY, PINECONE ENVIRONMENT and PINECONE INDEX NAME
