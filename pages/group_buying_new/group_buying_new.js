// pages/group_buying_new/group_buying_new.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar: ['基本设置', '高级设置'],
    currentTab: 0,
    group_title: '',
    group_announcement: '',
    enroll_pay: '',
    all_goods: [{
      goodsgroup_index: 0,
      goods_name: '',
      goods_price: NaN,
      goods_stock: NaN,
      picture: [{
        pic_url: '../../imgs/3.jpg',
        pic_function: 'add_pic',
        goodspic_width: app.globalData.window_width * 0.2,
        goodspic_height: app.globalData.window_width * 0.2,
      }],
      goods_description: ''
    }],
    modal: {
      hidden: true,
    },
    spotaddoralter: 0, //0代表添加，1代表修改
    xmlsetting:'',
    mandatory_field:'',
    pickup_way:'',
    collect_spots: [],
  },
  navbarTap: function(e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },

  getgroup_index: function(e) {
    app.globalData.group_index = e.currentTarget.dataset.goodsgroup_id;
  },
  add_goodsgroup: function(e) {
    var l = this.data.all_goods.length; //已有的商品组数
    var new_goodsgroup = {
      goodsgroup_index: l,
      goods_name: '',
      goods_price: NaN,
      goods_stock: NaN,
      picture: [{
        pic_url: '../../imgs/3.jpg',
        pic_function: 'add_pic',
        goodspic_width: app.globalData.window_width * 0.2,
        goodspic_height: app.globalData.window_width * 0.2,
      }],
      goods_description: ''
    }
    this.data.all_goods.push(new_goodsgroup);
    var update_goodsgroup = this.data.all_goods;
    this.setData({
      all_goods: update_goodsgroup
    })
  },
  delete_goodsgroup: function(e) {
    var that = this;
    console.log(that.data.all_goods);
    wx.showModal({
      title: '',
      content: '是否删除该商品',
      success(res) {
        if (res.confirm) {
          var group_index = app.globalData.group_index;
          that.data.all_goods.splice(group_index, 1);
          var update_all_goods = that.data.all_goods;
          for (var i = group_index; i < update_all_goods.length; i++) {
            update_all_goods[i].goodsgroup_index = i;
          }
          that.setData({
            all_goods: update_all_goods
          })
        }
      }
    })
  },
  name_input: function(e) {
    this.data.all_goods[app.globalData.group_index].goods_name = e.detail.value
  },
  price_input: function(e) {
    this.data.all_goods[app.globalData.group_index].goods_price = e.detail.value
  },
  stock_input: function(e) {
    this.data.all_goods[app.globalData.group_index].goods_stock = e.detail.value
  },
  des_input: function(e) {
    this.data.all_goods[app.globalData.group_index].goods_description = e.detail.value
  },
  add_pic: function() {
    var that = this;
    wx.chooseImage({
      count: 1,
      success: function(res) {
        var l_g = app.globalData.group_index; //照片组号
        var all_goods = that.data.all_goods;
        var l_p = all_goods[l_g].picture.length; //照片的张数
        var addicon_url = all_goods[l_g].picture[l_p - 1].pic_url; //添加图片icon
        var addicon_func = all_goods[l_g].picture[l_p - 1].pic_function; //添加图片功能
        var add_width = all_goods[l_g].picture[l_p - 1].goodspic_width; //图片宽
        var add_height = all_goods[l_g].picture[l_p - 1].goodspic_height; //图片高
        var new_imgurl = res.tempFilePaths[0];
        var new_func = 'delete_pic';
        var new_width = 75;
        var new_height = 75;
        var change_url = 'all_goods[' + (l_g) + '].picture[' + l_p + '].pic_url';
        var change_function = 'all_goods[' + (l_g) + '].picture[' + l_p + '].pic_function';
        var change_width = 'all_goods[' + (l_g) + '].picture[' + l_p + '].goodspic_width';
        var change_height = 'all_goods[' + (l_g) + '].picture[' + l_p + '].goodspic_height';
        var pic_url = 'all_goods[' + (l_g) + '].picture[' + (l_p - 1) + '].pic_url';
        var pic_function = 'all_goods[' + (l_g) + '].picture[' + (l_p - 1) + '].pic_function';
        var pic_width = 'all_goods[' + (l_g) + '].picture[' + (l_p - 1) + '].goodspic_width';
        var pic_height = 'all_goods[' + (l_g) + '].picture[' + (l_p - 1) + '].goodspic_height';
        that.setData({
          [change_url]: addicon_url,
          [change_function]: addicon_func,
          [change_width]: add_width,
          [change_height]: add_height,
          [pic_url]: new_imgurl,
          [pic_function]: new_func,
          [pic_width]: new_width,
          [pic_height]: new_height
        })
      },
    });
  },
  delete_pic: function(e) {
    var that = this;
    wx.showModal({
      title: '',
      content: '是否删除照片？',
      success(res) {
        if (res.confirm) {
          var deleted_index = e.currentTarget.dataset.img_id;
          var group_index = app.globalData.group_index;
          that.data.all_goods[group_index].picture.splice(deleted_index, 1);
          var update_img = that.data.all_goods;
          that.setData({
            all_goods: update_img
          })
        } else if (res.cancel) {

        }
      }
    })
  },

  getspot_index: function(e) {
    app.globalData.spot_index = e.currentTarget.dataset.spot_id;
  },
  add_spot: function(e) {
    this.setData({
      'modal.hidden': false,
      spotaddoralter: 0
    })
  },
  save_spot: function(e) {
    var newspot = {
      spot_name: e.detail.spot_name,
      daiding: e.detail.daiding,
      address: e.detail.address,
    }
    if (this.data.spotaddoralter == 0) {
      this.data.collect_spots.push(newspot);
      var update_spots = this.data.collect_spots;
      this.setData({
        collect_spots: update_spots
      })
    } else if (this.data.spotaddoralter == 1) {
      var l = app.globalData.spot_index;
      var changespot_name = 'collect_spots[' + l + '].spot_name';
      var changedaiding = 'collect_spots[' + l + '].daiding';
      var changeaddress = 'collect_spots[' + l + '].address';
      this.setData({
        [changespot_name]: newspot.spot_name,
        [changedaiding]: newspot.daiding,
        [changeaddress]: newspot.address
      })
    }
  },
  alter_spot: function(e) {
    var modal = this.selectComponent('#modal');

    this.getspot_index(e);

    var spot_index = app.globalData.spot_index;
    var spot_info = this.data.collect_spots[spot_index];
    modal.setData({
      spot_name: spot_info.spot_name,
      daiding: spot_info.daiding,
      address: spot_info.address
    })
    this.setData({
      spotaddoralter: 1,
      'modal.hidden': false,
    })
  },
  delete_spot: function(e) {
    var that = this;
    wx.showModal({
      title: '',
      content: '是否删除自提点？',
      success(res) {
        if (res.confirm) {
          var spot_index = app.globalData.spot_index;
          that.data.collect_spots.splice(spot_index, 1);
          var update_spots = that.data.collect_spots;
          that.setData({
            collect_spots: update_spots
          })
        } else if (res.cancel) {

        }
      }
    })
  },

  create_group_buying: function(e) {
    this.setData({
      group_title: e.detail.value.group_title,
      group_announcement: e.detail.value.group_announcement,
      enroll_pay: e.detail.value.enroll_pay
    })
    console.log('团购标题',this.data.group_title);
    console.log('团购公告', this.data.group_announcement);
    console.log('报名还是支付', this.data.enroll_pay);
    console.log('所有商品', this.data.all_goods);
  },

  save_advanced:function(e){
    console.log(e.detail.value);
    this.setData({
      xmlsetting:e.detail.value.xmlsetting,
      mandatory_field: e.detail.value.mandatory_field,
      pickup_way: e.detail.value.pickup_way,
    })
    console.log('页面设置',this.data.xmlsetting);
    console.log('必填项', this.data.mandatory_field);
    console.log('取货方式', this.data.pickup_way);
    console.log('所有取货地点', this.data.collect_spots);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})