$(document).ready(function() {
    $(this).scrollTop(0);
    $(window).attr('loaded', false);
    if(isIE())  $('body').addClass('is-ie');
    
    $(window).load(function() {
        $('.main-container .page .tab').on('mouseover', function(e) {
            var page = $(e.target).parent('.page');
            page.css({ top: ($('.main-container').outerHeight() - 60) + 'px' });
        });
        $('.main-container .page .tab').on('mouseleave', function(e) {
            var page = $(e.target).parent('.page');
            page.css({ top: '100%' });
        });
        
        setTimeout(function()   {
            $(this).attr('loaded', true);
            $('.loading-cover .logo').removeClass('fadeInUp').addClass('tada');
        }, 1000);
        
        setTimeout(function()   {
            var numDots = Math.ceil($('.dots.left').outerWidth()/10); // Should be same for left or right
            addDots(0, numDots);
            setTimeout(function() {
                $('.loading-cover').css({ top: '-100%' });
            }, (numDots * 10) + 1000);
        }, 1200);
    });
});

function isIE() {
    var ua = window.navigator.userAgent,
        msie = ua.indexOf('MSIE ');
    
    return (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./));
}

function addDots(n, max) {
    if (n > max) return;
    
    setTimeout(function() {
        $('.dots.left').html($('.dots.left').html() + '<div class="dot"></div>');
        $('.dots.right').html($('.dots.right').html() + '<div class="dot"></div>');
        addDots(n + 1, max);
    }, 10);
}