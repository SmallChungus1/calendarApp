<?php
include 'includes/config.php';
ini_set("session.cookie_httponly", 1);
session_start();
?>

<?php

header("Content-Type: application/json");
//check for xss attack
$json_str = file_get_contents('php://input');
$json_obj = json_decode($json_str, true);

$username = htmlentities($json_obj['username']);
$eventTitle = htmlentities($json_obj['eventTitle']);
$eventDate = htmlentities($json_obj['eventDate']);
$eventTS = htmlentities($json_obj['eventTS']);
$eventTE = htmlentities($json_obj['eventTE']);
$eventDesc = htmlentities($json_obj['eventDesc']);
$csrfToken = htmlentities($json_obj['eventToken']);
$eventID = htmlentities($json_obj['eventID']);
$shareWith = htmlentities($json_obj['shareWith']);

if(empty($shareWith)){
    $shareWith = null;
}

// if(isset($eventID)){
//     echo json_encode(array(
//                 "success" => true,
//                 "message" => "read eventID"
//             ));
//             exit;
// }else{
//     echo json_encode(array(
//         "success" => false,
//         "message" => "some error"
//     ));
//     exit;
// }

if (!hash_equals($_SESSION["token"] ,$csrfToken)){
    echo json_encode(array(
        "success" => false,
        "message" => "Error: Did not pass CSRF Security Check"
    ));
    exit;
}


if($username !== $_SESSION["currUser"]){
    echo json_encode(array(
        "success" => false,
        "message" => "Warning: identity of user passed in vs identity of session user is different, ".$username
    ));
    exit;
}else{
    

    $stmt = $mysqli->prepare("update events set title = '$eventTitle', eventDate='$eventDate', timeStart='$eventTS', timeEnd='$eventTE', description='$eventDesc', sharedWith='$shareWith' where eventID=? and owner=?");
    //$stmt = $mysqli->prepare("update events set title = '$eventTitle' where eventID=? and owner=?");  
     $stmt->bind_param('is', $eventID, $username);
    
    
    if(!$stmt){
        echo json_encode(array(
            "success" => false,
            "message" => "Attempt to prepare event update query failed ".$mysqli->error
        ));
        exit;
    }
    if($stmt->execute()){

        echo json_encode(array(
            "success" => true,
            "message" => "Successfully updated ".$eventTitle
        ));
        exit;

    }
    else{
        echo json_encode(array(
            "success" => false,
            "message" => "Attempt to update event failed ".$mysqli->error
        ));
        exit;
    }   
    
    
    $stmt->close();

}

?>