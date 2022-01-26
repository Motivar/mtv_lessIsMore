function mtv_show_less() {
    var elements = document.querySelectorAll('.mtv_less');
    if (elements) {
        mtv_less_is_more_css();
        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];
            var less_height = element.getAttribute('data-height') ? parseInt(element.getAttribute('data-height')) : 300;
            var elem_height = element.clientHeight;
            if (elem_height > less_height) {
                var data = element.innerHTML;
                var new_html = '<div class="mtv-less-content" style="max-height:' + less_height + 'px;">' + data + '</div>' + mtv_show_less_div(element);
                element.innerHTML = new_html;
                element.classList.add('mtv-less-on');
                element.classList.add('mtv-less-more-initialized');
            }
        }
    }
}
mtv_show_less();

function mtv_show_less_div(elem) {
    var more_msg = elem.getAttribute('data-more') ? elem.getAttribute('data-more') : 'Read more';
    var less_msg = elem.getAttribute('data-less') ? elem.getAttribute('data-less') : 'Show less';
    return '<div class="mtv_more_less_buttons"><div class="mtv_show_more" onclick="mtv_show_less_toggle(this);">' + more_msg + '</div><div class="mtv_show_less" onclick="mtv_show_less_toggle(this);">' + less_msg + '</div></div>';
}

function mtv_show_less_toggle(elem) {

    elem.closest('.mtv-less-more-initialized').classList.toggle("mtv-less-on");
    elem.closest('.mtv-less-more-initialized').scrollIntoView();
}

function mtv_less_is_more_css() {
    var styles = `
    .mtv-less-content{
    position: relative;
    overflow:hidden;
    transition: 0.3s;
}

.mtv-less-more-initialized:not(.mtv-less-on) > .mtv-less-content
{
    max-height:none !important;
}

.mtv_more_less_buttons{
    width:100%;
    text-align:center;
    position:relative;
    padding:15px;
}
.mtv_show_less{
    display:block;
}
.mtv_show_more{
    display:none;
}
.mtv-less-on .mtv_show_more{
    display:block;
}
.mtv-less-on .mtv_show_less{
    display:none;
}

.mtv_more_less_buttons > div {
    cursor:pointer;
}
`.trim();

    var styleSheet = document.createElement("style")
    styleSheet.type = "text/css";
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet)
}