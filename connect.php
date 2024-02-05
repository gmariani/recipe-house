<?php
$host = "localhost"; // Host name
$username = "USERNAME"; // Mysql username
$password = "PASSWORD"; // Mysql password
$db_name = "DBNAME"; // Database name
$tbl_name = "members"; // Table name
$con = null;

function makeConnection()
{
    global $con;
    // Connect to server and select database.
    $con = mysqli_connect("$GLOBALS[host]", "$GLOBALS[username]", "$GLOBALS[password]") or die("cannot connect");
    mysqli_select_db($con, "$GLOBALS[db_name]") or die("cannot select DB");
}
