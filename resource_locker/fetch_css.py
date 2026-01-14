import requests
import os

os.makedirs('css', exist_ok=True)

urls = {
    'css/wplocker_style.css': 'https://www.wplocker.com/templates/wplocker_v2/css/style.css',
    'css/vendors.css': 'https://www.wplocker.com/templates/wplocker_v2/css/vendors.css',
    'css/engine.css': 'https://www.wplocker.com/templates/wplocker_v2/css/engine.css'
}

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
}

for path, url in urls.items():
    try:
        print(f"Downloading {url}...")
        r = requests.get(url, headers=headers)
        r.raise_for_status()
        with open(path, 'w', encoding='utf-8') as f:
            f.write(r.text)
        print(f"Saved to {path}")
    except Exception as e:
        print(f"Failed to download {url}: {e}")
