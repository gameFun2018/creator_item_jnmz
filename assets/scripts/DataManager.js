// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

//数据管理器

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

        //当前分数：
        CurScore: cc.Integer,
        //最好分数
        BestScore: cc.Integer,

    },
    

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    //
    start () {
        cc.log("DataManager start");
        this.CurScore = 0;
        this.BestScore = 0;
    },
    
    //获取当前分数
    getCurScore()
    {
        return this.CurScore;
    },

    //设置当前分数
    setCurScore(curScore)
    {
        this.CurScore = curScore;   
    },
    
    // update (dt) {},
});
