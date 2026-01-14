import re

# Read the user's source file
try:
    with open('source_from_user.html', 'r', encoding='utf-8') as f:
        content = f.read()
except UnicodeDecodeError:
    with open('source_from_user.html', 'r', encoding='latin-1') as f:
        content = f.read()

# 1. basic Branding
content = content.replace('WPLOCKER.COM - GPL LICENSED WORDPRESS THEMES &amp; PLUGINS', 'IP VERSE - Premium Themes & Plugins')
content = content.replace('WPLOCKER.COM', 'IP VERSE')

# 2. Fix CSS Paths (Regex to catch the complex local paths)
# Replace "./WPLOCKER.../vendors.css" with "css/vendors.css"
content = re.sub(r'href="[^"]+vendors\.css"', 'href="css/vendors.css"', content)
content = re.sub(r'href="[^"]+style\.css"', 'href="css/wplocker_style.css"', content)
content = re.sub(r'href="[^"]+engine\.css"', 'href="css/engine.css"', content)

# 3. Inject Branding & Power Up CSS
style_block = """
<style>
    /* Branding Overrides */
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
    
    /* Hide Ads & Broken Images */
    iframe, .adsbygoogle { display: none !important; }
    img[src*="logo.png"] { display: none !important; }
    #watchottparty_app { display: none !important; }

    /* Dark Mode Global Overrides */
    body { background-color: #121212 !important; color: #ccc !important; }
    .site-wrapper { background-color: #121212 !important; }
    .site-header { background: #0f0f0f !important; border-bottom: 2px solid #00ff99 !important; }
    .mnmd-block { background: #1e1e1e !important; border: 1px solid #333 !important; }
    .post { background: #1e1e1e !important; border-bottom: 1px solid #333 !important; }
    h1, h2, h3, h4, h5, h6, .post__title a { color: #fff !important; }
    a:hover { color: #00ff99 !important; }
    
    /* Live Search Overlay */
    .search-overlay {
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.95); z-index: 9999;
        display: flex; align-items: center; justify-content: center;
        opacity: 0; pointer-events: none; transition: opacity 0.3s;
    }
    .search-overlay.active { opacity: 1; pointer-events: all; }
    .search-input {
        background: transparent; border: none; border-bottom: 2px solid #00ff99;
        color: #fff; font-size: 2em; width: 80%; outline: none;
    }
</style>
"""
# Insert after </head> (technically before, but appending to head)
content = content.replace('</head>', style_block + '</head>')

# 4. Inject JS
js_block = """
<script>
    // Live Search Logic
    const searchBtns = document.querySelectorAll('.js-search-dropdown-toggle, .mobile-header-btn');
    const searchOverlay = document.createElement('div');
    searchOverlay.className = 'search-overlay';
    searchOverlay.innerHTML = '<input type="text" class="search-input" placeholder="Type to filter IP Verse...">';
    document.body.appendChild(searchOverlay);
    
    const searchInput = searchOverlay.querySelector('.search-input');
    
    searchBtns.forEach(btn => btn.addEventListener('click', (e) => {
        e.preventDefault();
        searchOverlay.classList.toggle('active');
        if(searchOverlay.classList.contains('active')) searchInput.focus();
    }));
    
    searchOverlay.addEventListener('click', (e) => {
        if(e.target === searchOverlay) searchOverlay.classList.remove('active');
    });

    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        document.querySelectorAll('.post').forEach(post => {
            const title = post.innerText.toLowerCase();
            post.style.display = title.includes(term) ? 'block' : 'none';
        });
    });
</script>
"""
content = content.replace('</body>', js_block + '</body>')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Processed source_from_user.html -> index.html")
