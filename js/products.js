document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // Product data
    const products = [
        {
            id: 1,
            category: 'Spices',
            name: 'Red Chilli Powder',
            description: 'Hand-ground premium red chilli powder with rich color and intense flavor.',
            image: 'https://cdn.pixabay.com/photo/2020/05/11/21/57/red-chilli-5160328_1280.jpg',
            features: ['No additives', 'Hand-ground', 'Rich in flavor']
        },
        {
            id: 2,
            category: 'Spices',
            name: 'Turmeric Powder',
            description: 'Pure, golden turmeric powder ground fresh from high-curcumin turmeric roots.',
            image: 'https://cdn.pixabay.com/photo/2020/07/04/06/45/turmeric-5368399_1280.jpg',
            features: ['High curcumin content', 'No artificial colors', 'Village-sourced']
        },
        {
            id: 3,
            category: 'Spices',
            name: 'Coriander Powder',
            description: 'Aromatic coriander seeds ground into fine powder for authentic flavor.',
            image: 'https://cdn.pixabay.com/photo/2022/01/26/19/20/coriander-6969247_1280.jpg',
            features: ['Aromatic', 'Traditional grinding', 'No preservatives']
        },
        {
            id: 4,
            category: 'Spices',
            name: 'Black Pepper',
            description: 'Premium black peppercorns ground to perfection for that spicy kick.',
            image: 'https://cdn.pixabay.com/photo/2016/10/13/05/58/black-pepper-1736875_1280.jpg',
            features: ['Strong aroma', 'Freshly ground', 'Rich in antioxidants']
        },
        {
            id: 5,
            category: 'Spices',
            name: 'Cumin Seeds (Jeera)',
            description: 'Whole cumin seeds with strong, distinctive flavor for traditional recipes.',
            image: 'https://cdn.pixabay.com/photo/2019/01/14/08/32/cumin-3931490_1280.jpg',
            features: ['Whole seeds', 'Strong aroma', 'Traditional farming']
        },
        {
            id: 6,
            category: 'Oils',
            name: 'Cold-Pressed Mustard Oil',
            description: 'Traditional cold-pressed mustard oil with characteristic pungency and health benefits.',
            image: 'https://cdn.pixabay.com/photo/2018/08/27/00/43/mustard-oil-3634139_1280.jpg',
            features: ['Cold-pressed', 'No chemicals', 'Traditional method']
        },
        {
            id: 7,
            category: 'Flour',
            name: 'Stone-Ground Wheat Flour',
            description: 'Nutrient-rich wheat flour ground using traditional stone grinding method.',
            image: 'https://cdn.pixabay.com/photo/2019/10/13/08/23/wheat-4546599_1280.jpg',
            features: ['Stone-ground', 'Retains nutrients', 'No additives']
        }
    ];

    // Function to generate product cards
    function generateProductCards() {
        const productGrid = document.querySelector('.product-grid');
        if (!productGrid) return;
        
        productGrid.innerHTML = '';
        
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card reveal';
            
            // Generate feature list HTML
            const featureListHTML = product.features.map(feature => 
                `<li><i class="fas fa-check" style="color: var(--primary-color); margin-right: 8px;"></i>${feature}</li>`
            ).join('');
            
            productCard.innerHTML = `
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-info">
                    <div class="product-category">${product.category}</div>
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <ul class="product-features" style="list-style: none; padding-left: 0; margin-bottom: 1rem;">
                        ${featureListHTML}
                    </ul>
                    <div class="product-footer">
                        <button class="btn btn-outline product-details-btn" data-product-id="${product.id}">Learn More</button>
                    </div>
                </div>
            `;
            
            productGrid.appendChild(productCard);
        });
        
        // Add event listeners to detail buttons
        document.querySelectorAll('.product-details-btn').forEach(button => {
            button.addEventListener('click', function() {
                const productId = parseInt(this.getAttribute('data-product-id'));
                showProductDetails(productId);
            });
        });
    }

    // Function to show product details modal
    function showProductDetails(productId) {
        const product = products.find(p => p.id === productId);
        if (!product) return;
        
        // Create modal element if it doesn't exist
        let modal = document.getElementById('product-modal');
        
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'product-modal';
            modal.className = 'modal';
            document.body.appendChild(modal);
            
            // Add modal styles
            const style = document.createElement('style');
            style.textContent = `
                .modal {
                    display: none;
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0.7);
                    z-index: 1001;
                    overflow: auto;
                    animation: fadeIn 0.3s;
                }
                
                .modal-content {
                    background-color: var(--background-color);
                    margin: 10% auto;
                    padding: 2rem;
                    border-radius: var(--border-radius);
                    max-width: 800px;
                    box-shadow: var(--box-shadow);
                    position: relative;
                    animation: slideUp 0.4s;
                }
                
                .modal-close {
                    position: absolute;
                    top: 15px;
                    right: 15px;
                    font-size: 1.5rem;
                    cursor: pointer;
                    color: var(--secondary-color);
                    transition: var(--transition);
                }
                
                .modal-close:hover {
                    color: var(--primary-color);
                }
                
                .modal-product {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 2rem;
                }
                
                .modal-product-image {
                    border-radius: var(--border-radius);
                    overflow: hidden;
                }
                
                .modal-product-image img {
                    width: 100%;
                    height: auto;
                    object-fit: cover;
                }
                
                .modal-product-info h2 {
                    margin-bottom: 0.5rem;
                }
                
                .modal-product-category {
                    display: inline-block;
                    background-color: var(--primary-color);
                    color: white;
                    padding: 0.25rem 0.75rem;
                    border-radius: 20px;
                    font-size: 0.8rem;
                    margin-bottom: 1rem;
                }
                
                .modal-product-description {
                    margin-bottom: 1.5rem;
                }
                
                .modal-product-features {
                    margin-bottom: 1.5rem;
                }
                
                .modal-product-features h3 {
                    margin-bottom: 0.75rem;
                }
                
                .modal-product-features ul {
                    list-style: none;
                    padding-left: 0;
                }
                
                .modal-product-features li {
                    margin-bottom: 0.5rem;
                    display: flex;
                    align-items: center;
                }
                
                .modal-product-features i {
                    color: var(--primary-color);
                    margin-right: 10px;
                }
                
                @media screen and (max-width: 768px) {
                    .modal-product {
                        grid-template-columns: 1fr;
                    }
                    
                    .modal-content {
                        margin: 15% auto;
                        padding: 1.5rem;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Generate feature list HTML
        const featureListHTML = product.features.map(feature => 
            `<li><i class="fas fa-check"></i>${feature}</li>`
        ).join('');
        
        // Populate modal content
        modal.innerHTML = `
            <div class="modal-content">
                <span class="modal-close">&times;</span>
                <div class="modal-product">
                    <div class="modal-product-image">
                        <img src="${product.image}" alt="${product.name}">
                    </div>
                    <div class="modal-product-info">
                        <h2>${product.name}</h2>
                        <div class="modal-product-category">${product.category}</div>
                        <p class="modal-product-description">${product.description}</p>
                        <div class="modal-product-features">
                            <h3>Key Features</h3>
                            <ul>
                                ${featureListHTML}
                            </ul>
                        </div>
                        <div class="modal-product-source">
                            <p><strong>Source:</strong> Carefully sourced from small-scale farmers in Bihar, ensuring quality and purity.</p>
                        </div>
                        <div class="modal-product-usage" style="margin-top: 1.5rem;">
                            <h3>Recommended Usage</h3>
                            <p>Best used in traditional Indian dishes to enhance flavor and aroma. Store in a cool, dry place.</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Show modal
        modal.style.display = 'block';
        
        // Add close functionality
        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
        });
        
        // Close modal when clicking outside of it
        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    }

    // Function to filter products by category
    function setupProductFilters() {
        const filterButtons = document.querySelectorAll('.product-filter-btn');
        if (!filterButtons.length) return;
        
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const category = this.getAttribute('data-category');
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Filter products
                const productGrid = document.querySelector('.product-grid');
                const productCards = productGrid.querySelectorAll('.product-card');
                
                productCards.forEach(card => {
                    const productCategory = card.querySelector('.product-category').textContent;
                    
                    if (category === 'all' || productCategory === category) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // Initialize product page functionality
    function initProductPage() {
        generateProductCards();
        setupProductFilters();
    }

    // Call init function
    initProductPage();
});
