$(document).ready(function(){

    // UI init
    ui.init();

    // Modules init
    modules.hashNav();
    modules.video('intro-video');

    modules.spoilers({
        selector: '.js-spoiler'
    });

    modules.tabs({
        selector: '.js-tabs'
    });

    // Plugins init
    plugins.counterUp();
    plugins.wayPoint();

    plugins.parallax();

    plugins.countDown();
    plugins.popup();

    plugins.carousel();
    plugins.sliders();

    // Forms
    forms.init('body');

});

var ui = (function(window, undefined) {

    'use strict';

    function pageLoad() {

        $('html')
            .addClass(helpers.mobile() ? 'm-touch' : 'm-desktop');

        $(window)
            .on('load', function() {

                $('html').addClass('m-loaded');
                $('.b-loader').addClass('b-loader__complete', true);

                // Load GM API
                GoogleMap.loadAPI();

            });

    }

    function headerState() {

        var $header = $('.b-header__float'),

            hasScreen = $('#intro').length > 0,
            threshold = 10;

        processing();

        $(window).bind('scroll.headerState resize.headerState', function() {

            processing();

        });

        function processing() {

            var $locker = $('.b-leaflet_locker'),
                scroll = $locker.length ? Math.abs(parseInt($locker.css('margin-top')), 10) : document.documentElement.scrollTop || document.body.scrollTop;

            $header.toggleClass('b-header__transparent', hasScreen && scroll < threshold);

        }

    }

    function navigation() {

        var $toggle = $('.js-nav'),
            $header = $('#header'),

            $locker = $('.b-leaflet_locker'),
            threshold = 10;

        $toggle.bind('click', function() {

            var scroll = $locker.length ? Math.abs(parseInt($locker.css('margin-top')), 10) : document.documentElement.scrollTop || document.body.scrollTop;

            $header
                .toggleClass('b-header__transparent', $header.hasClass('b-header__showNav') && scroll < threshold)
                .toggleClass('b-header__showNav');

        });

    }

    function pricingToggle() {

        var $switcher = $('.b-pricing_switcher_box input'),
            $plans = $('.b-pricing_plan');

        $switcher.bind('change', function() {

            $plans.toggleClass('b-pricing_plan__switched', $(this).prop('checked'));

        });

    }

    function purchase() {

        $('[data-ticket]')
            .on('click', function() {

                // Scroll to
                $('html, body')
                    .stop()
                    .animate({
                        scrollTop: $($(this).attr('href')).offset().top - 70
                    }, 1500, 'easeInOutExpo');

                // Select pricing plan
                $($(this).attr('href')).find('select option[value="' + $(this).data('ticket') + '"]').prop('selected', true);

                // Select ticket validity
                $($(this).attr('href')).find('select option[value="' + $(this).data('validity') + '"]').prop('selected', true);

                // Update uniform plugin
                $.uniform.update();

            });

    }

    function targetBlank() {

        $('a[data-target="_blank"]')
            .on('click', function() {

                return !window.open($(this).attr('href'));

            });

    }

    return {
        init: function() {

            // Loader
            pageLoad();

            // Header state
            headerState();

            // Navigation
            navigation();

            // Toggle of pricing
            pricingToggle();

            // Buy now action
            purchase();

            // Target "blank" links
            targetBlank();

        }
    };

})(window);

