function addToCart(productId, callback) {
	$.ajax({
		method: 'GET',
        url: '/add/' + productId,
        dataType: 'json',
        success: function(data) {
            handleCartAddition(data);
			callback();
        }
    });
}

function handleCartAddition(data) {
	if (data.cartCount != -1) {
		// update number of items in cart immediately
		document.getElementById('cart-count-span').innerHTML = data.cartCount;
		
		// show alert for successful cart addition
		alert("Product added to cart successfully!");
	}
	else {
		alert("Add to Cart failed. Please try again.");
	}
	
}
