FROM node:alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Set build arguments for API keys
ARG NEWS_API_KEY
ARG THE_GUARDIAN_API_KEY
ARG NYTIMES_API_KEY

# Pass API keys as environment variables to the React app during build
ENV REACT_APP_NEWS_API_KEYE=$NEWS_API_KEY
ENV REACT_APP_GUARDIAN_API_KEY=$THE_GUARDIAN_API_KEY
ENV REACT_APP_NYTIMES_API_KEY=$NYTIMES_API_KEY

RUN npm run build

# Expose port 3000 to the outside world
EXPOSE 3000

# Command to run the React app
CMD ["npm", "start"]
