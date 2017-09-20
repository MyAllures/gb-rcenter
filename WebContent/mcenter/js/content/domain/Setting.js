/**
 * Created by jeff on 15-8-15.
 */
define(['common/BasePage', 'bootstrapswitch', 'nestable'], function (BasePage) {

    return BasePage.extend({

        formSelector: 'body',

        init: function () {
            this._super();
            var that = this;
            $(this.formSelector).on("click", ".domain_rank", function () {
                var $this = $(this);
                var data = $this.data();
                var $icon = $this.find('i');
                var $this_parent = $this.parents('.domain_title').next().find('.domain_rank_dl');
                if (data.load) {
                    window.top.topPage.ajax({
                        url: root + "/content/sysDomain/getDomainByRank.html",
                        data: {'search.rankId': data.value},
                        success: function (data) {
                            $this.data('load', false);
                            $icon.addClass('up');
                            $(data).appendTo($this_parent).addClass("domain_dd");
                            //$this.slideToggle('up');
                            var parent_state = $this.parent().find('input[type=checkbox][name="my-checkbox"]').bootstrapSwitch('state');

                            that.initSwitch($this_parent, parent_state);
                            that.resizeDialog();
                        }
                    })
                } else {
                    var $this_parent = $this_parent.find('.domain_dd')
                    $this_parent.is(":hidden") ? $this_parent.show() : $this_parent.hide();
                    /*.slideToggle(200,that.resizeDialog());*/
                    $icon.hasClass('up') ? $icon.removeClass('up') : $icon.addClass('up');
                    that.resizeDialog();
                }
            });
            this.initSwitch();
        },
        bindEvent: function () {
            this._super();
        },
        onPageLoad: function () {
            this._super();
            this.onDomainByRankLoad();
        },
        onDomainByRankLoad: function () {
            $('.dd').each(function (idx, item) {
                $(item).nestable({
                    rootClass: 'td' + idx,//容器的class 不能和listClass相同
                    listClass: 'domain_rank_dl',//class
                    listNodeName: 'dl' + idx,//拖动列表的元素名
                    itemClass: 'domain_dd',//class
                    itemNodeName: 'dd',//拖动的元素名
                    handleClass: 'domain_handel',//列表中拖动元素的类
                    maxDepth: 1, //最多嵌套多少 默认0
                    group: 0,
                    emptyClass: ''///拖动列表为空的class
                });
            });
            $(".dd").nestable(config).on("change", function (e) {
                //that.updateSort(e);
            })
            $(".dd").each(function (index, obj) {
                $(this).data('nestable-group', index + 'group');
            });
        },
        initSwitch: function (obj, parentState) {
            /**
             *
             */
            /*获取初始化范围*/
            var $switch = obj ? $("input[name='my-checkbox']:not(.parent_switch)", obj) : $(this.formSelector + " input[name='my-checkbox']");

            /*初始化*/
            /*switch change 事件*/
            this.unInitSwitch($switch)
                .bootstrapSwitch()
                .on('switchChange.bootstrapSwitch', function (event, state) {
                    //TODO 子父同时未开启
                    var $this = $(event.currentTarget);
                    //var $this_parents = $this.parents('.domain_rank_dl');
                    if ($this.hasClass("showPage")) {
                        /**
                         * 如果是 ‘展示页面按钮’ 需要将其他按钮置为disable
                         */
                        $switch.not('.showPage').bootstrapSwitch('toggleDisabled');
                    } else if ($this.hasClass('parent_switch')) {
                        /**
                         * 层级的按钮关闭 层级下的按钮全部关闭
                         */
                        var $all_ = $this.parents('.domain_title').next().find('.domain_rank_dl input[name="my-checkbox"]');
                        /**
                         * 如果是关闭 将子开关 关闭
                         */
                        !state && $all_.bootstrapSwitch('state', state);
                        /**
                         * 关闭就disable true 开启就 false
                         */
                        $all_.bootstrapSwitch('disabled', !state);
                    } else {
                        /**
                         * 其他：如果层级下的 全部都关闭层级也要关闭
                         */
                        var $parent = $this.parents('.dd');
                        var $parent_switchs = $parent.find('input[name="my-checkbox"]');
                        //如果其他的按钮都是关闭的 层级上的按钮也关闭
                        if ($parent_switchs.not(":checked").length === $parent_switchs.length) {
                            $parent.prev().find(".parent_switch").bootstrapSwitch('state', false);
                        }
                        else if ($parent_switchs.length === $parent_switchs.length && state) {
                            //如果只有一个子开关开启 开启父开关同时开启
                            $parent.prev().find(".parent_switch").bootstrapSwitch('state', true);
                        }
                    }
                });

            var $showPageBtn = $('input[name="my-checkbox"].showPage');

            var $defaultBtns = $('input[name="my-checkbox"].domain_default');
            if ($defaultBtns.not(":checked").length === $defaultBtns.length) {
                $('input[name="my-checkbox"].default_parent').bootstrapSwitch('state', false);
            }
            /*展示页面关闭 其他都应该禁用*/
            if ($showPageBtn && !$showPageBtn.bootstrapSwitch('state')) {
                //其他都应该禁用
                $switch.not('.showPage').bootstrapSwitch('toggleDisabled');
            }


            /*如果层级按钮关闭了，初始化子类时 也关闭*/
            if (parentState === false) {
                $switch.not('.parent_switch').bootstrapSwitch('state', false);
                $switch.not('.parent_switch').bootstrapSwitch('toggleDisabled');
            }


        },
        saveDomain: function () {
            var that = this;
            var domainRanks = [];
            var domains = [];
            var changeStatusFalse = [];//未点击 加载出域名 只需要当前关闭时 改变状态
            var changeStatusTrue = [];//子域名未点开 父设置为开启 则全部开启
            var topPage = window.top.topPage;
            var domainShowPageBtn = $('input[name="my-checkbox"].showPage');


            /*循环父类开关*/
            $('.parent_switch').each(function (index, obj) {
                var $this = $(obj);
                var data = $this.data();
                var $parent = $this.parents('.domain_title').next();
                var status = $this.bootstrapSwitch('state');
                var $all_ = $('input[name="my-checkbox"]', $parent);

                /*循环所有 子类的开关*/
                $all_.each(function (index, obj) {
                    var $this_sub = $(obj);
                    if ($this_sub.hasClass('domain_default')) {
                        domains.push({
                            isEnable: !status ? status : $this_sub.bootstrapSwitch('state'),
                            sort: index + 1,
                            id: $this_sub.data().id
                        })
                    } else {
                        domainRanks.push({
                            isShow: !status ? status : $this_sub.bootstrapSwitch('state'),
                            sortNum: index + 1,
                            id: $this_sub.data().id
                        })
                    }
                });

                /*未加载域名只是改变状态*/
                if (!$all_.length && !status) {
                    changeStatusFalse.push(data.rankId)
                }
            });
            var SysParam = {
                'id': domainShowPageBtn.data().id,
                "paramValue": domainShowPageBtn.bootstrapSwitch('state')
            };
            var ajaxData = JSON.stringify({
                domains: domains,
                editDomainRanks: domainRanks,
                changeStatusFalse: changeStatusFalse,
                sysParam: SysParam
            });
            topPage.ajax({
                url: root + '/content/cttDomainRank/reset.html',
                contentType: "application/json",
                type: "POST",
                data: ajaxData,
                success: function (data) {
                    data = eval("(" + data + ")");
                    if (data.state) {
                        topPage.showSuccessMessage(data.msg);
                        that.closePage();
                        that.closePage();
                    } else {
                        topPage.showErrorMessage(data.msg);
                        $(e.currentTarget).unlock();
                    }
                }
            });
        }
    });
});