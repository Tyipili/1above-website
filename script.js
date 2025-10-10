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
    
    // Initialize dynamic COA buttons
    initializeCOAButtons();
});

function initializeCOAButtons() {
    const productCards = document.querySelectorAll('.coa-product-card');
    
    productCards.forEach(card => {
        const coaGrid = card.querySelector('.coa-grid');
        if (!coaGrid) return;
        
        const allCoaCards = coaGrid.querySelectorAll('.coa-card');
        const totalCOAs = allCoaCards.length;
        
        // If more than 6 COAs, add "View All" button
        if (totalCOAs > 6) {
            // Hide COAs beyond the 6th
            allCoaCards.forEach((coaCard, index) => {
                if (index >= 6) {
                    coaCard.classList.add('coa-hidden');
                    coaCard.style.display = 'none';
                }
            });
            
            // Get product ID from the grid ID
            const gridId = coaGrid.id;
            const productId = gridId.replace('-coas', '');
            
            // Create and add button
            const button = document.createElement('button');
            button.className = 'btn-view-all-coa';
            button.textContent = 'View All COAs';
            button.onclick = function(e) {
                toggleAllCOAs(productId);
                e.stopPropagation();
            };
            
            coaGrid.parentNode.appendChild(button);
        }
    });
}

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
        const coaCards = card.querySelectorAll('.coa-card');
        let hasMatch = false;
        
        coaCards.forEach(coaCard => {
            const lotText = coaCard.querySelector('.coa-lot-number').textContent;
            
            if (lotText.includes(lotNumber)) {
                coaCard.style.display = 'flex';
                coaCard.classList.remove('coa-hidden');
                hasMatch = true;
                foundMatch = true;
            } else {
                coaCard.style.display = 'none';
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
        
        const coaCards = card.querySelectorAll('.coa-card');
        const totalCOAs = coaCards.length;
        
        coaCards.forEach((coaCard, index) => {
            // Show first 6, hide the rest
            if (index < 6) {
                coaCard.style.display = 'flex';
                coaCard.classList.remove('coa-hidden');
            } else {
                coaCard.style.display = 'none';
                coaCard.classList.add('coa-hidden');
            }
        });
        
        // Reset "View All" button if it exists
        const viewAllBtn = card.querySelector('.btn-view-all-coa');
        if (viewAllBtn && totalCOAs > 6) {
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

function toggleAllCOAs(product) {
    const container = document.getElementById(product + '-coas');
    if (!container) return;
    
    const hiddenCOAs = container.querySelectorAll('.coa-hidden');
    const button = container.parentNode.querySelector('.btn-view-all-coa');
    
    if (!button) return;
    
    hiddenCOAs.forEach(coa => {
        if (coa.style.display === 'flex') {
            coa.style.display = 'none';
        } else {
            coa.style.display = 'flex';
        }
    });
    
    if (button.textContent === 'View All COAs') {
        button.textContent = 'Show Less';
    } else {
        button.textContent = 'View All COAs';
    }
}
