//2013/07/31 assiginment2:seat shuffle ver1.0

<?php
//���̖��O�C�Q���҂̖��O���i�[����z��
//$deskNames		= array("A","B","C","D","E","F","G","H","I","J");
$deskNames		= array();
$memberNames 	= array();
$deskNum			= count($deskNames);
$memberNumMax	= 15;

//�Q���҃��X�g�쐬
for($i=0;$i<$memberNumMax;$i++){
	array_push($memberNames,$i+1);
}

//�V���b�t��
shuffle($memberNames);

//�P�Ȃ�����̍Œ�l���E�]��l���v�Z
$memberPerDesk = (int)($memberNumMax / $deskNum);
$memberRemain   = $memberNumMax % $deskNum;
$memberRemainCount = 0;

echo "member per desk: ",$memberPerDesk,"\n";
echo "member remain: ",$memberRemain,"\n";

//�f�[�^�\��
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