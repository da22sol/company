var vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty("--vh", `${vh}px`);
$(window).resize(function () {
  if ($(window).width() > 1200) {
    var vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }
});
window.onload = windowonload;
window.location.reload = windowonload;
function windowonload() {
  setTimeout(function () {
    scrollTo(0, 0);
  }, 100);
}

var mobileAnimating = function () {
  var objs = $(".obj-animated");
  if (objs.length == 0) return;

  objs.each(function () {
    $(this).addClass("animated " + $(this).data("ani"));
    if ($(this).data("delay")) {
      $(this).css("animation-delay", $(this).data("delay"));
    }
  });
};

// 진입마다 효과를 반복적으로 주고 싶으면 아래 값을 false로 변경
const isOnce = true;
if ($(window).width() > 1200) {
  var fp = $("#fullpage").fullpage({
    verticalCentered: true,
    anchors: [
      "visual",
      "business",
      "value01",
      "value02",
      "customer",
      "contact",
    ],
    navigation: true,
    navigationPosition: "right",
    responsiveWidth: 1200,

    afterLoad: function (origin, destination, direction) {
      if (destination == 4) {
        setTimeout(function () {
          $(".main-wrap .value02 .info-list").addClass("event");
        }, 1000);
      } else {
        $(".main-wrap .value02 .info-list").removeClass("event");
      }
    },
    onLeave: function (index, nextIndex, direction) {
      var $object = $("#fullpage > *:nth-child(" + nextIndex + ")");

      if ($(window).width() > 1200) {
        $object.find(".obj-animated").each(function (i, item) {
          var delay = $(item).data("delay");

          if (isOnce) {
            // 일회성
            $(item).addClass("animated " + $(item).data("ani"));
            if (delay) $(item).css("animation-delay", delay);
          } else {
            // 반복
            $(item).removeClass("animated " + $(item).data("ani"));
            setTimeout(function () {
              $(item).addClass("animated " + $(item).data("ani"));
              if (delay) $(item).css("animation-delay", delay);
            }, 100);
          }
        });
      }
      if (nextIndex == 2) {
        swpBiz.autoplay.start();
      } else {
        swpBiz.autoplay.stop();
      }

      $(".main-wrap .value02 .info-list").attr("data-nth", "0");
      $(".main-wrap .value02 .info-list li").removeClass("active");
    },
  });

  $(document).on(
    "mouseover",
    ".main-wrap .value02 .info-list.event li ",
    function () {
      var idx = $(this).index() + 1;
      $(this).addClass("active").siblings("li").removeClass("active");
      $(this).closest(".info-list").attr("data-nth", idx);
    }
  );

  $(window).resize(function () {
    responsiveFullpage();
  });
  responsiveFullpage();

  function responsiveFullpage() {
    if ($(window).width() <= 1200) {
      $.fn.fullpage.setAutoScrolling(false);
      $.fn.fullpage.setFitToSection(false);
      $.fn.fullpage.setLockAnchors(true);
    } else {
      $.fn.fullpage.setAutoScrolling(true);
      $.fn.fullpage.setFitToSection(true);
      $.fn.fullpage.setLockAnchors(false);
    }
  }
};

var swpVisual;
var swpBiz;
var swpNews;
var swpCoustomer;

$(document).ready(function () {
  mobileAnimating();

  // visual
  swpVisual = new Swiper("#swp-visual-slide", {
    speed: 0,
    effect: "fade",
    loop: true,
    autoplay: {
      delay: 7000,
    },
    pagination: {
      el: "#swp-visual-slide .swiper-pagination",
      clickable: true,
      renderBullet: function (index, className) {
        return (
          '<span class="' +
          className +
          '">' +
          "0" +
          (index + 1) +
          "<em></em></span>"
        );
      },
    },
  });

  // biz
  swpBiz = new Swiper("#swp-biz-slide", {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 4000,
    },
    pagination: {
      el: "#swp-biz-slide .swiper-pagination",
      type: "progressbar",
    },
    navigation: {
      nextEl: "#swp-biz-slide .swiper-button-next",
      prevEl: "#swp-biz-slide .swiper-button-prev",
    },
    on: {
      beforeInit: function () {
        var total = $("#swp-biz-slide .swiper-slide").not(
          ".swiper-slide-duplicate"
        ).length;
        if (total < 10) total = "0" + total;
        $("#swp-biz-slide .controller .total").html(total);
        $("#swp-biz-slide .controller .crnt").html("01");
      },
    },
  });
  swpBiz.on("init", function () {
    setTimeout(function () {
      var total = swpBiz.slides.length;
      var crnt = swpBiz.realIndex + 1;
      if (total < 10) total = "0" + total;
      if (crnt < 10) crnt = "0" + crnt;
      $("#swp-biz-slide .controller .crnt").html(crnt);
    }, 200);
  });
  swpBiz.on("slideChange", function () {
    var crnt = swpBiz.realIndex + 1;
    if (crnt < 10) crnt = "0" + crnt;
    $("#swp-biz-slide .controller .crnt").html(crnt);
  });
  swpBiz.autoplay.stop();
});
