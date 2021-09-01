// declare some constants
const fs = require('fs'), express = require('express'), bodyParser = require("body-parser"),
		 app = express(), http = require('http'),
		 https = require('https'), cookieParser = require('cookie-parser'),
		 httpPort = 80,  httpsPort = 443, featuredProduct = 0,
		 productList = [
			{
				"name":"Ready-to-Use Hummingbird Nectar",
				"shortDescription":"Did you know that 78% of commercially sold hummingbird nectar contains harmful red dye? Our company is dedicated to putting animals first with our own colorless Ready to use Hummingbird Nectar that both feeds hummingbirds safely and educates the buyer to make the right choice.",
				"longDescription":"Our company has been committed to the safety of hummingbirds for over 100 years, and our clear hummingbird nectar is not only formulated without color but with anti-molding technology to ensure your local hummingbirds are eating safe nectar. Alongside red dye, old, moldy hummingbird nectar is the biggest cause of humming death. Never make your own hummingbird nectar, experts say it will only stay good for a couple days. Our homemade formula will ensure your hummingbirds will come back year after year, creating the backyard environment of your dreams.",
				"price":"15.00",
				"shipping":"3.99",
				"imageUrl":"/product3.jpg"
			},
			{
				"name":"Adidas Mega Shoes",
				"shortDescription":"Black with three white stripes, these fashionable Adidas shoes are perfect for wearing on your feet wherever you travel. Made in a boot-like form so you can bring out your favorite bell bottom jeans.",
				"longDescription":"Adidas strives to create shoes that are both fun and fashionable. The Adidas team always has their loyal customers in mind when creating new shoes such as the Adidas Mega Shoes. These shoes were designed to cut the confusion between wearing show or no-show socks by creating ankle hugging technology right inside of the shoe. This mix between boot and sneaker gives you the pep that you need in your step.",
				"price":"199.99",
				"shipping":"6.99",
				"imageUrl":"/product1.jpg"
			},
			{
				"name":"iDog Collar",
				"shortDescription":"Coming in a multitude of colors and sizes, these iDog Collars are what you need when you take your dog to the park. With phone syncing abilities, this collar will not only track your pet’s location, but also track their heart-rate, blood pressure, and temperature to ensure your furry friend is not overheating in the hot outdoor weather.",
				"longDescription":"Apple has been making easy to use technology for its customers for centuries, making life easier every day. Now, the future is here with apple technology for dogs as well as humans. The iDog Collar was made for the comfort and health of our furry friends. Many dogs can easily become overheated or dehydrated when taken into hot weather without the owner even knowing. With many breeds such as huskies and pugs becoming more and more popular, Apple’s team has decided to give them a voice to tell their owner when it's time to have a water break and go inside.",
				"price":"649.99",
				"shipping":"",
				"imageUrl":"/product2.jpg"
			}
		 ];

// and some variables
var nameField = '', emailField = '', address1 = '', address2 = '', telField = '', cityField = '', stateField = '', zipField = '',
	shippingNameField = '', shippingEmailField = '', shippingAddress1 = '', shippingAddress2 = '', shippingTelField = '', shippingCityField = '',
	shippingStateField = '', shippingZipField = '', docHTML, itemsInCart = [];

// add cookie parser to middleware stack
app.use(cookieParser());

// insert middleware for parsing body of POST requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

// tell express to serve static files out of the /public directory
app.use(express.static('public'));

// root directory shows home page with promo
app.get('/', (req, res) => {
	initDoc();
	docHTML += '<div class="indent">\n<h1>We really want you to buy one of these!</h1>\n<div class="home-wrapper">\n<div class="home-left-section">'
							+ '<img class="promo-img" src="' + productList[featuredProduct].imageUrl + '"></div>\n<div class="home-right-section">\n<h2>'
							+ productList[featuredProduct].name + '</h2>\n<p class="home-short-description">' 
							+ productList[featuredProduct].shortDescription + '</p>\n<p class="home-price">$' 
							+ productList[featuredProduct].price + '</p>\n<button class="button" onclick="window.location.href = \'/product/' + featuredProduct + '\'">Learn More</button></div>\n</div>\n</div>\n';
	placeEndingAndWrite(req, res);
});