var helpers = (function(window, undefined) {

    'use strict';

    function pixelsRatio() {

        return 'devicePixelRatio' in window && window.devicePixelRatio > 1;

    }

    function screen() {

        var deviceScreen = $(window).width();

        if (deviceScreen < 480) {

            return 'xs';

        }

        else if (deviceScreen >= 480 && deviceScreen < 768)
        {

            return 'sm';

        }

        else if (deviceScreen >= 768 && deviceScreen < 970)
        {

            return 'md';

        }

        else if (deviceScreen >= 970)
        {

            return 'lg';

        }

    }

    function mobile() {

        var uaTest = {

            android: function() {
                return navigator.userAgent.match(/Android/i);
            },

            blackBerry: function() {
                return navigator.userAgent.match(/BlackBerry/i);
            },

            iOS: function() {
                return navigator.userAgent.match(/iPhone|iPad|iPod/i);
            },

            opera: function() {
                return navigator.userAgent.match(/Opera Mini/i);
            },

            windows: function() {
                return navigator.userAgent.match(/IEMobile/i);
            }

        };

        return (uaTest.android() || uaTest.blackBerry() || uaTest.iOS() || uaTest.opera() || uaTest.windows())

    }

    return {
        mobile: mobile,
        pixelsRatio: pixelsRatio,
        screen: screen
    };

})(window);

/*

 Copyright (c) 2015 Loginov Artem http://loginov.biz
 Dual licensed under the MIT license and GPL license

*/

var forms = (function(window, undefined) {

    'use strict';

    function init(namespace) {

        forms.styleControls(namespace + ' input[type="checkbox"], ' + namespace + ' input[type="radio"]', namespace + ' select');
        forms.makePlaceholders(namespace + ' [placeholder]');

        forms.validate(namespace);

    }

    function validate(namespace) {

        $(namespace + ' form').each(function() {

            var $form = $(this);

            if ($.isFunction($.fn.validate) && $form.data('checkup')) {

                $form
                    .validate({
                        onChange: true,
                        eachValidField: function() {

                            formNotifications.hideErrorLabel.call($(this));

                        },
                        eachInvalidField: function(status, options) {

                            var conditional = typeof $(this).data('conditionalType') !== 'undefined' ? formNotifications.labels.conditional[$(this).data('conditionalType')] : formNotifications.labels.conditional.default,
                                pattern = typeof $(this).data('patternType') !== 'undefined' ? formNotifications.labels.pattern[$(this).data('patternType')] : formNotifications.labels.pattern.default,

                                notification = (options.required) ? ((!options.conditional) ? conditional : (!options.pattern) ? pattern : '') : formNotifications.labels.required;

                            formNotifications.showErrorLabel.call($(this), notification, 0);

                        },
                        valid: function(e) {

                            var $form = $(this),
                                $btn = $(this).find('button[type="submit"].b-btn'),

                                validHandler = $(this).data('callback'),
                                xhrSubmit = $(this).data('xhr');

                            if(typeof window[validHandler] === 'function') {

                                e.preventDefault();
                                window[validHandler].call($form);

                                return false;

                            }

                            if(xhrSubmit) {

                                e.preventDefault();

                                $.ajax({
                                    url: $form.attr('action'),
                                    method: $form.attr('method'),
                                    data: $form.serialize(),
                                    dataType: 'json',
                                    beforeSend: function() {

                                        $btn.toggleClass('request');

                                    },
                                    success: function(response) {

                                        $btn.toggleClass('request');
                                        xhrFormHandler.response.call($form, response);

                                    }
                                });

                            }

                        }

                    })
                    .find('input, textarea').on('focus', function() {

                        $(this).closest('.m-error').removeClass('m-error');

                    });

            }

        });

    }

    function styleControls(input, select, file) {

        if ($.isFunction($.fn.uniform)) {

            // Inputs
            $(input).not('.b-pricing_switcher input').uniform();

            // Select
            if(typeof select !== 'undefined') {

                $(select).uniform({
                    selectClass: 'e-select',
                    selectAutoWidth: false
                });

            }

        }

    }

    function makePlaceholders(selector) {

        if ($.isFunction($.fn.placeholder)) {

            $(selector).placeholder();

        }

    }

    return {
        init: init,
        makePlaceholders: makePlaceholders,
        styleControls: styleControls,
        validate: validate
    };

})(window);

