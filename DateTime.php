<?php namespace Borsatti\Helpers;
/**
 * Helper class for manipulate dates using php \DateTime
 * @package  Borsatti\Helpers
 * @author Roberto Borsatti
 * @version 1.0
 * 
 */

class Dates {


	/**
	 * Data que sera manipulada
	 * @var date
	 */
	
	protected $date;

	/**
	 * Função construct, define a data a ser manipulada
	 * @param date $date Data a ser manipulada
	 */
	
	public function __construct($date, $timezone = '') 
	{

		$date = trim($date);

		if ($timezone != '') {
			if (!date_default_timezone_set($timezone)) {
				throw new \Exception('Falha ao setar o TimeZone');
			}
		}

		if (substr_count($date, '/') == 2) {

			$data = implode('-',array_reverse(explode('/', substr($date, 0, 10))));

			if (substr_count($date, ':') > 0) {
				$date = $data.' '.substr($date, 11);
			} else {
				$date = $data;
			}
		}

		try {
			$this->date = new \DateTime($date);
		} catch (\Exception $e) {
			throw new \Exception("Mensagem: Data invalida - Se a data estiver correta, verifique o seu TimeZone. A data informada foi ".$date);
		}
	}

	/**
	 * Função responsável por somar valores a data
	 * @param  array $recipe Valores a serem adicionados
	 */

	public function add($recipe) 
	{
		 /**
		  * O parametro deve ser um array
		  */
		 
		 if (!is_array($recipe)) {
		 	throw new \Exception('O parametro deve ser um array');
		 }

		 $recipe['years'] = (!isset($recipe['years'])) ? 0 : $recipe['years'];
		 $recipe['months'] = (!isset($recipe['months'])) ? 0 : $recipe['months'];
		 $recipe['days'] = (!isset($recipe['days'])) ? 0 : $recipe['days'];
		 $recipe['hours'] = (!isset($recipe['hours'])) ? 0 : $recipe['hours'];
		 $recipe['minutes'] = (!isset($recipe['minutes'])) ? 0 : $recipe['minutes'];
		 $recipe['seconds'] = (!isset($recipe['seconds'])) ? 0 : $recipe['seconds'];

		 $form = 'P'.$recipe['years'].'Y'.$recipe['months'].'M'.$recipe['days'].'DT'.$recipe['hours'].'H'.$recipe['minutes'].'M'.$recipe['seconds'].'S';
		 $this->date->add(new \DateInterval($form));
		 return $this;
	}

	/**
	 * Função para retornar a data no formato desejado
	 * @param  string $formato Formato que deseja a data
	 * @return string Data formatada
	 */
	public function get($formato) 
	{
		return $this->date->format($formato);
	}

}

#### MODO DE USO
try {
	$data = new Dates('2015-05-01', 'America/Campo_Grande');
	echo $data->add(['days' => 3, 'months' => 1, 'years' => 2, 'hours' => 2, 'minutes' => 20, 'seconds' => 20])->get('d/m/Y H:i:s');
} catch (\Exception $e) {
	echo $e->getMessage();
}
