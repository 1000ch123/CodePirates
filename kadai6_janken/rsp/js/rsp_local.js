"use strict";

$(function(){
  //定数
  var HAND_TYPE = {
    ROCK : 0,
    SCISSORS : 1,
    PAPER : 2,
  };
  var RSP_RESULT_CODE = {
    DRAW : 0,
    WIN : 1,
    LOSE : 2,
  };
  $(".rsp-btn").toggle();

  //effect用変数
  var fadeTime_hand = 300;
  var delayTime_hand = 0;
  
  
  //ボタンが押されたら
  $(".rsp-btn").click(function(){
    //勝敗判定judge(userHand,enemyHand)
    var result = judge(
      myHand($(this).attr("id")),
      bobHand()
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
    //$("#myrspimg").fadeOut(fadeTime_hand);
    $("#myrspimg").attr("src", imgPath);
    $("#myrspimg").delay(delayTime_hand);
    $("#myrspimg").fadeIn(fadeTime_hand);
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
    //メソッドチェーンだと．さきに要素変更が解釈されているみたい・
    $("#bobrspimg").fadeOut(fadeTime_hand);
    $("#bobrspimg").delay(delayTime_hand)
    $("#bobrspimg").attr("src", imgPath);
    $("#bobrspimg").fadeIn(fadeTime_hand);
    return hand;
  }
  
  //勝敗判定．
  //in:myHand,otherHand
  //out:result
  function judge(myHand, otherHand) {
    var result;
    if (myHand === otherHand) {
      result = RSP_RESULT_CODE.DRAW;
    } else if ((myHand === HAND_TYPE.ROCK && otherHand === HAND_TYPE.SCISSORS)
        || (myHand === HAND_TYPE.SCISSORS && otherHand === HAND_TYPE.PAPER)
        || (myHand === HAND_TYPE.PAPER && otherHand === HAND_TYPE.ROCK)) {
      result = RSP_RESULT_CODE.WIN;
    }else {
      result = RSP_RESULT_CODE.LOSE;
    }
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
      $("#result").text("").delay(fadeTime_hand*2).text("draw.");
      resultText = "ひきわけです．";
    } else if (result === RSP_RESULT_CODE.WIN) {
      $("#result").text("").delay(fadeTime_hand*2).text("You win!");
      resultText = "あなたの勝ちです！";
    } else {
      $("#result").text("").delay(fadeTime_hand*2).text("You lose!");
      resultText = "あなたの負けです．．";
    }
    //alert(resultText);
  }
  
  /*
  assignmenDocs表示切替
  */
  $("#docsOnOff").click(function(){
     //alert("pushed");
     $("#assignmentDocs").toggle();
    }
  )
  
  /*
  startボタン
  */
  $(".start").click(function(){
    alert("れっつにゃー");
    $(".rsp-btn").toggle();
  }
  )
});