// Notifications system
var formNotifications = (function(window, undefined) {

    'use strict';

    var settings = {
        errorClass: 'm-error',
        errorSuffix: '_error'
    };

    var labels = {
        required: 'This is required field',
        conditional: {
            default: 'Input does not coincide',
            credit: 'Invalid credit card number',
            passwords: 'The passwords entered do not match'
        },
        pattern: {
            default: 'Invalid data format',
            email: 'Invalid email address',
            phone: 'Invalid phone number'
        },
        submit: {
            success: 'Thank you. We will contact you shortly.',
            error: 'Error.'
        }
    };

    // Notification alerts
    function showMessage(msg, status, hideForm, callback) {

        var $notice = this.find('.b-form_message').length ? this.find('.b-form_message') : $('<div class="b-form_message"></div>').prependTo(this),
            suffix = status ? 'success' : 'error';

        // Set height
        $notice
            .height($notice.height())
            .html('<div class="b-form_message_inner"><div class="b-form_message_balloon b-form_message_balloon__' + suffix + '">' + msg + '</div></div>');

        $notice
            .toggleClass('b-form_message__show', true)
            .animate({ height: $notice.find('.b-form_message_inner').height(), paddingBottom: hideForm ? 0 : $notice.css('padding-bottom') }, 200, 'easeOutQuart', function() {

                $(this).css({ height: '' });

            });

        if (hideForm) {

            $notice
                .next('form')
                .toggleClass('b-form__hide', true)
                .slideUp({ duration: 300, easing: 'easeOutQuart' });

        }

        // Callback
        if(typeof callback === 'function') {

            callback.call(this);

        }

    }

    function hideMessage() {

        var $notice = this.find('.b-form_message').length ? this.find('.b-form_message') : $('<div class="b-form_message"></div>').prependTo(this);

        $notice
            .slideUp({duration: 300, easing: 'easeOutQuart' });

    }

    // Notification labels
    function showErrorLabel(text, status) {

        var $field = this.closest('.b-form_box_field');
        $field.find('.b-form_box_field' + settings.errorSuffix).remove();

        $field.append('<div class="b-form_box_field' + settings.errorSuffix + '">' + text + '</div>');

        setTimeout(function() {

            $field.addClass(settings.errorClass);

        }, 100);

    }

    function hideErrorLabel() {

        var $field = this.closest('.b-form_box_field');

        $field.removeClass(settings.errorClass);
        $field.find('.b-form_box_field' + settings.errorSuffix).remove();

    }

    return {
        labels: labels,
        showErrorLabel: showErrorLabel,
        showMessage: showMessage,
        hideErrorLabel: hideErrorLabel,
        hideMessage: hideMessage
    };

})(window);


// Regular form handler
var xhrFormHandler = (function(window, undefined) {

    'use strict';

    function response(response) {

        var $form = this,
            message = '';

        // start check
        if (typeof response.fields === 'boolean' && response.fields) {

            if(response.captcha) {

                // Success action
                message = response.msg || formNotifications.labels.submit.success;
                formNotifications.showMessage.call(this.closest('.b-form'), message, true, response.hideForm);

            } else {

                // Captcha error action
                message = response.msg || formNotifications.labels.submit.error;
                captchaHandler.call(this, response);

            }

        } else if (typeof response.fields === 'object') {

            // Get error message string
            var messageStr = ' Некорректно заполнены поля: ';

            $.each(response.fields, function(key, value) {

                var fieldName = $form.find('[name="' + key + '"]').attr('placeholder') || $form.find('[name="' + key + '"]').closest('.b-form_box').find('.b-form_box_title').text().replace(' *', '');

                messageStr += '&laquo;' + fieldName + '&raquo;, ';

            });

            message = response.msg || formNotifications.labels.submit.error + messageStr.substring(0, messageStr.length - 2) + '.';

            // Init handlers
            captchaHandler.call(this, response);

            formNotifications.showMessage.call(this.closest('.b-form'), message, false, false, function(form) {

                highlightFields($form, response.fields);

            });

        } else {

            if ('console' in window) {
                console.log('Invalid response format form handler');
                console.log(response);
            }

        }

    }

    function highlightFields(form, array) {

        $.each(array, function(key, value) {

            formNotifications.showErrorLabel.call(form.find('[name="' + key + '"]'), value, 0);

        });

    }

    function captchaHandler(response) {

        this.find('[name*="captcha"]').val('');
        this.find('img').attr('src', response.captchaImg);

        if(!response.captcha) {

            formNotifications.showErrorLabel.call(this, forms.msg.captcha, 0);

        }

    }

    return {
        response: response
    };

})(window);


