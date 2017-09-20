/**
 * Created by jeff on 15-11-2.
 * 玩家中心-资金记录 列表
 */
define(['common/BaseListPage'], function (BaseListPage) {

    return BaseListPage.extend({

        init: function () {
            this._super();
        },

        bindEvent: function () {
            this._super();
        },

        onPageLoad: function () {
            this._super();
        },

        /**
         * 查询区域 状态 类型 查询按钮.
         * @param event
         * @param option
         */
        changeSearchValue:function( event , option){

            /*在soul button中post定义value*/
            var value = option.post;

            /*当前按钮*/
            var $currentBtn = $( event.currentTarget );

            /*当前父节点*/
            var $parent = $currentBtn.parent();

            /*父节点中定义的选择器*/
            var $searchSelector = $($parent.data().selector);


            /*将查询区域的值 赋值给列表下拉*/
            $searchSelector.val( value );

            /*当前按钮的同胞去掉选中class*/
            $currentBtn.siblings().removeClass('active');

            /*当前按钮添加选中class*/
            $currentBtn.addClass('active');

            /*解锁按钮*/
            $currentBtn.unlock();
        },

        /**
         * 重写query方法
         * @param event
         * @param option
         */
        query:function( event , option ){

            /*下拉的父级 定义查询区域的父级选择器*/
            var $parent = $($(event.currentTarget).parent().data().selector);

            /*如果是下拉框触发的query方法*/
            if(event.currentTarget.tagName === 'SELECT'){

               /*类别下拉/状态下拉 回填查询区域*/
                $('._'+event.currentTarget.value,$parent).addClass("active").siblings().removeClass('active');

            }

            /*调用父类的query方法*/
            this._super( event , option );
        }

    });
});