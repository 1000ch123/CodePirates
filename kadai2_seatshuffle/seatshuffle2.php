//2013/07/31 assiginment2:seat shuffle ver1.0

<?php
//���̖��O�C�Q���҂̖��O���i�[����z��
$deskNames		= array("A","B","C","D","E","F","G","H","I","J");
$memberNames 	= array();
$memberNumMax	= 20;

//�Q���҃��X�g�쐬
for($i=0;$i<$memberNumMax;$i++){
	array_push($memberNames,$i+1);
}

//�V���b�t��
shuffle($memberNames);

//�f�[�^�\��
foreach($deskNames as $desk){
	echo $desk," ";
	echo array_pop($memberNames)," ";
	echo array_pop($memberNames)," ";
	echo "\n";
}
?>