#!/bin/bash
yarn prisma migrate dev --name deploy
node main.js