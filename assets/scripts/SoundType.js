// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

var SoundType = 
{
    //背景音乐
    SoundType_Bg:
    {
        ID: 0,
        IsLoop: true,
    },
    //按钮点击
    SoundType_UIClick:
    {
        ID: 1,
        IsLoop: false,   
    },
    //成功进入
    SoundType_Enter:
    {
        ID: 2,   
        IsLoop: false,   
    },
    //失败
    SoundType_Fail:
    {
        ID: 3,   
        IsLoop: false,   
    },
    //move
    SoundType_Move:
    {
        ID: 4,   
        IsLoop: false, 
    },
}

module.exports = SoundType;