app.get('/products', (req, res) => {
	initDoc();
	docHTML += '<div class="indent">\n'
				+ '<h1>Here\'s what we have to offer...</h1>\n'
				+ '<div class="product-row">\n'
				+ '<div class="product-img-container"><img class="product-img" src="' + productList[0].imageUrl + '"></div>\n'
				+ '<div class="product-info">'
				+ '<h2>' + productList[0].name + '</h2>\n'
				+ '<p class="product-short-description">' + productList[0].shortDescription + '</p>\n'
				+ '<p class="product-price">$' + productList[0].price + '</p>\n'
				+ '<p class="product-shipping">' + (productList[0].shipping != "" ? '+ $' + productList[0].shipping + ' Shipping' : 'Free Shipping!') + '</p>\n'
				+ '<button class="button" onclick="window.location.href = \'/product/0\'">Learn More</button><button class="button-blue" onclick="addToCart(0);">Add to Cart</button>\n'
				+ '</div>\n'
				+ '</div>\n'
				+ '<div class="product-row">\n'
				+ '<div class="product-img-container"><img class="product-img" src="' + productList[1].imageUrl + '"></div>\n'
				+ '<div class="product-info">'
				+ '<h2>' + productList[1].name + '</h2>\n'
				+ '<p class="product-short-description">' + productList[1].shortDescription + '</p>\n'
				+ '<p class="product-price">$' + productList[1].price + '</p>\n'
				+ '<p class="product-shipping">' + (productList[1].shipping != "" ? '+ $' + productList[1].shipping + ' Shipping' : 'Free Shipping!') + '</p>\n'
				+ '<button class="button" onclick="window.location.href = \'/product/1\'">Learn More</button><button class="button-blue" onclick="addToCart(1);">Add to Cart</button>\n'
				+ '</div>\n'
				+ '</div>\n'
				+ '<div class="product-row">\n'
				+ '<div class="product-img-container"><img class="product-img" src="' + productList[2].imageUrl + '"></div>\n'
				+ '<div class="product-info">'
				+ '<h2>' + productList[2].name + '</h2>\n'
				+ '<p class="product-short-description">' + productList[2].shortDescription + '</p>\n'
				+ '<p class="product-price">$' + productList[2].price + '</p>\n'
				+ '<p class="product-shipping">' + (productList[2].shipping != "" ? '+ $' + productList[2].shipping + ' Shipping' : 'Free Shipping!') + '</p>\n'
				+ '<button class="button" onclick="window.location.href = \'/product/2\'">Learn More</button><button class="button-blue" onclick="addToCart(2);">Add to Cart</button>\n'
				+ '</div>\n'
				+ '</div>\n'
				+ '</div>\n';
	placeEndingAndWrite(req, res);
});

app.get('/product/:productId', (req, res) => {
	initDoc();
	docHTML += productList[req.params.productId] ? ('<div class="indent">\n'
				+ '<h1>' + productList[req.params.productId].name + '</h1>\n'
				+ '<div class="product-row">\n'
				+ '<div class="product-img-container"><img class="product-img" src="' + productList[req.params.productId].imageUrl + '"></div>\n'
				+ '<div class="product-info">'
				+ '<h2>' + productList[req.params.productId].name + '</h2>\n'
				+ '<p class="product-long-description">' + productList[req.params.productId].longDescription + '</p>\n'
				+ '<p class="product-price">$' + productList[req.params.productId].price + '</p>\n'
				+ '<p class="product-shipping">' + (productList[req.params.productId].shipping != "" ? '+ $' + productList[req.params.productId].shipping + ' Shipping' : 'Free Shipping!') + '</p>\n'
				+ '<button class="button-blue" onclick="addToCart(' + req.params.productId + ');">Add to Cart</button>\n'
				+ '</div>\n'
				+ '</div>\n'
				+ '</div>\n') : '<h1>Sorry, no products match your query.</h1>';
	placeEndingAndWrite(req, res);
});

