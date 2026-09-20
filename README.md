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
| Parameter   | Description |
| :---------- | :---------- |
| `image`     | **Required.** The image to upload |
| `width`     | Optional integer from 2 to 650 |
| `height`    | Optional integer from 2 to 650 |
| `threshold` | Optional integer from 0 to 255. Defaults to 128 |
| `inverted`  | Optional boolean indicating whether the image colors should be inverted. Defaults to false |


Options are sent as regular multipart form fields. If one dimension is provided it will scale the other following the image aspect ratio. If neither dimension is provided, a default width of 60 is used. Omit optional fields to use their defaults.


Examples:
```python
import os
import requests

url = 'http://localhost:8080/api/brailleConverter'
image_filename = 'img.png'

data = {
    'width': '150',
    'height': '100',
    'threshold': '150',
    'inverted': 'true'
}

with open(os.path.join(os.getcwd(), image_filename), 'rb') as image:
    files = {'image': image}
    response = requests.post(url, files=files, data=data)

print(response.text)
```

```bash
curl --location 'http://localhost:8080/api/brailleConverter' \
--form 'image=@./img.png' \
--form 'height=100' \
--form 'width=150' \
--form 'threshold=150'
```
