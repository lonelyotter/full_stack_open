FROM node:16

WORKDIR /usr/src/app

ENV DEBUG=todo-backend:*

CMD npm run dev