app.get('/cart', (req, res) => {
	initDoc();
	
	let shippingTotal = 0, priceTotal = 0, totalTotal = 0;
	
	docHTML += '<div class="indent">\n';
	
	if (itemsInCart.length > 0) {
		docHTML += '<h1>Your Cart</h1>\n'
					+ '<div class="cart-grid">\n'
					+ '<div></div>\n'
					+ '<div></div>\n'
					+ '<div></div>\n'
					+ '<div><strong>Shipping</strong></div>\n'
					+ '<div><strong>Item Price</strong></div>\n'
					+ '<div><strong>Total Price</strong></div>\n'
					+ '</div>\n'; 
	}
	
	for (let i = 0; i < itemsInCart.length; i++) {
		let shippingVal = parseFloat(productList[itemsInCart[i]].shipping == "" ? "0.00" : productList[itemsInCart[i]].shipping);
		docHTML += '<div class="cart-grid">\n'
					+ '<div><img class="cart-img" src="' + productList[itemsInCart[i]].imageUrl + '"></div>\n'
					+ '<div>' + productList[itemsInCart[i]].name + '</div>\n'
					+ '<div>Qty: 1</div>\n'
					+ '<div>$' + shippingVal + '</div>\n'
					+ '<div>$' + productList[itemsInCart[i]].price + '</div>\n'
					+ '<div>$' + (parseFloat(productList[itemsInCart[i]].price) + shippingVal).toFixed(2) + '</div>\n'
					+ '</div>\n'; 
		shippingTotal += shippingVal;
		priceTotal += parseFloat(productList[itemsInCart[i]].price);
		totalTotal += shippingVal + parseFloat(productList[itemsInCart[i]].price);
	}
	
	if (itemsInCart.length > 0) {
		docHTML += '<div class="cart-grid">\n'
					+ '<div></div>\n'
					+ '<div></div>\n'
					+ '<div><strong>Totals:</strong></div>\n'
					+ '<div><strong>$' + shippingTotal.toFixed(2) + '</strong></div>\n'
					+ '<div><strong>$' + priceTotal.toFixed(2) + '</strong></div>\n'
					+ '<div><strong>$' + totalTotal.toFixed(2) + '</strong></div>\n'
					+ '</div>\n';
					
		docHTML += '<div style="display:flex;justify-content:center;width:95%;"><button class="button-blue" style="margin-top:50px;margin-bottom:20px;" onclick="window.location.href=\'/checkout/\';">Checkout</button></div>\n';
	}
	else {
		docHTML += '<h1>There are no items in your cart.</h1>';
	}
	
	docHTML += '</div>\n';
	
	placeEndingAndWrite(req, res);
});

