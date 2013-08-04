"use strict";//厳格モード．曖昧実装許されない．ちょっと早い．（らしい）

$(function(){
  //定数
  var HAND_TYPE = {
    ROCK : 0,
    SCISSORS : 1,
    PAPER : 2,
  };
  var HAND_NAME ={
    0:"ぐー ",
    1:"ちょき",
    2:"ぱー ",
  }
  var RSP_RESULT_CODE = {
    DRAW : 0,
    WIN : 1,
    LOSE : 2,
  };
  var ENEMY_LIST ={
    BOB:0,
    ADOLF:1,
    CLERK:2,
    DUDLEY:3
  }

  //effect用変数
  var fadeTime_hand = 300;
  var delayTime_hand = 0;
  
  //戦績状態記録変数
  var winCount = 0;
  var loseCount = 0;
  var drawCount = 0;
  
  //enemy用状態記録変数
  //現在の敵
  var tmpEnemy = ENEMY_LIST.BOB;
  //adolf
  
  //clerk
  
  //Dudley
  
  //読み込み時の処理
    $(".rsp-btn").toggle(); //じゃんけんの手を非表示にする
    $(".enemy-btn").toggle();
    $("#enemyList").toggle();
    
  //ボタンが押されたら
  $(".rsp-btn").click(function(){
    //勝敗判定judge(userHand,enemyHand)
    var result = judge(
      myHand($(this).attr("id")),
      enemyHand(tmpEnemy)//bobHand()
      );
      
    //結果表示
    showResult(result);
  });
  
  //UserHand.handTypeはhtmlでidに指定した"rock","scissors","paper".
  function myHand(handType) {
    /*
    (UI)
    引数評価の後，自分の手の画像（my rsp img）を更新する．
    手を変えるエフェクトならここ？
    (PG)
    handを設定．return.
    */
    var hand;
    var imgPath;
    if (handType == "rock") {
      imgPath = "img/rock.png";
      //$("#myrspimg").fadeOut(500).attr("src", "img/rock.png").fadeIn(500);
      hand = HAND_TYPE.ROCK;
    } else if (handType == "scissors") {
      imgPath = "img/scissors.png";
      //$("#myrspimg").attr("src", "img/scissors.png");
      hand = HAND_TYPE.SCISSORS;
    } else {
      imgPath = "img/paper.png";
      //$("#myrspimg").attr("src", "img/paper.png");
      hand = HAND_TYPE.PAPER;
    }
    $("#myrspimg").fadeOut(fadeTime_hand*0).delay(delayTime_hand).attr("src", imgPath).fadeIn(fadeTime_hand);
    
    return hand;
  }
  
  //Enemy1.bob.完全ランダム
  function bobHand() {
    var hand = Math.floor(Math.random() * 3);
    var imgPath;
    if (hand === HAND_TYPE.ROCK) {
      imgPath = "img/rock.png";
      //$("#bobrspimg").attr("src", "img/rock.png");
    } else if (hand === HAND_TYPE.SCISSORS) {
      imgPath = "img/scissors.png";
      //$("#bobrspimg").attr("src", "img/scissors.png");
    } else {
      imgPath = "img/paper.png";
      //$("#bobrspimg").attr("src", "img/paper.png");
    }
    $("#bobrspimg").fadeOut(fadeTime_hand*0).delay(delayTime_hand).attr("src", imgPath).fadeIn(fadeTime_hand);
    return hand;
  }
  
  function enemyHand(tmpEnemy){
    var ehand;
    switch (tmpEnemy){
      case ENEMY_LIST.BOB:
        ehand = bobHand();
        break;
      default:
        ehand = bobHand();
        break;
    }
    return ehand;
  }
  
  /*
  勝敗判定．
  in:myHand,otherHand
  out:result
  */
  function judge(myHand, otherHand) {
    var result; //judgeの結果格納．returnする．
    var resultStr; //戦績更新用
    
    //勝敗判定
    if (myHand === otherHand) {
      result = RSP_RESULT_CODE.DRAW;
      drawCount++;
      resultStr = "draw";
    } else if ((myHand === HAND_TYPE.ROCK && otherHand === HAND_TYPE.SCISSORS)
        || (myHand === HAND_TYPE.SCISSORS && otherHand === HAND_TYPE.PAPER)
        || (myHand === HAND_TYPE.PAPER && otherHand === HAND_TYPE.ROCK)) {
      result = RSP_RESULT_CODE.WIN;
      winCount++;
      resultStr = "win";
    }else {
      result = RSP_RESULT_CODE.LOSE;
      loseCount++;
      resultStr = "lose";
    }
    
    //戦績更新
    setTimeout(function(){
     $("#history").append(HAND_NAME[myHand]+"："+HAND_NAME[otherHand]+"："+
       resultStr+"<br/>");
     $("#summary").text("win:" + winCount + " lose:" + loseCount + " draw:" + drawCount);
    },fadeTime_hand*2);
    return result;
  }
  
  /*
  リザルト表示
    初期：id=resultの要素．テキスト更新．
    アニメーションとかできるかも？
  */
  function showResult(result) {
    var resultText;
    
    if (result === RSP_RESULT_CODE.DRAW) {
      $("#result").text("draw.");
      resultText = "ひきわけです．";
    } else if (result === RSP_RESULT_CODE.WIN) {
      $("#result").text("You win!");
      resultText = "あなたの勝ちです！";
    } else {
      $("#result").text("You lose!");
      resultText = "あなたの負けです．．";
    }
    $("#result").fadeOut(0).delay(fadeTime_hand).fadeIn(fadeTime_hand);
    //alert(resultText);
  }
  
  /*
  assignmenDocs表示切替
  */
  $("#docsOnOff").click(function(){
     $("#assignmentDocs").toggle();
     if($(this).text()=="close"){
       $(this).text("open");
     }else{
       $(this).text("close");
     }
    }
  )
  
  /*
  startボタン
  */
  $(".start-btn").click(function(){
    alert("れっつにゃー");
    $(".start-btn").toggle();
    $(".rsp-btn").toggle();
    //$(".enemy-btn").toggle();
    $("#enemyList").toggle();
    }
  )
  
  /*
  enemyボタン
  */
  $(".enemy-btn").click(function(){
    }
  )
});
