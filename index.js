const dataGenerator = require( "./worker" );

dataGenerator( data => {
	console.info( JSON.stringify( data ) );
});