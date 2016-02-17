function scrollToMeError(id, offset){
    var x = jQuery('#'+id).offset().top - offset;
    jQuery('html,body').animate({scrollTop: x}, 400);
    return;
}

function scrollToMe(id, offset){
    return scrollToMeError(id, offset);
}

String.prototype.replaceAt=function(index, character) {
return this.substr(0, index) + character + this.substr(index+character.length);
}

function validateNotEmpty(string){
    console.log(string);
    return (string!="" && string!="0")?true:false;
    }
function validatePhoneNumber(phoneNumber){
    return /^((([+]|00)3(9|79|78)(3|0))|3|(0[^0]))[0-9]{7,12}$/.test(phoneNumber);
}
function validateDigit(string){
    return /^\d+$/.test(string);
    }
function validatePrice(price){
    //return (/^\d{1,6}(\,\d{0,2})?$/.test(price));
    return (/^\d{1,6}(\.\d{0,2})?$/.test(price));
}
function validateEmail(mail){
    return /^\w{1,30}([\.-]?\w{1,30})@\w{1,20}([\.-]?\w{1,20})(\.\w{2,10})+$/.test(mail);
}
function validateCF(cf){
    return /^([A-Z]|[a-z]|[0-9]){10,20}$/.test(cf)
}
function validateVAT(vat){
    return /^[0-9]{11,11}$/.test(vat)
}
function validateCAP(vat){
    return /^[0-9]{5,5}$/.test(vat)
}
function validateMaxMin(obj){
    var length = obj.val().length;
    var minlength =  obj.attr('minlength') || 0;
    var maxlength = obj.attr('maxlength') || 100;
    return ( length >= minlength && length <= maxlength)?true:false;
    }
function validateDate(date){
    return (date.length==10) && /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/.test(date);
}

function validatePasswordR(pas2){
    var pas1 = $('.validatePassword').val();
    //console.log("validatePasswordR");
    return (pas2 == pas1)?true:false;
}

function validatePriceMin(priceMin){
    var priceMax = $('.validatePriceMax').val();
    return (parseFloat(priceMax) >= parseFloat(priceMin))?true:false;
}

function validatePriceMax(priceMax){
    return validatePrice(priceMax);
}

function colorOK(obj){
    obj.css('color','#008200');
    obj.css('border',"2px solid #00D400");
    }
function colorKO(obj){
    obj.css('color','red');
    obj.css('border',"2px solid red");
    }

$(document).ready(function(){

    $(".validateNotEmpty").on('change keyup', function(){
        validateNotEmpty($(this).val())?colorOK($(this)):colorKO($(this));
    });

    $(".validate").on('change', function(){
        //console.log("va");
        colorOK($(this));
    });


$(".validateDigit").on('keyup', function(){
    validateDigit($(this).val())?colorOK($(this)):colorKO($(this));
    });

$('.validatePrice').on('change keyup', function(){
    validatePrice($(this).val())?colorOK($(this)):colorKO($(this));
});

$('.validatePriceMax').on('change keyup', function(){
    validatePrice($(this).val())?colorOK($(this)):colorKO($(this));
});

$(".validatePriceMin").on('keyup', function(){
    (validatePrice($(this).val()) && validatePriceMin($(this).val()) )?colorOK($(this)):colorKO($(this));
});

$('.validatePhoneNumber').on('change keyup', function(){
    validatePhoneNumber($(this).val())?colorOK($(this)):colorKO($(this));
});

$('.validatePrice').on('blur', function(){
    var obj = $(this);
    var price = obj.val();
    var length = price.length;
    var lastChar = price.charAt(length - 1);
    if(lastChar == "," || lastChar == "."){
        obj.val(price+"00");
    }
});

$(".validateEmail").on('keyup', function(){
    validateEmail($(this).val())?colorOK($(this)):colorKO($(this));
    });

$(".validateCF").on('keyup', function(){
    validateCF($(this).val())?colorOK($(this)):colorKO($(this));
    });

$(".validateVAT").on('keyup', function(){
    validateVAT($(this).val())?colorOK($(this)):colorKO($(this));
    });

$(".validateCAP").on('keyup', function(){
    validateCAP($(this).val())?colorOK($(this)):colorKO($(this));
    });

$(".validateMaxMin").on('keyup', function(){
    validateMaxMin($(this))?colorOK($(this)):colorKO($(this));
    });

$(".validatePasswordR").on('keyup', function(){
    validatePasswordR($(this).val())?colorOK($(this)):colorKO($(this));
});



$(".validateDate").on("keydown", function(e){
    if($(this).val().length == 2 && e.keyCode != 8){
    $(this).val($(this).val().replaceAt(2,"/"));
    }
if($(this).val().length == 5 && e.keyCode != 8){
    $(this).val($(this).val().replaceAt(5,"/"));
    }
})

$(".validateDate").on('keyup', function(e){
    //console.log(e.keyCode);
    if( $.inArray(e.keyCode, [8,37,38,39,40]) != -1 ){
        validateDate($(this).val())?colorOK($(this)):colorKO($(this));
    //return;
    }else if($(this).val().length <= 10){
        validateDate($(this).val())?colorOK($(this)):colorKO($(this));
    }
    if($(this).val().length == 2 && e.keyCode != 8){
        $(this).val($(this).val().replaceAt(2,"/"));
    }
    if($(this).val().length == 5 && e.keyCode != 8){
        $(this).val($(this).val().replaceAt(5,"/"));
    }
});

});

