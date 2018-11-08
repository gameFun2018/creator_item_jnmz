// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

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
        _GameNode: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this._GameNode = cc.find('Canvas/Game');
    },

    //--------------碰撞回调--------------
    onCollisionEnter: function (other, self) 
    {
         console.log('on collision Enter ');
         if(self.node.group == "Cell"  )
         {
             //事件不可用了，因为节点层级变了
            // var newEvent = new cc.Event.EventCustom('Cell_Hit', true);
            // newEvent.setUserData({hitGroup: self.node.group});
            // this.node.dispatchEvent(newEvent);

            if(this._GameNode)
            {
               var game = this._GameNode.getComponent('Game');   
               game.onHitEvent(other.node.group);
            }
         }
    },

    onCollisionStay: function (other, self) {
        
    },

    onCollisionExit: function (other, self) {
       
    },
    
    // update (dt) {},
});
