"use strict";//厳格モード．曖昧実装許されない．ちょっと早い．（らしい）
// Time-stamp: <2013-08-09 00:29:03 masanote>

$(function(){
    //constants
    var HAND_TYPE = {
	      ROCK     : 0,
	      SCISSORS : 1,
	      PAPER    : 2
    };
    var HAND_NAME ={
	      0 : "ぐー ",
	      1 : "ちょき",
	      2 : "ぱー "
    };
    var RSP_RESULT_CODE = {
	      DRAW : 0,
	      WIN  : 1,
	      LOSE : 2
    };
    var ENEMY_LIST ={
	      BOB    :0,
	      ADOLF  :1,
	      CLERK  :2,
	      DUDLEY :3
    };
    var ENEMY_NAME = {
	      0 : "ボブ",
	      1 : "アドルフ",
	      2 : "クラーク",
	      3 : "ダドリー"
    };
    var IMG_PATH = {
	      0 : "img/rock.png",
	      1 : "img/scissors.png",
	      2 : "img/paper.png"
    };//HAND_TYPEで設定したいんだけどなぁ
    
    //effect用変数
    var fadeTimeHand   = 300;
    var delayTime_hand = 0;
    
    //戦績状態記録変数
    var winCount     = 0;
    var loseCount    = 0;
    var drawCount    = 0;
    var summary      = [];
    var historyArray = [];

    //enemy用状態記録変数
    //現在の敵
    var tmpEnemy = ENEMY_LIST.BOB;
    //adolf
    var adolfFirst = true;
    //Dudley:過去のuHandを保存しておく
    var dudleyMemoryPre    = -1;
    var dudleyMemoryPrePre = -1;

    /*
     初期化
     */
    initialize();
    
    function initialize(){
	      $(".rsp-btn")  .toggle();
	      $(".enemy-btn").toggle();
	      $("#enemyList").toggle();
	      $("#dataSave") .toggle();
    }

    /*
     Game Start
     */
    
    // はじめから
    $("#start").click(function(){
	      alert("れっつ勝負にゃー");
	      initButtons();
	      localStorage.clear();
    });
    
    // つづきから
    $("#dataLoad").click(function(){
	      var passcode;

	      if(localStorage){
	          passcode = localStorage.passcode;
	      } else {
	          //データがない場合
	          alert("履歴がありません．[はじめから]を押してください");
	          return;
	      }

	      if ( $("#passcode").val() == passcode) {
	          alert("つづきから勝負にゃー");
	          initButtons();
	          
	          summary   = JSON.parse(localStorage.summary);
	          drawCount = summary[RSP_RESULT_CODE.DRAW];
	          winCount  = summary[RSP_RESULT_CODE.WIN];
	          loseCount = summary[RSP_RESULT_CODE.LOSE];
	          $("#summary").text("win:"   + winCount  +
			                         " lose:" + loseCount +
			                         " draw:" + drawCount);
	          
	          historyArray = JSON.parse(localStorage.history);
	          for (var i = 0; i < historyArray.length; i++) {
		            var tmpHist = historyArray[i];
		            $("#history").append(tmpHist["userHand"]  + ":" +
				                             tmpHist["enemyHand"] + ":" +
				                             tmpHist["result"]    + "<br/>");
	          }
	      } else {
	          alert("パスコード違うんすけど？");
	      }
    });

    //ボタンの表示切替
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
     Main
     基本じゃんけん機能
     出す手を押したとき発動
     */
    $(".rsp-btn").click(function(){ 
	      // model更新
	      var uHand  = myHand($(this).attr("id"));
	      var eHand  = enemyHand(tmpEnemy);
	      var result = judge(uHand,eHand);
	      updateHistory(result, uHand, eHand);
	      
	      // view更新
	      updateHandImg("#myrspimg"   , uHand);
	      updateHandImg("#enemyrspimg", eHand);
	      updateResult(result, uHand, eHand);
    });
    
    /*
     userHand
     */
    function myHand(handType) {
	      var hand;
	      var imgPath;
	      if (handType == "rock") {  
	          hand = HAND_TYPE.ROCK;
	      } else if (handType == "scissors") {
	          hand = HAND_TYPE.SCISSORS;
	      } else {
	          hand = HAND_TYPE.PAPER;
	      }
	      return hand;
    }

    /*
     EnemyHand
     */  
    /*
     enemyHand関数．
     現在的情報を引数にして，手を生成する．
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

    //Enemy1.bob.完全ランダム
    function bobHand() {
	      var hand = Math.floor( Math.random() * 3);
	      return hand;
    }
    
    //Enemy2.adolf.最初にパー多い
    function adolfHand(){
	      var hand;
	      var imgPath;
	      if ( adolfFirst ){
	          hand = Math.floor( Math.random() * 5);
	          if ( hand >= 3 ) hand = HAND_TYPE.PAPER;	  
	          adolfFirst = false;
	      } else {
	          hand = Math.floor( Math.random() * 3);
	      }
	      return hand;
    }
    
    //Enemy3.clerk.チョキが多い
    function clerkHand(){
	      var hand;
	      var imgPath;
	      hand = Math.floor( Math.random() * 5);
	      if ( hand >= 3 ) hand = HAND_TYPE.SCISSORS; 
	      return hand;
    }
    
    //Enemy4.dudley.ユーザの手の履歴保存．同じ手が連続するとそれに勝つ手を出す．（確定？）
    function dudleyHand(){
	      var hand;
	      var imgPath;
	      if ( dudleyMemoryPre == dudleyMemoryPrePre ){
	          hand = (dudleyMemoryPre + 2) % 3; //繰り返される手に勝てる手を出す
	      } else {
	          hand = Math.floor( Math.random() * 3);
	      }
	      return hand;
    }

    /*
     -step3-
     enemyボタン
     htmlでのidから敵No.敵name更新．
     // TODO:プルダウンメニュー
     */
    $(".enemy-btn").click(function(){
	      var enemyName    = $(this).attr("id");
	      var enemyNumList = {
	          "Bob"   :ENEMY_LIST.BOB,
	          "Adolf" :ENEMY_LIST.ADOLF,
	          "Clerk" :ENEMY_LIST.CLERK,
	          "Dudley":ENEMY_LIST.DUDLEY
	      };

	      //PG
	      tmpEnemy = enemyNumList[enemyName];

	      //UI
	      updateEnemyName();
    });
    
    /*
     judge:勝敗判定．
     in:myHand,otherHand
     out:result
     */
    function judge(uHand, eHand) {
	      var result;    //judgeの結果格納．returnする．
	      
	      //dudley用_履歴更新
	      dudleyMemoryPrePre = dudleyMemoryPre;
	      dudleyMemoryPre    = uHand;
	      
	      //勝敗判定
	      if (uHand === eHand) {
	          result = RSP_RESULT_CODE.DRAW;
	          drawCount++;
	      } else if ((uHand === HAND_TYPE.ROCK        && eHand === HAND_TYPE.SCISSORS)
		               || (uHand === HAND_TYPE.SCISSORS && eHand === HAND_TYPE.PAPER)
		               || (uHand === HAND_TYPE.PAPER    && eHand === HAND_TYPE.ROCK)) {
	          result = RSP_RESULT_CODE.WIN;
	          winCount++;
	      } else {
	          result = RSP_RESULT_CODE.LOSE;
	          loseCount++;
	      }
		    
	      return result;
    }
    
    /*
     戦績更新．
     */
    function updateHistory(result,uHand, eHand){
	      var resultStr ={0:"draw",1:"win",2:"lose"};
	      var tmpHist = {"userHand"  :HAND_NAME[uHand],
		                   "enemyHand" :HAND_NAME[eHand],
		                   "enemyName" :ENEMY_LIST[tmpEnemy],
		                   "result"    :resultStr[result]};
	      historyArray[historyArray.length] = tmpHist;
    }  
    

    /*
     -step4-
     dataSave
     localStorage って機能名なんですね．一般名詞かと思ってた．
     */
    $("#dataSave").click(function(){
	      var code = 10000000 + Math.floor( Math.random() * 90000000);
	      alert("your passcode: " + code);
	      summary = [drawCount,winCount,loseCount];

	      // localStorageに書き込み
	      localStorage.passcode = code;
	      localStorage.summary  = JSON.stringify(summary);
	      localStorage.history  = JSON.stringify(historyArray);
    });

    /*
     UI関係
     */

    // じゃんけんの手の更新
    // method chainを上手く使おう
    function updateHandImg(tag, hand){
	      var imgPath = IMG_PATH[hand];
	      $(tag).fadeOut(fadeTimeHand*0).delay(delayTime_hand)
	          .attr("src", imgPath).fadeIn(fadeTimeHand);
    }

    /*
     リザルトテキスト更新
     * result={draw:0,win:1,lose:2}
     */
    function updateResult(result, uHand, eHand) {
	      var resultStr1 = {0:"draw.",1:"you win!",2:"you lose.."};
	      var resultStr2 = {0:"draw",1:"win",2:"lose"};

	      //今回のリザルト表示
	      $("#result").text(resultStr1[result]);
	      $("#result").fadeOut(0).delay(fadeTimeHand).fadeIn(fadeTimeHand);

	      //今までの戦績表示
	      setTimeout( function(){
	          $("#history").append(HAND_NAME[uHand]   + "：" +
				                         HAND_NAME[eHand]   + "：" +
				                         resultStr2[result] +"<br/>");
	          $("#summary").text("win:"   + winCount  +
			                         " lose:" + loseCount +
			                         " draw:" + drawCount);
	      },fadeTimeHand*2);

    }

    function updateEnemyName(){
	      $("#enemy-name").text(ENEMY_NAME[tmpEnemy]);
    }

    /*
     -step1-
     option: assignmentDocs表示切替
     */
    $("#docsOnOff").click(function(){
	      $("#assignmentDocs").toggle();
	      if( $(this).text() == "close"){
	          $(this).text("open");
	      }else{
	          $(this).text("close");
	      }
    });
    
});
