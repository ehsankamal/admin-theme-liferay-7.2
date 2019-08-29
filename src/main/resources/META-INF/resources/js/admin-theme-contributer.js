AUI().ready(
    function(A) {
        Liferay.SPA.app.on('endNavigate', function() {
            changecolor();
            searchmenu();
        });

    });
$( document ).ready(function() {
    changecolor();
    searchmenu();
});

function changecolor(){

    $(".sidebar-header .autofit-col-expand").append('<label class="toggle-switch"><input class="toggle-switch-check" type="checkbox" /><span aria-hidden="true" class="toggle-switch-bar"><span class="toggle-switch-handle" data-label-on="تیره" data-label-off="روشن"></span></span></label>');

    var colors=readCookie('color');
    if(colors==null){
        createCookie('color', 'light',1);
    }
    else if(colors=="light"){
        $('body').addClass('light');

    }else{
        $('body').addClass('dark');
        $(".toggle-switch-check").click();
    }
    $(".toggle-switch-check").on('change', function() {
        if ($(this).is(':checked')) {
            $(this).attr('value', 'true');
            $('body').removeClass('light');
            $('body').addClass('dark');
            createCookie('color', 'dark',1);
        }
        else {
            $(this).attr('value', 'false');
            $('body').addClass('light');
            $('body').removeClass('dark');
            createCookie('color', 'light',1);
        }
    });
}

function searchmenu(){

    $.extend($.expr[":"], {
        "containsIN": function(elem, i, match, array) {
            return (elem.textContent || elem.innerText || "").toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
        }
    });

    $(".product-menu:not(.sidebar-inverse) .sidebar-body").prepend('<div class="search-ajax"><svg class="lexicon-icon lexicon-icon-search" viewBox="0 0 512 512">\n' +
        '<path class="lexicon-icon-outline" d="M503.254 467.861l-133.645-133.645c27.671-35.13 44.344-79.327 44.344-127.415 0-113.784-92.578-206.362-206.362-206.362s-206.362 92.578-206.362 206.362 92.578 206.362 206.362 206.362c47.268 0 90.735-16.146 125.572-42.969l133.851 133.851c5.002 5.002 11.554 7.488 18.106 7.488s13.104-2.486 18.106-7.488c10.004-10.003 10.004-26.209 0.029-36.183zM52.446 206.801c0-85.558 69.616-155.173 155.173-155.173s155.174 69.616 155.174 155.173-69.616 155.173-155.173 155.173-155.173-69.616-155.173-155.173z"></path>\n' +
        '</svg><svg class="lexicon-icon lexicon-icon-times" viewBox="0 0 512 512">\n' +
        '<path class="lexicon-icon-outline" d="M295.781 256l205.205-205.205c10.998-10.998 10.998-28.814 0-39.781-10.998-10.998-28.815-10.998-39.781 0l-205.205 205.205-205.205-205.238c-10.966-10.998-28.814-10.998-39.781 0-10.998 10.998-10.998 28.814 0 39.781l205.205 205.238-205.205 205.205c-10.998 10.998-10.998 28.815 0 39.781 5.467 5.531 12.671 8.265 19.874 8.265s14.407-2.734 19.907-8.233l205.205-205.238 205.205 205.205c5.5 5.5 12.703 8.233 19.906 8.233s14.407-2.734 19.906-8.233c10.998-10.998 10.998-28.815 0-39.781l-205.238-205.205z"></path>\n' +
        '</svg><input type="text" class="search-input" /></div>');

    $('.search-ajax .lexicon-icon-times').hide();

    $(".search-input").keyup(function(){
        var str=$(".search-input").val();
        if (str!="") {
            //all menu hidden
            $(".product-menu .sidebar-body li").css("display", "none");
            //find menu
            $curr=$(".product-menu .sidebar-body li:containsIN("+str+")");
            $curr.css("display", "block");
            $curr.css("background", "#edf9f0");
            $curr.children().css("color", "#287d3d");
            //open all sub menu title
            $(".product-menu .panel-header .panel-title>.panel-toggler").removeClass("collapsed");
            $(".product-menu .panel-header .panel-title>.panel-toggler").attr("aria-expanded","true");
            //open sub menu title
            $(".product-menu .panel-group .panel-heading+.panel-collapse").addClass("show");
            $(".product-menu .list-group .collapse").removeClass("show");
            $curr.parent().parent().parent().addClass("show");
            //open menu title
            $(".product-menu .list-group-heading").css("display", "none");
            $curr.closest(".collapse").prev(".list-group-heading").css("display", "block");
            $(".product-menu .list-group-heading").removeClass("collapsed");
            //hide main menu bejoz menu finded
            $(".product-menu .panel").css("display", "none");
            $curr.closest(".product-menu .panel").css("display", "block");
            $('.product-menu .lexicon-icon-times').show();
            $('.product-menu .lexicon-icon-search').hide();
        }else{

            $(".product-menu .sidebar-body li").css("display", "block");
            $(".product-menu .sidebar-body li").css("background", "transparent");
            $(".dark .product-menu .sidebar-body li a").css("color", "#eeeffa");
            $(".light .product-menu .sidebar-body li a").css("color", "#393a4a");

            $(".product-menu .panel-header .panel-title>.panel-toggler").addClass("collapsed");
            $(".product-menu .panel-header .panel-title>.panel-toggler").attr("aria-expanded","false");

            $(".product-menu .panel-group .panel-heading+.panel-collapse").removeClass("show");
            $(".list-group .collapse").removeClass("show");

            $(".product-menu .list-group-heading").addClass("collapsed");
            $(".product-menu .list-group-heading").css("display", "block");

            $(".product-menu .panel").css("display", "block");

            $('.product-menu .lexicon-icon-times').hide();
            $('.product-menu .lexicon-icon-search').show();
        }
    });

    $('.lexicon-icon-times').click(
        function() {
            $(".product-menu .search-input").val('');

            $(".product-menu .sidebar-body li").css("display", "block");
            $(".product-menu .sidebar-body li").css("background", "transparent");
            $(".dark .product-menu .sidebar-body li a").css("color", "#eeeffa");
            $(".light .product-menu .sidebar-body li a").css("color", "#393a4a");

            $(".product-menu .panel-header .panel-title>.panel-toggler").addClass("collapsed");
            $(".product-menu .panel-header .panel-title>.panel-toggler").attr("aria-expanded","false");

            $(".product-menu .panel-group .panel-heading+.panel-collapse").removeClass("show");
            $(".product-menu .list-group .collapse").removeClass("show");


            $(".product-menu .list-group-heading").addClass("collapsed");
            $(".product-menu .list-group-heading").css("display", "block");

            $(".product-menu .panel").css("display", "block");

            $('.product-menu .lexicon-icon-times').hide();
            $('.product-menu .lexicon-icon-search').show();
        }
    )
}

// Cookies
function createCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    }
    else var expires = "";

    document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name, "", -1);
}