app.get('/checkout/', (req, res) => {
	initDoc();
	
	let shippingTotal = 0, priceTotal = 0, totalTotal = 0;
	
	docHTML += '<div class="indent">\n';
	
	if (itemsInCart.length > 0) {
		docHTML += '<form id="checkout-form" method="POST" action="/review" accept-charset="UTF-8">\n';
		docHTML += '<h1 style="padding-bottom:10px;">Billing Contact</h1>\n';
		docHTML += '<div class="form-row">\n'
					+ '<div><input class="form-input" type="text" name="nameField" placeholder="Enter Name.." required></div>\n'
					+ '<div><input class="form-input" type="text" name="emailField" placeholder="Enter Email.." required></div>\n'
					+ '</div>'
					+ '<div class="form-row">\n'
					+ '<div><input class="form-input" type="text" name="address1" placeholder="Enter Address Line 1.." required></div>\n'
					+ '<div><input class="form-input" type="tel" name="telField" placeholder="Enter Phone.." required></div>\n'
					+ '</div>'
					+ '<div class="form-row">\n'
					+ '<div><input class="form-input" type="text" name="address2" placeholder="Enter Address Line 2.."></div>\n'
					+ '<div><input class="form-input" type="text" name="cityField" placeholder="Enter City.." required></div>\n'
					+ '</div>'
					+ '<div class="form-row">\n'
					+ '<div><select class="form-input" name="stateField" required><option value="AL">Alabama</option><option value="AK">Alaska</option><option value="AZ">Arizona</option><option value="AR">Arkansas</option><option value="CA">California</option><option value="CO">Colorado</option><option value="CT">Connecticut</option><option value="DE">Delaware</option><option value="DC">District Of Columbia</option><option value="FL">Florida</option><option value="GA">Georgia</option><option value="HI">Hawaii</option><option value="ID">Idaho</option><option value="IL">Illinois</option><option value="IN">Indiana</option><option value="IA">Iowa</option><option value="KS">Kansas</option><option value="KY">Kentucky</option><option value="LA">Louisiana</option><option value="ME">Maine</option><option value="MD">Maryland</option><option value="MA">Massachusetts</option><option value="MI">Michigan</option><option value="MN">Minnesota</option><option value="MS">Mississippi</option><option value="MO">Missouri</option><option value="MT">Montana</option><option value="NE">Nebraska</option><option value="NV">Nevada</option><option value="NH">New Hampshire</option><option value="NJ">New Jersey</option><option value="NM">New Mexico</option><option value="NY">New York</option><option value="NC">North Carolina</option><option value="ND">North Dakota</option><option value="OH">Ohio</option><option value="OK">Oklahoma</option><option value="OR">Oregon</option><option value="PA">Pennsylvania</option><option value="RI">Rhode Island</option><option value="SC">South Carolina</option><option value="SD">South Dakota</option><option value="TN">Tennessee</option><option value="TX">Texas</option><option value="UT">Utah</option><option value="VT">Vermont</option><option value="VA">Virginia</option><option value="WA">Washington</option><option value="WV">West Virginia</option><option value="WI">Wisconsin</option><option value="WY">Wyoming</option></select></div>\n'
					+ '<div><input class="form-input" type="text" name="zipField" placeholder="Enter Zip Code.." required></div>\n'
					+ '</div>\n';
		docHTML += '<h1 style="padding-bottom:10px;">Shipping Address</h1>\n';
		docHTML += '<div class="form-row">\n'
					+ '<div><input class="form-input" type="text" name="shippingNameField" placeholder="Enter Name.." required></div>\n'
					+ '<div><input class="form-input" type="text" name="shippingEmailField" placeholder="Enter Email.." required></div>\n'
					+ '</div>'
					+ '<div class="form-row">\n'
					+ '<div><input class="form-input" type="text" name="shippingAddress1" placeholder="Enter Address Line 1.." required></div>\n'
					+ '<div><input class="form-input" type="tel" name="shippingTelField" placeholder="Enter Phone.." required></div>\n'
					+ '</div>'
					+ '<div class="form-row">\n'
					+ '<div><input class="form-input" type="text" name="shippingAddress2" placeholder="Enter Address Line 2.."></div>\n'
					+ '<div><input class="form-input" type="text" name="shippingCityField" placeholder="Enter City.." required></div>\n'
					+ '</div>'
					+ '<div class="form-row">\n'
					+ '<div><select class="form-input" name="shippingStateField" required><option value="AL">Alabama</option><option value="AK">Alaska</option><option value="AZ">Arizona</option><option value="AR">Arkansas</option><option value="CA">California</option><option value="CO">Colorado</option><option value="CT">Connecticut</option><option value="DE">Delaware</option><option value="DC">District Of Columbia</option><option value="FL">Florida</option><option value="GA">Georgia</option><option value="HI">Hawaii</option><option value="ID">Idaho</option><option value="IL">Illinois</option><option value="IN">Indiana</option><option value="IA">Iowa</option><option value="KS">Kansas</option><option value="KY">Kentucky</option><option value="LA">Louisiana</option><option value="ME">Maine</option><option value="MD">Maryland</option><option value="MA">Massachusetts</option><option value="MI">Michigan</option><option value="MN">Minnesota</option><option value="MS">Mississippi</option><option value="MO">Missouri</option><option value="MT">Montana</option><option value="NE">Nebraska</option><option value="NV">Nevada</option><option value="NH">New Hampshire</option><option value="NJ">New Jersey</option><option value="NM">New Mexico</option><option value="NY">New York</option><option value="NC">North Carolina</option><option value="ND">North Dakota</option><option value="OH">Ohio</option><option value="OK">Oklahoma</option><option value="OR">Oregon</option><option value="PA">Pennsylvania</option><option value="RI">Rhode Island</option><option value="SC">South Carolina</option><option value="SD">South Dakota</option><option value="TN">Tennessee</option><option value="TX">Texas</option><option value="UT">Utah</option><option value="VT">Vermont</option><option value="VA">Virginia</option><option value="WA">Washington</option><option value="WV">West Virginia</option><option value="WI">Wisconsin</option><option value="WY">Wyoming</option></select></div>\n'
					+ '<div><input class="form-input" type="text" name="shippingZipField" placeholder="Enter Zip Code.." required></div>\n'
					+ '</div>\n';
		docHTML += '<h1 style="padding-bottom:10px;">Payment Method</h1>\n';
		docHTML += '<div class="form-row">\n'
					+ '<div><select class="form-input" name="paymentMethod"><option value="Visa">Visa</option><option value="Mastercard">Mastercard</option><option value="Bank Account">Bank Account</option></select></div>\n'
					+ '</div>\n';
	}
	
	for (let i = 0; i < itemsInCart.length; i++) {
		let shippingVal = parseFloat(productList[itemsInCart[i]].shipping == "" ? "0.00" : productList[itemsInCart[i]].shipping);
		docHTML += '<div class="checkout-grid">\n'
					+ '<div><img class="cart-img" src="' + productList[itemsInCart[i]].imageUrl + '"></div>\n'
					+ '<div>' + productList[itemsInCart[i]].name + '</div>\n'
					+ '<div>Qty: 1</div>\n'
					+ '<div>$' + (parseFloat(productList[itemsInCart[i]].price) + shippingVal).toFixed(2) + '</div>\n'
					+ '</div>\n'; 
		totalTotal += shippingVal + parseFloat(productList[itemsInCart[i]].price);
	}
	
	if (itemsInCart.length > 0) {
		docHTML += '<div class="checkout-grid">\n'
					+ '<div></div>\n'
					+ '<div></div>\n'
					+ '<div><strong>Total:</strong></div>\n'
					+ '<div><strong>$' + totalTotal.toFixed(2) + '</strong></div>\n'
					+ '</div>\n';
					
		docHTML += '<div style="padding-top:30px;" class="form-row">\n'
					+ '<input type="hidden" value="yes" name="comesFromSite">\n'
					+ '<input type="submit" value="Review Order" class="button-blue">\n'
					+ '</div>\n';
		docHTML += '</form>\n';
	}
	else {
		docHTML += '<h1>There are no items in your cart.</h1>';
	}
	
	docHTML += '</div>\n';
	
	placeEndingAndWrite(req, res);
});
	
