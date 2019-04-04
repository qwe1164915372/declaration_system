Component({
  properties: {
    // 模态框 显示/隐藏
    modalHidden: {
      type: Boolean,
      value: false
    }, //这里定义了modalHidden属性，属性值可以在组件使用时指定.写法为modal-hidden，
    spot_name: {
      type: String,
      value: ''
    },
    daiding: {
      type: String,
      value: ''
    },
    address: {
      type: String,
      value: ''
    }
  },
  methods: {
    // 防止事件冒泡，阻止page滚动事件
    moveD: () => {},
    // modal取消点击事件
    modal_cancel: function() {
      // 隐藏模态框
      this.setData({
        modalHidden: true,
        spot_name: '',
        daiding: '',
        address: ''
      })
    },
    // modal确认点击事件
    modal_confirm: function(e) {
      this.modal_cancel();
      var eventDetail = {
        spot_name: e.detail.value.spot_name,
        daiding: e.detail.value.daiding,
        address: e.detail.value.address
      } // detail对象，提供给事件监听函数
      var eventOption = {} // 触发事件的选项
      this.triggerEvent('action', eventDetail);
    }
  }
})