// Mail Chimp handler
var mailChimp = function() {

    'use strict';

    var $form = this;

    $.ajax({
        url: $form.attr('action'),
        method: $form.attr('method'),
        data: $form.serialize(),
        dataType: 'json',
        success: function(response) {

            var message;

            if (response.status != 'error') {

                message = '' +
                '<h3>Thank You!</h3>' +
                '<p>You have subscribed to our newsletter.</p>';

                formNotifications.showMessage.call($form.closest('.b-form'), message, true, true);

            } else {

                message = '' +
                '<h3>Error!</h3>' +
                formNotifications.labels.pattern.email;

                formNotifications.showMessage.call($form.closest('.b-form'), message, false, false);

            }

        }
    });

};

/*

 Copyright (c) 2015 Loginov Artem http://loginov.biz
 Dual licensed under the MIT license and GPL license

*/

var modules = (function(window, undefined) {

    'use strict';

    function hashNav() {

        var $anchor = $('a[href^="#"]:not([class*="js-spoiler"] a, [class*="js-tabs"] a)'),
            $doc = $('html, body');

        $anchor.on('click', function(e) {

            var url = $(this).attr('href');

            if (url.length > 1) {

                e.preventDefault();

                if ($(url).length) {

                    $doc
                        .stop()
                        .animate({
                            scrollTop: $(url).offset().top - 70
                        }, 1500, 'easeInOutExpo');

                }

            }

        });

    }

    function spoilers(options) {

        $(options.selector).each(function() {

            var $spoiler = $(this),

                $body = $spoiler.find(options.selector + '-text'),
                $toggle = $spoiler.find(options.selector + '-toggle');

            $spoiler.not('.opened').find(options.selector + '-text').hide();

            $toggle
                .on('click.spoiler', function(e) {

                    e.preventDefault();

                    var item = $(this).closest(options.selector),
                        state = item.hasClass('opened') && item.find(options.selector + '-text').is(':visible');

                    if (!state) {

                        spoilerOpen.call(item, options.selector);

                    } else {

                        spoilerClose.call(item, options.selector);

                    }

                    // Close neighbors items
                    if (item.data('closeNeighbors')) {

                        item.siblings(options.selector).each(function() {
                            spoilerClose.call($(this), options.selector);
                        });

                    }

                });

        });

        function spoilerClose(sel) {

            this.toggleClass('opened', false);

            this.find(sel + '-toggle').html(this.find(sel + '-toggle').data('closed') || this.find(sel + '-toggle').html());
            this.find(sel + '-text').slideUp({ duration: 300, easing: 'easeOutQuart' });

        }

        function spoilerOpen(sel) {

            this.toggleClass('opened', true);

            this.find(sel + '-toggle').html(this.find(sel + '-toggle').data('opened') || this.find(sel + '-toggle').html());
            this.find(sel + '-text').slideDown({ duration: 300, easing: 'easeOutQuart' });

        }

    }

    function tabs(options) {

        $(options.selector).each(function(){

            var $wg = $(this),
                $wrapper = $(this).find(options.selector + '-wrapper').filter(function() { return $wg[0] == $(this).closest(options.selector)[0]; }),
                $currentLink = $(this).find(options.selector + '-toggle a.current');

            if(!$currentLink.length) {
                $(this).find(options.selector + '-toggle a:first').addClass('current');
            }

            var hash = $(this).find(options.selector + '-toggle a.current').attr('href'),

                $pages = $wrapper.find(options.selector + '-page').filter(function() { return $wrapper[0] == $(this).closest(options.selector + '-wrapper')[0]; }),
                $currentPage = $wrapper.find(options.selector + '-page' + hash).filter(function() { return $wrapper[0] == $(this).closest(options.selector + '-wrapper')[0]; });

            $pages.toggleClass('visible', false);
            $currentPage.toggleClass('visible', true);

            $(this)
                .find(options.selector + '-toggle')
                .filter(function() { return $wg[0] == $(this).closest(options.selector)[0]; })
                .find('a[href*="#"]')
                .click(function(e) {

                    e.preventDefault();

                    $wrapper.css({ height: $currentPage.outerHeight(true) });

                    $(this).closest(options.selector + '-toggle').find('a').removeClass('current');
                    $(this).addClass('current');

                    console.log($pages, $currentPage);

                    $currentPage = $(this).closest(options.selector).find(options.selector + '-page' + $(this).attr('href'));
                    $pages.toggleClass('visible', false);

                    $currentPage.toggleClass('visible', true);

                    $wrapper.animate({ height: $currentPage.outerHeight(true) }, 500, 'easeOutQuart', function() {

                        $(this).css({ height: '' })

                    });

                    if(typeof options.onToggle != 'undefined' && options.onToggle) {
                        options.onToggle($(this), $(this).closest(options.selector).find(options.selector + '-page' + $(this).attr('href')));
                    }

                    return false;

                });

        });

    }

    function video(id) {

        var support = !!document.createElement('video').canPlayType,
            isTouchDevice = 'ontouchstart' in document.documentElement,

            video = document.getElementById(id),

            src, dotIndex, source;

        if (!video) return;
        if (!support || isTouchDevice) {

            video.style.display = 'none';
            video.parentNode.removeChild(video);

        } else {

            setTimeout(function() {

                src = video.getAttribute('data-src');
                dotIndex = src.lastIndexOf('.');

                if (dotIndex != -1) {
                    src = src.substring(0, dotIndex);
                }

                source = document.createElement('source');

                if (_supportsWebmVideo(video)) {

                    source.src = src + '.webm';
                    source.type = 'video/webm; codecs="vp8, vorbis';

                } else if (_supportsMp4Video(video)) {

                    source.src = src + '.mp4';
                    source.type = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2';

                } else if (_supportsOggVideo(video)) {

                    source.src = src + '.ogv';
                    source.type = 'video/ogg; codecs="theora, vorbis';

                }

                video.appendChild(source);

                video.load();
                video.play();

            }, 0);

        }

        function _supportsWebmVideo(video) {
            return video.canPlayType('video/webm; codecs="vp8, vorbis"');
        }
        function _supportsMp4Video(video) {
            return video.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"');
        }
        function _supportsOggVideo(video) {
            return video.canPlayType('video/ogg; codecs="theora, vorbis"');
        }

    }

    return {
        hashNav: hashNav,
        spoilers: spoilers,
        tabs: tabs,
        video: video
    };

})(window);

