$(document).ready(function() {

    $('#contactForm').on('submit', function (e) {
        e.preventDefault();

        let valid = true;
        const email = $('#email');
        const phoneNumber = $('#phoneNumber');
        const terms = $('#terms').is(':checked');
        const addPictures = $('#addPictures')[0].files;

        // Reset validation classes
        $('.is-invalid').removeClass('is-invalid');
        $('.invalid-feedback').remove();

        // Validate email
        if (!email.val()) {
            email.addClass('is-invalid');
            email.after('<div class="invalid-feedback">Email is mandatory.</div>');
            valid = false;
        } else if (!validateEmail(email.val())) {
            email.addClass('is-invalid');
            email.after('<div class="invalid-feedback">Invalid email format.</div>');
            valid = false;
        }

        // Validate phone number
        if (phoneNumber.val() && !/^\d+$/.test(phoneNumber.val())) {
            phoneNumber.addClass('is-invalid');
            phoneNumber.after('<div class="invalid-feedback">Phone number should contain only numbers.</div>');
            valid = false;
        }

        // Validate terms and conditions
        if (!terms) {
            $('#terms').addClass('is-invalid');
            $('#terms').after('<div class="invalid-feedback">You must agree to the terms and conditions.</div>');
            valid = false;
        }

        // Validate file input for images only and max 5 files
        if (addPictures.length > 5) {
            $('#addPictures').addClass('is-invalid');
            $('#addPictures').after('<div class="invalid-feedback">You can upload a maximum of 5 files.</div>');
            valid = false;
        } else {
            for (let i = 0; i < addPictures.length; i++) {
                if (!addPictures[i].type.startsWith('image/')) {
                    $('#addPictures').addClass('is-invalid');
                    $('#addPictures').after('<div class="invalid-feedback">Only image files are allowed.</div>');
                    valid = false;
                    break;
                }
            }
        }

        if (valid) {
            let formData = new FormData(this);
            $.ajax({
                url: 'contact-form.php',
                type: 'POST',
                data: formData,
                contentType: false,
                processData: false,
                success: function (response) {
                    alert(response);
                },
                error: function () {
                    alert('An error occurred while sending the form.');
                }
            });
        }
    });

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }
    


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
            if (index < 3) {
                productHomeList.append(productCard);
            }
            productList.append(productCard);
        });
    
        $('#productModal').on('show.bs.modal', function(event) {
            const button = $(event.relatedTarget);
            const index = button.data('index');
            const product = products[index];
    
            const modal = $(this);
            modal.find('.modal-title').text(product.brand);
            modal.find('#productDescription').html(product.description);
            modal.find('#productPrice').text(product.price);
            modal.find('#productDetails').html(product.details);
    
            const productImages = product.images.map(image => `
                <div class="col-md-3">
                    <img src="assets/images/products/${image}" class="img-fluid mb-2 product-image" alt="${product.brand}">
                </div>
            `).join('');
            modal.find('#productImages').html(productImages);
        });
    
        $(document).on('click', '.product-image', function() {
            const src = $(this).attr('src');
            const modal = $('#productModal');
    
            modal.find('.modal-body:not(.full-image)').hide();
            modal.find('#closeButton').hide();
            modal.find('.modal-footer').hide();
            modal.find('#backButton').show();
            modal.find('.modal-body.full-image').show().find('#modalImage').attr('src', src);
        });
    
        $('#backButton').on('click', function() {
            const modal = $('#productModal');
            modal.find('.modal-body:not(.full-image)').show();
            modal.find('#closeButton').show();
            modal.find('.modal-footer').show();
            modal.find('#backButton').hide();
            modal.find('.modal-body.full-image').hide();
        });

        $(window).scroll(function() {
            if ($(this).scrollTop() > 200) { // Adjust this value to control when the button appears
                $('#goToTop').fadeIn();
            } else {
                $('#goToTop').fadeOut();
            }
        });
    
        // Scroll to top when the button is clicked
        $('#goToTop').click(function() {
            $('html, body').animate({scrollTop : 0}, 800); // Adjust the scroll speed here
            return false;
        });
    
    });
    
    
});
