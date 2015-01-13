(function($){


	$.fn.easyform = function(options){

		var defaults = {
			'token'      : '',     // Token obrigatório.
			'secret'     : '',     // Secret obrigatório.
			'lang'       : 'en',   // Determina o idioma do plugin (en, pt) Defaults = en
			'modalForm'  : false,  // Fetermina se o formulário será modal ou inserido em outro elemento
			'urlRequest' : ''      // URL obrigatória que receberá a requisição POST retornando HTTP 200 para sucesso e HTTP 500 para erro
		}

		var settings = $.extend( {}, defaults, options );


		return this.each(function(){

			

		});

	};

})(jQuery);