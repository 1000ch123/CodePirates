//2013/07/31 assiginment2:seat shuffle ver1.0

<?php
//机の名前，参加者の名前を格納する配列
//$deskNames		= array("A","B","C","D","E","F","G","H","I","J");
$deskNames		= array();
$memberNames 	= array();
$deskNum			= count($deskNames);
$memberNumMax	= 15;

//参加者リスト作成
for($i=0;$i<$memberNumMax;$i++){
	array_push($memberNames,$i+1);
}

//シャッフル
shuffle($memberNames);

//１席あたりの最低人数・余剰人数計算
$memberPerDesk = (int)($memberNumMax / $deskNum);
$memberRemain   = $memberNumMax % $deskNum;
$memberRemainCount = 0;

echo "member per desk: ",$memberPerDesk,"\n";
echo "member remain: ",$memberRemain,"\n";

//データ表示
foreach($deskNames as $desk){
	echo $desk," ";
	for($i=0;$i<$memberPerDesk;$i++){
		echo array_pop($memberNames)," ";
	}
	if($memberRemainCount < $memberRemain){
		echo array_pop($memberNames)," ";
		$memberRemainCount++;
	}
	echo "\n";
}
?>