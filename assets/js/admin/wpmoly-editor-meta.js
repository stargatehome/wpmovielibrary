
wpmoly = wpmoly || {};

	wpmoly.editor = {};

		/**
		 * Init Events
		 */
		wpmoly.editor.init = function() {

			redux.field_objects.select.init();

			$( '.add-new-h2' ).on( 'click', function() {
				document.location.href = this.href;
			});

			if ( window.innerWidth < 1180 )
				wpmoly_meta_panel.resize();

			var data = {}
			$.each( $( '.meta-data-field' ), function() {

				var name = this.name.replace(/meta\[(.*)\]/g, '$1');
				data[ name ] = this.value;
			});

			wpmoly.editor.meta = new WpmolyMeta( data ),
			wpmoly.editor.search = new WpmolySearch(),
			wpmoly.editor.meta_view = new WpmolyMetaView( { model: wpmoly.editor.meta } ),
			wpmoly.editor.search_view = new WpmolySearchView( { model: wpmoly.editor.search } );
		};

			WpmolySearch = Backbone.Model.extend({

				defaults: {
					lang: $( '#wpmoly-search-lang' ).val(),
					query: '',
					options: {
						actor_limit: $( '#wpmoly-actor-limit' ).val(),
						poster_featured: $( '#wpmoly-poster-featured' ).val()
					}
				},

				initialize: function() {

					this.bind( 'change', this.attributesChanged );
				},
 
				attributesChanged: function() {
					console.log( this.attributes );
				} 
			});

				WpmolySearchView = Backbone.View.extend({

					el: '#wpmoly-movie-meta-search',

					initialize: function () {
						this.template = _.template( $( '#wpmoly-movie-meta-search' ).html() );
						this.render(); 
					},

					render: function () {
						this.$el.html( this.template() );
						return this;
					},

					events: {
						"click #wpmoly-search": "search",
						"click #wpmoly-update": "update",
						"click #wpmoly-empty": "empty",
						"change #wpmoly-search-query": "set"
					},

					set: function( event ) {
						this.model.set( { query: event.currentTarget.value } );
					},

					search: function( event ) {
						event.preventDefault();
						console.log( 'search', event.currentTarget );
					},

					update: function( event ) {
						event.preventDefault();
						console.log( 'update', event.currentTarget );
					},

					empty: function( event ) {
						event.preventDefault();
						console.log( 'empty', event.currentTarget );
					}
				});

			WpmolyMeta = Backbone.Model.extend({

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

				initialize: function() {}
			});

			WpmolyMetaView = Backbone.View.extend({

				el: '#wpmoly-movie-meta',

				initialize: function () {
					this.template = _.template( $( '#wpmoly-movie-meta' ).html() );
					this.render(); 
				},

				render: function () {
					this.$el.html( this.template() );
					return this;
				},

				events: {
					"change .meta-data-field": "update"
				},

				update: function( event ) {
					console.log( event.currentTarget );
				}
			});

			

		wpmoly.editor.panel = wpmoly_meta_panel = {};

			/**
			 * Navigate between Metabox Panels
			 *
			 * @since 2.0
			 *
			 * @param string panel slug
			 */
			wpmoly.editor.panel.navigate = function( panel ) {

				// nasty Arthemia theme fix
				if ( undefined == $ ) $ = jQuery;

				var $panels = $( '.panel' ),
				     $panel = $( '#wpmoly-metabox-' + panel + '-panel' ),
				      $tabs = $( '.tab' ),
				       $tab = $( '#wpmoly-metabox-' + panel );

				if ( undefined == $panel || undefined == $tab )
					return false;

				$panels.removeClass( 'active' );
				$tabs.removeClass( 'active' );
				$panel.addClass( 'active' );
				$tab.addClass( 'active' );
			};

			/**
			 * Resize Metabox Panel
			 *
			 * @since 2.0
			 */
			wpmoly.editor.panel.resize = function() {
				$( '#wpmoly-metabox' ).toggleClass( 'small' );
			};

	wpmoly.editor.init();