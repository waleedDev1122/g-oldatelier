$(document).ready(function() {

    $('#contactForm').on('submit', function (e) {
        e.preventDefault();

        let valid = true;
        const email = $('#email').val();
        const terms = $('#terms').is(':checked');
        const addPictures = $('#addPictures')[0].files;

        // Validate email
        if (!email) {
            alert('Email is mandatory.');
            valid = false;
        }

        // Validate terms and conditions
        if (!terms) {
            alert('You must agree to the terms and conditions.');
            valid = false;
        }

        // Validate file input for images only
        for (let i = 0; i < addPictures.length; i++) {
            if (!addPictures[i].type.startsWith('image/')) {
                alert('Only image files are allowed.');
                valid = false;
                break;
            }
        }

        if (valid) {
            alert('Form submitted successfully!');
            // Handle form submission here (e.g., send data to server)
        }
    });


    $.getJSON("products-data.json", function(products) {
        const productList = $('#product-list');
        const productHomeList = $('#product-home-list');

        products.forEach((product, index) => {
            const productCard = `
                <div class="col-md-4 mb-4">
                    <div class="product-card card h-100" data-bs-toggle="modal" data-bs-target="#productModal" data-index="${index}">
                        <img src="assets/images/products/${product.images[0]}" class="card-img-top" alt="${product.brand}">
                        <div class="card-body">
                            <h5 class="card-title">${product.brand}</h5>
                            <p class="card-text">${product.description}</p>
                            <p class="card-text fw-bold">${product.price}</p>
                            <button>Buy Now</button>
                        </div>
                    </div>
                </div>
            `;
            if(index<3){
                productHomeList.append(productCard);
            }
            productList.append(productCard);
        });

        $('#productModal').on('show.bs.modal', function (event) {
            const button = $(event.relatedTarget);
            const index = button.data('index');
            const product = products[index];

            const modal = $(this);
            modal.find('.modal-title').text(product.brand);
            modal.find('#productDescription').text(product.description);
            modal.find('#productPrice').text(product.price);
            modal.find('#productDetails').text(product.details);

            const productImages = product.images.map(image => `<div class="col-md-4"><img src="assets/images/products/${image}" class="img-fluid mb-2" alt="${product.brand}"></div>`).join('');
            modal.find('#productImages').html(productImages);
        });
    });
});