/*

 Copyright (c) 2015 Loginov Artem http://loginov.biz
 Dual licensed under the MIT license and GPL license

*/

var plugins = (function(window, undefined) {

    'use strict';

    function counterUp() {

        if ($.isFunction($.fn.flexslider) && !helpers.mobile()) {

            var $counter = $('.b-counters_item_digits');

            $counter.each(function() {

                $(this).counterUp({
                    time: 1000
                });

            });

        }

    }

    function countDown() {

        var $countdown = $('.b-countdown');

        $countdown.each(function() {

            var $this = $(this),
                target = new Date($countdown.data('startAt'));

            if ($.isFunction($.fn.countDown) && $this.length) {

                $this.countDown({
                    targetDate: {
                        day: target.getDate(),
                        month: target.getMonth() + 1,
                        year: target.getFullYear(),
                        hour: target.getHours(),
                        min: target.getMinutes(),
                        sec: target.getSeconds()
                    },
                    onComplete: function() {

                        if(typeof window[$this.data('complete')] === 'function') {

                            window[$this.data('complete')].call($this);

                        } else {

                            $this.toggleClass('b-countdown__complete', true);

                        }

                    },
                    omitWeeks: true
                });

            }

        });

    }

    function carousel() {

        if ($.isFunction($.fn.owlCarousel)) {

            var selector = 'b-carousel';

            $('.' + selector).each(function() {

                var $carousel = $(this);

                $carousel.owlCarousel({
                    margin: 0,
                    loop: true,
                    autoplay: $carousel.data('auto') || false,
                    autoplayTimeout: $carousel.data('interval') * 1000 || 10000,
                    mouseDrag: false,
                    touchDrag: true,
                    pullDrag: false,
                    freeDrag: false,
                    dots: false,
                    navText: ['Prev', 'Next'],
                    navClass: ['owl-prev', 'owl-next'],
                    responsive: {
                        0: {
                            items: $carousel.data('xs'),
                            nav: $carousel.find('.b-carousel_item').length >= $carousel.data('xs')
                        },
                        480: {
                            items: $carousel.data('sm'),
                            nav: $carousel.find('.b-carousel_item').length >= $carousel.data('sm')
                        },
                        768: {
                            items: $carousel.data('md'),
                            nav: $carousel.find('.b-carousel_item').length >= $carousel.data('md')
                        },
                        970: {
                            items: $carousel.data('lg'),
                            nav: $carousel.find('.b-carousel_item').length >= $carousel.data('lg')
                        }
                    }
                });

            });

        }

    }

    function sliders() {

        if ($.isFunction($.fn.flexslider)) {

            var selector = 'b-slider';

            $('.' + selector).each( function() {

                var $slider = $(this);

                if ($slider.find('.' + selector + '_inner > div').length > 1) {

                    $slider.flexslider({
                        namespace: selector + '_',
                        selector: '.' + selector + '_inner > div',
                        controlsContainer: $slider.parent(),

                        allowOneSlide: false,

                        animation: $slider.data('animation') || 'slide',
                        animationLoop: true,
                        animationSpeed: $slider.data('speed') || 400,

                        slideshow: $slider.data('auto') || false,
                        slideshowSpeed: $slider.data('interval') * 1000 || 5000,

                        showNearby: $slider.data('showNearby') || false,

                        directionNav: !!$slider.data('arrows') ? $slider.data('arrows') : true,
                        controlNav: $slider.data('control') || false,
                        controlNavLoop: $slider.data('controlLoop') || false,
                        controlNavPlace: $slider.data('controlPlace') || 'after',
                        progressLine: $slider.data('progress') || false,

                        thumbCaptions: $slider.data('controlCaptions') || false,
                        thumbBg: $slider.data('thumbsAsBg') || false,
                        thumbCount: !!$slider.data('thumbsCount') ? $slider.data('thumbsCount').split(',') : [1, 2, 2, 2],

                        pauseOnAction: true,
                        prevText: '',
                        nextText: '',

                        smoothHeight: true,

                        after: function($slider) {

                            if (!$slider.playing && $slider.data('auto')) {
                                $slider.play();
                            }

                        }
                    });

                }

            });

        }

    }

    function parallax() {

        skrollr.init({
            forceHeight: false,
            mobileCheck: function() {

                return false;

            }
        });

    }

    function popup() {

        var $regular = $('.js-popup'),
            $form = $('.js-form'),
            $iframe = $('.js-popup-video');

        $regular.leafLetPopUp({
            animationStyleOfBox: 'scale',
            animationStyleOfChange: 'slide',
            boxWidth: 1000,
            boxHorizontalGutters: 15,
            closeBtnClass: 'i-icon i-ion-ios-close-outline',
            closeBtnLocation: 'overlay',
            directionBtnClass: ['i-icon i-ion-ios-arrow-back', 'i-icon i-ion-ios-arrow-forward'],
            overlayOpacity: 0.75,
            afterLoad: afterLoad
        });

        $form.leafLetPopUp({
            animationStyleOfBox: 'flip3d',
            animationStyleOfChange: 'slide',
            boxWidth: 600,
            boxHorizontalGutters: 15,
            closeBtnClass: 'i-icon i-ion-ios-close-outline',
            closeBtnLocation: 'overlay',
            directionBtnClass: ['i-icon i-ion-ios-arrow-back', 'i-icon i-ion-ios-arrow-forward'],
            overlayOpacity: 0.75,
            afterLoad: afterLoad
        });

        $iframe.leafLetPopUp({
            animationStyleOfBox: 'scale',
            animationStyleOfChange: 'slide',
            boxWidth: 800,
            boxHorizontalGutters: 15,
            content: true,
            closeBtnClass: 'i-icon i-ion-ios-close-outline',
            closeBtnLocation: 'overlay',
            directionBtnClass: ['i-icon i-ion-ios-arrow-back', 'i-icon i-ion-ios-arrow-forward'],
            overlayOpacity: 0.75,
            afterLoad: afterLoad
        });

        function afterLoad() {

            // Deactivate navigation
            $('.b-header_nav a').removeClass('active');

            // Init forms plugins
            forms.init('.b-leaflet_box');

        }

    }

    function wayPoint() {

        var $sections = $('#speakers');

        if (!helpers.mobile()) {

            $sections.each(function() {

                initWP.call($(this).addClass('b-section__wp'), '50%');

            });

        }

        function initWP(offset) {

            this.waypoint('destroy').waypoint($.proxy(function() {

                this.addClass('b-section__show');

            }, this), { offset: offset });

        }

    }

    return {
        carousel: carousel,
        counterUp: counterUp,
        countDown: countDown,
        parallax: parallax,
        popup: popup,
        sliders: sliders,
        wayPoint: wayPoint
    };

})(window);

