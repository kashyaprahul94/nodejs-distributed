const Faker = require( "faker" );

const NUM_RECORDS = 1;


class User {

	constructor( firstName, lastName, email, mobile, externalId ) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.mobile = mobile;
	}

	payload () {
		return {
			firstName: this.firstName,
			lastName: this.lastName,
			email: this.email,
			mobile: this.mobile
		}
	}	
}


module.exports = ( callback ) => {

	let result = [];

	for ( let i = 1; i <= NUM_RECORDS; i++ ) {

		setTimeout( () => {

			const firstName = Faker.name.firstName();
			const lastName = Faker.name.lastName();

			const email = Faker.internet.email();
			const mobile = Faker.phone.phoneNumberFormat( 1 );

			result.push( new User( firstName, lastName, email, mobile ).payload() );

			if ( result.length >= NUM_RECORDS ) {
				callback( result );
			}

		}, 0 );		
	}
}