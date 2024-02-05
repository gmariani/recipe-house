<?php

include("connect.php");
$clientUserName = $_POST['UserName'];

function init()
{
    global $con;

    if (isset($GLOBALS["clientUserName"])) {
        makeConnection();
        $id = $GLOBALS["clientUserName"];
        $sql = "SELECT userName FROM inbox WHERE userName = '$id'";
        $result = mysqli_query($con, $sql);
        $count = mysqli_num_rows($result);
        print "hasRecipes=$count";
    } else {
        print "msg=Required parameters missing.";
    }
}

init();