/*

 Copyright (c) 2015 Loginov Artem http://loginov.biz
 Dual licensed under the MIT license and GPL license

*/

var GoogleMap = (function(window, undefined) {

    'use strict';

    function loadAPI() {

        var script = document.createElement('script');

        script.type = 'text/javascript';
        script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&callback=GoogleMap.init';

        document.body.appendChild(script);

    }

    function init() {

        var $map = $('#contacts_map');

        var zoom = $map.data('zoom'),
            addresses = $map.data('address'),
            coordinates = $map.data('coordinates'),

            geoCoder = new google.maps.Geocoder(),
            latLng = new google.maps.LatLng(0, 0),
            bounds = new google.maps.LatLngBounds(),

            options = {
                zoom: zoom || 8,
                scrollwheel: false,
                center: latLng,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                disableDefaultUI: true
            },

            map = new google.maps.Map($map[0], options),

            overlay,
            location,

            addressArray = !!addresses && addresses != '' ? addresses.split(';') : false,
            coordinatesArray = !!coordinates && coordinates != '' ? coordinates.split(';') : false;

        if (addressArray && addressArray.length && !coordinatesArray) {

            for (var ali = 0; ali < addressArray.length; ali++) {

                getLatLng.call(geoCoder, addressArray[ali], function(results) {

                    location = results[0].geometry.location;
                    overlay = new CustomMarker(location, map, { marker_id: 'b_contacts_map_marker' }, [48, 48]);

                    setCenterMap(addressArray.length);

                    google.maps.event.addDomListener(window, 'resize', function() {

                        google.maps.event.trigger(map, 'resize');
                        setCenterMap(addressArray.length);

                    });

                });

            }

        } else if (coordinatesArray && coordinatesArray.length) {

            for (var cli = 0; cli < coordinatesArray.length; cli++) {

                var LatLng = coordinatesArray[cli].split(',');

                location = new google.maps.LatLng(LatLng[0], LatLng[1]);
                overlay = new CustomMarker(location, map, { marker_id: 'b_contacts_map_marker' }, [48, 48]);

                setCenterMap(coordinatesArray.length);

                google.maps.event.addDomListener(window, 'resize', function() {

                    google.maps.event.trigger(map, 'resize');
                    setCenterMap(coordinatesArray.length);

                });

            }

        }

        function setCenterMap(quantity) {

            if (quantity > 1) {

                bounds.extend(location);
                map.fitBounds(bounds);

            } else {

                //map.setCenter(location);
                map.setCenterWithOffset(location, offsetCalc());
                map.setZoom(zoom || 15);

            }

        }

        // Get lat/lng

        function getLatLng(address, callback) {

            this.geocode( { address: address }, function(results, status) {

                if (status == google.maps.GeocoderStatus.OK) {

                    callback(results);

                } else {

                    if ('console' in window) {
                        console.log('Geocoder failed due to: ' + status);
                        console.log(results);
                    }

                }
            });

        }

        // Get center map offset

        function offsetCalc() {

            var centerOffset = [0, 0],
                $container = $('.b-contacts_inner');

            switch (helpers.screen()) {

                case 'xs':

                    centerOffset = [0, -225];
                    break;

                case 'sm':

                    centerOffset = [0, -225];
                    break;

                case 'md':

                    centerOffset = [-($container.width() / 4), 0];
                    break;

                default:
                case 'lg':

                    centerOffset = [-($container.width() / 6), 0];
                    break;

            }

            return centerOffset;

        }

        // Marker customization

        function CustomMarker(latlng, map, args, dimensions) {
            this.latlng = latlng;
            this.args = args;
            this.dimensions = dimensions || [16, 16];
            this.setMap(map);
        }

        CustomMarker.prototype = new google.maps.OverlayView();

        CustomMarker.prototype.draw = function() {

            var self = this;

            var div = this.div;

            if (!div) {

                div = this.div = document.createElement('div');

                div.className = 'b-contacts_map_marker';

                div.style.position = 'absolute';
                div.style.cursor = 'pointer';

                if (typeof(self.args.marker_id) !== 'undefined' && typeof(div.dataset) !== 'undefined') {
                    div.dataset.marker_id = self.args.marker_id;
                }

                /*google.maps.event.addDomListener(div, "click", function(event) {
                 //google.maps.event.trigger(self, "click");
                 });*/

                var panes = this.getPanes();
                panes.overlayImage.appendChild(div);

            }

            var point = this.getProjection().fromLatLngToDivPixel(this.latlng);

            if (point) {
                div.style.left = (point.x - (this.dimensions[0] / 2)) + 'px';
                div.style.top = (point.y - (this.dimensions[1] / 2)) + 'px';
            }
        };

        CustomMarker.prototype.remove = function() {
            if (this.div) {
                this.div.parentNode.removeChild(this.div);
                this.div = null;
            }
        };

        CustomMarker.prototype.getPosition = function() {
            return this.latlng;
        };

        // Centered map with offset

        google.maps.Map.prototype.setCenterWithOffset = function(latlng, centerOffset) {

            var map = this,
                ov = new google.maps.OverlayView();

            ov.onAdd = function() {

                var proj = this.getProjection(),
                    aPoint = proj.fromLatLngToContainerPixel(latlng);

                aPoint.x = aPoint.x+centerOffset[0];
                aPoint.y = aPoint.y+centerOffset[1];

                map.setCenter(proj.fromContainerPixelToLatLng(aPoint));

            };

            ov.draw = function() {};
            ov.setMap(this);

        };

    }

    return {
        init: init,
        loadAPI: loadAPI
    };

})(window);