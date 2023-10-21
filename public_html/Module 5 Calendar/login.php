<?php
include 'includes/config.php';


?>

<?php
header("Content-Type: application/json");
$json_str = file_get_contents('php://input');
$json_obj = json_decode($json_str, true);

$username = $json_obj['username'];
$password = $json_obj['password'];


$stmt = $mysqli->prepare("select userName, userPassword from users where userName='$username'");
if(!$stmt){
    
    // echo "
    // <script type=\"text/javascript\">
    // alert(\"Query Prep Not Successfull\");
    // </script>";


    echo json_encode(array(
        "success" => false,
        "message" => "Query Prep Failed"
    ));
	exit;
}else{

    // printf("Query Prep Success! <br>");
}



$stmt->execute();
$result = $stmt->get_result();
$row = $result->fetch_assoc();

if(!$row){
    echo json_encode(array(
        "success" => false,
        "message" => "User Name Not Found" 
    ));
}else{
    $databasePWD = $row['userPassword'];
    //$password = password_hash($password, PASSWORD_DEFAULT);
    // echo"password: $password databasepwd: $databasePWD";
    $hashedPassword = password_hash($databasePWD, PASSWORD_DEFAULT);
    if(password_verify($password, $hashedPassword)){
        session_start();
        $_SESSION["currUser"] = $userName;
        $_SESSION["LoggedIn"] = true;
        $_SESSION["token"] = bin2hex(openssl_random_pseudo_bytes(32)); //uses rando_int to generate a token for CSRF Token auth
        // header("Location: home.php");
        echo json_encode(array(
            "success" => true
        ));
        exit;
    }else{
        // echo "incorrect password<br>";
        // echo "<form action = login.php><input type =\"submit\" value = \"Go Back\"></input></form>";
        echo json_encode(array(
            "success" => false,
            "message" => "Incorrect Password"
        ));
        exit;
    }
   
}


$stmt->close();







?>