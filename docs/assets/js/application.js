// NOTICE!! DO NOT USE ANY OF THIS JAVASCRIPT
// IT'S ALL JUST JUNK FOR OUR DOCS!
// ++++++++++++++++++++++++++++++++++++++++++

!function ($) {

  $(function(){

    var $window = $(window)

    // Disable certain links in docs
    $('section [href^=#]').click(function (e) {
      e.preventDefault()
    })

    // side bar
    setTimeout(function () {
      $('.bs-docs-sidenav').affix({
        offset: {
          top: function () { return $window.width() <= 980 ? 290 : 210 }
        , bottom: 270
        }
      })
    }, 100)


    // make code pretty
    window.prettyPrint && prettyPrint()

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
    $('.popover-test').popover()

    // popover demo
    $("a[data-toggle=popover]")
      .popover()
      .click(function(e) {
        e.preventDefault()
      })

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
    $('#sample').on('show', function(){
      $(this).prev().find('.accordion-toggle > i')
      .removeClass('icon-plus').addClass('icon-minus');
    });

    $('#sample').on('hide', function(){
      $(this).prev().find('.accordion-toggle > i')
      .removeClass('icon-minus').addClass('icon-plus');
    });

    // modal demo
    wvusUikit('#jsModalButton').click(function (){
      wvusUikit('#jsModal').modal('show');
    });
    wvusUikit('#jsModalClose').click(function () {
      wvusUikit('#jsModal').modal('hide');
    });
    wvusUikit('#jsModalX').click(function () {
      wvusUikit('#jsModal').modal('hide');
    });

    // Carousel Demo
    var jsCarousel = wvusUikit('#jsCarousel');

    jsCarousel.carousel({
      interval: 2000,
      pause: ""
    });
    wvusUikit('#jsLeft').click(function() {
      jsCarousel.carousel('prev');
    });
    wvusUikit('#jsRight').click(function(){
      jsCarousel.carousel('next');
    });
    wvusUikit('#jsPause').click(function() {
      jsCarousel.carousel('pause');
    });
    wvusUikit('#jsResume').click(function () {
      jsCarousel.carousel('cycle');
    });
    wvusUikit('#jsPip1').click(function() {
      jsCarousel.carousel(0);
    });
    wvusUikit('#jsPip2').click(function() {
      jsCarousel.carousel(1);
    });
    wvusUikit('#jsPip3').click(function() {
      jsCarousel.carousel(2);
    });

    // Typeahead demo
    wvusUikit('.typeahead').typeahead({
      source: ["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Dakota","North Carolina","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming"],
      items: 3,
    });


    // select init
    wvusUikit(".selectpicker").selectpicker();

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



// Docs Nav arrows
  wvusUikit('#docs-nav .collapse').on('show', function(){
   wvusUikit(this).prev().find("i").removeClass('icon-caret-right').addClass('icon-caret-down');
  });

  //wvusUikit('#docs-nav .in').prev().find("i").removeClass('icon-caret-right').addClass('icon-caret-down');

  wvusUikit('#docs-nav .collapse').on('hide', function(){
   wvusUikit(this).prev().find("i").removeClass('icon-caret-down').addClass('icon-caret-right');
  });


}(window.wvusUikit)
