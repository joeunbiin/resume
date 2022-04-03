var Page = (function() {

	var $container = $( '#container' ),
		$bookBlock = $( '#bb-bookblock' ),
		$items = $bookBlock.children(),
		itemsCount = $items.length,
		current = 0,
		bb = $( '#bb-bookblock' ).bookblock( {
			speed : 800,
			perspective : 2000,
			shadowSides	: 0.8,
			shadowFlip	: 0.4,
			onEndFlip : function(old, page, isLimit) {
				
				current = page;
				// update TOC current
				updateTOC();
				// updateNavigation
				updateNavigation( isLimit );
				// initialize jScrollPane on the content div for the new item
				setJSP( 'init' );
				// destroy jScrollPane on the content div for the old item
				setJSP( 'destroy', old );

			}
		} ),
		$navNext = $( '#bb-nav-next' ),
		$navPrev = $( '#bb-nav-prev' ).hide(),
		$menuItems = $container.find( 'ul.menu-toc > li' ),
		$tblcontents = $( '#tblcontents' ),
		transEndEventNames = {
			'WebkitTransition': 'webkitTransitionEnd',
			'MozTransition': 'transitionend',
			'OTransition': 'oTransitionEnd',
			'msTransition': 'MSTransitionEnd',
			'transition': 'transitionend'
		},
		transEndEventName = transEndEventNames[Modernizr.prefixed('transition')],
		supportTransitions = Modernizr.csstransitions;

	function init() {

		// initialize jScrollPane on the content div of the first item
		setJSP( 'init' );
		initEvents();

	}
	var arrcnt = 0;
	function initEvents() {

		// add navigation events
		$navNext.on('click', function() {
			arrcnt++
			console.log(arrcnt)
			if( arrcnt === 3 ) {
				draw(90, '.chart1', '#9BFF93');
    			draw(85, '.chart2', '#77E56F');
    			draw(60, '.chart3', '#53C14B');
    			draw(70, '.chart4', '#2F9D27');
    			draw(85, '.chart5', '#006700');
    			draw(75, '.chart6', '#004300');
				draw(55, '.chart7', '#41AF39');
    			draw(60, '.chart8', '#D1FFC9');
			}
			bb.next();
			return false;
		} );

		$navPrev.on('click', function(){
			arrcnt--
			console.log(arrcnt)
			if( arrcnt === 3 ) {
				draw(90, '.chart1', '#9BFF93');
    			draw(85, '.chart2', '#77E56F');
    			draw(60, '.chart3', '#53C14B');
    			draw(70, '.chart4', '#2F9D27');
    			draw(85, '.chart5', '#006700');
    			draw(75, '.chart6', '#004300');
				draw(55, '.chart7', '#41AF39');
    			draw(60, '.chart8', '#D1FFC9');
			}
		})

		$navPrev.on( 'click', function() {
			bb.prev();
			return false;
		} );
		
		// add swipe events

		$items.on( {
			'swipeleft'		: function( event ) {
				arrcnt++
				if( $container.data( 'opened' ) ) {
					return false;
				}
				bb.next();
				return false;
			},
			'swiperight'	: function( event ) {
				arrcnt--
				if( $container.data( 'opened' ) ) {
					return false;
				}
				bb.prev();
				return false;
			}
		} );

		// show table of contents
		$tblcontents.on('click', toggleTOC );

		// click a menu item
		$menuItems.on( 'click', function() {

			var $el = $( this ),
				idx = $el.index(),
				jump = function() {
					bb.jump( idx + 1 );
				};

				arrcnt = idx
				console.log(arrcnt)
			if( idx === 3 ) {
				draw(85, '.chart1', '#D1FFC9');
    			draw(85, '.chart2', '#9BFF93');
    			draw(60, '.chart3', '#77E56F');
    			draw(70, '.chart4', '#53C14B');
    			draw(90, '.chart5', '#006700');
    			draw(85, '.chart6', '#004300');
				draw(55, '.chart7', '#41AF39');
    			draw(65, '.chart8', '#2F9D27');
			}
			
			current !== idx ? closeTOC( jump ) : closeTOC();

			return false;
			
		} );

		// reinit jScrollPane on window resize
		$( window ).on( 'debouncedresize', function() {
			// reinitialise jScrollPane on the content div
			setJSP( 'reinit' );
		} );

	}

	function setJSP( action, idx ) {
		
		var idx = idx === undefined ? current : idx,
			$content = $items.eq( idx ).children( 'div.content' ),
			apiJSP = $content.data( 'jsp' );
		
		if( action === 'init' && apiJSP === undefined ) {
			$content.jScrollPane({verticalGutter : 0, hideFocus : true });
		}
		else if( action === 'reinit' && apiJSP !== undefined ) {
			apiJSP.reinitialise();
		}
		else if( action === 'destroy' && apiJSP !== undefined ) {
			apiJSP.destroy();
		}

	}

	function updateTOC() {
		$menuItems.removeClass( 'menu-toc-current' ).eq( current ).addClass( 'menu-toc-current' );
	}

	function updateNavigation( isLastPage ) {
		
		if( current === 0 ) {
			$navNext.show();
			$navPrev.hide();
		}
		else if( isLastPage ) {
			$navNext.hide();
			$navPrev.show();
		}
		else {
			$navNext.show();
			$navPrev.show();
		}

	}

	function toggleTOC() {
		var opened = $container.data( 'opened' );
		opened ? closeTOC() : openTOC();
	}

	function openTOC() {
		$navNext.hide();
		$navPrev.hide();
		$container.addClass( 'slideRight' ).data( 'opened', true );
	}

	function closeTOC( callback ) {

		updateNavigation( current === itemsCount - 1 );
		$container.removeClass( 'slideRight' ).data( 'opened', false );
		if( callback ) {
			if( supportTransitions ) {
				$container.on( transEndEventName, function() {
					$( this ).off( transEndEventName );
					callback.call();
				} );
			}
			else {
				callback.call();
			}
		}

	}

	return { init : init };

})();