// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

var UIType = require("UIType");
var SoundType = require('SoundType');
var SoundManager = require('SoundManager');

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        BtnClose:
        {
            default: null,
            type: cc.Button,
        },
        Display:
        {
            default: null,
            type: cc.Sprite,
        },

        _Texture: cc.Texture2D,

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

        this._Texture = new cc.Texture2D();
        if (window.wx != undefined)
        {
           // window.wx.showShareMenu({withShareTicket: true});//设置分享按钮，方便获取群id展示群排行榜

            window.sharedCanvas.width = 500;
            window.sharedCanvas.height = 800;

            // window.wx.postMessage({
            //     messageType: 1,
            //     MAIN_MENU_NUM: "x1"
            // });
        }
        if(this.BtnClose)
        {
            this.BtnClose.node.on('click', this.onBtnCloseClick, this);
        }

    },

    // 刷新子域的纹理
    _updateSubDomainCanvas () {
        if (!this._Texture) {
            return;
        }
        if(!window.sharedCanvas)
        {
            return;
        }
        this._Texture.initWithElement(window.sharedCanvas);
        this._Texture.handleLoadedTexture();
        this.Display.spriteFrame = new cc.SpriteFrame(this._Texture);

    },

    //----------------------------------------------------
    onEnable(event)
    {
        cc.log("onEnable", event);
        
    },

    onDisable(event)
    {
        cc.log("onDisable", event);

    },
    //关闭按钮 事件处理
    onBtnCloseClick(event)
    {
        cc.log("onBtnCloseClick");
        var uiParent = this.node.parent;
        if(uiParent)
        {
            var uiMgr = uiParent.getComponent("UIManager");
            uiMgr.closeUI(UIType.UIType_Rank);    
        }

        var soundMgrNode = cc.find("SoundManager");
        soundMgrNode.getComponent(SoundManager).playSound(SoundType.SoundType_UIClick);
    },
    //----------------------------------------------------
    update () {
        this._updateSubDomainCanvas();
    }
    

});
