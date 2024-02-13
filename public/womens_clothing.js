$(function () {
    $(window).on('scroll', function () {
        if ( $(window).scrollTop() > 5 ) {
            $('.navbar').addClass('active');
        } else {
            $('.navbar').removeClass('active');
        }
    });
});

//Third-Party API fetch
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Host': 'apidojo-forever21-v1.p.rapidapi.com',
		'X-RapidAPI-Key': '81198f7096msh253bd73bd39a98fp10e1adjsn4d6891987b19'
	}
};

fetch('https://apidojo-forever21-v1.p.rapidapi.com/products/v2/detail?productId=2000467182', options)
	.then(response => response.json())
	.then(response => {
    console.log(response);

    document.getElementById("price_1").innerHTML = "$" + response.product.ListPrice;
    document.getElementById("description_1").innerHTML = response.product.DisplayName;
    document.getElementById("code_1").innerHTML = "Item Code: " + response.product.ItemCode;
  })
	.catch(err => console.error(err));


fetch('https://apidojo-forever21-v1.p.rapidapi.com/products/v2/detail?productId=2000467314', options)
	.then(response => response.json())
	.then(response => {
    console.log(response);

    document.getElementById("price_2").innerHTML = "$" + response.product.ListPrice;
    document.getElementById("description_2").innerHTML = response.product.DisplayName;
    document.getElementById("code_2").innerHTML = "Item Code: " + response.product.ItemCode;
  })
	.catch(err => console.error(err));


fetch('https://apidojo-forever21-v1.p.rapidapi.com/products/v2/detail?productId=2000452383', options)
	.then(response => response.json())
	.then(response => {
    console.log(response);

    document.getElementById("price_3").innerHTML = "$" + response.product.ListPrice;
    document.getElementById("description_3").innerHTML = response.product.DisplayName;
    document.getElementById("code_3").innerHTML = "Item Code: " + response.product.ItemCode;
  })
	.catch(err => console.error(err));
