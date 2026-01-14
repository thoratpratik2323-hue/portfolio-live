document.addEventListener('DOMContentLoaded', () => {

    // Live Search Functionality
    const searchInput = document.querySelector('.search-form__input'); // We need to add this class to input
    const postCards = document.querySelectorAll('.post-card');
    const searchBtn = document.querySelector('.search-btn');

    // Create a Search Input if it doesn't strictly exist in the header yet (we only had a button)
    // For this demo, let's inject a search bar overlay or just replace the button with an input for "Power"

    // Let's make the Search Button toggle a real input field
    let searchContainer = document.createElement('div');
    searchContainer.className = 'search-overlay';
    searchContainer.innerHTML = `
        <div class="search-box">
            <input type="text" id="live-search" placeholder="Type to filter resources...">
            <i class="fas fa-times close-search"></i>
        </div>
    `;
    document.body.appendChild(searchContainer);

    const liveSearchInput = document.getElementById('live-search');
    const closeSearch = document.querySelector('.close-search');

    // Toggle Search Overlay
    searchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        searchContainer.classList.add('active');
        liveSearchInput.focus();
    });

    closeSearch.addEventListener('click', () => {
        searchContainer.classList.remove('active');
        liveSearchInput.value = '';
        filterPosts(''); // Reset
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            searchContainer.classList.remove('active');
        }
    });

    // Live Filter Logic
    liveSearchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        filterPosts(term);
    });

    function filterPosts(term) {
        postCards.forEach(card => {
            const title = card.querySelector('.post-title').innerText.toLowerCase();
            const category = card.querySelector('.category-tag').innerText.toLowerCase();

            if (title.includes(term) || category.includes(term)) {
                card.style.display = 'block';
                // Add a little pop animation
                card.style.animation = 'fadeIn 0.3s ease';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Add Keyframe for animation dynamically
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .search-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.9);
            z-index: 2000;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s ease;
        }
        .search-overlay.active {
            opacity: 1;
            pointer-events: all;
        }
        .search-box {
            position: relative;
            width: 80%;
            max-width: 800px;
        }
        .search-box input {
            width: 100%;
            background: transparent;
            border: none;
            border-bottom: 3px solid var(--accent-color);
            padding: 20px;
            font-size: 2rem;
            color: var(--white);
            outline: none;
            font-family: inherit;
        }
        .close-search {
            position: absolute;
            right: 20px;
            top: 20px;
            font-size: 2rem;
            color: #666;
            cursor: pointer;
            transition: color 0.3s;
        }
        .close-search:hover {
            color: var(--accent-color);
        }
    `;
    document.head.appendChild(style);

});
