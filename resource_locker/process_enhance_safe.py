import re

# Read the ORIGINAL source file again to be safe
try:
    with open('source_from_user.html', 'r', encoding='utf-8') as f:
        content = f.read()
except:
    with open('source_from_user.html', 'r', encoding='latin-1') as f:
        content = f.read()

# 1. Safe Cleanup
content = content.replace('<script src="./IP VERSE - Premium Themes & Plugins_files/f(7).txt"></script>', '')
content = re.sub(r'<script.*?>.*?</script>', '', content, count=0) 

# 2. Branding & Paths
content = content.replace('WPLOCKER.COM - GPL LICENSED WORDPRESS THEMES &amp; PLUGINS', 'IP VERSE - Premium Themes & Plugins')
content = content.replace('WPLOCKER.COM', 'IP VERSE')
content = re.sub(r'href="[^"]+vendors\.css"', 'href="css/vendors.css"', content)
content = re.sub(r'href="[^"]+style\.css"', 'href="css/wplocker_style.css"', content)
content = re.sub(r'href="[^"]+engine\.css"', 'href="css/engine.css"', content)

# 2b. Fix Broken Images
img_counter = 0
def get_placeholder(match):
    global img_counter
    img_counter += 1
    return f'src="https://picsum.photos/seed/{img_counter}/600/400"'

content = re.sub(r'src="\./[^"]+\.(jpg|png|jpeg|gif|webp)"', get_placeholder, content)
content = re.sub(r'srcset="[^"]+"', '', content)

# 3. Inject Enhancements - MODERN PREMIUM DARK
extra_css = """
<style>
    /* MINIMALIST STUDIO GLOBAL */
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');

    body { 
        background-color: #0a0a0a !important; 
        color: #e5e5e5 !important; 
        font-family: 'Inter', sans-serif !important;
        -webkit-font-smoothing: antialiased;
    }

    /* Force Light Text Everywhere - Fixes "Black Text" issue */
    p, span, div, li, td, th { color: #ccc !important; }
    h1, h2, h3, h4, h5, h6, strong, b { color: #fff !important; }
    
    /* Exceptions for specific UI elements usually needing contrast */
    .dl-btn { color: #000 !important; }

    /* Minimal Header */
    .site-header { 
        background: rgba(10, 10, 10, 0.95) !important; 
        border-bottom: 1px solid #333 !important; 
        box-shadow: none !important;
    }

    /* Branding - Pure & Simple */
    .header-logo img, .site-logo img { display: none !important; }
    .header-logo a::after, .site-logo a::after {
        content: "IP Verse.";
        font-weight: 600;
        font-size: 24px;
        color: #fff;
        letter-spacing: -0.5px;
        display: block; padding: 12px 0;
    }
    
    iframe, .adsbygoogle, #watchottparty_app, #watchottparty_chat-wrapper { display: none !important; }

    /* Minimal Cards */
    .mnmd-block, .widget, .post { 
        background: #111 !important; 
        border: 1px solid #222 !important; 
        border-radius: 8px;
        box-shadow: none !important;
        transition: border-color 0.2s ease, transform 0.2s ease;
    }
    
    h1, h2, h3, h4, h5, h6 { 
        color: #fff !important; 
        font-weight: 600 !important;
        letter-spacing: -0.02em;
    }
    a { color: #fff !important; text-decoration: none; opacity: 0.8; transition: opacity 0.2s; }
    a:hover { opacity: 1; }
    
    /* Subtle Interaction */
    .post:hover { 
        border-color: #444 !important; 
        transform: translateY(-2px) !important;
    }

    /* Clean Modal */
    .dl-modal {
        display: none; position: fixed; z-index: 100000; left: 0; top: 0;
        width: 100%; height: 100%; background: rgba(0,0,0,0.5);
        backdrop-filter: blur(4px);
        align-items: center; justify-content: center;
    }
    .dl-content {
        background: #111; border: 1px solid #333; padding: 32px;
        text-align: left; border-radius: 12px; width: 400px;
    }
    .dl-btn {
        background: #fff; color: #000; padding: 12px 24px;
        font-weight: 500; border: none; cursor: pointer;
        border-radius: 6px; font-size: 14px; margin-top: 24px;
        transition: background 0.2s;
    }
    .dl-btn:hover { background: #e5e5e5; }
    
    /* Hide Canvas/Extra */
    #modern-canvas, #royal-canvas, #matrix-canvas { display: none; }
</style>
"""

extra_js = """
<div id="dl-modal" class="dl-modal">
    <div class="dl-content">
        <h3 style="margin-top:0; border-bottom:1px solid #333; padding-bottom:16px; margin-bottom:16px;">Download Resource</h3>
        <p style="color:#888; font-size:14px; line-height:1.5;">You are attempting to access a guarded file from the <strong>IP Verse</strong> archive.</p>
        
        <div style="margin-top:20px;">
            <div style="display:flex; justify-content:space-between; margin-bottom:8px; font-size:12px; color:#666;">
                <span id="status-text">Ready</span>
                <span id="percent-text">0%</span>
            </div>
            <div class="progress-bar" style="width:100%; height:4px; background:#222; border-radius:2px;">
                <div id="dl-progress" style="width:0%; height:100%; background:#fff; border-radius:2px; transition:width 0.2s;"></div>
            </div>
        </div>
        
        <div style="display:flex; gap:12px; margin-top:24px;">
            <button id="unlock-btn" class="dl-btn" style="margin-top:0; flex:1;" onclick="startUnlock()">Download</button>
            <button onclick="document.getElementById('dl-modal').style.display='none'" style="flex:1; background:transparent; border:1px solid #333; color:#fff; border-radius:6px; cursor:pointer;">Cancel</button>
        </div>
    </div>
</div>

<script>
    // Minimal Unlock Logic
    function startUnlock() {
        const btn = document.getElementById('unlock-btn');
        const bar = document.getElementById('dl-progress');
        const status = document.getElementById('status-text');
        const percent = document.getElementById('percent-text');
        
        btn.disabled = true;
        btn.style.opacity = '0.5';
        status.innerText = 'Authenticating...';
        
        let width = 0;
        const interval = setInterval(() => {
            width += 2;
            if(width > 100) width = 100;
            bar.style.width = width + '%';
            percent.innerText = width + '%';

            if(width === 100) {
                clearInterval(interval);
                status.innerText = 'Complete';
                btn.innerText = 'Open File';
                btn.style.opacity = '1';
                btn.style.background = '#22c55e'; // Subtle success green
                btn.style.color = '#fff';
                btn.disabled = false;
                btn.onclick = () => {
                    alert('File Opened');
                    document.getElementById('dl-modal').style.display='none';
                };
            }
        }, 30);
    }

    // Modal Trigger
    document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('a').forEach(link => {
            if(!link.href.includes('#') && !link.href.includes('javascript') && !link.classList.contains('js-search-dropdown-toggle')) {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    document.getElementById('dl-modal').style.display = 'flex';
                    // Reset
                    document.getElementById('unlock-btn').innerText = 'Download';
                    document.getElementById('unlock-btn').style.background = '#fff';
                    document.getElementById('unlock-btn').style.color = '#000';
                    document.getElementById('dl-progress').style.width = '0%';
                    document.getElementById('status-text').innerText = 'Ready';
                    document.getElementById('percent-text').innerText = '0%';
                });
            }
        });
    });
</script>
"""

content = content.replace('</head>', extra_css + '</head>')
content = content.replace('</body>', extra_js + '</body>')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Modern Premium Dark index.html generated.")
