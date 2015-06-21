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
	 * Data para ver diferenças
	 * @var date
	 */
	protected $dateDiff;

	/**
	 * Função construct, define a data a ser manipulada
	 * @param date $date Data a ser manipulada
	 */
	
	public function __construct($date, $timezone = '') 
	{		
		if ($timezone != '') {
			if (!date_default_timezone_set($timezone)) {
				throw new \Exception('Falha ao setar o TimeZone');
			}
		}
		$this->date = $date;
		$this->prepareDate('date');

		try {
			$this->date = new \DateTime($this->date);
		} catch (\Exception $e) {
			throw new \Exception("Mensagem: Data invalida - Se a data estiver correta, verifique o seu TimeZone. A data informada foi ".$this->date);
		}
	}

	protected function prepareDate($var) {

		$this->$var = trim($this->$var);

		if (substr_count($this->$var, '/') == 2) {

			$data = implode('-',array_reverse(explode('/', substr($this->$var, 0, 10))));

			if (substr_count($this->$var, ':') > 0) {

				$this->$var = $data.' '.substr($this->$var, 11);

			} else {

				$this->$var = $data;				

			}			

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


	public function diff($data, $element = 'all') {

		$this->dateDiff = $data;
		$this->prepareDate('dateDiff');
		try {
			$this->dateDiff = new \DateTime($this->dateDiff);
		} catch (\Exception $e) {
			throw new \Exception("Mensagem: Data para diferenca invalida - A data informada foi ".$this->dateDiff);
		}

		$data = $this->date->diff($this->dateDiff);

		if ($element == 'all') {
			return $data;
		} else {
			return $data->$element;
		}

	}

}

#### MODO DE USO
/*
try {
	$data = new Dates('20/01/2015 14:33', 'America/Campo_Grande');
	print_r ($data->add(['days' => 3, 'months' => 1, 'years' => 2, 'hours' => 2, 'minutes' => 20, 'seconds' => 20])->diff('20/01/2015 14:33'));
} catch (\Exception $e) {
	echo $e->getMessage();
}
*/