$(function(){
	var elem = $('.w8'),
		 className = 'w8-fx-container';

	elem.each(function(e){
		var $this = $(this),
			 pos = $this.position(),
			 h = $this.outerHeight(),
			 w = $this.outerWidth(),
		    fx = $this.find('.this-fx'),

			area_center = 60, // em porcentagem
			sizes_center = {height: (h*area_center/100), width: (w*area_center/100)},
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

				// axis = {
				// 	x: (event_pos.left < hub.x && ) ? 'left' : 'rigth',
				// 	y: (event_pos.top < hub.y) ? 'top' : 'bottom'
				// },

				$this.append('<div id="center"></div>');
				$("#center").html('teste').css({position:'absolute', width:sizes_center.width, height: sizes_center.height, left:tolerances.left, top:tolerances.top, border:'solid 1px red'});

				// console.log('////////////////////////////////////');
				// console.log('Rleft tap:' + event_pos_reverse.left);
				// console.log('Rtop tap:' + event_pos_reverse.top);
				// console.log('////////////////////////////////////');
				// console.log('left tap:' + event_pos.left);
				// console.log('top tap:' + event_pos.top);
				// console.log('////////////////////////////////////');
				// console.log('width:' + w);
				// console.log('hei:' + h);
				console.log('////////////////////////////////////');
				console.log('axis_x:' + axis.x);
				console.log('axis_y:' + axis.y);

				$this.removeClass('left bottom rigth top').addClass(axis.x+'-'+axis.y);
			});

			console.log(sizes_center);
			console.log(tolerances);

		// 	percent_x = ((event_pos.left*100)/(w)),
		// 	percent_y = ((event_pos.top*100)/(h)),


		// 	sinalX = '',
		// 	sinalY = ''

		// 	if(axis_y == 'top'){
		// 		sinalX = '-';
		// 	}else{
		// 		sinalX = '+';
		// 	}

		// 	if(axis_x == 'left'){
		// 		sinalY = '+';
		// 	}else{
		// 		sinalY = '-';
		// 	}

		// 	// console.log('axisX: '+axis_x +' vs '+ 'axisY: '+axis_y);
		// 	// console.log('perX: '+percent_x +' vs '+ 'perY: '+percent_y);
		// 	// console.log('hubX: '+hub_x +' vs '+ 'hubY: '+hub_y);
		// 	// //console.log(sinal);
		// 	// console.log('////////////////////////////////////////////');

		// fx.removeAttr('style');
		// fx.css({
		// 	  "-webkit-transform-origin" : percent_x+"% "+percent_y+"%"
		// 	, "-moz-transform-origin" : percent_x+"% "+percent_y+"%"
		// 	, "-ms-transform-origin" : percent_x+"% "+percent_y+"%"
		// 	, "-o-transform-origin" : percent_x+"% "+percent_y+"%"
		// 	, "transform-origin" : percent_x+"% "+percent_y+"%"});

		//      fx.css("-webkit-transform","perspective("+perspective+"px) rotateY("+sinalY+rotate+"deg) rotateX("+sinalX+rotate+"deg) translateZ(0)");
		//      fx.css("-moz-transform","perspective("+perspective+"px) rotateY("+sinalY+rotate+"deg) rotateX("+sinalX+rotate+"deg) translateZ(0)");
		//      fx.css("-ms-transform","perspective("+perspective+"px) rotateY("+sinalY+rotate+"deg) rotateX("+sinalX+rotate+"deg) translateZ(0)");
		//      fx.css("-o-transform","perspective("+perspective+"px) rotateY("+sinalY+rotate+"deg) rotateX("+sinalX+rotate+"deg) translateZ(0)");
		//      fx.css("transform","perspective("+perspective+"px) rotateY("+sinalY+rotate+"deg) rotateX("+sinalX+rotate+"deg) translateZ(0)");
	});
});
