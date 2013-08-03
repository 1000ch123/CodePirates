//2013/08/01 assiginment2:seat shuffle ver1.2
//
// 机の数も可変にしました．
// range関数なるものを知ったのでスマートになった？気がします．
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
