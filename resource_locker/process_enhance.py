import re

# Read the file
try:
    with open('source_from_user.html', 'r', encoding='utf-8') as f:
        content = f.read()
except:
    with open('source_from_user.html', 'r', encoding='latin-1') as f:
        content = f.read()

# 1. Clean Garbage (WatchOTT Party, Trackers)
# Remove the inline styles related to watchottparty
content = re.sub(r'#watchottparty[\s\S]*?}\s*}', '', content) 
# Remove Google Origin Trials and scripts
content = re.sub(r'<script src=.*?f\(7\)\.txt.*?</script>', '', content, flags=re.DOTALL)
content = re.sub(r'<meta http-equiv="origin-trial".*?>', '', content)

# 2. Fix Paths & Branding
content = content.replace('WPLOCKER.COM - GPL LICENSED WORDPRESS THEMES &amp; PLUGINS', 'IP VERSE - Premium Themes & Plugins')
content = content.replace('WPLOCKER.COM', 'IP VERSE')
content = re.sub(r'href="[^"]+vendors\.css"', 'href="css/vendors.css"', content)
content = re.sub(r'href="[^"]+style\.css"', 'href="css/wplocker_style.css"', content)
content = re.sub(r'href="[^"]+engine\.css"', 'href="css/engine.css"', content)

# 3. Inject Enhancements (Matrix Rain + Download Modal)
# We add a canvas for matrix rain at start of body
# We add a modal for downloads at end of body

extra_css = """
<style>
    /* Branding & Cleanup */
    .header-logo img, .site-logo img { display: none !important; }
    .header-logo a::after, .site-logo a::after {
        content: "IP VERSE";
        font-weight: 900;
        font-size: 24px;
        color: #fff;
        line-height: 1;
        letter-spacing: 1px;
        text-transform: uppercase;
        display: block;
        padding: 5px 0;
    }
    iframe, .adsbygoogle, #watchottparty_app { display: none !important; }

    /* Dark Mode Global */
    body { background-color: #050505 !important; color: #ccc !important; overflow-x: hidden; }
    .site-header { background: rgba(10,10,10,0.95) !important; border-bottom: 1px solid #00ff99 !important; }
    .mnmd-block, .widget, .post { background: #111 !important; border: 1px solid #222 !important; box-shadow: 0 4px 10px rgba(0,0,0,0.5); }
    h1, h2, h3, h4, h5, h6, a { color: #fff !important; }
    a:hover { color: #00ff99 !important; text-shadow: 0 0 8px #00ff99; }
    
    /* Interactive Cards */
    .post { transition: all 0.3s ease; }
    .post:hover { transform: translateY(-5px); border-color: #00ff99 !important; box-shadow: 0 0 15px rgba(0,255,153,0.2) !important; }

    /* Matrix Rain Canvas */
    #matrix-canvas {
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        z-index: -1; opacity: 0.1;
    }

    /* Download Modal */
    .dl-modal {
        display: none; position: fixed; z-index: 10000; left: 0; top: 0;
        width: 100%; height: 100%; background-color: rgba(0,0,0,0.9);
        align-items: center; justify-content: center;
    }
    .dl-content {
        background: #111; border: 2px solid #00ff99; padding: 40px;
        text-align: center; border-radius: 10px; box-shadow: 0 0 30px #00ff99;
        max-width: 500px; position: relative;
    }
    .dl-btn {
        background: #00ff99; color: #000; padding: 15px 30px;
        font-size: 1.2rem; font-weight: bold; text-decoration: none;
        display: inline-block; margin-top: 20px; cursor: pointer;
        border: none;
    }
    .dl-btn:hover { background: #fff; box-shadow: 0 0 20px #fff; }
    .lock-icon { font-size: 4rem; color: #00ff99; margin-bottom: 20px; }
</style>
"""

extra_html = """
<canvas id="matrix-canvas"></canvas>
<div id="dl-modal" class="dl-modal">
    <div class="dl-content">
        <i class="lock-icon" style="font-family: sans-serif;">🔒</i>
        <h2>SECURE DOWNLOAD</h2>
        <p>You are accessing a premium resource from the <strong>IP VERSE</strong> archive.</p>
        <p style="color: #888; font-size: 0.9em;">Verification Required for Unregistered Users</p>
        <button class="dl-btn" onclick="alert('Access Granted! (Simulation)')">UNLOCK LINK</button>
        <button onclick="document.getElementById('dl-modal').style.display='none'" style="margin-top:20px; background:none; border:none; color:#555; display:block; width:100%; cursor:pointer;">Close</button>
    </div>
</div>

<script>
    // Matrix Rain
    const canvas = document.getElementById('matrix-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const chars = '01ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const drops = Array(Math.floor(canvas.width/20)).fill(1);
    
    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#0F0';
        ctx.font = '15px monospace';
        for(let i=0; i<drops.length; i++) {
            const text = chars[Math.floor(Math.random()*chars.length)];
            ctx.fillText(text, i*20, drops[i]*20);
            if(drops[i]*20 > canvas.height && Math.random() > 0.975) drops[i] = 0;
            drops[i]++;
        }
    }
    setInterval(draw, 50);

    // Modal Trigger
    document.querySelectorAll('a').forEach(link => {
        if(link.href.includes('#') || link.href.includes('javascript')) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                document.getElementById('dl-modal').style.display = 'flex';
            });
        }
    });
</script>
"""

# Inject CSS before </head>
content = content.replace('</head>', extra_css + '</head>')
# Inject HTML/JS before </body>
content = content.replace('</body>', extra_html + '</body>')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Enhanced index.html generated.")
