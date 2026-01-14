import requests

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
}

try:
    print("Downloading homepage...")
    r = requests.get('https://www.wplocker.com/', headers=headers)
    r.raise_for_status()
    
    content = r.text
    # Basic cleanup on the fly:
    # 1. Point CSS to local files
    content = content.replace('https://www.wplocker.com/templates/wplocker_v2/css/style.css', 'css/wplocker_style.css')
    content = content.replace('https://www.wplocker.com/templates/wplocker_v2/css/vendors.css', 'css/vendors.css')
    content = content.replace('https://www.wplocker.com/templates/wplocker_v2/css/engine.css', 'css/engine.css')
    
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Saved as index.html")
except Exception as e:
    print(f"Failed: {e}")
