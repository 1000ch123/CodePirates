<!--
2013/07/31
GETリクエストの処理 ver1.2
パラメタ無しに対応．
エラーメッセージ表示追加．
-->

<!DOCTYPE html>
<html>
<head><meta charset="UTF-8">
<Title>れっつにゃー</Title></head>
<body>

<?
ini_set('display_errors', '1');
error_reporting(-1);
echo "Let's＼(・ω・)／";
if ($_GET){
    echo $_GET["name"];
}
?>

</body></html>