/*!
 * Start Bootstrap - SB Admin 2 v3.3.7+1 (http://startbootstrap.com/template-overviews/sb-admin-2)
 * Copyright 2013-2016 Start Bootstrap
 * Licensed under MIT (https://github.com/BlackrockDigital/startbootstrap/blob/gh-pages/LICENSE)
 */
$(function() {
    //  $('#side-menu').metisMenu();
});

//Loads the correct sidebar on window load,
//collapses the sidebar on window resize.
// Sets the min-height of #page-wrapper to window size
$(function() {




    $(window).bind("load resize", function() {
        var topOffset = 50;
        var width = (this.window.innerWidth > 0) ? this.window.innerWidth : this.screen.width; //$().width(); 

        //
        if (width < 768) {
            $('div.navbar-collapse').addClass('collapse');
            $('div.sidebar').removeClass('menu_custom');

            topOffset = 100; // 2-row-menu
        } else {
            $('div.navbar-collapse').removeClass('collapse');
            $('div.sidebar').addClass('menu_custom');

        }

        /* var height = ((this.window.innerHeight > 0) ? this.window.innerHeight : this.screen.height) - 1;
		  height = height - topOffset;
		  if (height < 1) height = 1;
		  if (height > topOffset) {
			  $("#page-wrapper").css("min-height", (height) + "px");
		  }*/
    });

    var url = window.location;
    // var element = $('ul.nav a').filter(function() {
    //     return this.href == url;
    // }).addClass('active').parent().parent().addClass('in').parent();
    // var element = $('ul.nav span').filter(function() {
    // return this.href == url;
    // }).addClass('active').parent();

    /*while (true) {
		  if (element.is('li')) {
			  element = element.parent().addClass('in').parent();
		  } else {
			  break;
		  }
	  }*/
    if ($("select[name=id_province] :selected").val())
        $('input[name=id_province_erp]').val($("select[name=id_province] :selected").attr('data-province-erp'));
    if ($("select[name=id_ward] :selected").val())
        $('input[name=id_ward_erp]').val($("select[name=id_ward] :selected").attr('data-ward-erp'));
    if ($("select[name=id_district] :selected").val())
        $('input[name=id_district_erp]').val($("select[name=id_district] :selected").attr('data-district-erp'));

    $("select#id_province").change(function() {

        var id_province = $("select#id_province").val();
        var id_data_new = $(this).data('new');
        if (id_province > 0) {
            $.ajax({
                type: "GET",
                url: "ajax.php",
                data: { 'get_district': id_province, id_data_new: id_data_new },
                async: false,
                cache: true,
                success: function(data) {
                    if (id_data_new) {
                        $('input[name=district_name]').val($("select[name=id_province] :selected").attr('data-option'))
                        $('input[name=province_name]').val($("select[name=id_province] :selected").attr('data-option'))
                        $('#ward_search').val('')
                        $('#dropdownset-province a').remove();
                        $('#dropdownset-province').append(data);
                        $("#dropdownset-province").removeClass("show");
                    } else {
                        $('#id_district').html(data);
                        $('#province_name').val($("#id_province :selected").attr('data-type') + $("#id_province :selected").attr('data-option'));
                        $('input[name=id_province_erp]').val($("select[name=id_province] :selected").attr('data-province-erp'));
                        $('select[name=id_ward]').html('<option value="0">Chọn phường, xã</option>');
                    }

                }
            });
        } else {
            $('#id_district').html('<option value="0">Chọn quận, huyện</option>');
            $('select[name=id_ward]').html('<option value="0">Chọn phường, xã</option>');

        }
    });

    $("select[name=orderFilter_id_province]").change(function() {

        var id_province = $("select[name=orderFilter_id_province]").val();
        if (id_province > 0) {
            $.ajax({
                type: "GET",
                url: "ajax.php",
                data: { 'get_district': id_province },
                async: false,
                cache: true,
                success: function(data) {
                    $('select[name=orderFilter_id_district]').html(data);
                    //$('#province_name').val($("#id_province :selected").attr('data-option'));
                    //$('#province_name').attr('value',$("#province_id :selected").text());
                }
            });
        } else {

            $('select[name=id_district]').html('<option value="0">Chọn quận, huyện</option>');
            $('select[name=orderFilter_id_district]').html('<option value="0">Chọn quận, huyện</option>');
        }
    });

    $("select[name=id_district]").change(function() {
        var id_district = $("select[name=id_district]").val();
        if (id_district > 0) {
            $.ajax({
                type: "GET",
                url: "ajax.php",
                data: { 'get_wards': id_district },
                async: false,
                cache: true,
                success: function(data) {
                    $('select[name=id_ward]').html('<option value="0">Chọn phường, xã</option>');
                    $('select[name=id_ward]').html(data);
                    $('input[name=district_name]').val($("select[name=id_district] :selected").attr('data-one') + "." + $("select[name=id_district] :selected").attr('data-option'));
                    $('input[name=id_district_erp]').val($("select[name=id_district] :selected").attr('data-district-erp'));

                }
            });

        } else {
            //$('select[name=id_district]').html('<option value="0">Chọn quận, huyện</option>');
            $('select[name=id_ward]').html('<option value="0">Chọn phường, xã</option>');

        }

    });

    $("select[name=id_ward]").change(function() {
        if ($("select[name=id_ward]").val()) {
            $('input[name=ward_name]').val($("select[name=id_ward] :selected").attr('data-type') + ' ' + $("select[name=id_ward] :selected").attr('data-option'));
            $('input[name=id_ward_erp]').val($("select[name=id_ward] :selected").attr('data-ward-erp'));
        }
    });

    //send sms order
    $('input[name=submitgetsms]').click(function() {
        var id_crm_use = $('input[name=id_crm_use]').val();
        if (id_crm_use < 1) {
            alert('Vui lòng đăng xuất rồi đăng nhập lại để gửi SMS');
            return false;
        }
        $('.bg_sms').show();
        $('#form_sms').show();
        return false;
    });

    $('.close-send').click(function() {
        $('.bg_sms').hide();
        $('#form_sms').hide();
        return false;
    });

    $('input[name=area_type]').change(function() {
        var area_type = $(this).val();
        if (area_type == 1) {
            $('.area_text').text('Cam on ' + $('input[name=namesms]').val() + ' da mua sam tai Concung.com. Don hang ' + $('input[name=idordersms]').val() + ' du kien giao ' + $('.area_other1').text() + '. Chi tiet vui long goi 18006609');
        } else if (area_type == 5) {
            $('.area_text').text('Cam on ' + $('input[name=namesms]').val() + ' da mua sam tai Concung.com. Don hang ' + $('input[name=idordersms]').val() + ' du kien giao ' + $('.area_other5').text() + '. Chi tiet vui long goi 18006609');

        } else if (area_type == 2) {
            $('.area_text').text('Cam on ' + $('input[name=namesms]').val() + ' da mua sam tai Concung.com. Don hang ' + $('input[name=idordersms]').val() + ' du kien giao trong 1-2 ngay. Chi tiet vui long goi 18006609');

        } else if (area_type == 3) {
            $('.area_text').text('Cam on ' + $('input[name=namesms]').val() + ' da mua sam tai Concung.com. Don hang ' + $('input[name=idordersms]').val() + ' du kien giao trong 2-3 ngay. Chi tiet vui long goi 18006609');

        } else if (area_type == 4) {
            $('.area_text').text('Cam on ' + $('input[name=namesms]').val() + ' da mua sam tai Concung.com. Don hang ' + $('input[name=idordersms]').val() + ' du kien giao trong 3-4 ngay. Chi tiet vui long goi 18006609');

        }
        return false;
    });
    $('input[name=namesms]').change(function() {
        var area_type = $('input[name=area_type]:checked').val();

        if (area_type == 1) {
            $('.area_text').text('Cam on ' + $('input[name=namesms]').val() + ' da mua sam tai Concung.com. Don hang ' + $('input[name=idordersms]').val() + ' du kien giao ' + $('.area_other1').text() + '. Chi tiet vui long goi 18006609 (mien phi)');
        } else if (area_type == 5) {
            $('.area_text').text('Cam on ' + $('input[name=namesms]').val() + ' da mua sam tai Concung.com. Don hang ' + $('input[name=idordersms]').val() + ' du kien giao ' + $('.area_other5').text() + '. Chi tiet vui long goi 18006609 (mien phi).');

        } else if (area_type == 2) {
            $('.area_text').text('Cam on ' + $('input[name=namesms]').val() + ' da mua sam tai Concung.com. Don hang ' + $('input[name=idordersms]').val() + ' du kien giao ' + $('.area_other5').text() + '. Chi tiet vui long goi 18006609');

        } else if (area_type == 3) {
            $('.area_text').text('Cam on ' + $('input[name=namesms]').val() + ' da mua sam tai Concung.com. Don hang ' + $('input[name=idordersms]').val() + ' du kien giao trong 2-3 ngay. Chi tiet vui long goi 18006609');

        } else if (area_type == 4) {
            $('.area_text').text('Cam on ' + $('input[name=namesms]').val() + ' da mua sam tai Concung.com. Don hang ' + $('input[name=idordersms]').val() + ' du kien giao trong 3-4 ngay. Chi tiet vui long goi 18006609');

        }
        return false;
    });

    $('input[name=submitSMS]').click(function() {
        var phonesms = $('#phonesms').val();
        var area_type = 1; //$('input[name=area_type]:checked').val();// all hcm

        var message = $('.area_text').text();

        if (message.length > 160) {
            alert('Tin nhắn hơn 160 ký tự. Đề nghị rút gọn tên khách hàng');
            return false;

        } else {
            if ((phonesms.length != 10) || isNaN(phonesms) || phonesms[0] != '0') {
                $('.checkphone').slideUp(300).fadeIn(100).fadeOut(5500);
            } else {


                var d = {
                    typesms: area_type,
                    phonesms: phonesms,
                    id_crm: $('input[name=id_crm]').val(),
                    typestatus: $('input[name=typestatus]').val(),
                    message: message
                };
                $('#loadingimg').show(); // show the loading message.
                $.ajax({
                    type: "POST",
                    url: "ajax.php",
                    async: false,
                    cache: false,
                    data: d,
                    success: function(data) {
                        console.log(data);
                        $('#loadingimg').hide();
                        if (data == 'true') {
                            $('.checksend').show()
                            $('input[name=submitSMS]').hide();
                        } else {

                            $('.checksendfasle').show()
                            $('input[name=submitSMS]').hide();
                        }
                    }
                });
            }
        }
    });

    // order
    // check comment when destroy orderDeleteProduct
    $('select[name=id_order_state]').change(function() {
        if ($('select[name=id_order_state]').val() == 6) {
            $('.destroy_orders').show();
        } else {
            $('.destroy_orders').hide();
        }
    });

    $('select[name=id_order_destroy_status]').change(function() {
        if ($('select[name=id_order_destroy_status]').val() == 13 ||
            $('select[name=id_order_destroy_status]').val() == 14) {
            $('#distroy_message').show();
            $('#distroy_message').attr('value', '');
        } else {
            $('#distroy_message').hide();
            $('#distroy_message').attr('value', $(this).find('option:selected').text());
        }

    });

    $('select[name=id_order_destroy_status_product]').change(function() {

        if ($('select[name=id_order_destroy_status_product]').val() == 13 ||
            $('select[name=id_order_destroy_status_product]').val() == 14) {

            $('#destroy_message_product').show();
            $('#destroy_message_product').attr('value', '');

        } else {
            $('#destroy_message_product').hide();
            $('#destroy_message_product').attr('value', $(this).find('option:selected').text());

        }

    });

    $('input[name=submitState]').click(function() {
        if ($('select[name=id_order_state]').val() == 6 &&
            $('select[name=id_order_destroy_status]').val() == 0) {
            alert('Chọn lí do');
            return false;
        }

    });
    $('input[name=cancelProduct]').click(function() {
        if ($('select[name=id_order_destroy_status_product]').val() == 0) {
            alert('Chọn lí do huỷ sản phẩm');
            return false;
        }
    });

    $('#aps_employee').click(function() {
        var pass_reset = $('input[name=passwd_1]').val().trim(' ');
        var pass_again = $('input[name=passwd_2]').val().trim(' ');
        var reset_log = 0

        if (pass_reset.length > 0) {
            if (!validatePass(pass_reset)) {
                setError('.pass_reset ', 'Vui lòng nhập ít nhất 8 ký tự có: chữ hoa, chữ thường, số, ký tự đặc biệt', 10000);
                reset_log = 1;
                $('input[name=passwd_1]').val('');
                $('input[name=passwd_2]').val('');
            } else {
                setError('.pass_reset ', '', 0);
            }
            if (pass_reset != pass_again) {
                setError('.resetpass_error ', 'Mật khẩu không giống nhau.', 0);
                reset_log = 1;
                $('input[name=passwd_1]').val('');
                $('input[name=passwd_2]').val('');
            } else {
                setError('.resetpass_error ', '', 0);
            }
        }

        if (reset_log)
            return false;
    });


});


