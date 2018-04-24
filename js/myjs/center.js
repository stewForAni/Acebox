$(function(){
  $.fn.modal.Constructor.prototype._adjustDialog = function () {
        var isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;

        if (!this._isBodyOverflowing && isModalOverflowing) {
          this._element.style.paddingLeft = this._scrollbarWidth + "px";
        }

        if (this._isBodyOverflowing && !isModalOverflowing) {
          this._element.style.paddingRight = this._scrollbarWidth + "px";
        }
        // 是弹出框居中。。。
        var $modal_dialog = $(this._element).find('.modal-dialog');
        var m_top = ( $(window).height() - 500)/2;
        $modal_dialog.css({'margin': m_top + 'px auto'});
        console.log($(window).height(), $modal_dialog.height(), "ok");
   };
   // console.log($);
})
