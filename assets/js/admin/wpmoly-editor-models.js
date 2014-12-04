
window.wpmoly = window.wpmoly || {};

(function($){

	editor = wpmoly.editor = function() {

		redux.field_objects.select.init();

		$( '.add-new-h2' ).on( 'click', function() {
			document.location.href = this.href;
		});

		var data = {}
		$.each( $( '.meta-data-field' ), function() {
			var name = this.name.replace(/meta\[(.*)\]/g, '$1');
			data[ name ] = this.value;
		});

		editor.panel = new editor.model.Panel();
		editor.movie = new editor.model.Movie( data );
		editor.search = new editor.model.Search();
		editor.results = new editor.model.Results();
	};

	_.extend( editor, { model: {}, view: {}, controller: {}, frames: {} } );

	Search = editor.model.Search = Backbone.Model.extend({

		defaults: {
			lang: $( '#wpmoly-search-lang' ).val(),
			type: $( '#wpmoly-search-type' ).val(),
			query: '',
			options: {
				actor_limit: $( '#wpmoly-actor-limit' ).val(),
				poster_featured: $( '#wpmoly-poster-featured' ).val()
			}
		},

		initialize: function() {}
	});

	Movie = editor.model.Movie = Backbone.Model.extend({

		defaults: {
			tmdb_id: '',
			title: '',
			original_title: '',
			tagline: '',
			overview: '',
			release_date: '',
			local_release_date: '',
			runtime: '',
			production_companies: '',
			production_countries: '',
			spoken_languages: '',
			genres: '',
			director: '',
			producer: '',
			cast: '',
			photography: '',
			composer: '',
			author: '',
			writer: '',
			certification: '',
			budget: '',
			revenue: '',
			imdb_id: '',
			adult: '',
			homepage: ''
		},

		initialize: function() {},

		sync: function( model, options ) {

			options = options || {};
			options.context = this;
			options.data = _.extend( options.data || {}, {
				action: 'wpmoly_search_movie',
				nonce: wpmoly.get_nonce( 'search-movies' ),
				lang: editor.search.attributes.lang
			});

			options.success = function( response ) {

				_.each( response.meta, function( meta ) {

					
				} );
			};

			return wp.ajax.send( options );
		},

		_set: function( data ) {

			var meta = _.extend( this.defaults, data.meta );
			editor.movie.set( meta );
		}
	});

	Result = editor.model.Result = Backbone.Model.extend({

		defaults: {
			id: '',
			poster: '',
			title: '',
			original_title: '',
			year: '',
			release_date: '',
			adult: ''
		},

		initialize: function() {}

	});

	Results = editor.model.Results = Backbone.Collection.extend({

		model: Result,

		initialize: function() {

			//this.bind( 'add', this.changed );
		},

		changed: function() {
			console.log( '!' );
		},

		sync: function( model, options ) {

			options = options || {};
			options.context = this;
			options.data = _.extend( options.data || {}, {
				action: 'wpmoly_search_movie',
				nonce: wpmoly.get_nonce( 'search-movies' ),
				type: editor.search.attributes.type,
				data: editor.search.attributes.query,
				lang: editor.search.attributes.lang
			});

			options.success = function( response ) {

				if ( undefined != response.meta ) {
					editor.movie._set( response );
					return true;
				}

				_.each( response, function( result ) {

					var result = new Result( result );
					editor.results.add( result );
				} );
			};

			return wp.ajax.send( options );
		}
	});

	Panel = editor.model.Panel = Backbone.Model.extend({});

	wpmoly.editor();

})(jQuery);
