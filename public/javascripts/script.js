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
    $.ajax({
        url: '/find-product/'+input.value,
        method: 'get',
        // data: {proId: proId},
         success: function(res){
            $('#view-products').html(res);
      }
    })
    
}