function validForm(form){
    var validator=true;
    var mybreak=false;
    $.each(form[0], function(index, item){

            if($('#'+item.id).hasClass("validate") && !$('#'+item.id).is(':disabled')){
                colorOK($('#'+form[0].id +' #'+item.id));
            }
            
            
            if($('#'+item.id).hasClass("validateNotEmpty") && !$('#'+item.id).is(':disabled')){
                if(! validateNotEmpty($('#'+form[0].id +' #'+item.id).val())){   
                    return scrollToError();
                }else{
                    colorOK($('#'+form[0].id +' #'+item.id));
                }
            }

            if($('#'+item.id).hasClass("validateDigit") && !$('#'+item.id).is(':disabled') ){
                if(! validateDigit($('#'+form[0].id +' #'+item.id).val())){
                    return scrollToError();
                }else{
                    colorOK($('#'+form[0].id +' #'+item.id));
                }
            }

            if($('#'+item.id).hasClass("validateCAP") && !$('#'+item.id).is(':disabled') ){
                if(! validateCAP($('#'+form[0].id +' #'+item.id).val())){
                    return scrollToError();
                }else{
                    colorOK($('#'+form[0].id +' #'+item.id));
                }
            }

            if($('#'+item.id).hasClass("validateDate") && !$('#'+item.id).is(':disabled') ){
                if(! validateDate($('#'+form[0].id +' #'+item.id).val())){
                    return scrollToError();
                }else{
                    colorOK($('#'+form[0].id +' #'+item.id));
                }
            }

            if($('#'+item.id).hasClass("validateEmail") && !$('#'+item.id).is(':disabled') ){
                if(! validateEmail($('#'+form[0].id +' #'+item.id).val())){
                    return scrollToError();
                }else{
                    colorOK($('#'+form[0].id +' #'+item.id));
                }
            }

            if($('#'+item.id).hasClass("validatePrice") && !$('#'+item.id).is(':disabled') ){
                if(! validatePrice($('#'+form[0].id +' #'+item.id).val())){
                    return scrollToError();
                }else{
                    colorOK($('#'+form[0].id +' #'+item.id));
                }
            }

            if($('#'+item.id).hasClass("validatePriceMax") && !$('#'+item.id).is(':disabled') ){
                if(! validatePriceMax($('#'+form[0].id +' #'+item.id).val())){
                    return scrollToError();
                }else{
                    colorOK($('#'+form[0].id +' #'+item.id));
                }
            }

            if($('#'+item.id).hasClass("validatePriceMin") && !$('#'+item.id).is(':disabled') ){
                if(! validatePriceMin($('#'+form[0].id +' #'+item.id).val())){
                    return scrollToError();
                }else{
                    colorOK($('#'+form[0].id +' #'+item.id));
                }
            }


            if($('#'+item.id).hasClass("validateMaxMin") && !$('#'+item.id).is(':disabled') ){
                if(! validateMaxMin($('#'+form[0].id + ' #'+item.id))){
                    return scrollToError();
                }else{
                    colorOK($('#'+form[0].id +' #'+item.id));
                }
            }

            if($('#'+item.id).hasClass("validateCF") && !$('#'+item.id).is(':disabled')){
                if(! validateCF($('#'+form[0].id +' #'+item.id).val())){
                    return scrollToError();
                } else{
                    colorOK($('#'+form[0].id +' #'+item.id));
                }
            }

            if($('#'+item.id).hasClass("validateVAT") && !$('#'+item.id).is(':disabled')){
                if(! validateVAT($('#'+form[0].id +' #'+item.id).val())){
                    return scrollToError();
                }else{
                    colorOK($('#'+form[0].id +' #'+item.id));
                }
            }

            if($('#'+item.id).hasClass("validatePhoneNumber") && !$('#'+item.id).is(':disabled')){
                if(! validatePhoneNumber($('#'+form[0].id +' #'+item.id).val())){
                    return scrollToError();
                }else{
                    colorOK($('#'+form[0].id +' #'+item.id));
                }
            }

            if($('#'+item.id).hasClass("validatePasswordR") && !$('#'+item.id).is(':disabled')){
                if(! validatePasswordR($('#'+form[0].id +' #'+item.id).val())){
                    return scrollToError();
                }else{
                    colorOK($('#'+form[0].id +' #'+item.id));
                }
            }

            function scrollToError(){
                validator=false;
                colorKO($('#'+form[0].id +' #'+item.id));
                if(!mybreak){
                    mybreak=true;
                    scrollToMeError(item.id, 90);//29 poco //60 non si vede etichetta
                }
                return;
            }
        });
        //console.log("validForm " + validator );
        return validator;
    }