function setPreviewRating(id_comment) {
    $.ajax({
        type: "POST",
        url: "ajax.php",
        data: { id_comment: id_comment, preview: 1 },
        async: true,
        cache: false,
        success: function(datark) {
            console.log(datark);
        }
    });
}

function deletecache(value) {
    $.ajax({
        type: "POST",
        url: "ajax.php",
        data: { deletedcache: 1, value: value },
        async: true,
        cache: false,
        success: function(datark) {
            if (parseInt(datark) == 1)
                popup('Xóa cache thành công')
            console.log(datark);
        }
    });
}

function updateLegal(value) {
    $.ajax({
        type: "POST",
        url: "ajax.php",
        data: { updateLegal: 1, valueset: value },
        async: true,
        cache: false,
        success: function(datark_set) {
            if (parseInt(datark_set) == 0) {
                popup('Cờ legal đã tắt thành công')
                $('.is_legal_span').html("(Off)")
            } else if (parseInt(datark_set) == 1) {
                popup('Cờ legal đã bật thành công')
                $('.is_legal_span').html("(On)")
            } else
                popup('Cập nhật legal thất bại')

        }
    });
}


function checkSizeImage(input, file_size, file_width_min, file_width, file_height) {

    if (input.files && input.files[0]) {
        var allowedExtensionsImg = /(\.jpg|\.jpeg|\.png|\.PNG|\.JPG|\.JPEG|\.gif|\.webp)$/i;
        var reader = new FileReader();
        var name_file_img = input.files[0].name;

        if ((input.files[0].size / (1048576)) > file_size) {
            popup('Vui lòng chọn tập tin có dung lượng nhỏ hơn ' + file_size + 'MB.');
            input.value = "";
            return false;
        } else if (!allowedExtensionsImg.exec(name_file_img)) {
            popup('Xin vui lòng tập tin đúng định dạng.');
            input.value = "";
            return false;
        } else {
            setError('.message', '')

            if (allowedExtensionsImg.exec(name_file_img)) {

                reader.onload = function(e) {
                    img = new Image();
                    img.src = e.target.result;
                    img.onload = function() {

                        if (file_width_min > 0 && file_width_min >= this.width) {
                            popup("Kích thước chiều ngang quá nhỏ " + this.width + 'px (' + file_width_min + 'px)');
                            input.value = "";
                            return;
                        }
                        if (file_width > 0 && file_width < this.width) {
                            popup("Kích thước chiều ngang quá lớn " + this.width + 'px (' + file_width + 'px)');
                            input.value = "";
                            return;
                        }
                        if (file_height > 0 && file_height < this.height) {
                            popup("Kích thước chiều cao quá lớn " + this.height + 'px (' + file_height + 'px)');
                            input.value = "";
                            return;
                        }

                        $('img.img-' + input.name).attr('src', e.target.result)
                    };




                };

                reader.readAsDataURL(input.files[0]);

            }
        }
    }
}





