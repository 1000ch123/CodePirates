<?php
$num_max = 100;

for ($i = 1; $i <= $num_max; $i++) {
    if ($i % 15 == 0) {
        echo "(�v�E�ցE)�v���[�I(�^�E�ցE)�^�ɂ�[�I";
    } elseif ($i % 3 == 0) {
        echo "(�v�E�ցE)�v���[�I";
    } elseif ($i % 5 == 0) {
        echo "(�^�E�ցE)�^�ɂ�[�I";
    } else {
        echo $i;
    }
    echo "\n";
}