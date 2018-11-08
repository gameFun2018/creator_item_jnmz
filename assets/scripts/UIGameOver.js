// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

var DataManager = require("DataManager");
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
        //
        LabelScore:
        {
            default: null,
            type: cc.Label,
        },
        //
        ButtonRetry: 
        {
            default: null,
            type: cc.Button,
        },
        //排行榜
        ButtonRank:
        {
            default: null,
            type: cc.Button,
        },

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        cc.log("UIGameOver start------");
        cc.log("DataManager ", DataManager);
        this.ButtonRetry.node.on('click', this.onBtnRetryClick, this);
        this.ButtonRank.node.on('click', this.onBtnRankClick, this);
    },

    //----------------------------------表现相关-----------------------------------------
    //设置当前分数
    updateCurScore()
    {
        if(this.LabelScore)
        {
            var dataMgrNode = cc.find("DataManager");
            if(dataMgrNode)
            {
                var dataManager = dataMgrNode.getComponent(DataManager);
                this.LabelScore.string = dataManager.getCurScore();
                
                console.log("updateCurScore ", window.wx);

                if(window.wx != undefined)
                {
                    window.wx.postMessage(
                        {
                            msgType: 1, 
                            bestScore: dataManager.getCurScore() 
                        }
                    );
                }   
            }
        }      
    },

    //设置最高分数
    updateBestScore()
    {
     
    },

    //----------------------------------事件处理-----------------------------------------
    onEnable(event)
    {
        cc.log("onEnable", event);
        this.updateCurScore();
    },

    onDisable(event)
    {
        cc.log("onDisable", event);

    },

    //重试按钮点击
    onBtnRetryClick(event)
    {
        cc.log("onBtnRetryClick", event);   
        var gameNode = cc.find('Canvas/Game');
        var game = gameNode.getComponent("Game");
        game.reset();

        var uiRootNode = this.node.parent;
        if(uiRootNode)
        {
            var uiMgr = uiRootNode.getComponent("UIManager");   
            uiMgr.closeUI(UIType.UIType_GameOver); 
        }

        //cc.log(SoundManager);
        var soundMgrNode = cc.find("SoundManager");
        soundMgrNode.getComponent(SoundManager).playSound(SoundType.SoundType_UIClick);
    },
    
    //排行榜
    onBtnRankClick(event)
    {
         //向子域发送请求排行
         if(window.wx == undefined)
         {
            return;
         }

         window.wx.postMessage(
            {
                msgType: 2, 
            }
        );
        
        var uiRootNode = this.node.parent;
        if(uiRootNode)
        {
            var uiMgr = uiRootNode.getComponent("UIManager");   
            uiMgr.openUI(UIType.UIType_Rank); 
        }

        var soundMgrNode = cc.find("SoundManager");
        soundMgrNode.getComponent(SoundManager).playSound(SoundType.SoundType_UIClick);
    },
    // update (dt) {},
});
