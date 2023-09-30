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