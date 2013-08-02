//2013/07/31 assiginment2:seat shuffle ver1.0

<?php
//机の名前，参加者の名前を格納する配列
$deskNames		= array("A","B","C","D","E","F","G","H","I","J");
$memberNames 	= array();
$memberNumMax	= 20;

//参加者リスト作成
for($i=0;$i<$memberNumMax;$i++){
	array_push($memberNames,$i+1);
}

//シャッフル
shuffle($memberNames);

//データ表示
foreach($deskNames as $desk){
	echo $desk," ";
	echo array_pop($memberNames)," ";
	echo array_pop($memberNames)," ";
	echo "\n";
}
?>