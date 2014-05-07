// NOTICE!! DO NOT USE ANY OF THIS JAVASCRIPT
// IT'S ALL JUST JUNK FOR OUR DOCS!
// ++++++++++++++++++++++++++++++++++++++++++

(function($){
  $(document).ready(function(){

    var $window = $(window);
  // Offcanvas Sidenav
  $('[data-toggle=offcanvas]').click(function(){
    $('.row-offcanvas').toggleClass('active');
  });

    // Disable certain links in docs
    $('section [href^=#]').click(function (e) {
      e.preventDefault();
    });

    $("a[data-toggle='collapse']").click(function(e){
      e.preventDefault();
    });

    // side bar
    setTimeout(function () {
      $('.bs-docs-sidenav').affix({
        offset: {
          top: function () { return $window.width() <= 980 ? 290 : 210; },
          bottom: 270
        }
      });
    }, 100);



    // add-ons
    $('.add-on :checkbox').on('click', function () {
      var $this = $(this),
      method = $this.attr('checked') ? 'addClass' : 'removeClass';
      $(this).parents('.add-on')[method]('active');
    });

    // add tipsies to grid for scaffolding
    if ($('#gridSystem').length) {
      $('#gridSystem').tooltip({
        selector: '.show-grid > [class*="span"]',
        title: function () { return $(this).width() + 'px'; }
      });
    }

    // Tooltip
    $('[data-toggle="tooltip"]').tooltip();

    // popover demo
    $('[data-toggle="popover"]').popover();

    // button state demo
/*    $('#fat-btn').click(function () {
      var btn = $(this);
      btn.button('loading');
      setTimeout(function () {
        btn.button('reset');
      }, 3000);
    });*/

    // carousel demo
    $('#myCarousel').carousel();

    //accordion demo
    $('#sample .collapse').on('show', function(){
      $(this).prev().find('.accordion-toggle > i')
      .removeClass('fa-plus').addClass('fa-minus');
    });

    $('#sample .collapse').on('hide', function(){
      $(this).prev().find('.accordion-toggle > i')
      .removeClass('fa-minus').addClass('fa-plus');
    });

    // modal demo
    $('#jsModalButton').click(function (){
      $('#jsModal').modal('show');
    });
    $('#jsModalClose').click(function () {
      $('#jsModal').modal('hide');
    });
    $('#jsModalX').click(function () {
      $('#jsModal').modal('hide');
    });

    // Carousel Demo
    // Touch swipe -- Requires modernizr touch events test and jQuery mobile
    $('.carousel').on('swipeleft', function(event) {
      $(this).carousel('next');
    });
    $('.carousel').on('swiperight', function(event) {
      $(this).carousel('prev');
    });

    var jsCarousel = $('#jsCarousel');

    jsCarousel.carousel({
      interval: 2000,
      pause: ""
    });
    $('#jsLeft').click(function(e) {
      e.preventDefault();
      jsCarousel.carousel('prev');
    });
    $('#jsRight').click(function(e){
      e.preventDefault();
      jsCarousel.carousel('next');
    });
    $('#jsPause').click(function() {
      jsCarousel.carousel('pause');
    });
    $('#jsResume').click(function () {
      jsCarousel.carousel('cycle');
    });
    $('#jsPip1').click(function() {
      jsCarousel.carousel(0);
    });
    $('#jsPip2').click(function() {
      jsCarousel.carousel(1);
    });
    $('#jsPip3').click(function() {
      jsCarousel.carousel(2);
    });


    // select init
    $(".selectpicker").selectpicker();


    // Spin.js Example
    // ---------------
    $('#spin').spin();

// Selects example
// ---------------

// Refresh example 1
$('.rm-mustard').click(function() {
  $('.remove-example').find('[value=Mustard]').remove();
  $('.remove-example').selectpicker('refresh');
});
$('.rm-ketchup').click(function() {
  $('.remove-example').find('[value=Ketchup]').remove();
  $('.remove-example').selectpicker('refresh');
});
$('.rm-relish').click(function() {
  $('.remove-example').find('[value=Relish]').remove();
  $('.remove-example').selectpicker('refresh');
});

// Refresh example 2
$('.ex-disable').click(function() {
  $('.disable-example').prop('disabled',true);
  $('.disable-example').selectpicker('refresh');
});
$('.ex-enable').click(function() {
  $('.disable-example').prop('disabled',false);
  $('.disable-example').selectpicker('refresh');
});




// Docs Nav arrows
$('#docs-nav .collapse').on('show.bs.collapse', function(){
 $(this).prev().find("i").removeClass('fa-caret-right').addClass('fa-caret-down');
});

$('#docs-nav .in').prev().find("i").removeClass('fa-caret-right').addClass('fa-caret-down');

$('#docs-nav .collapse').on('hide.bs.collapse', function(){
 $(this).prev().find("i").removeClass('fa-caret-down').addClass('fa-caret-right');
});

});

}(window.wvusUikit));
