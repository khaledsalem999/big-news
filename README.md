Hello,

The apis I used were from newsapi, new york times api and guardian apis, make sure to obtain API keys from those websites and pass them when you build the docker image like below.

thats it :)

```
docker build \
  --build-arg NEWS_API_KEY=your_api_key_one \
  --build-arg THE_GUARDIAN_API_KEY=your_api_key_two \
  --build-arg NYTIMES_API_KEY=your_api_key_three \
  -t big-news .
```