app.post('/review', (req, res) => {
	initDoc();
	if (req.body.comesFromSite == "yes") {
		// get all the POST params into local variables
		nameField = req.body.nameField;
		emailField = req.body.emailField;
		address1 = req.body.address1;
		address2 = req.body.address2;
		telField = req.body.telField;
		cityField = req.body.cityField;
		stateField = req.body.stateField;
		zipField = req.body.zipField;
		shippingNameField = req.body.shippingNameField;
		shippingEmailField = req.body.shippingEmailField;
		shippingAddress1 = req.body.shippingAddress1;
		shippingAddress2 = req.body.shippingAddress2;
		shippingTelField = req.body.shippingTelField;
		shippingCityField = req.body.shippingCityField;
		shippingStateField = req.body.shippingStateField;
		shippingZipField = req.body.shippingZipField;
		paymentMethod = req.body.paymentMethod;
		
		docHTML += '<div class="indent">\n'
					+ '<form id="review-form" method="POST" action="/confirm" accept-charset="UTF-8">\n'
					+ '<h1 style="padding-bottom:10px;">Billing Contact</h1>\n'
					+ '<div class="review-grid">'
					+ '<div style="margin-bottom:25px;">' + req.body.nameField + '</div>\n'
					+ '<div style="margin-bottom:25px;">' + req.body.emailField + '</div>\n'
					+ '<div style="margin-bottom:25px;">' + req.body.address1 + '</div>\n'
					+ '<div style="margin-bottom:25px;">' + req.body.address2 + '</div>\n'
					+ '</div>\n'
					+ '<div class="review-grid">'
					+ '<div>' + req.body.telField + '</div>\n'
					+ '<div>' + req.body.cityField + '</div>\n'
					+ '<div>' + req.body.stateField + '</div>\n'
					+ '<div>' + req.body.zipField + '</div>\n'
					+ '</div>\n'
					+ '<h1 style="padding-bottom:10px;">Shipping Address</h1>\n'
					+ '<div class="review-grid">'
					+ '<div style="margin-bottom:25px;">' + req.body.shippingNameField + '</div>\n'
					+ '<div style="margin-bottom:25px;">' + req.body.shippingEmailField + '</div>\n'
					+ '<div style="margin-bottom:25px;">' + req.body.shippingAddress1 + '</div>\n'
					+ '<div style="margin-bottom:25px;">' + req.body.shippingAddress2 + '</div>\n'
					+ '</div>\n'
					+ '<div class="review-grid">'
					+ '<div>' + req.body.shippingTelField + '</div>\n'
					+ '<div>' + req.body.shippingCityField + '</div>\n'
					+ '<div>' + req.body.shippingStateField + '</div>\n'
					+ '<div>' + req.body.shippingZipField + '</div>\n'
					+ '</div>\n'
					+ '<h1 style="padding-bottom:10px;">Payment Method</h1>\n'
					+ '<div style="text-align:center;padding-bottom:25px;">' + req.body.paymentMethod + '</div>\n'
					+ '<h1 style="padding-bottom:10px;">Your Order</h1>';
					var totalTotal = 0;
					for (let i = 0; i < itemsInCart.length; i++) {
						let shippingVal = parseFloat(productList[itemsInCart[i]].shipping == "" ? "0.00" : productList[itemsInCart[i]].shipping);
						docHTML += '<div class="checkout-grid">\n'
									+ '<div><img class="cart-img" src="' + productList[itemsInCart[i]].imageUrl + '"></div>\n'
									+ '<div>' + productList[itemsInCart[i]].name + '</div>\n'
									+ '<div>Qty: 1</div>\n'
									+ '<div>$' + (parseFloat(productList[itemsInCart[i]].price) + shippingVal).toFixed(2) + '</div>\n'
									+ '</div>\n'; 
						totalTotal += shippingVal + parseFloat(productList[itemsInCart[i]].price);
					}
					docHTML += '<div class="checkout-grid">\n'
								+ '<div></div>\n'
								+ '<div></div>\n'
								+ '<div><strong>Total:</strong></div>\n'
								+ '<div><strong>$' + totalTotal.toFixed(2) + '</strong></div>\n'
								+ '</div>\n';

					docHTML += '<input type="hidden" name="realOrder" value="yes">\n'
								+ '<div style="display:flex;justify-content:center;margin-top:55px;"><input type="submit" value="Place Order" class="button-blue"></div>\n'
								+ '</form>\n'
								+ '</div>';
	}
	else {
		docHTML += '<div class="indent"><h1>No order to review!</h1></div>';
	}
	placeEndingAndWrite(req, res);
});

