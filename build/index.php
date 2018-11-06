<?php
$ready = explode(',', $_SERVER['HTTP_ACCEPT_LANGUAGE']);
$lang = array_map(function ($value) {
  return substr($value, 0, 2);
}, $ready);

if (in_array('ca', $lang)) {
  header('Location: http://'.$_SERVER['SERVER_NAME'].'/ca');
} else if (in_array('es', $lang)) {
  header('Location: http://'.$_SERVER['SERVER_NAME'].'/es');
} else {
  header('Location: http://'.$_SERVER['SERVER_NAME'].'/en');
}

?>
