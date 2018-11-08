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
var SoundType = require("SoundType");

//游戏状态
var GameState = 
    {
        //-1：无效状态  
        GS_INVALID : -1, 
        // 0: 转动中  
        GS_WAITOP : 0,
        //  1：移动中
        GS_CELLMOVE : 1,
        //切换容器
        GS_CONTAINER_MOVE: 2,
    };


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

        //柠檬节点
        NMRootNode:
        {
            default: null, 
            type: cc.Node,
        },
        //容器节点
        ContainerNode:
        {
            default: null, 
            type: cc.Node,            
        },
        //UI节点
        UIRoot:
        {
            default: null, 
            type: cc.Node,      
        },
        //数据管理器节点
        DataManagerNode:
        {
            default: null, 
            type: cc.Node,    
        },

        //游戏状态：(-1：无效状态    0: 转动中   1：移动中)
        _CurGameState: cc.Integer,
        //小柠檬颗粒
        _NMCellNode: cc.Node,
        //当前的移动方向
        _CurMoveDir: cc.Vec2,
        //当前成功次数
        _CurSucessCount: cc.Integer,
        //下落 速度
        _CurFallSpeed: cc.Integer,
        //单容器容量
        _ConFillCount: 10,
        //柠檬Cell初始位置
        _NMCellInitPos: cc.Vec2,
        //声音Node
        _SoundManagerNode: cc.Node,
        //当前的旋转速度
        _CurNMRotSpeed: cc.Integer,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    onLoad()
    {
         
    },

    onDestroy()
    {

    },

    start () {

        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        //manager.enabledDebugDraw = true;

        this._SoundManagerNode = cc.find('SoundManager');

        this.node.on(cc.Node.EventType.TOUCH_END, this.onGameTouchEnd, this);

        this._NMCellNode =  this.NMRootNode.getChildByName("NMCell");
        this._NMCellInitPos = this._NMCellNode.position;

        this._CurSucessCount = 0;

        this._CurFallSpeed = 200;

        this._CurNMRotSpeed = 150;

        this.setGameState(0);

        var callbackObj = 
        {
            success(systemInfo)
            {
                cc.log("systemInfo", systemInfo);   
            },

            fail()
            {

            },

            complete()
            {

            },
        };

        if(window.wx != undefined)
        {
            window.wx.showShareMenu({withShareTicket: true}); 
        }
    },

    //游戏中 点击
    onGameTouchEnd(event)
    {
        console.log('Game touch end---------------------');
        //旋转中
        if(this._CurGameState == GameState.GS_WAITOP)
        {
            var cellParent = this._NMCellNode.parent;
            var nmParent = this.NMRootNode.parent;

            var cellWorldPos = cellParent.convertToWorldSpaceAR(this._NMCellNode.position); 
            var nmWorldPos = nmParent.convertToWorldSpaceAR(this.NMRootNode.position); 

            var moveDir = cc.pSub(cellWorldPos, nmWorldPos).normalize();
            //可以向下运动时，设置为移动状态
            if(moveDir.y < 0)
            {
                this._CurMoveDir = moveDir;
                this.setGameState(GameState.GS_CELLMOVE);

                //挂接到世界节点
                var curScene =  cc.director.getScene();
                this._NMCellNode.parent = curScene;
                this._NMCellNode.position = cellWorldPos;
                var rot = -cc.pToAngle(moveDir) * (180 / 3.14) - 90;
                this._NMCellNode.rotation = rot;
                var scaleAct = cc.scaleBy(0.05, 0.85);
                var scaleAct2 = cc.scaleBy(0.05, 1 / 0.85);
                var seq = cc.sequence(scaleAct, scaleAct2);
                seq.setTag(1);
                this.NMRootNode.runAction(seq);
            }
        }
        // 1：移动中
        else if(this._CurGameState == 1)
        {

        }
        
    },

    //更改转速
    changeRotateSpeed(newSpeed)
    {
        this._CurNMRotSpeed = newSpeed;

        var rotateAction =  this.NMRootNode.getActionByTag(0);
        if(rotateAction != null)
        {
            this.NMRootNode.stopActionByTag(0);      
        } 
        
        rotateAction = cc.rotateBy(360 / this._CurNMRotSpeed, 360);
        this.NMRootNode.runAction(cc.repeatForever(rotateAction));
        rotateAction.setTag(0);
    },

    //设置游戏状态
    setGameState(state)
    {
        this._CurGameState = state;
        //0: 转动中
        if(this._CurGameState == GameState.GS_WAITOP)
        {
            //转动柠檬
            if(this.NMRootNode != null)
            {
                var rotateAction =  this.NMRootNode.getActionByTag(0);
                if(rotateAction == null)
                {
                    rotateAction = cc.rotateBy(360 / this._CurNMRotSpeed, 360);
                    this.NMRootNode.runAction(cc.repeatForever(rotateAction));
                    rotateAction.setTag(0);
                }                       
            }
            //显示柠檬小颗粒

        }
        //1：移动中
        else if(this._CurGameState == GameState.GS_CELLMOVE)
        {
            this._CurFallSpeed = 150;
        }

    },

    //设置容器进度
    updateContainerProgress()
    {
        if(this._ConFillCount == 0)
        {
            cc.log("updateContainerProgress invalid _ConFillCount ");
            return 0;
        }

        var progressNode = this.ContainerNode.getChildByName("ContainerProgressBar");
        var proBar = progressNode.getComponent(cc.ProgressBar);
        if(proBar)
        {
            proBar.progress = this._CurSucessCount / this._ConFillCount;
        }

        return proBar.progress;
    },

    //游戏重置：
    reset()
    {
        //重置转速
        this.changeRotateSpeed(150);
        //状态
        this.setGameState(GameState.GS_WAITOP);     
        //进度
        this._CurSucessCount = 0;
        this.updateContainerProgress();
        //重置总分
        if(this.DataManagerNode)
        {
            var dataManager = this.DataManagerNode.getComponent("DataManager");
            dataManager.setCurScore(0);
        }
        //柠檬颗粒归位
        this.resetNMCell();

        var uiManager =  this.UIRoot.getComponent("UIManager");
        uiManager.openUI(UIType.UIType_Game);

        this.updateScore();
    },
    //重置柠檬颗粒
    resetNMCell()
    {
        //柠檬颗粒归位
        if(this._NMCellNode)
        {
            this._NMCellNode.parent =  this.NMRootNode;
            this._NMCellNode.position = this._NMCellInitPos;
            this._NMCellNode.rotation  = 0;
            this._NMCellNode.scale = 1;
        }

    },
    //更新分数显示
    updateScore()
    {
        var uiManager =  this.UIRoot.getComponent("UIManager");
        var uiGame = uiManager.getUI(UIType.UIType_Game);   
        if(uiGame)
        {
            var dataManager = this.DataManagerNode.getComponent("DataManager");
            uiGame.updateCurScore(dataManager.getCurScore());
        }
    },

    //碰撞事件(Container  Cell  Bounds)
    onHitEvent(hitGroup)
    {
        //碰到屏幕边界
        if(hitGroup == "Bounds")  
        {
            cc.log("onHitEvent Fail");   
            
            if(this.UIRoot)
            {   
               var uiManager =  this.UIRoot.getComponent("UIManager");
               
               uiManager.closeUI(UIType.UIType_Game);
               uiManager.openUI(UIType.UIType_GameOver);

               this._SoundManagerNode.getComponent('SoundManager').playSound(SoundType.SoundType_Fail);
            }
        }
        //成功进入容器
        else if(hitGroup == "Container")
        {
            cc.log("onHitEvent Container");
            
            this._CurSucessCount++;

            //更新总分
            if(this.DataManagerNode)
            {
               var dataManager = this.DataManagerNode.getComponent("DataManager");
               var curTotalScore = dataManager.getCurScore();
               dataManager.setCurScore(curTotalScore + 1);
            }
            this.updateScore();
            //更新进度条
            var progress = this.updateContainerProgress();
            //柠檬颗粒归位
            this.resetNMCell();
            //音效
            this._SoundManagerNode.getComponent('SoundManager').playSound(SoundType.SoundType_Enter);
            //杯子满了
           if(progress >= 1)
            {
                this.setGameState(GameState.GS_CONTAINER_MOVE);
                //移出动画
                var moveOutAct = cc.moveTo(0.5, cc.v2(-2000, this.ContainerNode.y));
                var callFunc = cc.callFunc(this.containerMoveOutFinish, this); 
                this.ContainerNode.runAction(cc.sequence(moveOutAct, callFunc));
                
            }else
            {
                this.setGameState(GameState.GS_WAITOP);
            }

        } 
    },
    
    //容器移出完成
    containerMoveOutFinish(obj)
    {
        cc.log("containerMoveOutFinish------ ");
       // var moveInAct = cc.moveTo(0, this.ContainerNode.y);
       this.ContainerNode.x = 2000;
       //进度重置
       this._CurSucessCount = 0;
       this.updateContainerProgress();
       //移入动画
       var moveOutAct = cc.moveTo(0.5, cc.v2(0, this.ContainerNode.y));
       var callFunc = cc.callFunc(this.containerMoveInFinish, this); 
       this.ContainerNode.runAction(cc.sequence(moveOutAct, callFunc));

       this._SoundManagerNode.getComponent('SoundManager').playSound(SoundType.SoundType_Move);
    },

     //容器移入完成
    containerMoveInFinish(obj)
    {
        cc.log("containerMoveInFinish------ ");
        //更改转速
        this.changeRotateSpeed(this._CurNMRotSpeed + 5);

        this.setGameState(GameState.GS_WAITOP);
    },

    //帧更新
    update (dt)
    {
        if(this._CurGameState == 1)
        {
           var nowPos = this._NMCellNode.position;
           this._CurFallSpeed += 300 * dt;
           var moveVec = cc.pMult(this._CurMoveDir, this._CurFallSpeed * dt);
           nowPos = cc.pAdd(nowPos, moveVec);
           this._NMCellNode.position = nowPos;
        }  
     },

});
