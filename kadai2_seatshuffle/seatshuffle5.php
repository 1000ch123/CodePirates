//2013/08/04 assiginment2:seat shuffle ver1.3
//
// �G���[�����ǉ�
//

<?php
//�����C�l���ݒ�D
$deskNum       = 10;
$memberNum   = 15;

//���̖��O�C�Q���҂̖��O���i�[����z��
$deskNames         = range(1,$deskNum);
$memberNames     = range(1,$memberNum);

//�V���b�t��
shuffle($memberNames);

//�P�Ȃ�����̍Œ�l���E�]��l���v�Z
if ($deskNum < 1) {
    $deskNum = 1;
}
$memberPerDesk = (int)($memberNum / $deskNum);
$memberRemain   = $memberNum % $deskNum;
$memberRemainCount = 0;

//�f�[�^�\��
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
