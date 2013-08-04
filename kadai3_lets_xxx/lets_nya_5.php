<!--
2013/08/04
GETリクエストの処理 ver1.4
phpスクリプト部冒頭へ移動
-->

<?
ini_set('display_errors', '1');
error_reporting(-1);
$title = "れっつにゃー";
$message = "hoge";
if (array_key_exists("title", $_GET)) {
    $title = htmlspecialchars($_GET["title"], ENT_QUOTES,"UTF-8");
}
if (array_key_exists("name", $_GET)) {
    $message = htmlspecialchars($_GET["name"], ENT_QUOTES,"UTF-8");
}
?>

<!DOCTYPE html>
<html>
<head><meta charset="UTF-8">
<Title><?echo $title;?></Title></head>
<body>

Let's＼(・ω・)／<? echo $message;?>

</body></html>