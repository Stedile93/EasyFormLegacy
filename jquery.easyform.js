/*

EasyForm - | 2015-01-16
A easy custom simple contact form jQuery plugin

Author: Giuliano Stedile


*/


(function($){

	$.fn.easyform = function(options){

		var defaults = {
			'token'      : '',     // Token obrigatório.
			'secret'     : '',     // Secret obrigatório.
			'lang'       : 'en',   // Determina o idioma do plugin (en, pt) Defaults = en
			'modalForm'  : false,  // Fetermina se o formulário será modal ou inserido em outro elemento
			'urlRequest' : ''      // URL obrigatória que receberá a requisição POST retornando HTTP 200 para sucesso e HTTP 500 para erro

			'fields'     : {
				'estado' : [    // Array com os UFs a serem utilizados no select, por default mostra todos os estados ex.: ['PR', 'SC', 'RS']
					'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
				],
				'nivel'  : ''   // Array obrigatório com os níveis a serem utilizados no select Ex.: ['Iniciante', 'Intermediário', 'Avançado', 'Ninja']
			}
		}

		var settings = $.extend( {}, defaults, options );


		return this.each(function(){



		});

	};

})(jQuery);