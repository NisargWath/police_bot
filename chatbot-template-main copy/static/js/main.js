$(window).on('load',function () {
    // $('.preloaderIn').fadeIn();

    $(document).on("click", ".langSwitch span", function(){
        var url = window.location.pathname;
        
        // url = url.split('http://mahapolice.gov.in/en/');
        console.log(url);
        window.location = 'http://mahapolice.gov.in/en' + url;
    });


    // $(window).load(function() {
    //     function Preloader() {
    //         setTimeout(function(){ $('.first').addClass('activeLine'); },1000);
    //         setTimeout(function(){ $('.second').addClass('activeLine'); },1200);
    //         setTimeout(function(){ $('.third').addClass('activeLine'); },1400);
    //         setTimeout(function(){ $('.fourth').addClass('activeLine'); },1600);
    //         setTimeout(function(){ $('.fifth').addClass('activeLine'); },1800);

    //         setTimeout(function(){
    //             $('.preloader').fadeOut();
    //         },5000);
    //     }
    //     if ( ! sessionStorage.getItem( 'doNotShow' ) ) {
    //         sessionStorage.setItem( 'doNotShow', true );
    //         Preloader();
    //     } else {
    //        $('.preloader').fadeOut();
    //     }
    // });

    // setTimeout(function(){ $('.first').addClass('activeLine'); },1000);
    // setTimeout(function(){ $('.second').addClass('activeLine'); },1200);
    // setTimeout(function(){ $('.third').addClass('activeLine'); },1400);
    // setTimeout(function(){ $('.fourth').addClass('activeLine'); },1600);
    // setTimeout(function(){ $('.fifth').addClass('activeLine'); },1800);
    
    // setTimeout(function(){
    //     $('.preloader').fadeOut();
    //     $('.homeBannerSlider').slick({
    //         lazyLoad: 'ondemand',
    //         dots: true,
    //         arrows: false,
    //         infinite: true,
    //         speed: 1000,
    //         slidesToShow: 1,
    //         autoplay: true,
    //         fade: true
    //     });   
    // },7000);

        $('.homeBannerSlider').slick({
            lazyLoad: 'ondemand',
            dots: true,
            arrows: false,
            infinite: true,
            speed: 1000,
            slidesToShow: 1,
            autoplay: true,
            fade: true
        });   
    
    setTimeout(function(){
        $('.lazyLoad img').each(function(){
            var lazyLoadImgUrl = $(this).attr('data-src');
            $(this).attr('src', lazyLoadImgUrl);    
        });
    },500);
    
}); 