function datasets(datatype, datavalue) {

    $.ajax({
        type: "POST",
        url: "ajax.php",
        data: { update_set_value: 1, var_value: datatype, data_input: (datavalue != 0 ? datavalue : $('input[name=' + datatype + ']').val()) },
        async: false,
        cache: true,
        success: function(datark) {
            console.log(datark);
        }
    });
}


// resend SCM
function pushOrderSCMResend(id_order, is_sale) {

    $.ajax({
        type: "POST",
        url: "ajax.php",
        async: false,
        cache: false,
        data: {
            resendscm: 1,
            id_order: id_order,
            is_admin: 1,
            is_sale: is_sale
        },
        success: function(data_receive) {
            console.log(data_receive);
            if (parseInt(data_receive) == 1) {
                location.reload();
            } //else if (parseInt(data_receive) == 0) {
            //  popup('Quá trình cập nhật thất bại.')
            //} /
            else {
                popup(data_receive)
            }
        }

    });
}
// resend SCM
function pushOrderTransaction(id_order) {

    $.ajax({
        type: "POST",
        url: "../order-request-transaction.php",
        async: false,
        cache: false,
        data: {
            resendscm: 1,
            list: id_order,
            is_admin: 1
        },
        success: function(data_receive) {
            console.log(data_receive);
            if (parseInt(data_receive) == 1) {
                location.reload();
            } else if (parseInt(data_receive) == 0) {
                popup('Quá trình cập nhật thất bại.')
            } else {
                popup('Lỗi đơn hàng đã đẩy.')
            }
        }

    });
}
// send sms rule LP Cam on me
function sendSMSLPCOM() {
    var customer_phone = $('#customer_phone').val();
    var id_reject = $('#id_reject').val();

    $.ajax({
        type: "POST",
        url: "ajax.php",
        async: false,
        cache: false,
        data: {
            resendscm: 1,
            id_reject: id_reject,
            customer_phone: customer_phone
        },
        success: function(data_receive) {
            if (data_receive) {
                popup('Đã gửi SMS đến Khách hàng!');
            }
        }

    });
}

//validate pass
function validatePass(t) {
    var e = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/;
    return e.test(t)
}
// show errorClass
function setError(id, message, time) {

    $(id + '.ajax-message-error').removeClass('hide');
    $(id + '.ajax-message-error').html(message);
    if (time > 0) {
        setTimeout(function() {
            $(id + '.ajax-message-error').addClass('hide');
        }, time);
    }

}
// function sync Combo

function SyncCombo(id_product, combo_id, quantity_combo, promotion_no, promotion_id, attribute) {
    if (parseInt(id_product) < 2) {
        popup('Vui lòng lưu sản phẩm trước khi lấy giá');
        return false;
    }
    if (combo_id.length < 2 && promotion_no.length < 2 && parseInt(promotion_id) < 1) {
        popup('Vui lòng nhập thông tin combo hoặc mã CT Giảm giá hoặc PromotionID');
        return false;
    }

    /*if(combo_id.length>1 && parseInt(quantity_combo)<2){
			  popup('Vui lòng số lượng sản phẩm Combo');
			  return false;
		  }*/
    var referrer_get = '';
    var defect_type_id = 0;
    if (parseInt(attribute) > 0) {
        $('#id_update_combo').attr('disable', true);
        referrer_get = $('input[name=attribute_reference]').val();
        defect_type_id = $('input[name=attribute_defect_type_id]').val();

    } else {
        $('#id_update_combo_promotion').attr('disable', true);
        referrer_get = $('input[name=reference]').val();
        defect_type_id = $('input[name=defect_type_id]').val();
    }

    $.ajax({
        type: "POST",
        url: "ajax.php",
        async: false,
        cache: false,
        data: {
            combo_id: combo_id,
            quantity_combo: quantity_combo,
            id_product: id_product,
            promotion_no: promotion_no,
            defect_type_id: defect_type_id,
            promotion_id: promotion_id,
            attribute: attribute,
            referrer_get: referrer_get,
            is_admin: 1
        },
        success: function(data) {
            console.log(data);
            if (parseInt(data) == 2) {
                popup('Lỗi không tồn tại mã combo dữ liệu.')
            } else if (parseInt(data) == 1) {
                popup('Quá trình update dữ liệu thất bại.')
            } else if (parseInt(data) == 0) {
                location.reload();
            }
        }

    });

}

// popup load
function popup(message, width) {

    $('#shop-noticed .modal-body').html(message);
    if (width > 0)
        $('#shop-noticed .modal-dialog').width(width);
    $('#shop-noticed').modal('show');
}

function clearCache(cache_url, sub_url, table, data_port, ) {
    var runcache = $('#runcache').val();
    if (runcache == 1) {
        popup('Bạn đã xóa cache rồi vui lòng kiểm tra dữ liệu lại');
        return;
    }

    window.ajaxEnabled = true;
    var link_atack = cache_url + '/' + sub_url + table;
    if (data_port.length > 0) {
        var data_ports = JSON.parse(data_port);

        /*$.ajax({
				  type : "GET",
				  url :  "ajax.php",
				  async : true,
				  cache : false, 
				  data : {ajax:1,log_deleted:link_atack,page:table,lg_deleted:'deleted'},						
				  success: function(message){
					  console.log(message)
				  }
			  });*/
        // 	const xhttp = new XMLHttpRequest(); 
        // 	xhttp.open("GET", cache_url+':'+data_ports[i]+'/'+(sub_url)+table, true);

        // 	$('body').append('<img src="'+cache_url+':'+data_ports[i]+'/'+(sub_url)+table+'" width="1"/>')
        // 	xhttp.send();

        // 	xhttp.onreadystatechange = function() {
        // 		if (this.readyState == 4 && this.status == 200) {

        // 			var regexStatus = /(\w+ state:.*?)</g
        // 			var response = xhttp.responseText;
        // 			var statuses = response.match(regexStatus);
        // 			console.log('Inside function getStatus'+statuses);
        // 			//if(callback) callback(statuses);
        // 	  };
        //    }

        for (i = 0; i < data_ports.length; i++) {
            cache_url = 'https://concung.com';
            //cache_url='https://concung.com:20543/cachemem.php?n=';
            $.ajax({
                type: "POST",
                url: "ajax.php",
                async: false,
                cache: false,
                data: {
                    cleacache: 1,
                    table_set: table,
                    port: data_ports[i],
                    cache_url: cache_url,
                    sub_url: sub_url,
                    iadmin: 1
                },
                success: function(data_receive) {
                    console.log(data_receive);
                    if (i = (data_ports.length - 1)) {
                        popup(data_receive);
                        $('#runcache').val(1);
                    }

                    // if(parseInt(data_receive)==1){
                    // 	location.reload();	
                    // }else if(parseInt(data_receive)==0){
                    // 	popup('Quá trình cập nhật thất bại.')
                    // }else{
                    // 	popup('Đơn hàng đã đẩy.')
                    // } 
                },
                error: function(message) {
                    console.log(message);
                }

            });

            /* $.ajax({
				  type : "GET",
				  url :  cache_url+':'+data_ports[i]+'/cachemem.php?n='+table+'_',
				  async : false,
				  cache : false,						
				  dataType: 'jsonp',
				  contentType: 'application/json',
							  
				  crossDomain:true,				
				  success: function(message){
					
					  if(i == (data_ports.length )){
						  popup(message);
						  $('#runcache').val(0);
					  }else{
						  $('#runcache').val(1);
					  }
				  },
				  error:function(message){										
						  if(i == (data_ports.length)){
							  if (message.readyState == 4 && message.status == 200){
								  popup('Xoá thành công');
								  $('#runcache').val(0);
							  }else{
								  popup('Xoá thất bại công');
								  $('#runcache').val(1);
							  }
						  }
						  else{
							  $('#runcache').val(1);
						  }						
					  
				  }
			   });*/
        }
    } else {

        $.ajax({
            type: "GET",
            url: "ajax.php",
            async: true,
            cache: false,
            data: { ajax: 1, log_deleted: link_atack, page: table, lg_deleted: 'deleted' },
            success: function(message) {
                console.log(message)
            }
        });
        console.log(cache_url + (sub_url.length ? '/' + sub_url + table : ''))

        $.ajax({
            type: "GET",
            url: cache_url + (sub_url.length ? '/' + sub_url + table : ''),
            async: false,
            cache: false,
            crossDomain: true,
            success: function(message) {
                popup(message)
            }
        });

    }

}

