<!--
2013/08/02
GETリクエストの処理 ver1.3
キー存在の確認．
エンティティ変換．
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
if (array_key_exists("name", $_GET)) {
    echo htmlspecialchars($_GET["name"], ENT_QUOTES,"UTF-8");
}
?>

</body></html>