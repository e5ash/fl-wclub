<?php 

if (isset($_POST['name'])) {

$str = parse_url($_SERVER["HTTP_REFERER"]);

if(!is_array($str)){
	parse_str($str);
	$arr = qr_string($str["query"]);
	} else {
		$arr = array();
	}


$utm_source = isset($arr["utm_source"]) ? $arr["utm_source"] : '--';
$utm_campaign = isset($arr["utm_campaign"]) ? $arr["utm_campaign"] : '--';
$utm_medium = isset($arr["utm_medium"]) ? $arr["utm_medium"] : '--';
$utm_term = isset($arr["utm_term"]) ? $arr["utm_term"] : '--';
$utm_content = isset($arr["utm_content"]) ? $arr["utm_content"] : '--';	


$name = $_POST['name'];
$email = $_POST['email'] ? $_POST['email'] : '--';
$phone = $_POST['phone'];
$last_name = $_POST['last'] ? $_POST['last'] : '--';
$message = $_POST['message'] ? $_POST['message'] : '--';


$redirect_url = '/thanks-franch.html';
$v_site = 'Русский';



// ClientId - для сквозной аналитики 
$uID = $_COOKIE["_ga"] ? substr($_COOKIE["_ga"],6) : '--';

$link = 'https://envycrm.com/crm/api/v1/lead/set/?api_key=181e49691f82b67585b89368bc553a925510bb84';
$curl = curl_init();
 
$data = [
'method' => 'create', // метод, 'create' - для создания, 'update' - для обновления, в данном случае использовать нет необходимости
//'pipeline_id' => 54774, // id воронки (не обязательное поле, если не указано используется воронка по-умолчанию)
//'stage_id' => 231807, // id этапа (не обязательное поле, если не указано используется этап воронки по-умолчанию)
//'employee_id' => 0, // id ответственного сотрудника (не обязательное поле, если не указано, то ответственный не указывается, лид доступен всем, если значение 0, то "Администратор", если указан id сотрудника, то будет назначен сотрудник, чей id передан)
//'inbox_type_id' => 376428, // id типа входящего обращения
//'visit_id' => $_COOKIE['WhiteCallback_visit'], // идентификатор визита сервиса, будет присутствовать, если установлен js код наших виджетов, поле не обязательное, автоматически добавит информацию о посетителе, получается из Cookie
'values' => [ // массив значений системных и произвольных полей
'name' => $name, // ? $name : 'Заявка с сайта ' . ($phone ? $phone : $email), // имя
'phone' => $phone, // телефон
'email' => $email, // email
//'comment' => $form, // примечание
'utm_source' => $utm_source, // utm-метка utm_source
'utm_medium' => $utm_medium, // utm-метка utm_medium
'utm_campaign' => $utm_campaign, // utm-метка utm_campaign
'utm_content' => $utm_content, // utm-метка utm_content
'utm_term' => $utm_term, // utm-метка utm_utm_term
'custom' => [ // массив дополнительных полей
['input_id' => 254342, 'value' => $v_site], // 
['input_id' => 254348, 'value' => $message] 
]
]
];
 
curl_setopt($curl,CURLOPT_RETURNTRANSFER,true);
curl_setopt($curl,CURLOPT_URL, $link);
curl_setopt($curl,CURLOPT_POST,true);
curl_setopt($curl,CURLOPT_POSTFIELDS, json_encode(['request' => $data]));
curl_setopt($curl,CURLOPT_HEADER,false);
 
$out=curl_exec($curl);
$code=curl_getinfo($curl,CURLINFO_HTTP_CODE);
curl_close($curl);


header('Location: '.$redirect_url);


}




function qr_string($str)
 { $ivs=explode("&",$str);
   $res_arr=array();
   for($i=0;$i<count($ivs);$i++)
   {  list($pr,$vl)=explode("=",$ivs[$i]);
      $res_arr[$pr]=urldecode($vl);
   }
  return $res_arr;
 }
 
 

?>
