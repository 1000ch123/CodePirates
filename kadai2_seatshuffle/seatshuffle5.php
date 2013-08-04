//2013/08/04 assiginment2:seat shuffle ver1.3
//
// エラー処理追加
//

<?php
//机数，人数設定．
$deskNum       = 10;
$memberNum   = 15;

//机の名前，参加者の名前を格納する配列
$deskNames         = range(1,$deskNum);
$memberNames     = range(1,$memberNum);

//シャッフル
shuffle($memberNames);

//１席あたりの最低人数・余剰人数計算
if ($deskNum < 1) {
    $deskNum = 1;
}
$memberPerDesk = (int)($memberNum / $deskNum);
$memberRemain   = $memberNum % $deskNum;
$memberRemainCount = 0;

//データ表示
foreach($deskNames as $desk) {
    echo "DeskNo.".$desk," - ";
    for ($i = 0; $i < $memberPerDesk; $i++) {
         echo array_pop($memberNames)," ";
    }
    if ($memberRemainCount < $memberRemain) {
         echo array_pop($memberNames)," ";
         $memberRemainCount++;
    }
    echo "\n";
}