app.post('/confirm', (req, res) => {
	if (req.body.realOrder == "yes") {
		let tempItems = [...itemsInCart];
		itemsInCart = [];
		initDoc();
		docHTML += '<div class="indent">\n'
					+ '<h1>Congratulations! Your Order Has Been Received!</h1>\n'
					+ '<h1 style="padding-bottom:10px;">Billing Contact</h1>\n'
					+ '<div class="review-grid">'
					+ '<div style="margin-bottom:25px;">' + nameField + '</div>\n'
					+ '<div style="margin-bottom:25px;">' + emailField + '</div>\n'
					+ '<div style="margin-bottom:25px;">' + address1 + '</div>\n'
					+ '<div style="margin-bottom:25px;">' + address2 + '</div>\n'
					+ '</div>\n'
					+ '<div class="review-grid">'
					+ '<div>' + telField + '</div>\n'
					+ '<div>' + cityField + '</div>\n'
					+ '<div>' + stateField + '</div>\n'
					+ '<div>' + zipField + '</div>\n'
					+ '</div>\n'
					+ '<h1 style="padding-bottom:10px;">Shipping To</h1>\n'
					+ '<div class="review-grid">'
					+ '<div style="margin-bottom:25px;">' + shippingNameField + '</div>\n'
					+ '<div style="margin-bottom:25px;">' + shippingEmailField + '</div>\n'
					+ '<div style="margin-bottom:25px;">' + shippingAddress1 + '</div>\n'
					+ '<div style="margin-bottom:25px;">' + shippingAddress2 + '</div>\n'
					+ '</div>\n'
					+ '<div class="review-grid">'
					+ '<div>' + shippingTelField + '</div>\n'
					+ '<div>' + shippingCityField + '</div>\n'
					+ '<div>' + shippingStateField + '</div>\n'
					+ '<div>' + shippingZipField + '</div>\n'
					+ '</div>\n'
					+ '<h1 style="padding-bottom:10px;">Payment Method</h1>\n'
					+ '<div style="text-align:center;padding-bottom:25px;">' + paymentMethod + '</div>\n'
					+ '<h1 style="padding-bottom:10px;">Order Items</h1>';
					var totalTotal = 0;
					for (let i = 0; i < tempItems.length; i++) {
						let shippingVal = parseFloat(productList[tempItems[i]].shipping == "" ? "0.00" : productList[tempItems[i]].shipping);
						docHTML += '<div class="checkout-grid">\n'
									+ '<div><img class="cart-img" src="' + productList[tempItems[i]].imageUrl + '"></div>\n'
									+ '<div>' + productList[tempItems[i]].name + '</div>\n'
									+ '<div>Qty: 1</div>\n'
									+ '<div>$' + (parseFloat(productList[tempItems[i]].price) + parseFloat(productList[tempItems[i]].shipping)).toFixed(2) + '</div>\n'
									+ '</div>\n'; 
						totalTotal += parseFloat(productList[tempItems[i]].shipping == "" ? 0 : productList[tempItems[i]].shipping) + parseFloat(productList[tempItems[i]].price);
					}
					docHTML += '<div class="checkout-grid">\n'
								+ '<div></div>\n'
								+ '<div></div>\n'
								+ '<div><strong>Total:</strong></div>\n'
								+ '<div><strong>$' + totalTotal.toFixed(2) + '</strong></div>\n'
								+ '</div>\n'
								+ '<h1 style="padding-bottom:10px;">Thank you. Your order will be shipped shortly.</h1>\n'
								+ '</div>';
	}
	else {
		docHTML += '<div class="indent"><h1>No order to review!</h1></div>';
	}
	placeEndingAndWrite(req, res);
});

