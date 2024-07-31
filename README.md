# Chattools (to be changed later)

A collection of tools* to use in text chat.

Uses React for the frontend and the backend API is made with Spring Boot. Caddy acts as a reverse proxy to the backend and serves the frontend.

**So far only one*...


## Run Locally

To run this project locally do the following

```bat
git clone https://github.com/WireBuyer/chattools.git
cd chattools
docker compose up -d
```

This currently uses port 80 for the web server and port 8080 for the backend that serves the API.


## API Reference

#### Convert an image to braille text

```
POST /api/brailleConverter
```
Content-Type: `multipart/form-data`
| Parameter        | Description                |
| :--------------- | :------------------------- |
| `user_image`     | **Required.** The image to upload  |
| `brailleOptions` | (Optional) Parameters to apply  |


brailleOptions:
A JSON object that can contain any combination of parameters. If one dimension is provided it will scale the other following the image aspect ratio. If none are provided a default width of 60 is provided. This must be set with its own `application/json` header (example below).


- **width**: Integer 0 and 5000.
- **height**: Integer 0 and 5000.
- **threshold**: Integer between 0 and 255. Defines the value at which a dot is set.
- **inverted**: A boolean indicating whether the image colors should be inverted.


```json
"brailleOptions": {
    "width": 60,
    "height": 60,
    "threshold": 128,
    "inverted": true
}
```


Examples:
```python
import os

import requests

url = 'http://localhost:8080/api/brailleConverter'
image_filename = 'img.png'

user_image = open(os.path.join(os.getcwd(), image_filename), 'rb')
brailleOptions = {
    'width': 72,
    'inverted': True
}
files = {
    'user_image': user_image,
    'brailleOptions': (None, json.dumps(brailleOptions), 'application/json')
}

response = requests.post(url, files=files)
print(response.text)
```

```bash
curl --location 'http://localhost:8080/api/brailleConverter' \
--form 'user_image=@./img.png' \
--form 'brailleOptions={"height":"100","width":"150","threshold":"150"};type=application/json'
```