function clearCacheApi(cache_url, sub_url, table, data_port) {
    if (data_port.length > 0) {
        var data_ports = JSON.parse(data_port);
        for (i = 0; i < data_ports.length; i++) {

            $.ajax({
                type: "POST",
                url: "ajax.php",
                async: true,
                cache: false,
                data: {
                    cleacache: 2,
                    table_set: table,
                    port: data_ports[i],
                    cache_url: cache_url,
                    sub_url: sub_url,
                    iadmin: 1
                },
                success: function(data_receive) {
                    console.log(data_receive);
                    // if(parseInt(data_receive)==1){
                    // 	location.reload();	
                    // }else if(parseInt(data_receive)==0){
                    // 	popup('Quá trình cập nhật thất bại.')
                    // }else{
                    // 	popup('Đơn hàng đã đẩy.')
                    // } 
                },
                error: function(message) {
                    console.log(message);
                }

            });
            /* $.ajax({
				  type : "GET",
				  url :  cache_url+':'+data_ports[i]+'/+sub_url+table,
				  async : false,
				  cache : false,
				  dataType : 'text',   //you may use jsonp for cross origin request
				  crossDomain:true,				
				  data : {ajax:1	},						
				  success: function(message){
					  if(i = (data_ports.length -1)){
							popup(' Xóa cache thành công api '+table);
						  $('#runcache').val(1);
					  }
				  },
				  error:function(message){
					  if(i == (data_ports.length)){
					  if(message.readyState==4&& message.status == 200){
							  popup(' Xóa cache thành công');
							  $('#runcache').val(1);
						  }else{
							  popup(' Xóa cache thất bại');
							  $('#runcache').val(0);
						  }
					  
					  }
						  else{
							  $('#runcache').val(1);
						  }	
				  }
			   }); */
        }
    } else {
        $.ajax({
            type: "POST",
            url: cache_url + (sub_url.length ? '/' + sub_url + table : ''),
            async: false,
            cache: false,
            data: { ajax: 1 },
            success: function(message) {
                popup(message)
            }
        });

    }

}

/* Code generator for Affiliation and vourchers */
function gencode(size) {
    getE('code').value = '';
    var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (var i = 1; i <= size; ++i)
        getE('code').value += chars.charAt(Math.floor(Math.random() * chars.length));
}

function updateFriendlyURL() {
    $('#link_rewrite').val(str2url($('#link_rewrite').val(), 'UTF-8'));
    $('#friendly-url').html($('link_rewrite').val());
}

function updateFriendlyURLall(value) {

    value.val(str2url(value.val(), 'UTF-8'));
}

function uploadImage(image, item) {
    var data = new FormData();
    data.append("image", image);
    //if you are using CI 3 CSRF
    data.append("<?= $this->security->get_csrf_token_name() ?>", "<?= $this->security->get_csrf_hash() ?>");
    $.ajax({
        data: data,
        type: "POST",
        url: "ajax.php?imgadmin=1",
        cache: false,
        contentType: false,
        processData: false,
        success: function(url) {
            console.log(url)
            if (url == 1)
                popup("Không đúng định dạng hình ảnh");
            else if (url == 2)
                popup("Hình ảnh kích thước quá lớn");
            else {
                item.summernote("insertImage", url);
            }

        },
        error: function(data) {
            console.log(data);
        }
    });
}
//Delete image
function removeFile(target) {
    var imgsrc = target[0].currentSrc;

    var data = new FormData();
    data.append("imgSrc", imgsrc);
    $.ajax({
        type: "POST",
        url: "ajax.php?imgdeladmin=1",

        cache: false,
        contentType: false,
        processData: false,
        data: data,
        success: function(datas) {
            console.log(datas);
        }
    })
}



function readURL(input, size_img) {

    if (input.files && input.files[0]) {
        var reader = new FileReader();
        var name_file_img = input.files[0].name;
        if ((input.files[0].size / (1048576)) > size_img) {
            alert('Xin vui lòng chọn ảnh có dung lượng nhỏ hơn ' + size_img + 'Mb.');
            input.value = "";
            return false;
        } else if ((name_file_img.indexOf('.png') == -1) && (name_file_img.indexOf('.JPG') == -1) &&
            (name_file_img.indexOf('.jpg') == -1) && (name_file_img.indexOf('.pdf') == -1) && (name_file_img.indexOf('.jpg') == -1) &&
            (name_file_img.indexOf('.jpeg') == -1)) {
            input.value = "";
            alert('Xin vui lòng hình đúng định dạng.');
            return false;
        }

        //else{
        //reader.readAsDataURL(input.files[0]);
        //}
    }
}

function readUpload(input, size_img) {

    if (input.files && input.files[0]) {
        var reader = new FileReader();
        var name_file_img = input.files[0].name;
        if ((input.files[0].size / (1048576)) > size_img) {
            popup('Xin vui lòng chọn file có dung lượng nhỏ hơn ' + size_img + 'Mb.');
            // $('#shop-noticed').modal.show(('Xin vui lòng chọn file có dung lượng nhỏ hơn '+size_img+'Mb.'));
            input.value = "";
            return false;
        } else if ((name_file_img.indexOf('.xls') == -1) && (name_file_img.indexOf('.XLS') == -1) &&
            (name_file_img.indexOf('.xlsx') == -1) && (name_file_img.indexOf('.XLSX') == -1)) {
            input.value = "";

            popup('Xin vui lòng file đúng định dạng.');
            return false;
        } else {

        }
        //else{
        //reader.readAsDataURL(input.files[0]);
        //}
    }
}

