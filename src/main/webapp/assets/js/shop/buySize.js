$.ajax({
      type: "post",
       url: "/ReseltProject/shop/getProductDTO",
       data: 'pid='+$('#pid').val(),
       success: function (data) {
         // 데이터 뿌리기
         $('#product_id').html(data.product_id);
         $('#product_name_kor').html(data.product_name_kor);
         $('#product_name_eng').html(data.product_name_eng);
         const imgPath = "http://3.39.241.175:6753/upload/resources/img/product";
         const imgFiles = data.img_file.split(",");
         $('#product_img').attr("src", imgPath+"/"+data.pid+"/"+imgFiles[0]);
         
         // 사이즈표시
         let shose_size = [230, 235, 240, 245, 250, 255, 260, 265, 270, 275, 280, 285, 290, 295, 300];
         const clothes_size = ['XS' ,'S' ,'M', 'L', 'XL'];
         const other = "OneSize";
         
         // 신발 사이즈 표시
         if(data.category_id == 61){
            $.each(shose_size, function(index, size){
            	$('<li/>', {
					class: "inline-block my-2 mx-3"
				}).append($('<button/>',{
					type: "button",
					class: "sizeBtn h-14 w-52 rounded-2xl cursor-pointer border border-gray-300 text-center",
					value: size,
				}).append($('<span/>',{
					class: "mt-1 size",
					id: "size",
					text : size	
				})).append($('<br>')
					).append($('<span/>',{
					class : "align-top text-xs text-red-400 price",
					id : "price"+size,
					text : "입찰대기",
					value: "입찰대기"
				}))).appendTo($('#priceTable'));
            })
                // 가격 뿌리기
          $.ajax({
             type: "post",
             url: "/ReseltProject/shop/getProductPrice",
             data: 'pid='+$('#pid').val(),
             success:function(data){
               $.each(data.list, function(index, data){
                console.log(JSON.stringify(data))
                
                console.log('#price' + data.bidding_price);
                  $('#price' + data.product_size).html(data.bidding_price.toLocaleString('ko-KR'));
                  $('#price' + data.product_size).val(data.bidding_price.toLocaleString('ko-KR'));
                  $('#price' + data.product_size).attr('value', data.bidding_price.toLocaleString('ko-KR'))
                  $('#price' + data.product_size).attr('price-bidId', data.bidding_id);
      			
               })
             }, error:function(err){
                console.log(err)
             }
            });//ajax
            
            // 버튼 활성화
           $('.sizeBtn').each(function(index){
             $(this).attr('sizeBtn-index',index);
           }).on("click", function(){
             var index = $(this).attr('sizeBtn-index');
             $('.sizeBtn[sizeBtn-index='+ index + ']').addClass('border-2 border-black selectSizeValue');
             $('.sizeBtn[sizeBtn-index='+ index + ']').attr('id', 'selectSizeValue');          
             $('.sizeBtn[sizeBtn-index!='+ index + ']').removeClass('border-2 border-black');
             $('.sizeBtn[sizeBtn-index!='+ index + ']').removeAttr('id', 'selectSizeValue');
             
           })
           $('.price').each(function(index){
              $(this).attr('price-index',index);
           })
         }// 신발 사이즈 표시
      },
      error: function(err) {
         console.log(err)
       },
    });// 사이즈 표시 ajax
 
   //버튼숨기기
   $('#nextBtn').hide();
   //다음페이지
   $(document).on('click', '.sizeBtn', function(){
      $('#price').text('');
      let id = $('#price' +$('.selectSizeValue').val()).attr('price-bidId');
      $('#price').text($('#price'+$('.selectSizeValue').val()).val());
      $('#nextBtn').show();
   })
   $('#nextBtn').click(function(){
		location.href="./buyAgree?pid="+$('#pid').val()+'&size='+$('.selectSizeValue').val()+'&id='+$('#price' +$('.selectSizeValue').val()).attr('price-bidId');
   })