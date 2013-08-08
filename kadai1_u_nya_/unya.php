 <?php
 $num_max = 100;

 for ($i = 1; $i <= $num_max; $i++) {
     if ($i % 15 == 0) {
         echo "(」・ω・)」うー！(／・ω・)／にゃー！";
     } elseif ($i % 3 == 0) {
         echo "(」・ω・)」うー！";
     } elseif ($i % 5 == 0) {
         echo "(／・ω・)／にゃー！";
     } else {
         echo $i;
     }
     echo "\n";
 }