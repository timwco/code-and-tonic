$(document).ready(function(){

    // Courtesy of - https://gist.github.com/thirdender/6467179 // Thanks Rob!
    if (history.pushState) {
      var selector = "#main",
          loadSelector = " " + selector + " > *",
          container = $(selector).on("click", "nav[role='pagenavigation'] a", function() {
            var href = $(this).attr("href");
            $("html, body").animate({ "scrollTop": 0 }, 400);
            history.pushState({ "path": href }, null, href);
            container.
              animate({ "opacity": 0 }, 400).
              load(href + loadSelector, function() {
                container.promise().done(function() {
                  container.css("opacity", 1);
                });
              });
            return false;
          });
      $(window).bind("popstate", function(e) {
        var state = e.originalEvent.state;
        if (state) {
          $("window, body").animate({ "scrollTop": 0 }, 200);
          container.load(state.path + loadSelector);
        }
      });
      history.replaceState({ "path": location.href }, "");
    }

});