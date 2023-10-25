<?php
include 'includes/config.php';
ini_set("session.cookie_httponly", 1);
session_start();
?>

<?php

header("Content-Type: application/json");
// session_start();
$json_str = file_get_contents('php://input');
$json_obj = json_decode($json_str, true);

$date = htmlentities($json_obj['date']);
$shareValue = htmlentities($json_obj['shareValue']);


if(!isset($_SESSION["LoggedIn"])){
    echo json_encode(array(
        "success" => false,
        "message" => "Not Logged In, Log In To View events"
    ));
    exit;
}else{
    $userName = $_SESSION['currUser'];
}


// $stmt = $mysqli->prepare("select * from events where eventDate='$date' and owner = '$userName'");
if($shareValue === 'false'){
    $stmt = $mysqli->prepare("select * from events where eventDate='$date' and owner = '$userName' ");
}else if ($shareValue === 'true'){
    $stmt = $mysqli->prepare("select * from events where eventDate='$date' and owner = '$userName' or eventDate='$date' and sharedWith='$userName'");
}else if ($shareValue === "true2"){
    $stmt = $mysqli->prepare("select * from events where eventDate='$date' and sharedWith='$userName'");
}

if(!$stmt){
    echo json_encode(array(
        "success" => false,
        "message" => "Query Prep Failed".$userName
    ));
	exit;
}else{
   
    
}

$stmt->execute();
$result = $stmt->get_result();
$responseData = array();



//need to check for xss attack
while($row = $result->fetch_assoc()){
    
    array_push($responseData, $row);
}

if(!$responseData){
    echo json_encode(array(
        "success" => false,
        "message" => "Event not found!" 
    ));
    $stmt->close();
    exit;
}else{
    echo json_encode(array(
        "success" => true,
        "message" => $responseData
    ));
    $stmt->close();
    exit;
}

?>