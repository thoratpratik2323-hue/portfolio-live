import base64

def reverse_string(s):
    return s[::-1]

def mock_atob(s):
    return base64.b64decode(s).decode('latin1')

def mock_btoa(s):
    return base64.b64encode(s.encode('latin1')).decode('ascii')

# ---------------------------------------------------------
# Block 1: Arrays and Shifting
# ---------------------------------------------------------

_0x2cf7db = ['init','44219ZnKbTb','reverse','atob','length','counter','function *\x5c( *\x5c)','test','btoa','2840328PMommA','charCodeAt','2641995Iponkz','apply','chain','fromCharCode','action','\x5c+\x5c+\x20*(?:[a-zA-Z_$][0-9a-zA-Z_$]*)','stateObject','constructor','prepend','2381452URrSQQ','join','902651FfMDhJ','27qsEJYo','3861435OuvSNu','input','2BBXzUi','8919830WZVChe','debu','568QWPubI','gger']

def _0x5a71(index, _):
    # The actual code subtracts 0x18d
    idx = index - 0x18d
    return _0x2cf7db[idx]

# Shifter Logic
target = 0x7a0ba # 499898

def get_int(idx):
    val = _0x5a71(idx, None)
    try:
        return int(val)
    except:
        return 0

max_shifts = 1000
shifts = 0
while shifts < max_shifts:
    try:
        # parsed calculation
        # -parseInt(_0x52ff42(0x1a7))/0x1*(-parseInt(_0x52ff42(0x1ab))/0x2)+...
        # Indices: 0x1a7(26), 0x1ab(30?? Out of bounds?), 0x19c(15), 0x1a5(24), 0x1a9(28), 0x19a(13), 0x192(5), 0x18f(2), 0x1a8(27), 0x18d(0)
        
        # Note: 0x1ab = 427. 427-397 = 30. len is 31. So 30 is 'gger'.
        
        val = -get_int(0x1a7)/1 * (-get_int(0x1ab)/2) + \
               get_int(0x19c)/3 + \
               get_int(0x1a5)/4 + \
               get_int(0x1a9)/5 + \
               get_int(0x19a)/6 + \
               get_int(0x192)/7 * (-get_int(0x18f)/8) + \
               -get_int(0x1a8)/9 * (get_int(0x18d)/10)
        
        if int(val) == target:
            break
    except Exception as e:
        pass
        
    # shift: push(shift()) -> pop(0) and append
    first = _0x2cf7db.pop(0)
    _0x2cf7db.append(first)
    shifts += 1

print(f"Block 1 shifts: {shifts}")

# ---------------------------------------------------------
# Block 2: Arrays and Shifting
# ---------------------------------------------------------

_0x15f80e = ['#count','#progress_bar_div','submit','location','1374896cODCJQ','hide','val','<b>','35sEXiot','parse','START','#stopBtn','replace','width','html','<br>','#mobno','#progress_bar','status','post','ready','911432ccIZsu','new','message','#submitBtnText','Sending...','2787015qGdRzM','/smsbomber/success','#country_code','css','\x20SMS\x20SENT</b>','/smsbomber/','74022XWQmeE','[name=_token]','Start',':checked','each','#startsms','#showerror','314793PlykPh','disabled','3380016QOLlPx','#sendsms','show','378191yDtSjs','#showsuccess','#startsms_spinner','#mediumSpeed','prop']

def _0x5c5c(index, _=None):
    idx = index - 0x1d5
    return _0x15f80e[idx]

target2 = 0x48bba # 297914

def get_int2(idx):
    val = _0x5c5c(idx)
    try:
        return int(val)
    except:
        return 0
        
shifts2 = 0
while shifts2 < max_shifts:
    try:
        # parseInt(_0x5ddb3f(0x1d5))/0x1+-parseInt(_0x5ddb3f(0x1ef))/0x2+parseInt(_0x5ddb3f(0x201))/0x3+parseInt(_0x5ddb3f(0x1de))/0x4+-parseInt(_0x5ddb3f(0x1f4))/0x5+-parseInt(_0x5ddb3f(0x1fa))/0x6*(-parseInt(_0x5ddb3f(0x1e2))/0x7)+parseInt(_0x5ddb3f(0x203))/0x8;
        val = get_int2(0x1d5)/1 + \
              -get_int2(0x1ef)/2 + \
              get_int2(0x201)/3 + \
              get_int2(0x1de)/4 + \
              -get_int2(0x1f4)/5 + \
              -get_int2(0x1fa)/6 * (-get_int2(0x1e2)/7) + \
              get_int2(0x203)/8
              
        if int(val) == target2:
            break
    except:
        pass
        
    first = _0x15f80e.pop(0)
    _0x15f80e.append(first)
    shifts2 += 1
    
print(f"Block 2 shifts: {shifts2}")

# ---------------------------------------------------------
# Decryption Logic
# ---------------------------------------------------------

def manav_encrypt(text):
    # _0x91cab7 is _0x5a71
    # length: 0x195
    # charCodeAt: 0x19b
    # fromCharCode: 0x19f
    # btoa: 0x199
    
    res = ""
    for i in range(len(text)):
        code = ord(text[i])
        new_code = code ^ 0x33
        res += chr(new_code)
        
    # btoa(btoa(res))
    b1 = mock_btoa(res)
    b2 = mock_btoa(b1)
    
    return reverse_string(b2)

# Verify mapping
# console.log("Endpoint Suffix (0x1f9):", _0x5c5c(0x1f9));
# console.log("Method (0x1ed):", _0x5c5c(0x1ed));

suffix = _0x5c5c(0x1f9)
method = _0x5c5c(0x1ed)
captcha = "gjDErFIKkcQu72yGVoPRLPUYE"
enc = manav_encrypt(captcha)

print(f"Suffix: {suffix}")
print(f"Method: {method}")
print(f"Encrypted Captcha: {enc}")

