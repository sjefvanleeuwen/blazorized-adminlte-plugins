/// <reference path="split.js" />
function splitYamlContentEditor(dotNetReference, onResizeCallBackMethodName) {
    OnResizeCallBackMethodName = onResizeCallBackMethodName;
    OnResizeCallBackReference = dotNetReference;
    $(window).resize(function () {
        var window_height = $(window).height(),
            header_height = $(".main-header").height() + $(".main-footer").height();

        var containerHeight = window_height - header_height - 34
        containerHeight = $(".content-wrapper").height();
        $("#splitcontainer").css("height", containerHeight);
        var tabHeight = containerHeight - 56; //minus tab selectors height
        $("#splitcontainer .tab-content").css("height", tabHeight);
        $("#splitcontainer .tab-content .tab-pane").css("height", tabHeight);
        if (dotNetReference && onResizeCallBackMethodName) {
            OnResizeCallBackReference.invokeMethodAsync(onResizeCallBackMethodName);
        }
    });
    var minSize = 310;
    Split(["#left-half_contenteditor", "#right-half_contenteditor"], {
        elementStyle: function (dimension, size, gutterSize, index) {
            $(window).trigger('resize');
            if (index === 0)
                return { 'flex-basis': 'calc(100% - 10px - max(calc(' + (100 - size) + '% - ' + gutterSize + 'px), ' + (minSize + gutterSize) + 'px))' }
            if (index === 1)
                return { 'flex-basis': 'max(calc(' + size + '% - ' + gutterSize + 'px), ' + (minSize + gutterSize) + 'px)' }

        },
        gutterStyle: function (dimension, gutterSize) { return { 'flex-basis': gutterSize + 'px' } },
        sizes: [80, 20],
        minSize: minSize,
        gutterSize: 6,
        cursor: 'col-resize'
    });
}

var blazorSplitter = (function () {
    //menu hamburger resize will do callback to redraw the yamllayouteditor
    let OnResizeCallBackMethodName;
    let OnResizeCallBackReference;

    var delayInMilliseconds = 310;

    var $div = $("body");
    var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (mutation.attributeName === "class") {
                $(mutation.target).prop(mutation.attributeName);
                setTimeout(function () {
                    if (OnResizeCallBackReference && OnResizeCallBackMethodName) {
                        OnResizeCallBackReference.invokeMethodAsync(OnResizeCallBackMethodName);
                    }
                }, delayInMilliseconds);
            }
        });
    });
    observer.observe($div[0], {
        attributes: true
    });

    $("body").on('event', function () {
        if (OnResizeCallBackReference && OnResizeCallBackMethodName) OnResizeCallBackReference.invokeMethodAsync(OnResizeCallBackMethodName);
    });

    return {
        split: function (dotNetReference, onResizeCallBackMethodName) {
            $(window).resize(function () {
                var window_height = $(window).height(),
                    header_height = $(".main-header").height();
                $("#splitcontainer").css("height", window_height - header_height - 17);
                if (dotNetReference && onResizeCallBackMethodName) dotNetReference.invokeMethodAsync(onResizeCallBackMethodName);
            });
            $(window).resize();
            Split(["#left-half", "#right-half"], {
                elementStyle: function (dimension, size, gutterSize) {
                    $(window).trigger('resize'); // Optional
                    return { 'flex-basis': 'calc(' + size + '% - ' + gutterSize + 'px)' }
                },
                gutterStyle: function (dimension, gutterSize) { return { 'flex-basis': gutterSize + 'px' } },
                sizes: [80, 20],
                minSize: 150,
                gutterSize: 6,
                cursor: 'col-resize'
            });
        },
        splitYamlContentEditor: function (dotNetReference, onResizeCallBackMethodName) {
            OnResizeCallBackMethodName = onResizeCallBackMethodName;
            OnResizeCallBackReference = dotNetReference;
            $(window).resize(function () {
                var window_height = $(window).height(),
                    header_height = $(".main-header").height();

                var containerHeight = window_height - header_height - 17
                $("#splitcontainer").css("height", containerHeight);
                var tabHeight = containerHeight - 56; //minus tab selectors height
                $("#splitcontainer .tab-content").css("height", tabHeight);
                $("#splitcontainer .tab-content .tab-pane").css("height", tabHeight);
                if (dotNetReference && onResizeCallBackMethodName) {
                    OnResizeCallBackReference.invokeMethodAsync(onResizeCallBackMethodName);
                }
            });
            var minSize = 310;
            Split(["#left-half_contenteditor", "#right-half_contenteditor"], {
                elementStyle: function (dimension, size, gutterSize, index) {
                    $(window).trigger('resize');
                    if (index === 0)
                        return { 'flex-basis': 'calc(100% - 10px - max(calc(' + (100 - size) + '% - ' + gutterSize + 'px), ' + (minSize + gutterSize) + 'px))' }
                    if (index === 1)
                        return { 'flex-basis': 'max(calc(' + size + '% - ' + gutterSize + 'px), ' + (minSize + gutterSize) + 'px)' }

                },
                gutterStyle: function (dimension, gutterSize) { return { 'flex-basis': gutterSize + 'px' } },
                sizes: [80, 20],
                minSize: minSize,
                gutterSize: 6,
                cursor: 'col-resize'
            });
        }
    };
})();

