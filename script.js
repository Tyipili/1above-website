let currentFilter = 'all';

function verifyAge() {
    document.getElementById('ageGate').classList.add('hidden');
    localStorage.setItem('ageVerified', 'true');
}

function underAge() {
    alert('You must be at least 19 years old to access this website.');
}

document.addEventListener('DOMContentLoaded', function() {
    // Set current year
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    
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
        'juicebar': 'juicebarPage',
        'liverosin': 'liverosinPage',
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
    const lotNumber = document.getElementById('lotSearch').value.trim().toUpperCase();
    
    if (!lotNumber) {
        // If search is empty, show all products and reset
        resetCOADisplay();
        return;
    }
    
    // Get all product cards
    const productCards = document.querySelectorAll('.coa-product-card');
    let foundMatch = false;
    
    productCards.forEach(card => {
        const variants = card.querySelectorAll('.coa-variant');
        let hasMatch = false;
        
        variants.forEach(variant => {
            const lotText = variant.querySelector('span').textContent;
            const lotCode = lotText.replace('Lot ', '');
            
            if (lotCode.includes(lotNumber)) {
                variant.style.display = 'flex';
                variant.classList.remove('coa-hidden');
                hasMatch = true;
                foundMatch = true;
            } else {
                variant.style.display = 'none';
            }
        });
        
        // Show or hide the entire product card
        if (hasMatch) {
            card.classList.remove('filtered-out');
            // Hide the "View All" button during search
            const viewAllBtn = card.querySelector('.btn-view-all-coa');
            if (viewAllBtn) {
                viewAllBtn.style.display = 'none';
            }
        } else {
            card.classList.add('filtered-out');
        }
    });
    
    if (!foundMatch) {
        alert(`No COA found for lot number: ${lotNumber}`);
        resetCOADisplay();
    }
}

function resetCOADisplay() {
    const productCards = document.querySelectorAll('.coa-product-card');
    
    productCards.forEach(card => {
        card.classList.remove('filtered-out');
        
        const variants = card.querySelectorAll('.coa-variant');
        variants.forEach((variant, index) => {
            // Show first 3, hide the rest
            if (index < 3) {
                variant.style.display = 'flex';
                variant.classList.remove('coa-hidden');
            } else {
                variant.style.display = 'none';
                variant.classList.add('coa-hidden');
            }
        });
        
        // Reset and show "View All" button if there are hidden items
        const viewAllBtn = card.querySelector('.btn-view-all-coa');
        if (viewAllBtn) {
            viewAllBtn.style.display = 'block';
            viewAllBtn.textContent = 'View All COAs';
        }
    });
}

function changeProductImage(imageSrc, thumbnailElement) {
    const mainImage = document.getElementById('mainProductImage');
    if (mainImage) {
        mainImage.src = imageSrc;
    }
    
    const thumbnails = document.querySelectorAll('.ocs-thumbnail');
    thumbnails.forEach(thumb => thumb.classList.remove('active'));
    
    if (thumbnailElement) {
        thumbnailElement.classList.add('active');
    }
}

function toggleProductDetails() {
    const detailsSection = document.getElementById('productDetailsSection');
    const learnMoreLink = document.querySelector('.ocs-learn-more');
    const learnMoreText = document.getElementById('learnMoreText');
    
    if (!detailsSection) return;
    
    if (detailsSection.style.display === 'none') {
        detailsSection.style.display = 'block';
        detailsSection.classList.add('expanding');
        learnMoreLink.classList.add('expanded');
        learnMoreText.textContent = 'SHOW LESS';
        
        setTimeout(() => {
            detailsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
        
        setTimeout(() => {
            detailsSection.classList.remove('expanding');
        }, 400);
    } else {
        detailsSection.classList.add('collapsing');
        learnMoreLink.classList.remove('expanded');
        learnMoreText.textContent = 'LEARN MORE';
        
        setTimeout(() => {
            detailsSection.style.display = 'none';
            detailsSection.classList.remove('collapsing');
        }, 400);
    }
}

function toggleMobileMenu() {
    const navLinks = document.getElementById('navLinks');
    const hamburger = document.getElementById('hamburgerBtn');
    
    if (navLinks && hamburger) {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    }
}

function closeMobileMenu() {
    const navLinks = document.getElementById('navLinks');
    const hamburger = document.getElementById('hamburgerBtn');
    
    if (navLinks && hamburger) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    }
}

function changeJuicebarImage(imageSrc, thumbnailElement) {
    const mainImage = document.getElementById('mainJuicebarImage');
    if (mainImage) {
        mainImage.src = imageSrc;
    }
    
    const thumbnails = document.querySelectorAll('#juicebarPage .ocs-thumbnail');
    thumbnails.forEach(thumb => thumb.classList.remove('active'));
    
    if (thumbnailElement) {
        thumbnailElement.classList.add('active');
    }
}

function toggleJuicebarDetails() {
    const detailsSection = document.getElementById('juicebarDetailsSection');
    const learnMoreLink = document.querySelector('#juicebarPage .ocs-learn-more');
    const learnMoreText = document.getElementById('learnMoreJuicebarText');
    
    if (!detailsSection) return;
    
    if (detailsSection.style.display === 'none') {
        detailsSection.style.display = 'block';
        detailsSection.classList.add('expanding');
        learnMoreLink.classList.add('expanded');
        learnMoreText.textContent = 'SHOW LESS';
        
        setTimeout(() => {
            detailsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
        
        setTimeout(() => {
            detailsSection.classList.remove('expanding');
        }, 400);
    } else {
        detailsSection.classList.add('collapsing');
        learnMoreLink.classList.remove('expanded');
        learnMoreText.textContent = 'LEARN MORE';
        
        setTimeout(() => {
            detailsSection.style.display = 'none';
            detailsSection.classList.remove('collapsing');
        }, 400);
    }
}

function changeLiverosinImage(imageSrc, thumbnailElement) {
    const mainImage = document.getElementById('mainLiverosinImage');
    if (mainImage) {
        mainImage.src = imageSrc;
    }
    
    const thumbnails = document.querySelectorAll('#liverosinPage .ocs-thumbnail');
    thumbnails.forEach(thumb => thumb.classList.remove('active'));
    
    if (thumbnailElement) {
        thumbnailElement.classList.add('active');
    }
}

function toggleLiverosinDetails() {
    const detailsSection = document.getElementById('liverosinDetailsSection');
    const learnMoreLink = document.querySelector('#liverosinPage .ocs-learn-more');
    const learnMoreText = document.getElementById('learnMoreLiverosinText');
    
    if (!detailsSection) return;
    
    if (detailsSection.style.display === 'none') {
        detailsSection.style.display = 'block';
        detailsSection.classList.add('expanding');
        learnMoreLink.classList.add('expanded');
        learnMoreText.textContent = 'SHOW LESS';
        
        setTimeout(() => {
            detailsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
        
        setTimeout(() => {
            detailsSection.classList.remove('expanding');
        }, 400);
    } else {
        detailsSection.classList.add('collapsing');
        learnMoreLink.classList.remove('expanded');
        learnMoreText.textContent = 'LEARN MORE';
        
        setTimeout(() => {
            detailsSection.style.display = 'none';
            detailsSection.classList.remove('collapsing');
        }, 400);
    }
}
