var mediaUploaderDemo = mediaUploaderDemo || {};

( function( $ ) {
	mediaUploaderDemo = {
		frame: function() {
			if ( this._frame )
				return this._frame;

			this._frame = wp.media( {
				title: 'Select Your Images',
				button: {
					text: 'Choose'
				},
				multiple: true,
				library: {
					type: 'image'
				}
			} );

			this._frame.on( 'ready', this.ready );

			this._frame.state( 'library' ).on( 'select', this.select );

			return this._frame;
		},

		ready: function() {
			$( '.media-modal' ).addClass( 'no-sidebar smaller' );
		},

		select: function() {
			var settings = wp.media.view.settings,
				selection = this.get( 'selection' );

			$( '.added' ).remove();
			selection.map( mediaUploaderDemo.showAttachmentDetails );
		},

		showAttachmentDetails: function( attachment ) {
			var details_tmpl = $( '#attachment-details-tmpl' ),
				details = details_tmpl.clone();

			details.addClass( 'added' );

			$( 'input', details ).each( function() {
				var key = $( this ).attr( 'id' ).replace( 'attachment-', '' );
				$( this ).val( attachment.get( key ) );
			} );

			details.attr( 'id', 'attachment-details-' + attachment.get( 'id' ) );

			var sizes = attachment.get( 'sizes' );
			$( 'img', details ).attr( 'src', sizes.thumbnail.url );

			$( 'textarea', details ).val( JSON.stringify( attachment, null, 2 ) );

			details_tmpl.after( details );
		},

		init: function() {
			$( '#open-media-modal' ).on( 'click', function( e ) {
				e.preventDefault();

				mediaUploaderDemo.frame().open();
			});
		}
	};

	$( mediaUploaderDemo.init );
} )( jQuery );
