# kaiandkaro.com AI Agent Project
Objectives (Focus on LLM functionalities)
1. Realtime data processing from db to AI applications
2. Easy Integraton with existing services
3. Vision API for images 
---
## Introduction
This Project has a two modules, the ```Frontend/Client``` and the  ```Backend Server```.

## Problem

Image for unavailable live chat

Scrape data from Kai and karo

Create Embeddings from the data

Search via a conversation

Advice/Recommendation on Cars

Feature Contibutions - Vision 

## Solution
Embedding the query and passing it to a cosine similary function to find similar chunks then return relevant answers based on this data


# SETTING UP

## Client - built on nextjs
Similarity Search implementation
---

```.env variables```
Set up [ASTRA DB](https://accounts.datastax.com/session-service/v1/login) and setup a database instance
Get the following from the database 
1. ASTRA_DB_APPLICATION_TOKEN
2. ASTRA_DB_API_ENDPOINT
3. Make sure to connect Open AI as the embedding model with a service key
4. Add the sample data or your own data to the database and select description as the column to create vector embeddings

run ```pnpm install``` to install node packages
```pnpm run dev``` to start server


## Server - built on fast api
1. FAQ chat bot using 
2. RAG on car images (similarity search)
3. AI sales Agent 
4. Visual Assistant
---


