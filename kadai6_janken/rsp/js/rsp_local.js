"use strict";//厳格モード．曖昧実装許されない．ちょっと早い．（らしい）
// Time-stamp: <2013-08-08 17:30:36 masanote>

$(function(){
    //constants
    var HAND_TYPE = {
	ROCK : 0,
	SCISSORS : 1,
	PAPER : 2
    };
    var HAND_NAME ={
	0:"ぐー ",
	1:"ちょき",
	2:"ぱー "
    };
    var RSP_RESULT_CODE = {
	DRAW : 0,
	WIN : 1,
	LOSE : 2
    };
    var ENEMY_LIST ={
	BOB:0,
	ADOLF:1,
	CLERK:2,
	DUDLEY:3
    };
    var ENEMY_NAME = {
	0:"ボブ",
	1:"アドルフ",
	2:"クラーク",
	3:"ダドリー"
    };
    var IMG_PATH = {
	0:"img/rock.png",
	1:"img/scissors.png",
	2:"img/paper.png"
    };//HAND_TYPEで設定したいんだけどなぁ
    
    //effect用変数
    var fadeTimeHand = 300;
    var delayTime_hand = 0;
    
    //戦績状態記録変数
    var winCount = 0;
    var loseCount = 0;
    var drawCount = 0;
    var summary = [];
    var historyArray = [];
    
    //enemy用状態記録変数
    //現在の敵
    var tmpEnemy = ENEMY_LIST.BOB;
    //adolf
    var adolfFirst = true;
    //Dudley
    var dudleyMemoryPre = -1;
    var dudleyMemoryPrePre = -1;

    /*
     step0:初期化
     */
    initialize();
    
    function initialize(){
	$(".rsp-btn").toggle();
	$(".enemy-btn").toggle();
	$("#enemyList").toggle();
	$("#dataSave").toggle();
    }
    
    /*
     基本じゃんけん機能
 　    出す手を押したとき発動
     */
    $(".rsp-btn").click(function(){
	// model更新
	var uHand = myHand($(this).attr("id"));
	var eHand = enemyHand(tmpEnemy);
	var result = judge(uHand,eHand);
	
	// view更新
	updateHandImg("#myrspimg", uHand);
	updateHandImg("#enemyrspimg", eHand);

	//結果表示
	showResult(result);
    });
    

    /*
     ユーザの手選択
     */

  
    
    function myHand(handType) {
	/*
	 UserHand.handTypeはhtmlでidに指定した"rock","scissors","paper".
	 (UI)
	 引数評価の後，自分の手の画像（my rsp img）を更新する．
	 手を変えるエフェクトならここ？
	 (PG)
	 handを設定．return.
	 */
	var hand;
	var imgPath;
	if (handType == "rock") {  
	    hand = HAND_TYPE.ROCK;
	} else if (handType == "scissors") {
	    hand = HAND_TYPE.SCISSORS;
	} else {
	    hand = HAND_TYPE.PAPER;
	}
	/*
	imgPath = IMG_PATH[hand];
	$("#myrspimg").fadeOut(fadeTimeHand*0).delay(delayTime_hand)
	    .attr("src", imgPath).fadeIn(fadeTimeHand);
	*/
	//updateHandImg("#myrspimg" ,hand);
	return hand;
    }

    /*
     EnemyHand
     */
    
    //Enemy1.bob.完全ランダム
    function bobHand() {
	var hand = Math.floor(Math.random() * 3);
	/*
	var imgPath;
	if (hand === HAND_TYPE.ROCK) {
	    imgPath = "img/rock.png";
	} else if (hand === HAND_TYPE.SCISSORS) {
	    imgPath = "img/scissors.png";
	} else {
	    imgPath = "img/paper.png";
	}
	$("#enemyrspimg").fadeOut(fadeTimeHand*0).delay(delayTime_hand)
	 .attr("src", imgPath).fadeIn(fadeTimeHand);
	 */
	return hand;
    }
    
    //Enemy2.adolf.最初にパー多い
    function adolfHand(){
	var hand;
	var imgPath;
	if(adolfFirst){
	    hand = Math.floor(Math.random() * 5);
	    if (hand >= 3) hand = HAND_TYPE.PAPER; 
	    adolfFirst = false;
	}else{
	    hand = Math.floor(Math.random() * 3);
	}
	/*
	if (hand === HAND_TYPE.ROCK) {
	    imgPath = "img/rock.png";
	} else if (hand === HAND_TYPE.SCISSORS) {
	    imgPath = "img/scissors.png";
	} else {
	    imgPath = "img/paper.png";
	    hand = HAND_TYPE.PAPER;
	}
	$("#enemyrspimg").fadeOut(fadeTimeHand*0).delay(delayTime_hand).attr("src", imgPath).fadeIn(fadeTimeHand);
	 */
	return hand;
    }
    
    //Enemy3.clerk.チョキが多い
    function clerkHand(){
	var hand;
	var imgPath;
	hand = Math.floor(Math.random() * 5);
	if (hand >= 3) hand = HAND_TYPE.SCISSORS; 
	/*
	if (hand === HAND_TYPE.ROCK) {
	    imgPath = "img/rock.png";
	} else if (hand === HAND_TYPE.SCISSORS) {
	    imgPath = "img/scissors.png";
	} else if (hand === HAND_TYPE.PAPER) {
	    imgPath = "img/paper.png";
	} else {
	    imgPath = "img/scissors.png";
	    hand = HAND_TYPE.SCISSORS;
	}
	 $("#enemyrspimg").fadeOut(fadeTimeHand*0).delay(delayTime_hand).attr("src", imgPath).fadeIn(fadeTimeHand);
	 */
	return hand;
    }
    
    //Enemy4.dudley.ユーザの手の履歴保存．同じ手が連続するとそれに勝つ手を出す．（確定？）
    function dudleyHand(){
	var hand;
	var imgPath;
	if ( dudleyMemoryPre == dudleyMemoryPrePre){
	    hand = (dudleyMemoryPre + 2) % 3;
	} else {
	    hand = Math.floor(Math.random() * 3);
	}
	/*
	if (hand === HAND_TYPE.ROCK) {
	    imgPath = "img/rock.png";
	} else if (hand === HAND_TYPE.SCISSORS) {
	    imgPath = "img/scissors.png";
	} else if (hand === HAND_TYPE.PAPER) {
	    imgPath = "img/paper.png";
	} else {
	    imgPath = "img/scissors.png";
	    hand = HAND_TYPE_SCISSORS;
	}
	$("#enemyrspimg").fadeOut(fadeTimeHand*0).delay(delayTime_hand).attr("src", imgPath).fadeIn(fadeTimeHand);
	 */
	return hand;
    }
    /*
     敵の設定．引数tmpEnemyによるswitch文．
     （enemyHand = enemyHandFunc のように関数オブジェクト使いたいのにうまくいかね）
     */
    function enemyHand(tmpEnemy){
	var ehand;
	switch (tmpEnemy){
	case ENEMY_LIST.BOB:
            ehand = bobHand();
            break;
	case ENEMY_LIST.ADOLF:
            ehand = adolfHand();
            break;
	case ENEMY_LIST.CLERK:
            ehand = clerkHand();
            break;
	case ENEMY_LIST.DUDLEY:
            ehand = dudleyHand();
            break;
	default:
            ehand = bobHand();
            break;
	}

	return ehand;
    }

    // 描画用関数. method chainを上手く使おう
    function updateHandImg(tag, hand){
	var imgPath = IMG_PATH[hand];
	$(tag).fadeOut(fadeTimeHand*0).delay(delayTime_hand)
	    .attr("src", imgPath).fadeIn(fadeTimeHand);
    }
    
    /*
     勝敗判定．
     in:myHand,otherHand
     out:result
     */
    function judge(myHand, otherHand) {
	var result;    //judgeの結果格納．returnする．
	var resultStr; //戦績更新用
	
	//dudley用結果記録
	dudleyMemoryPrePre = dudleyMemoryPre;
	dudleyMemoryPre    = myHand;
	
	
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
	// for html
	setTimeout( function(){
	    $("#history").append(HAND_NAME[myHand]+"："+HAND_NAME[otherHand]+"："+
				 resultStr+"<br/>");
	    $("#summary").text("win:" + winCount + " lose:" + loseCount + " draw:" + drawCount);
	},fadeTimeHand*2);
	//for historyArray
	var tmpHist = {"userHand":HAND_NAME[myHand],
		       "enemyHand":HAND_NAME[otherHand],
		       "enemyName":ENEMY_LIST[tmpEnemy],
		       "result":resultStr};
	historyArray[historyArray.length] = tmpHist;
	
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
	$("#result").fadeOut(0).delay(fadeTimeHand).fadeIn(fadeTimeHand);
	//alert(resultText);
    }
    
    /*
     assignmenDocs表示切替
     */
    $("#docsOnOff").click(function(){
	$("#assignmentDocs").toggle();
	if( $(this).text() == "close"){
	    $(this).text("open");
	}else{
	    $(this).text("close");
	}
    });
    
    /*
     Game Start
     */
    $("#start").click(function(){
	alert("れっつにゃー");
	initButtons();
	localStorage.clear();
    });

    $("#dataLoad").click(function(){
	var passcode;
	if(localStorage){
	    passcode = localStorage.passcode;
	} else {
	    alert("履歴がありません．[最初から]を押してください");
	    return;
	}

	if ( $("#passcode").val() == passcode) {
	    alert("つづきからにゃー");
	    initButtons();
	    
	    summary = JSON.parse(localStorage.summary);
	    drawCount = summary[RSP_RESULT_CODE.DRAW];
	    winCount = summary[RSP_RESULT_CODE.WIN];
	    loseCount = summary[RSP_RESULT_CODE.LOSE];
	    $("#summary").text("win:" + winCount + " lose:" + loseCount +
			       " draw:" + drawCount);
	    historyArray = JSON.parse(localStorage.history);
	    for (var i = 0; i < historyArray.length; i++) {
		var tmpHist = historyArray[i];
		$("#history").append(tmpHist["userHand"] + ":" + tmpHist["enemyHand"] +
				     ":" + tmpHist["result"] + "<br/>");
	    }
	} else {
	    alert("パスコード違うんすけど？");
	}
    });

    function initButtons(){
	$(".start-btn").toggle();
	$(".rsp-btn").toggle();
	$(".enemy-btn").toggle();
	//$("#enemyList").toggle();
	$("#dataLoad").toggle();
	$("#passcode").toggle();
	$("#dataSave").toggle();
    }
    
    /*
     enemyボタン
     */
    $(".enemy-btn").click(function(){
	var enemyName = $(this).attr("id");
	var enemyNumList = {
	    "Bob":ENEMY_LIST.BOB,
	    "Adolf":ENEMY_LIST.ADOLF,
	    "Clerk":ENEMY_LIST.CLERK,
	    "Dudley":ENEMY_LIST.DUDLEY
	};
	tmpEnemy = enemyNumList[enemyName];
	$("#enemy-name").text(ENEMY_NAME[tmpEnemy]);
    });

    /*
     dataSave
     localStorageって機能名なんですね．一般名詞かと思ってた．
     */
    $("#dataSave").click(function(){
	var code = 10000000 + Math.floor( Math.random() * 90000000);
	alert("your passcode: " + code);

	summary = [drawCount,winCount,loseCount];
	
	localStorage.passcode = code;
	localStorage.win = winCount;
	localStorage.lose = loseCount;
	localStorage.draw = drawCount;

	localStorage.summary = JSON.stringify(summary);
	localStorage.history = JSON.stringify(historyArray);
    });
});
