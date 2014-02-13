// NOTICE!! DO NOT USE ANY OF THIS JAVASCRIPT
// IT'S ALL JUST JUNK FOR OUR DOCS!
// ++++++++++++++++++++++++++++++++++++++++++

!function ($) {

  $(function(){

    var $window = $(window);

      $(document).ready(function(){
        $("a[data-toggle='collapse']").click(function(e){
          e.preventDefault();
        });
      });

    // Disable certain links in docs
    $('section [href^=#]').click(function (e) {
      e.preventDefault();
    });

    // side bar
    setTimeout(function () {
      $('.bs-docs-sidenav').affix({
        offset: {
          top: function () { return $window.width() <= 980 ? 290 : 210 }
          , bottom: 270
        }
      })
    }, 100)



    // add-ons
    $('.add-on :checkbox').on('click', function () {
      var $this = $(this)
        , method = $this.attr('checked') ? 'addClass' : 'removeClass'
      $(this).parents('.add-on')[method]('active')
    })

    // add tipsies to grid for scaffolding
    if ($('#gridSystem').length) {
      $('#gridSystem').tooltip({
          selector: '.show-grid > [class*="span"]'
        , title: function () { return $(this).width() + 'px' }
      })
    }

    // tooltip demo
    $('.tooltip-demo').tooltip({
      selector: "a[data-toggle=tooltip]"
    })

    $('.tooltip-test').tooltip()

    // popover demo
    $('.popover-test').popover();

    // button state demo
    $('#fat-btn')
      .click(function () {
        var btn = $(this)
        btn.button('loading')
        setTimeout(function () {
          btn.button('reset')
        }, 3000)
      })

    // carousel demo
    $('#myCarousel').carousel()

    //accordion demo
    $('#sample .collapse').on('show', function(){
      $(this).prev().find('.accordion-toggle > i')
      .removeClass('icon-plus').addClass('icon-minus');
    });

    $('#sample .collapse').on('hide', function(){
      $(this).prev().find('.accordion-toggle > i')
      .removeClass('icon-minus').addClass('icon-plus');
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

    // Typeahead demo
    $('.typeahead').typeahead({
      source: ["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Dakota","North Carolina","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming"],
      items: 3,
    });


    // select init
    $(".selectpicker").selectpicker();

    // javascript build logic
    var inputsComponent = $("#components.download input")
      , inputsPlugin = $("#plugins.download input")
      , inputsVariables = $("#variables.download input")

    // toggle all plugin checkboxes
    $('#components.download .toggle-all').on('click', function (e) {
      e.preventDefault()
      inputsComponent.attr('checked', !inputsComponent.is(':checked'))
    })

    $('#plugins.download .toggle-all').on('click', function (e) {
      e.preventDefault()
      inputsPlugin.attr('checked', !inputsPlugin.is(':checked'))
    })

    $('#variables.download .toggle-all').on('click', function (e) {
      e.preventDefault()
      inputsVariables.val('')
    })

    // request built javascript
    $('.download-btn .btn').on('click', function () {

      var css = $("#components.download input:checked")
            .map(function () { return this.value })
            .toArray()
        , js = $("#plugins.download input:checked")
            .map(function () { return this.value })
            .toArray()
        , vars = {}
        , img = ['glyphicons-halflings.png', 'glyphicons-halflings-white.png']

    $("#variables.download input")
      .each(function () {
        $(this).val() && (vars[ $(this).prev().text() ] = $(this).val())
      })

      $.ajax({
        type: 'POST'
      , url: /\?dev/.test(window.location) ? 'http://localhost:3000' : 'http://bootstrap.herokuapp.com'
      , dataType: 'jsonpi'
      , params: {
          js: js
        , css: css
        , vars: vars
        , img: img
      }
      })
    })
  })

// Modified from the original jsonpi https://github.com/benvinegar/jquery-jsonpi
$.ajaxTransport('jsonpi', function(opts, originalOptions, jqXHR) {
  var url = opts.url;

  return {
    send: function(_, completeCallback) {
      var name = 'jQuery_iframe_' + jQuery.now()
        , iframe, form

      iframe = $('<iframe>')
        .attr('name', name)
        .appendTo('head')

      form = $('<form>')
        .attr('method', opts.type) // GET or POST
        .attr('action', url)
        .attr('target', name)

      $.each(opts.params, function(k, v) {

        $('<input>')
          .attr('type', 'hidden')
          .attr('name', k)
          .attr('value', typeof v == 'string' ? v : JSON.stringify(v))
          .appendTo(form)
      })

      form.appendTo('body').submit()
    }
  }
})


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
  $('#docs-nav .collapse').on('show', function(){
   $(this).prev().find("i").removeClass('icon-caret-right').addClass('icon-caret-down');
  });

  $('#docs-nav .in').prev().find("i").removeClass('icon-caret-right').addClass('icon-caret-down');

  $('#docs-nav .collapse').on('hide', function(){
   $(this).prev().find("i").removeClass('icon-caret-down').addClass('icon-caret-right');
  });


}(window.wvusUikit)
