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
	
	public function __construct($date) 
	{
		$date = trim($date);

		try {
			$this->date = new \DateTime($date);
		} catch (\Exception $e) {
				throw new \Exception("Mensagem: Data invalida. A data deve ter o formato yyyy-mm-dd hh:mm:ss");
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

	public function show($formato) 
	{
		return $this->date->format($formato);
	}

}

try {
	$data = new Dates('2015-06-19 15:20:15');
	echo $data->add(['days' => 3, 'months' => 1, 'years' => 2, 'hours' => 2, 'minutes' => 20, 'seconds' => 20])->show('d/m/Y H:i:s');
} catch (\Exception $e) {
	echo $e->getMessage();
}