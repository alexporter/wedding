$(document).ready(function() {
    $(this).scrollTop(0);
    $(window).attr('loaded', false);
    if(isIE())  $('body').addClass('is-ie');

    $(window).load(function() {
        $('body').on('click', function(e) {
            var t = $(e.target);
            if (!t.hasClass('.tab') && !t.parents('.tab').length) {
                $('.page[preview]').css({ top: '100%' });
                closePreviews();
            }
        });
        $('.main-container .page .tab').on('mouseover', function(e) {
            if ($('.page[preview]').length) return;

            var page = $(e.target).parents('.page');
            if (page.attr('remove-active')) return;
            page.css({ top: ($('.main-container').outerHeight() - 60) + 'px' });
            page.attr('preview', 1);
            setTimeout(function() {
                if (!page.attr('preview')) return;
                page.css({ top: '100%' });
                page.removeAttr('preview');
            }, 3000);
        });
        $('.main-container .page .tab').on('click', function(e) {
            var page = $(e.target).parents('.page');
            page.removeAttr('preview');
            $('.page[preview]').css({ top: '100%' });
            closePreviews();
            closePages();
            page.addClass('active');
        });

        setTimeout(function() {
            $(this).attr('loaded', true);
            $('.loading-cover .logo').css({ display: 'block' }).addClass('fadeInUp');
            setTimeout(function() {
                $('.loading-cover .logo').removeClass('fadeInUp').addClass('tada');
            }, 1000);
        }, 500);

        setTimeout(function() {
            var numDots = Math.ceil($('.dots.left').outerWidth()/10); // Should be same for left or right
            addDots(0, numDots);
            setTimeout(function() {
                $('.loading-cover').css({ top: '-100%' });
            }, (numDots * 10) + 1000);
        }, 1700);
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

function showTopPage(page) {
    $('.top-icons').css({ top: '-100px' });
    $('.page .tab').css({ top: '0' });
    $('.page .mountain').css({ top: '0' });
    $('.top-page.' + page).addClass('active');
}

function closeTopPages() {
    var activePages = $('.top-page.active');
    activePages.removeClass('active');
    setTimeout(function() {
        $('.top-icons').css({ top: '10px' });
        $('.page .mountain').css({ top: '-30px' });
        $('.page.one .tab,.page.three .tab').css({ top: '-50px' });
        $('.page.two .tab').css({ top: '-60px' });
    }, 800);
}

function closePreviews() {
    $('.page[preview]').removeAttr('preview');
}

function closePages() {
    var activePages = $('.page.active');
    activePages.each(function(i, p) {
        $(p).attr('remove-active', 1);
    });
    activePages.css({ top: '100%' });
    activePages.removeClass('active');
    setTimeout(function() {
        activePages.each(function(i, p) {
            $(p).removeAttr('remove-active');
        });
    }, 1500);
}
