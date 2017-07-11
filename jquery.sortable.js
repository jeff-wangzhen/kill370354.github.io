/*
 * HTML5 Sortable jQuery Plugin
 * http://farhadi.ir/projects/html5sortable
 * 
 * Copyright 2012, Ali Farhadi
 * Released under the MIT license.
 * download by www.sucaijiayuan.com
 */
//导航条拖动
(function ($) {
	var dragging, placeholders = $();
	$.fn.sortable = function (options) {
		var method = String(options);
		options = $.extend({
			connectWith: false
		}, options);
		return this.each(function () {
			if (/^enable|disable|destroy$/.test(method)) {
				var items = $(this).children($(this).data('items')).attr('draggable', method == 'enable');
				if (method == 'destroy') {
					items.add(this).removeData('connectWith items')
						.off('dragstart.h5s dragend.h5s selectstart.h5s dragover.h5s dragenter.h5s drop.h5s');
				}
				return;
			}
			var isHandle, index, items = $(this).children(options.items);
			var placeholder = $('<' + (/^ul|ol$/i.test(this.tagName) ? 'li' : 'div') + ' class="sortable-placeholder">');
			items.find(options.handle).mousedown(function () {
				isHandle = true;
			}).mouseup(function () {
				isHandle = false;
			});
			$(this).data('items', options.items)
			placeholders = placeholders.add(placeholder);
			if (options.connectWith) {
				$(options.connectWith).add(this).data('connectWith', options.connectWith);
			}
			items.attr('draggable', 'true').on('dragstart.h5s', function (e) {
				if (options.handle && !isHandle) {
					return false;
				}
				isHandle = false;
				var dt = e.originalEvent.dataTransfer;
				dt.effectAllowed = 'move';
				dt.setData('Text', 'dummy');
				index = (dragging = $(this)).addClass('sortable-dragging').index();
			}).on('dragend.h5s', function () {
				if (!dragging) {
					$("li").css("color", "red");//无效
					return;
				}
				dragging.removeClass('sortable-dragging').show();
				placeholders.detach();
				if (index != dragging.index()) {
					dragging.parent().trigger('sortupdate', {
						item: dragging
					});
				}
				dragging = null;
			}).not('a[href], img').on('selectstart.h5s', function () {
				this.dragDrop && this.dragDrop();
				return false;
			}).end().add([this, placeholder]).on('dragover.h5s dragenter.h5s drop.h5s', function (e) {
				if (!items.is(dragging) && options.connectWith !== $(dragging).parent().data('connectWith')) {
					return true;
				}
				if (e.type == 'drop') {
					e.stopPropagation(); //阻止当前事件向祖辈元素的冒泡传递
					placeholders.filter(':visible').after(dragging);
					dragging.trigger('dragend.h5s');
					return false;
				}
				e.preventDefault();
				e.originalEvent.dataTransfer.dropEffect = 'move';
				if (items.is(this)) {
					if (options.forcePlaceholderSize) {
						placeholder.height(dragging.outerHeight());
					}
					dragging.hide();
					$(this)[placeholder.index() < $(this).index() ? 'after' : 'before'](placeholder);
					placeholders.not(placeholder).detach();
				} else if (!placeholders.is(this) && !$(this).children(options.items).length) {
					placeholders.detach();
					$(this).append(placeholder);
				}
				return false;
			});
		});
	};
})(jQuery);
$('.navigation').sortable(); //调用函数实现拖动排序功能

/*
调试过程中发现了bug，拖放完成时鼠标已经不在原先位置，按道理应该在新位置的li变色为hover所设橙色，但是事实上，在360、chrome、opera中却是有时候拖动正常，但有时候，当前li无反应，原先位置li变色，需要鼠标再次经过原先位置并移出才能消失。规律不明。低版本IE不能拖动，safari有拖动效果却无法拖动成功。
此代码源于网络，限于水平不能理解，尝试在if (!dragging) 下加代码$("li").css("color", "red");并无效果，因此无力解决。
*/
//2017年6月20日12:54:37 已花费了3个多小时
