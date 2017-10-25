$.fn.popImg = function () {
    var timer = null,
        $window = $(window);

    var $layer = $('<div/>').css({
        position: 'fixed',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        height: '100%',
        width: '100%',
        zIndex: 9999999,
        background: '#000',
        opacity: '0.6',
        display: 'none'
    }).attr('pop-b-layer', 1);

    var cloneImg = function ($node) {
        var offset = $node.offset();

        return $node.clone().css({
            position: 'fixed',
            width: $node.width(),
            left: offset.left,
            top: offset.top,
            zIndex: 10000000
        });
    };

    var justifyImg = function ($c) {
        var dW = $window.width(),
            dH = $window.height();

        $c.css('cursor', 'zoom-out').attr('pop-b-img', 1);

        var img = new Image();
        img.onload = function () {
            var tempImg = document.createElement('img');
            tempImg.src = this.src;
            var w = tempImg.width, h = tempImg.height;

            if (dW / w >= dH / h) {
                $c.stop().animate({
                    height: '100%',
                    left: (dW - w * dH / h) / 2,
                    top: 0
                }, 300);
                $c[0].setAttribute('width', 'auto');
                $c[0].style.width = 'auto';
            } else {
                $c.stop().animate({
                    height: 'auto',
                    width: '100%',
                    left: 0,
                    top: (dH - h * dW / w) / 2
                }, 300);
                $c[0].setAttribute('height', 'auto');
                $c[0].style.height = 'auto';
            }
        };
        img.src = $c.attr('src');
    };

    //$window.on('resize', function () {
    //    $('img[pop-b-img]').each(function () {
    //       var $this = $(this);
    //        timer && clearTimeout(timer);
     //       timer = setTimeout(function () {
    //            justifyImg($this);
     //       }, 50);
    //    });
    //});

   /* $window.on('keydown', function (evt) {
        if (evt.which === 27) {
            $layer.fadeOut(300);
            $('img[pop-b-img]').remove();
        }
    });
*/
   /* $window.on('click', function (evt) {
        $("#setFontAndBg").hide();//hide setfont
        $(".w-pop-wrap .select-up").hide();
        var $this = $(evt.target);
        if ($this.attr('pop-b-layer') || $this.attr('pop-b-img')) {
            $layer.fadeOut(300);
            $('img[pop-b-img]').remove();

        }
    });*/
