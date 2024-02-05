<?php

include("connect.php");
$clientUserName = $_POST['UserName'];

function init()
{
    global $con;

    if (isset($GLOBALS["clientUserName"])) {
        makeConnection();
        $userName = $GLOBALS["clientUserName"];
        $sql = "SELECT * FROM inbox WHERE userName = '$userName' LIMIT 1";
        $result = mysqli_query($con, $sql);
        $data = "";
        $id = "";
        while ($row = mysqli_fetch_assoc($result)) {
            $data .= $row["data"];
            $id .= $row["id"];
        }
        print "messageData=$data&messageId=$id";
    } else {
        print "msg=Required parameters missing.";
    }
}

init();
