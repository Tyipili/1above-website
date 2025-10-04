let currentFilter = 'all';

function verifyAge() {
    document.getElementById('ageGate').classList.add('hidden');
    localStorage.setItem('ageVerified', 'true');
}

function underAge() {
    alert('You must be at least 19 years old to access this website.');
}

document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem('ageVerified') === 'true') {
        document.getElementById('ageGate').classList.add('hidden');
    }
    
    const overBtn = document.getElementById('overBtn');
    const underBtn = document.getElementById('underBtn');
    
    if (overBtn) {
        overBtn.addEventListener('click', function(e) {
            e.preventDefault();
            verifyAge();
        });
    }
    
    if (underBtn) {
        underBtn.addEventListener('click', function(e) {
            e.preventDefault();
            underAge();
        });
    }
});

function showPage(page) {
    const pages = document.querySelectorAll('.page-container');
    pages.forEach(p => p.classList.remove('active'));
    
    const pageMap = {
        'home': 'homePage',
        'hashhole': 'hashholePage',
        'products': 'productsPage',
        'stockists': 'stockistsPage',
        'coa': 'coaPage'
    };
    
    const pageId = pageMap[page];
    if (pageId) {
        const pageElement = document.getElementById(pageId);
        if (pageElement) {
            pageElement.classList.add('active');
        }
    }
    
    window.scrollTo(0, 0);
    return false;
}

function searchLot() {
    const lotNumber = document.getElementById('lotSearch').value.trim();
    
    if (!lotNumber) {
        alert('Please enter a lot number');
        return;
    }
    
    alert(`Searching for lot number: ${lotNumber}\n\nThis would display the COA document for this lot number.`);
}