function formSubmit(e, buttona) {
    var key;

    key = window.event ? window.event.keyCode : e.which;

    if (key == 13) {
        //getE(buttona).focus();// $('input[name="submitFilter"]').click();			
        event.preventDefault();
        getE(buttona).click();
    }
}

function noComma(elem) {
    getE(elem).value = getE(elem).value.replace(new RegExp(',', 'g'), '.');
}

/* Help boxes */
function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function() {
            oldonload();
            func();
        }
    }
}


// page product
/* Manage default category on page: edit product */
function checkDefaultCategory(category_id) {
    var oldCheckbox = $('.id_category_default');
    oldCheckbox.removeClass('id_category_default');
    var checkbox = $('#categoryBox_' + category_id);
    checkbox.attr('checked', 'checked');
    checkbox.addClass('id_category_default');
}

function str2url(str, encoding, ucfirst) {
    str = str2vnes(str);
    str = str.toUpperCase();
    str = str.toLowerCase();

    str = str.replace(/[\u0105\u0104\u00E0\u00E1\u00E2\u00E3\u00E4\u00E5]/g, 'a');
    str = str.replace(/[\u00E7\u010D\u0107\u0106]/g, 'c');
    str = str.replace(/[\u010F]/g, 'd');
    str = str.replace(/[\u00E8\u00E9\u00EA\u00EB\u011B\u0119\u0118]/g, 'e');
    str = str.replace(/[\u00EC\u00ED\u00EE\u00EF]/g, 'i');
    str = str.replace(/[\u0142\u0141]/g, 'l');
    str = str.replace(/[\u00F1\u0148]/g, 'n');
    str = str.replace(/[\u00F2\u00F3\u00F4\u00F5\u00F6\u00F8\u00D3]/g, 'o');
    str = str.replace(/[\u0159]/g, 'r');
    str = str.replace(/[\u015B\u015A\u0161]/g, 's');
    str = str.replace(/[\u00DF]/g, 'ss');
    str = str.replace(/[\u0165]/g, 't');
    str = str.replace(/[\u00F9\u00FA\u00FB\u00FC\u016F]/g, 'u');
    str = str.replace(/[\u00FD\u00FF]/g, 'y');
    str = str.replace(/[\u017C\u017A\u017B\u0179\u017E]/g, 'z');
    str = str.replace(/[\u00E6]/g, 'ae');
    str = str.replace(/[\u0153]/g, 'oe');
    str = str.replace(/[\u013E\u013A]/g, 'l');
    str = str.replace(/[\u0155]/g, 'r');

    str = str.replace(/[^a-z0-9\s\'\:\/\[\]-]/g, '');
    str = str.replace(/[\s\'\:\/\[\]-]+/g, ' ');
    str = str.replace(/[ ]/g, '-');
    str = str.replace(/[\/]/g, '-');

    if (ucfirst == 1) {
        c = str.charAt(0);
        str = c.toUpperCase() + str.slice(1);
    }

    return str;
}

function str2vnes(str) {
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'| |\"|\&|\#|\[|\]|~|$|_/g, "-");
    str = str.replace(/-+-/g, "-");
    str = str.replace(/^\-+|\-+$/g, "");
    return str;
}

function helpboxParser(current) {
    // While the span exists and we didn't find the right one
    for (var j = 0; j < current.parentNode.getElementsByTagName('span').length; j++) {

        // For each attribut
        for (var k = 0; k < current.parentNode.getElementsByTagName('span')[j].attributes.length; k++)
        // If it's the attribut "name" and its value is "help_box"
            if (current.parentNode.getElementsByTagName('span')[j].attributes[k].name === 'name' && current.parentNode.getElementsByTagName('span')[j].attributes[k].nodeValue === 'help_box') {
            // We finaly found it
            return j;
        }
    }
    return -1;
}

function prepareInputsForHints() {
    var inputs = document.getElementsByTagName('input');
    var found;

    // For each input
    for (var i = 0; i < inputs.length; i++) {
        // on focus, show the hint
        inputs[i].onfocus = function() {
                var id = helpboxParser(this);
                if (id > -1)
                    this.parentNode.getElementsByTagName('span')[id].style.display = 'inline';
            }
            // when the cursor moves away from the field, hide the hint
        inputs[i].onblur = function() {
            var id = helpboxParser(this);
            if (id > -1)
                this.parentNode.getElementsByTagName('span')[id].style.display = 'none';
        }
    }
}

if (helpboxes) {
    $(function() {
        if ($('input')) {
            $('input').focus(function() {
                $(this).parent().find('.hint').css('display', 'block');
            });
            $('input').blur(function() {
                $(this).parent().find('.hint').css('display', 'none');
            });
        }
    });
}

function copy2friendlyURL() {
    $('#link_rewrite').val(str2url($('#product_name').val().replace(/^[0-9]+\./, ''), 'UTF-8'));
}

function updateCurrentText() {
    $('#current_product').html($('#product_name').val());
}


function checkDelBoxes(pForm, boxName, parent) {
    for (i = 0; i < pForm.elements.length; i++)
        if (pForm.elements[i].name == boxName)
            pForm.elements[i].checked = parent;
}

function checkDelBoxesOption(pForm, boxName, parent) {
    $("." + boxName).attr("checked", parent);
}

//product combination
function getE(name) {
    if (document.getElementById)
        var elem = document.getElementById(name);
    else if (document.all)
        var elem = document.all[name];
    else if (document.layers)
        var elem = document.layers[name];
    return elem;
}

function changeFormParam(pForm, url, gid) {
    pForm.action = url;
    pForm.elements["groupid"].value = gid;
}
// order product
// set input order cancel product
function setCancelQuantity(itself, id_order_detail, quantity) {

    $('#cancelQuantity_' + id_order_detail).attr('value', ($(itself).prop('checked') ? quantity : ''));
    // check product cancel product string
    var string_pea = getValueUsingClass('product_detail', 1);
    if (string_pea.length > 5)
        $('.destroy_orders_product').removeClass('none');
    else
        $('.destroy_orders_product').addClass('none');

}

function selectCheckbox(obj) {
    $(obj).parent().parent().find('td.cancelCheck input[type=checkbox]').prop("checked", true);;
}

function orderDeleteProduct(txtConfirm, txtExplain) {
    ret = true;
    $('table#cancelProducts input[type=checkbox]:checked').each(
        function() {
            totalCancel = parseInt($(this).parent().parent().find('td.cancelQuantity input[type=text]').val());
            totalQty = parseInt($(this).parent().find('input#totalQty[type=hidden]').val());
            totalQtyReturn = parseInt($(this).parent().find('input#totalQtyReturn[type=hidden]').val());
            productName = $(this).parent().find('input#productName[type=hidden]').val();
            totalAvailable = totalQty - totalQtyReturn;
            if (totalCancel > totalAvailable) {
                alert(txtConfirm + ' : \'' + ' ' + productName + '\' ! \n\n' + txtExplain + ' (' + totalCancel + ' > ' + totalAvailable + ')' + '\n ');
                ret = false;
            }
        }
    );
    return ret;
}

function getValueUsingClass(class_selected, type) {
    /* declare an checkbox array */
    var chkArray = [];

    /* look for all checkboes that have a class 'chk' attached to it and check if it was checked */
    $("." + class_selected + "").each(function() { // :checked
        if (type == 1) {
            if ($('#cancelQuantity_' + $(this).attr('value')).attr('value') > 0)
                chkArray.push($('#cancelQuantityref_' + $(this).attr('value')).attr('value')); ///$(this).val()
        } else {
            chkArray.push($(this).val());
        }
    });

    /* we join the array separated by the comma */
    var selected;
    selected = chkArray.join(',');

    /* check if there is selected checkboxes, by default the length is 1 as it contains one single comma */
    if (selected.length > 1) {
        return selected;
    } else {
        return '';
    }
}

function findProduct(referrer) {
    if (referrer.length == 13) {
        $.ajax({
            type: "GET",
            url: "ajax.php?tp=1&token=1&referencefix=" + referrer,
            async: false,
            cache: false,
            success: function(data) {
                $('.add_sku_order_add').html(data);

            }
        });
    } else {
        $('.add_sku_order_add').html('Mã ' + referrer + ' không tồn tại.');
    }

}

function getWidget(id_item) {
    //	  type: 1 page news
    if (id_item > 0) {
        $('.data-item-widget-' + id_item).val();
        $.ajax({
            type: "GET",
            url: "ajax.php?widget-news=1&token=1&widget=" + $('.data-item-widget-' + id_item).val(),
            async: false,
            cache: false,
            success: function(data) {

                if (data.length > 10) {
                    $('#select1').html(data)
                    $('.list-widget-set').removeClass('hide')
                }
            }
        });
    } else {
        $('.add_sku_similar_add').html('Mã ' + referrer + ' không tồn tại.');
    }
}

function findProductSimilar(referrer, type = 0) {
    //	  type: 1 page news
    if (referrer.length > 2) {
        $.ajax({
            type: "GET",
            url: "ajax.php?tpsimilar=1&token=1&referencefix=" + referrer + "& tyset=" + type,
            async: false,
            cache: false,
            success: function(data) {
                $('.add_sku_similar_add').html(data);

            }
        });
    } else {
        $('.add_sku_similar_add').html('Mã ' + referrer + ' không tồn tại.');
    }
}

function findProductSimilarWinwheel(referrer) {
    if (referrer.length > 2) {
        $.ajax({
            type: "GET",
            url: "ajax.php?tpsimilarwinwheel=1&token=1&referencefix=" + referrer,
            async: false,
            cache: false,
            success: function(data) {
                $('.add_sku_similar_add').html(data);

            }
        });
    } else {
        $('.add_sku_similar_add').html('Mã ' + referrer + ' không tồn tại.');
    }
}

function findProducts() {
    name_product = $('.find-products').val();
    id_product = ((name_product.split("-"))[0]).trim();

    if (id_product.length > 2) {
        $.ajax({
            type: "GET",
            url: "ajax.php?addLabel=1&token=1&id_product=" + id_product,
            async: false,
            cache: false,
            success: function(data) {
                console.log(data);
                $('.add_sku_similar_add').html(data);
            }
        });
    } else {
        $('.add_sku_similar_add').html('Mã ' + id_product + ' không tồn tại.');
    }
}

function findManufacturer() {
    name_manufacturer = $('.find-manufacturer').val();
    id_manufacturer = ((name_manufacturer.split("-"))[0]).trim();

    if (id_manufacturer.length > 0) {
        $.ajax({
            type: "GET",
            url: "ajax.php?addLabel=1&token=1&id_manufacturer=" + id_manufacturer,
            async: false,
            cache: false,
            success: function(data) {
                $('.add_sku_similar_add').html(data);
            }
        });
    } else {
        $('.add_sku_similar_add').html('Mã ' + id_manufacturer + ' không tồn tại.');
    }

}

function showAttributeColorGroup(name, container) {
    var id_list;
    var value;

    id_list = document.getElementById(name);
    value = id_list.options[id_list.selectedIndex].value;
    if (attributesGroups[value])
        openCloseLayer(container, 'open');
    else
        openCloseLayer(container, 'close');
}

function openCloseLayer(whichLayer, action) {
    var style = getE(whichLayer).style;
    if (!action)
        style.display = style.display == 'none' ? 'block' : 'none';
    else if (action == 'open')
        style.display = 'block';
    else if (action == 'close')
        style.display = 'none';
}

function showStoreQuantity(city, district, referrer, list_product) {

    var province = $('#province_id_store').val();
    if (province < 1) {
        if (list_product > 0) { // if list product full store
            $('.show_store_all').show();
            $('.show_store_all_content').html('<p>Vui lòng chọn tỉnh/thành.</p>');
        } else {
            $('.show_' + referrer).show();
            $('.show_store_' + referrer).html('<p>Vui lòng chọn tỉnh/thành.</p>');
        }
        return false;
    }

    var d = {
        checkquanty: 1,
        city: city,
        list_product: list_product,
        district: district,
        referrer: referrer
    };
    $.ajax({
        type: "POST",
        url: "ajax.php",
        async: false,
        cache: false,
        data: d,
        success: function(data) {

            if (list_product > 0) { // if list product full store
                if (data == '1') {
                    $('.show_store_all').show();
                    $('.show_store_all_content').html(' Không tìm thấy dữ liệu');
                    $('#district_id_store').addClass('none');

                } else {
                    var sliptdata = data.split("@$5@");
                    $('.show_store_all').show();
                    $('.show_store_all_content').html(sliptdata[0]);
                    $('#district_id_store').html(sliptdata[1]);
                    $('#district_id_store').removeClass('none');

                }
            } else {
                if (data == '1') {
                    $('.show_' + referrer).show();
                    $('.show_store_' + referrer).html('<p> Không tìm thấy dữ liệu</p>');
                    $('#district_id_store').addClass('none');

                } else {
                    var sliptdata = data.split("@$5@");
                    $('.show_' + referrer).show();
                    $('.show_store_' + referrer).html(sliptdata[0]);
                    $('#district_id_store').html(sliptdata[1]);
                    $('#district_id_store').removeClass('none');

                }
            }
        }
    });

}



//
var query;
var lang = ["Cập nhật thông tin", "Yêu cầu thất bại !", "Đang thực hiện cập nhật. Xin chờ giây lát.", "Có lỗi khi kết nối sever"];

//function setLang(array_lang) { lang = array_lang; }
function showActivity() {
    document.getElementById('ajax_confirmation').innerHTML = '<span class="bold">' + lang[2] + '</span>';
}

function getQuery() {
    var result;

    result = query;
    if (result == null) {
        if (window.XMLHttpRequest)
            result = new XMLHttpRequest();
        else if (window.ActiveXObject)
            result = new ActiveXObject('Microsoft.XMLHTTP');
    }
    return result;
}

function onQueryChange() {
    if (query.readyState == 4 && query.status == 200)
        document.getElementById('ajax_confirmation').innerHTML = '<span class="green bold">' + lang[0] + '</span>';
}

function request_failed() { alert(lang[1]); }

function ajax_power(src, action, id_tab, id_profile, token) {
    query = getQuery();
    if (query != null) {
        try {
            query.open('POST', 'index.php?tab=AdminAccess', true);
            query.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            query.onreadystatechange = onQueryChange;
            query.send('submitAddaccess=1&action=' + action + '&perm=' + parseInt(src.checked ? '1' : status = '0') + '&id_tab=' + parseInt(id_tab) + '&id_profile=' + parseInt(id_profile) + '&token=' + token);
            showActivity();
        } catch (exc) {
            request_failed();
        }
    } else
        alert(lang[3]);
}

function redirect(new_page) { window.location = new_page; }
// mail template
function viewTemplates(id_select, id_lang, prefix, ext) {
    var id_list = document.getElementById(id_select);
    var loc = id_list.options[id_list.selectedIndex].value;
    if (loc != 0)
        openWin(prefix + loc + ext, 'tpl_viewing', '520', '400', '50', '300');
    return;
}

var newWin = null;

function closeWin() {
    if (newWin != null)
        if (!newWin.closed)
            newWin.close();
}

function openWin(url, title, width, height, top, left) {
    var options;
    var sizes;

    closeWin();
    options = 'toolbar=0, location=0, directories=0, statfr=no, menubar=0, scrollbars=yes, resizable=yes';
    sizes = 'width=' + width + ', height=' + height + ', top=' + top + ', left=' + left + '';
    newWin = window.open(url, title, options + ', ' + sizes);
    newWin.focus();
}

function showContentDefault(style) {
    id_manufacturer = $('#id_manufacturer').val();
    id_category_default = $('#id_category_default').val();
    var key_action = " ";
    if (style == 1) {
        key_action = 'meta_description';
    } else if (style == 2) {
        key_action = 'meta_keywords';
    }
    var data_array = {
        id_manufacturer: id_manufacturer,
        id_category_default: id_category_default,
        key_action: key_action
    };

    $.ajax({
        type: "POST",
        url: "ajax.php",
        async: false,
        cache: false,
        data: data_array,
        success: function(data) {
            data = JSON.parse(data);
            if (style == 1) {
                html = '<strong>Mô tả theo Category</strong>: <br> - ' + (data.category ? data.category : 'Không tìm thấy dữ liệu!') + '<p><strong>Mô tả theo Thương hiệu</strong>: <br> - ' + (data.manufacturer ? data.manufacturer : 'Không tìm thấy dữ liệu!');
                $('.meta-description-default').html(html);
            }
            if (style == 2) {
                added_keyword = $('#added_keyword').val();
                if (added_keyword == 'false') {
                    type_keywords = $('input[name="type_keywords"]:checked').val();
                    if (type_keywords == 1) {
                        $('#meta_keywords').val($('#meta_keywords').val() + ', ' + data.category);
                    } else if (type_keywords == 2) {
                        $('#meta_keywords').val($('#meta_keywords').val() + ', ' + data.manufacturer);
                    }
                    $('#text-alert-keyword').removeClass('hide');
                    // $('#added_keyword').val('true');
                }
            }
        }
    });
}

function checkUrlProduct() {
    id_category_default = $('#id_category_default option:selected').attr('data-link');
    link_rewrite = $('#link_rewrite').val();
    $('#url_product').html('<a style="cursor: pointer;">/' + id_category_default + '/' + link_rewrite + '</a>');
}

function countText() {
    text = $('#meta_description').val();
    num = text.length;
    rest_num = 290 - num;
    if (rest_num > 0) {
        $('#alert_string_lengh').html('Còn ' + rest_num + ' ký tự.');
    } else {
        $('#alert_string_lengh').html('Bạn đã vượt quá số ký tự cho phép.');
    }
}

function findManufacturerBox() {
    name_manufacturer = $('.find-manufacturer').val();
    id_manufacturer = ((name_manufacturer.split("-"))[0]).trim();

    if (id_manufacturer.length > 0) {
        $.ajax({
            type: "GET",
            url: "ajax.php?homeBox=1&token=1&id_manufacturer=" + id_manufacturer,
            async: false,
            cache: false,
            success: function(data) {
                $('.add_sku_similar_add').html(data);
            }
        });
    } else {
        $('.add_sku_similar_add').html('Mã ' + id_manufacturer + ' không tồn tại.');
    }
}

function findCategoryBox() {
    name_category = $('.find-category').val();
    id_category = ((name_category.split("-"))[0]).trim();

    if (id_category.length > 0) {
        $.ajax({
            type: "GET",
            url: "ajax.php?homeBox=1&token=1&id_category=" + id_category,
            async: false,
            cache: false,
            success: function(data) {
                $('.add_sku_similar_add').html(data);
            }
        });
    } else {
        $('.add_sku_similar_add').html('Mã ' + id_category + ' không tồn tại.');
    }

}

function testPushNotify() {
    phone_test = $('#phone_test').val();
    notify_title = $('#notify_title').val();
    notify_title_en = $('#notify_title_en').val();
    notify_message = $('#notify_message').val();
    detail_url = $('#detail_url').val();
    id_notify = $('#id_notify').val();
    id_template = $('#id_template').val();
    if (phone_test.length > 9) {
        $.ajax({
            type: "POST",
            url: "ajax.php",
            async: false,
            cache: false,
            data: {
                phone_test: phone_test,
                notify_title: notify_title,
                notify_title_en: notify_title_en,
                notify_message: notify_message,
                detail_url: detail_url,
                id_notify: id_notify,
                id_template: id_template
            },
            success: function(data) {
                data_parse = JSON.parse(data);
                if (data_parse.result) {
                    alert(data_parse.message);
                }
            }
        });
    }
}

function showPopupDuplicateVideo(id_video) {
    $('#modal-duplicate-video').modal('show');
    $('#id_video_duplicate').val(id_video);

}

function addVideoProducts() {
    let id_video = $('#id_video_duplicate').val();
    let list_product = $('#list_product').val();
    $.ajax({
        type: "POST",
        url: "ajax.php",
        async: false,
        cache: false,
        data: {
            list_product: list_product,
            id_video: id_video,
            duplicate_video: 1
        },
        success: function(data) {
            data_parse = JSON.parse(data);
            if (data_parse.result) {
                $('#message_status').html('<div style="color: green;background-color: #cdd7cd;border-radius: 8px;padding: 5px;">Thêm thành công.</div>');
            }
        }
    });
}

function editVideoProduct(id_video) {
    $.ajax({
        type: "POST",
        url: "ajax.php",
        async: false,
        cache: false,
        data: {
            id_video: id_video,
            info_update_video: 1
        },
        success: function(data) {
            data_parse = JSON.parse(data);
            data_video = data_parse.data;
            if (data_parse.result) {
                $('#video_name_update').val(data_video.video_name);
                if (parseInt(data_parse.data.type_video) == 1) {
                    $("#type_video_update_1").prop("checked", "checked");
                } else if (parseInt(data_parse.data.type_video) == 2) {
                    $("#type_video_update_2").prop("checked", "checked");
                } else if (parseInt(data_parse.data.type_video) == 3) {
                    $("#type_video_update_3").prop("checked", "checked");
                }
                $('#modal-update-video').modal('show');
                $('#id_video_update').val(id_video);
            }
        }
    });
}

function updateVideoProduct() {
    let id_video = $('#id_video_update').val();
    let video_name = $('#video_name_update').val();
    let type_video = $('input[name=type_video_update]:checked').val();

    $.ajax({
        type: "POST",
        url: "ajax.php",
        async: false,
        cache: false,
        data: {
            id_video: id_video,
            video_name: video_name,
            type_video: type_video,
            update_video: 1
        },
        success: function(data) {
            data_parse = JSON.parse(data);
            if (data_parse.result) {
                $('#message_status_update').html('Cập nhật thành công.');
                setTimeout(function() {
                    $('#modal-update-video').modal('hide');
                    $('#message_status_update').html('');
                }, 1500)
            }
        }
    });
}

function getBrandSpins() {
    id_winwheel = $('#id_winwheel').val();
    $.ajax({
        type: "POST",
        url: "ajax.php",
        async: false,
        cache: false,
        data: {
            id_winwheel: id_winwheel,
            adminWinwheelBrand: 1
        },
        success: function(data) {
            data_parse = JSON.parse(data);
            if (data_parse.result) {
                $('#id_winwheel_brand').html(data_parse.html);
            } else {
                $('#id_winwheel_brand').html(data_parse.html);
                alert('Chưa khai báo nhãn hàng cho chương trình vòng quay đã chọn. Vui lòng khai báo nhãn hàng trước khi tạo ô cho vòng quay của nhãn.');
            }
        }
    });
}

function getSegmentSpins() {
    id_winwheel = $('#id_winwheel').val();
    id_brand = $('#id_winwheel_brand').val();
    $.ajax({
        type: "POST",
        url: "ajax.php",
        async: false,
        cache: false,
        data: {
            id_winwheel: id_winwheel,
            id_brand: id_brand,
            adminWinwheelSegment: 1
        },
        success: function(data) {
            data_parse = JSON.parse(data);
            if (data_parse.result) {
                $('#id_segment').html(data_parse.html);
            } else {
                $('#id_segment').html(data_parse.html);
                // alert('Chưa khai báo nhãn hàng cho chương trình vòng quay đã chọn. Vui lòng khai báo nhãn hàng trước khi tạo ô cho vòng quay của nhãn.');
            }
        }
    });
}

function checkExistSegment() {
    id_winwheel = $('#id_winwheel').val();
    id_brand = $('#id_winwheel_brand').val();
    $.ajax({
        type: "POST",
        url: "ajax.php",
        async: false,
        cache: false,
        data: {
            id_winwheel: id_winwheel,
            id_brand: id_brand,
            checkExistSegment: 1
        },
        success: function(data) {
            console.log(data);
            data_parse = JSON.parse(data);
            if (data_parse.result == false) {
                alert('Nhãn hàng đã có đủ ô vòng quay. Vui lòng kiểm tra lại!');
            }
        }
    });
}

function checkCache() {
    $.ajax({
        type: "POST",
        url: "ajax.php",
        async: false,
        cache: false,
        data: {
            checkCacheSpins: 1
        },
        success: function(data) {
            data_parse = JSON.parse(data);
            if (data_parse.result) {
                $('#image-segment').attr("src", data_parse.url);
            } else {
                $('#image-segment').attr("src", '');
            }
        }
    });
}

function getImageSegment() {
    id_winwheel = $('#id_winwheel').val();
    id_brand = $('#id_winwheel_brand').val();
    id_segment = $('#id_segment').val();
    $.ajax({
        type: "POST",
        url: "ajax.php",
        async: false,
        cache: false,
        data: {
            id_winwheel: id_winwheel,
            id_brand: id_brand,
            id_segment: id_segment,
            adminWinwheelImageSegment: 1
        },
        success: function(data) {
            data_parse = JSON.parse(data);
            if (data_parse.result) {
                $('#image-segment').attr("src", data_parse.url);
            } else {
                $('#image-segment').attr("src", '');
                // alert('Chưa khai báo nhãn hàng cho chương trình vòng quay đã chọn. Vui lòng khai báo nhãn hàng trước khi tạo ô cho vòng quay của nhãn.');
            }
        }
    });
}

function syncBrandErp() {
    // text = 'Bạn muốn đồng bộ lại danh sách nhãn hàng vòng quay, cashback, flashbox từ ERP?';
    // if (confirm(text) == true) {
    $.ajax({
        type: "POST",
        url: "ajax.php",
        async: false,
        cache: false,
        data: {
            syncBrandErp: 1
        },
        success: function(data) {
            data_parse = JSON.parse(data);
        }
    });
}

function loadCache() {
    // text = 'Bạn muốn nạp lại cache chương trình vòng quay, cashback, flashbox?';
    // if (confirm(text) == true) {
    $.ajax({
        type: "POST",
        url: "ajax.php",
        async: false,
        cache: false,
        data: {
            loadCache: 1
        },
        success: function(data) {
            data_parse = JSON.parse(data);
            if (data_parse.result) {
                alert(data_parse.message);
            }
        }
    });
    // }
}

function removeCacheWinwheelActive() {
    // text = 'Bạn muốn nạp lại cache chương trình vòng quay, cashback, flashbox?';
    // if (confirm(text) == true) {
    $.ajax({
        type: "POST",
        url: "ajax.php",
        async: false,
        cache: false,
        data: {
            removeCacheWinwheelActive: 1
        },
        success: function(data) {
            data_parse = JSON.parse(data);
        }
    });
    // }
}

function syncEVoucher(idVoucher, reference) {
    $("#syncEVoucher").prop('onclick', null);
    $("#syncEVoucher").css({ opacity: "0.5" });
    tableInsert = $("input[name='table_insert']:checked").val();
    limitVoucher = $('#limit_voucher').val();
    $.ajax({
        type: "POST",
        url: "ajax.php",
        async: false,
        cache: false,
        data: {
            ajax: 1,
            classAjax: 'AjaxVoucher',
            methodAjax: 'addEVoucher',
            idVoucher: idVoucher,
            reference: reference,
            tableInsert: tableInsert,
            limitVoucher: limitVoucher,
        },
        success: function(data) {
            data_parse = JSON.parse(data);
            if (data_parse.result) {
                $('#message-voucher').html(data_parse.message);
                $('#message-voucher').removeClass('hide');
                // $("#syncEVoucher").on("click", syncEVoucher);
                $("#syncEVoucher").css({ opacity: "1" });
                setTimeout(function() {
                    window.location.reload();
                }, 2000);
            } else {
                $('#message-voucher').html(data_parse.message);
                $('#message-voucher').removeClass('hide');
                setTimeout(function() {
                    window.location.reload();
                }, 2000);
            }
        }
    });
}

function updateVoucherGift(idVoucher) {
    $("#updateVoucherGift").prop('onclick', null);
    $("#updateVoucherGift").css({ opacity: "0.5" });
    $.ajax({
        type: "POST",
        url: "ajax.php",
        async: false,
        cache: false,
        data: {
            ajax: 1,
            classAjax: 'AjaxVoucher',
            methodAjax: 'updateVoucherGift',
            idVoucher: idVoucher
        },
        success: function(data) {
            data_parse = JSON.parse(data);
            if (data_parse.result) {
                $('#message-voucher').html(data_parse.message);
                $('#message-voucher').removeClass('hide');
                // $("#syncEVoucher").on("click", syncEVoucher);
                $("#updateVoucherGift").css({ opacity: "1" });
                setTimeout(function() {
                    window.location.reload();
                }, 2000);
            } else {
                $('#message-voucher').html(data_parse.message);
                $('#message-voucher').removeClass('hide');
                setTimeout(function() {
                    window.location.reload();
                }, 2000);
            }
        }
    });
}

function pushBannerSocket() {
    let phone = prompt("Nhập số điện bạn cần test, nếu bỏ qua bước test chọn 'Cancel' :", "");
    $.ajax({
        type: "POST",
        url: "ajax.php",
        async: false,
        cache: false,
        data: {
            ajax: 1,
            classAjax: 'AjaxSocket',
            methodAjax: 'pushAllBannerSocket',
            phone: phone
        },
        success: function(data) {
            data_parse = JSON.parse(data);
            if (data_parse.result) {
                alert('Push banner socket thành công.');
            } else {
                alert('Push banner socket failed.');
            }
        }
    });
}

function pushMiniLiveSocket() {
    $.ajax({
        type: "POST",
        url: "ajax.php",
        async: false,
        cache: false,
        data: {
            ajax: 1,
            classAjax: 'AjaxSocket',
            methodAjax: 'pushMiniLiveSocket',
        },
        success: function(data) {
            data_parse = JSON.parse(data);
            if (data_parse.result) {
                alert('Push banner socket thành công.');
            } else {
                alert('Push banner socket failed.');
            }
        }
    });
}