
(function($) {

	window.wpmoly = window.wpmoly || {};

		wpmoly.init = function() {

			$( 'select.wpmoly.list' ).change(function() {
				if ( this.options[ this.selectedIndex ].value.length > 0 )
					location.href = this.options[ this.selectedIndex ].value;
			});

			if ( undefined != $( '#wpmoly-movie-grid.grid > .movie' ) )
				wpmoly.grid_resize();

			$( "#wpmoly-grid-form" ).on( 'submit', function(e) {
				e.preventDefault();
				wpmoly.grid_edit();
			});

			$( "#wpmoly-grid-rows, #wpmoly-grid-columns" ).on( 'change', function() {
				wpmoly.grid_edit();
			});

			$( '.hide-if-js' ).hide();
			$( '.hide-if-no-js' ).removeClass( 'hide-if-no-js' );
		};

		wpmoly.headbox = wpmoly_headbox = {};

			wpmoly.headbox.toggle = function( item, post_id ) {

				var $tab = $( '#movie-headbox-' + item + '-' + post_id ),
				$parent = $( '#movie-headbox-' + post_id ),
				$tabs = $parent.find( '.wpmoly.headbox.movie.content > .content' ),
				$link = $( '#movie-headbox-' + item + '-link-' + post_id );

				if ( undefined != $tab ) {
					$tabs.hide();
					$tab.show();
					$parent.find( 'a.active' ).removeClass( 'active' );
					$link.addClass( 'active' );
				}
			};

		wpmoly.grid_resize = function() {

			var $movies = $( '#wpmoly-movie-grid.grid > .movie' )
			 max_height = 0,
			  max_width = 0;

			$.each( $movies, function() {
				var $img = $( this ).find( 'img.wpmoly.grid.movie.poster' ),
				   width = $img.width(),
				  height = $img.height();

				if ( height > max_height )
					max_height = height;
				if ( width > max_width )
					max_width = width;

			});

			$movies.css({
				height: Math.round( max_width * 1.33 ),
				width: max_width
			});
		};

		wpmoly.grid_edit = function() {

			var rows = $( "#wpmoly-grid-rows" ).val(),
			 columns = $( "#wpmoly-grid-columns" ).val(),
			 columns = parseInt( columns ),
			    rows = parseInt( rows ),
			     url = document.location.href,
			  search = document.location.search;

			if ( '' != search ) {
				if ( ( new RegExp(/\/[0-9]{1,}\:[0-9]{1,}/i) ).test( search ) ) {
					search = search.replace(/columns=[0-9]{1,}/i, 'columns=' + columns );
					search = search.replace(/rows=[0-9]{1,}/i, 'rows=' + rows );
				}
				else {
					search += 'columns=' + columns + '&rows=' + rows;
				}
				document.location.search = search;
			}
			else if ( ( new RegExp(/\/[0-9]{1,}\:[0-9]{1,}/i) ).test( url ) ) {
				url = url.replace(/\/[0-9]{1,}\:[0-9]{1,}/i, '/' + columns + ':' + rows );
				document.location.href = url;
			}
			else {
				if ( -1 === url.indexOf( wpmoly.lang.grid ) )
					url = wpmoly.lang.grid + '/' + columns + ':' + rows + '/';
				else
					url = columns + ':' + rows + '/';
				document.location.href = url;
			}
		};

		wpmoly.init();
	
})(jQuery);