$(function(){
	// AOS.init();

    $('.mahaMap a').click(function(){
        var mapId = $(this).attr('id');
        var link = $(this).attr('href');
        console.log(link);
        if(link ==  undefined){
            $('.statePopup').fadeIn();
            $('.statePopup').css('display','flex');
            $('.' + mapId).fadeIn();    
        }else{
            console.log(mapId);
        }
    });

    $('.statePopup .closeStatePopup').click(function(){
        $('.statePopup').fadeOut();
        $('.statePopupMain').fadeOut();
    });

    $('.payShradhanjali').click(function(){
        // alert('sdss');
        $('.eshraddhanjaliImg').fadeIn();
        $('.eshraddhanjaliImg').css('display','block');
    });

    var flag = 'N';

    $(window).scroll(function() {
        var scrollVal = $(window).scrollTop();
        var widthMain = 0;
        if(scrollVal>10){
            if($('.homeBody').length > 0){
                if(flag == 'N'){
                    $.ajax({url: "http://mahapolice.gov.in/socialFeed.php", success: function(result){
                        $(".homeBody .spcialWrapOut").html(result);
                    }});
                    flag = 'Y';
                }
            }

            
        }

    });

    // $('.counter').click(function(){
    //     alert('sdss');
    //     $('.eshraddhanjaliImg').fadeIn();
    // });

	var baseurl = $('#baseurl').val();

	$('.galleryWrap .pdfBlock').click(function(){
    	var id = $(this).attr('id');
    	if($(this).hasClass('activeTabGallery')){
    		$('.activeTabGallery').slideUp();
    		$('.activeTabGallery').removeClass('activeTabGallery');
    	}else{
    		$('.galleryTabMainIn').slideUp(); 
    		$('.' + id).addClass('activeTabGallery').slideDown();
    		$('.activeTabGallery img').each(function(){
    		    var imgSrc = $(this).attr('data-src');
    		    $(this).attr('src', imgSrc);
    		});
    	}

    	setTimeout(function(){
    		$('html,body').animate({
	        	scrollTop: $('.' + id).offset().top - 120},
	        'slow');
    	},500)
    	 	
    	
    	
    });
    
    

	$('.accordianTop').click(function(){
		if($(this).parent().hasClass('activeAccordian')){
			$(this).parent().removeClass('activeAccordian');
			$(this).parent().find('.accordianBottom').slideUp();
		}else{
			$('.activeAccordian .accordianBottom').slideUp()
			$('.activeAccordian').removeClass('activeAccordian');
			$(this).parent().addClass('activeAccordian');
			$(this).parent().find('.accordianBottom').slideDown();
		}
	});

	$('.feedbackBtn p').click(function(){
		$('.feedBackFormOverlay').fadeIn();
		$('.feedBackForm').addClass('feedBackFormActive');
	});

	$('.overlay, .closeFeedbackForm').click(function(){
		$('.feedBackFormOverlay').fadeOut();
		$('.feedBackForm').removeClass('feedBackFormActive');
	});


	$('.tabMain li').click(function(){
		var tabName = $(this).attr('id');
		$('.activeTab').removeClass('activeTab');
		$('.tabWrap').fadeOut().removeClass('activeWrap');

		$(this).addClass('activeTab');
		$('.tabWrap.' + tabName + 'Wrap').delay(300).fadeIn();
	});


	$(".home-ds-select").change(function () {
		var url = $(this).val();
		var win = window.open(url, '_blank');
    });

	$(".circulars-select").change(function () {
        	var url = $(this).val();
        	window.location.href = url;
    	});
    $('.welfareWrap .linkList span').click(function(){
    	var linkName = $(this).attr('id');

    	$('.activeLinkList').removeClass('activeLinkList');
    	$('.linkListDetails').fadeOut();

    	$(this).addClass('activeLinkList');
    	$('.' + linkName).delay(300).fadeIn();
    });

    $('.menuHomeName .asideSection').click(function(){
    	var homeMenuName = $(this).attr('id');

    	if($(this).parent().hasClass('innerMenu')){

    	}else{
    		if($(window).width() <= 600){
	    		homeMenuName = homeMenuName + 'Mobile';
	    	}else{
	    		homeMenuName = homeMenuName + 'Desktop';
	    	}
    	}

    	if($(this).hasClass('activeHomeMenu')){
    		$(this).removeClass('activeHomeMenu');
    		$('.' + homeMenuName).slideUp();
    	}else{
    		$('.activeHomeMenu').removeClass('activeHomeMenu');
	    	$('.menuHomeGroupIn').slideUp();

	    	$(this).addClass('activeHomeMenu');
	    	$('.' + homeMenuName).slideDown();
    	}
    });

    $('.hierarchyOut').click(function(){
   //  	if($(this).hasClass('active')){
			// $('.' + id + ' .hierarchyOut').slideUp();    		
   //  	}
    	var id = $(this).attr('id');

        
            if($(this).hasClass('active')){
                $(this).removeClass('active');    
                $('.' + id).slideUp();
                // if($(this).parent().hasClass('hierarchyLvl1')){
                //     $('.hierarchyWrap').slideUp();
                //     $('.hierarchyOut').removeClass('active');
                // }
            }else{
                if($(this).parent().hasClass('hierarchyLvl1')){
                    // alert('ffg');
                    $('.hierarchyLvl2Wrap .hierarchyWrap, .hierarchyLvl3Wrap .hierarchyWrap, .hierarchyLvl4Wrap .hierarchyWrap, .hierarchyLvl5Wrap .hierarchyWrap').slideUp();
                    $('.hierarchyLvl1 .hierarchyOut, .hierarchyLvl2Wrap .hierarchyOut, .hierarchyLvl3Wrap .hierarchyOut, .hierarchyLvl4Wrap .hierarchyOut, .hierarchyLvl5Wrap .hierarchyOut').removeClass('active');
                }else if($(this).parent().hasClass('hierarchyLvl2')){
                    $('.hierarchyLvl3Wrap .hierarchyWrap, .hierarchyLvl4Wrap .hierarchyWrap, .hierarchyLvl5Wrap .hierarchyWrap').slideUp();
                    $('.hierarchyLvl2Wrap .hierarchyOut, .hierarchyLvl3Wrap .hierarchyOut, .hierarchyLvl4Wrap .hierarchyOut, .hierarchyLvl5Wrap .hierarchyOut').removeClass('active');
                }else if($(this).parent().hasClass('hierarchyLvl3')){
                    $('.hierarchyLvl4Wrap .hierarchyWrap, .hierarchyLvl5Wrap .hierarchyWrap').slideUp();
                    $('.hierarchyLvl3Wrap .hierarchyOut, .hierarchyLvl4Wrap .hierarchyOut, .hierarchyLvl5Wrap .hierarchyOut').removeClass('active');
                }else if($(this).parent().hasClass('hierarchyLvl4')){
                    $('.hierarchyLvl5Wrap .hierarchyWrap').slideUp();
                    $('.hierarchyLvl4Wrap .hierarchyOut, .hierarchyLvl5Wrap .hierarchyOut').removeClass('active');
                }
                
                $(this).addClass('active');    
                $('.' + id).slideDown();
            }


    });

    $('.subemenuClick').click(function(){
    	if($(this).hasClass('activeSubmenu')){
    		$(this).removeClass('activeSubmenu');
    		$(this).find('.submenu').slideUp();
    	}
    	else{
    		$('.activeSubmenu').find('.submenu').slideUp();
    		$('.activeSubmenu').removeClass('activeSubmenu');
    		$(this).addClass('activeSubmenu');	
    		$(this).find('.submenu').slideDown();
    	}
    	
    });

    $('.menuClick').click(function(){
    	$(this).toggleClass('activeMenu');
    	$('.headRight, .topNav').toggleClass('activeMobileMenu');
    	$('.mobileMenuOverlay').fadeToggle();
    });
    $('.mobileMenuOverlay').click(function(){
    	$('.menuClick').removeClass('activeMenu');
    	$('.headRight, .topNav').removeClass('activeMobileMenu');
    	$('.mobileMenuOverlay').fadeOut();

    });

    
    $('.pageMenuClick').click(function(){
    	$(this).toggleClass('pageMenuClickActive');
    	$('.rightNav').toggleClass('activePageMenu');
    	$('.innerMenuOverlay').fadeToggle();
    });
    $('.innerMenuOverlay').click(function(){
    	$('.rightNav').removeClass('activePageMenu');
    	$('.pageMenuClick').removeClass('pageMenuClickActive');
    	$('.innerMenuOverlay').fadeOut();

    });
    

     

	$('.quoteWrapSlider ul').slick({
	  	dots: true,
	  	arrows: false,
	  	infinite: true,
	  	speed: 300,
	  	slidesToShow: 1,
	  	adaptiveHeight: true,
	  	autoplay: true
	});


    

    	// $('.homeBanner').css("background-image", "url('" + baseurl + "images/banner/" + Math.floor((Math.random() * 10) + 1) + ".jpg')");
    	// $('.homeBanner').css("background-image", "url('images/bannerNew1.jpg')");

    //Feedback form
    $('#feedback_form').on('submit', function() {
        var formData = new FormData($("#feedback_form")[0]);
        formData.append('type','feedback');
        $("#feedback_form").find('.error').text("");
        $("#feedback_form").find('.success_msg').text("");
        $("#feed_submit_btn").val('Please wait...');
        $("#feed_submit_btn").attr('disabled','disabled');
        $.ajax({
            type: "POST",
            dataType: "json",
            url: baseurl+'ajax/feedbackComplaintController.php',
            data: formData,
            //async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function(result) {
                $("#feed_submit_btn").val('Submit');
                if(result["errCode"] == -1){
                    $("#feedback_form").find('.success_msg').text(result.errMsg);
                    setTimeout(function(){
                        $("#feed_submit_btn").prop("disabled", false);
                        $('#feedback_form')[0].reset();
                        $("#feedback_form").find('.success_msg').text("");
                        $("#feedback_form").find('.error').text("");
                    },2500);
                }else{
                    $("#feed_submit_btn").prop("disabled", false);
                    if($.isArray(result.errMsg)){
                        $.each(result.errMsg,function(key,val){
                            $.each(val,function(subkey,subval){
                                $('#feedback_form').find('#'+subkey+'_err').html(subval);
                            })
                        })
                    }
                    else{
                        $.each(result.errMsg,function(key,val){
                            $('#feedback_form').find('#'+key+'_err').text(val);
                        })
                    }
                }
            },
            error: function() {
                $("#feed_submit_btn").prop("disabled", false);
                $("#feed_submit_btn").val('Submit');
                $("#feedback_form").find('.failure_msg').text("Failed to submit feedback. Please try again.");
            }
        });
    });

    //Complaint form
    $('#complaint_form').on('submit', function() {
        var formData = new FormData($("#complaint_form")[0]);
        formData.append('type','complaint');
        $("#complaint_submit_btn").val('Please wait...');
        $("#complaint_submit_btn").attr('disabled','disabled');
        $.ajax({
            type: "POST",
            dataType: "json",
            url: baseurl+'ajax/feedbackComplaintController.php',
            data: formData,
            //async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function(result) {
                $("#complaint_submit_btn").prop("disabled", false);
                $("#complaint_submit_btn").val('Submit');
                if(result["errCode"] == -1){
                    setTimeout(function(){
                        $('#complaint_form')[0].reset();
                    },2500);
                }else{

                }
            },
            error: function() {
                $("#complaint_submit_btn").prop("disabled", false);
                $("#complaint_submit_btn").val('Submit');
            }
        });
    });

    //Police Corner
    $('#police_corner_login').submit(function(e){
        e.preventDefault();
        var formData = new FormData($(this)[0]);
        formData.append('type','post_login');
        $("#police_corner_submit").val('Please wait...');
        $("#police_corner_submit").attr('disabled','disabled');
        $.ajax({
            type: "POST",
            dataType: "json",
            url: baseurl+'ajax/policeCornerController.php',
            data: formData,
            //async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function(result) {
                $("#police_corner_submit").prop("disabled", false);
                $("#police_corner_submit").val('Submit');
                if(result["errCode"] == -1){
                    setTimeout(function(){
                        window.location.href = result['errMsg']['redirect_url'];
                    },800);
                }else{

                }
            },
            error: function() {
                $("#police_corner_submit").prop("disabled", false);
                $("#police_corner_submit").val('Submit');
            }
        });
    })

    $('.payShradhanjali').click(function(e){
        e.preventDefault();
        $.ajax({
            url: baseurl+'ajax/martyrsCount.php',
            data: {is_ajax:'yes',baseurl:baseurl},
            type: 'post',
            success: function(result){
                $('#m_count').html(result);
            }
        })
    })

    $("marquee").hover(function () { 
        this.stop();
    }, function () {
        this.start();
    });
});

