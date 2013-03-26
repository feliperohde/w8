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
            center: 60, // em porcetagem,
            className: 'w8-fx-container'
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
			var $this = $(this.element),
			pos = $this.position(),
			h = $this.outerHeight(),
			w = $this.outerWidth(),
			fx = $this.find('.this-fx'),

			sizes_center = {height: (h*this.options.center/100), width: (w*this.options.center/100)},
			tolerances = {top: ((h/2) - (sizes_center.height/2)), left: ((w/2) - (sizes_center.width/2))},

			perspective = 150,
			rotate = 1;

			$this.on('click', function(e){

			//$this.after().append('<div class="'+className+'">');
			//$this.after().append('</div>');

			event_pos = {left:(e.offsetX), top:(e.offsetY)},
			event_pos_reverse = {left:(w-e.offsetX), top:(h-e.offsetY)},
			hub = {x: w/2, y: h/2},
			axis = {
				x: (event_pos.left <= tolerances.left) ? 'left' : ((event_pos.left >= (tolerances.left + sizes_center.width)) ? 'rigth' : 'center'),
				y: (event_pos.top <= tolerances.top) ? 'top' : ((event_pos.top >=  (tolerances.top + sizes_center.height)) ? 'bottom' : 'center'),
			},

			$this.append('<div id="center"></div>');
			$("#center").html('teste').css({position:'absolute', width:sizes_center.width, height: sizes_center.height, left:tolerances.left, top:tolerances.top, border:'solid 1px red'});

			console.log('////////////////////////////////////');
			console.log('axis_x:' + axis.x);
			console.log('axis_y:' + axis.y);

			$this.removeClass('left bottom rigth top').addClass(axis.x+'-'+axis.y);
			});
        },

        yourOtherFunction: function(el, options) {
            // alguma lógica
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