app.get('/add/:productId', (req, res) => {
	if (productList[req.params.productId] && !itemsInCart.includes(req.params.productId)) {
		itemsInCart.push(req.params.productId);
		res.send({"cartCount":itemsInCart.length});
	}
	else {
		res.send({"cartCount":-1});
	}
});

app.get('/about', (req, res) => {
	initDoc();
	docHTML += '<h1>We are a company that prides itself on being...</h1>\n'
				+ '<div style="display:flex;justify-content:center;width:100%;"><img src="/logo.png" class="about-img"></div>';
	placeEndingAndWrite(req, res);
});

// define the SSL options for creating the server
const credentials = {
  key: fs.readFileSync("/srv/self-signed-cert/private.key"),
  cert: fs.readFileSync("/srv/self-signed-cert/certificate.crt")
};

// create the two servers using the app (configured above)
const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

// listen over http and https
httpServer.listen(httpPort);
httpsServer.listen(httpsPort);

function initDoc() {
	docHTML = '<!DOCTYPE html>\n<html>\n<head>\n<link rel="stylesheet" type="text/css" href="/style.css">\n<title>min-ecomm site</title>\n</head>\n<body>\n';
	
	// write navigation bar
	docHTML += '<img class="logo-img" src="/logo.png">\n<nav>\n<ul>\n<li><a href="/">Home</a></li>\n<li><a href="/products/">Products</a></li>\n<li><a href="/about/">About</a></li>\n</ul>\n</nav>\n<a href="/cart/"><img src="/cart-icon.png" class="cart-img"></a><span id="cart-count-span" class="cart-count">' + (itemsInCart.length < 1 ? '' : itemsInCart.length) + '</span>\n';
}

function placeEndingAndWrite(req, res) {
	res.send(docHTML + '<div class="indent"><p class="footer"><a href="/about/">Contact Us</a> | (555) 555-5555</p>\n<p class="copyright">© Copyright 2021 Marketing Mojo. All Rights Reserved.</p></div>\n'
						+ '<script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>\n'
						+ '<script src="/tools.js"></script></body></html>');
}
