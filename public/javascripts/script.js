function addToCart(proId){
    $.ajax({
        url: '/add-to-cart/'+proId,
        method: 'get',
        // data: {proId: proId},
        success: function(res){
            let count = $('#cart-count').html()
            count=parseInt(count)+1
            $('#cart-count').html(count)
        }
    })
}

function search(input){
    console.log(input.value)
    if (input.value.trim() === '') {
        // Redirect to the homepage (change the URL as needed)
        $.ajax({
            url: '/',
            method: 'get',

            success: function (res) {
                var viewProductsHtml = $(res).find('#view-products').html();

                $('#view-products').html(viewProductsHtml);
            }

        })
    }else{
        $.ajax({
            url: '/find-product/'+input.value,
            method: 'get',
           
        success: function (res) {
                        var viewProductsHtml = $(res).find('#view-products').html();
    
                        $('#view-products').html(viewProductsHtml);
                    }
        })

    }
    
    
}
