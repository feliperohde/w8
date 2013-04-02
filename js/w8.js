// o ponto-e-vírgula antes de invocar a função é uma prática segura contra scripts
// concatenados e/ou outros plugins que não foram fechados corretamente.
;(function ( $, window, document, undefined ) {

    // 'undefined' é usado aqui como a variável global 'undefined', no ECMAScript 3 é
    // mutável (ou seja, pode ser alterada por alguém). 'undefined' não está sendo
    // passado na verdade, assim podemos assegurar que o valor é realmente indefinido.
    // No ES5, 'undefined' não pode mais ser modificado.

    // 'window' e 'document' são passados como variáveis locais ao invés de globais,
    // assim aceleramos (ligeiramente) o processo de resolução e pode ser mais eficiente
    // quando minificado (especialmente quando ambos estão referenciados corretamente).

    // Cria as propriedades padrão
    var pluginName = "w8",
        defaults = {
            center: 50, // em porcetagem, indica a area de centro de clique
            className: 'w8-fx-container',
            events : {down:'mousedown', up:'mouseup'}
        };

    // O verdadeiro construtor do plugin
    function Plugin( element, options ) {
        this.element = element;

        // jQuery tem um método 'extend' que mescla o conteúdo de dois ou
        // mais objetos, armazenando o resultado no primeiro objeto. O primeiro
        // objeto geralmente é vazio já que não queremos alterar os valores
        // padrão para futuras instâncias do plugin
        this.options = $.extend( {}, defaults, options );

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    Plugin.prototype = {

        init: function() {
				var
					elem = $(this.element),
					elemClassName = '.' + this.element.className,
					//wrapper = $('.' + this.options.className),
					p = elem.position(),
					position = {top: (p.top + parseInt(elem.css('margin-top'),10)), left: (p.left + parseInt(elem.css('margin-left'),10)) }
					h = elem.outerHeight(),
					w = elem.outerWidth(),

					sizes_center = {height: (h*this.options.center/100), width: (w*this.options.center/100)},
					tolerances = {top: ((h/2) - (sizes_center.height/2) + position.top), left: ((w/2) - (sizes_center.width/2)+ position.left)};

               //console.log(sizes_center);
					elem.css({
						"-webkit-transition": "all 100ms"
					});
				// on click
				elem.on(this.options.events.down, function(e){
					var
						event_pos = {left:(e.offsetX), top:(e.offsetY)},
						event_pos_reverse = {left:(w-e.offsetX), top:(h-e.offsetY)},
						hub = {x: w/2, y: h/2},
						axis = {
							x: (event_pos.left + position.left <= tolerances.left) ? 'left' : ((event_pos.left + position.left >= (tolerances.left + sizes_center.width)) ? 'right' : 'center'),
							y: (event_pos.top + position.top <= tolerances.top) ? 'top' : ((event_pos.top + position.top >=  (tolerances.top + sizes_center.height)) ? 'bottom' : 'center')
						},
						//sinal = (),
						wrapper = elem.wrap('<div class="'+defaults.className+ ' '+ axis.x+'-'+axis.y+'" >');
                  console.log(event_pos);
                  console.log(tolerances);
                  console.log(axis);
                  console.log('/////////////////////////////')
						// console.log("-webkit-transform-origin: " + axis.x +' '+ axis.y)
						// elem.css({
						// 	"-webkit-transform-origin" : axis.x +' '+ axis.y,
						// 	"-moz-transform-origin" : axis.x  +' '+ axis.y,
						// 	"transform-origin" : axis.x  +' '+ axis.y,
						// 	"-webkit-transform" : "perspective(400px) rotateY(4deg)",
						// });


               //elem.removeAttr('style').wrap('<div class="'+defaults.className+ ' '+ axis.x+'-'+axis.y+'" >');

            });
					//para vericiar se a area de centro esta correta
               elem.append('<div class="center_'+position.left+'"></div>');
					$('.center_'+position.left).html('teste').css({position:'absolute',background:'rgba(0,0,0,.3)', width:sizes_center.width, height: sizes_center.height, left:tolerances.left, top:tolerances.top, border:'solid 1px red'});

				elem.on(this.options.events.up, function(){
					elem.unwrap().removeAttr('style').removeClass('right-top right-center right-bottom left-top left-center left-bottom center-center center-top center-bottom');
				});
        }
    };

    // Um invólucro realmente leve em torno do construtor,
    // prevenindo contra criação de múltiplas instâncias
    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin( this, options ));
            }
        });
    };

})( jQuery, window, document );