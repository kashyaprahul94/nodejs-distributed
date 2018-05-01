const Cluster = require( "cluster" );

module.exports = callback => {

    if ( Cluster.isMaster ) {

        const numWorkers = require( "os" ).cpus().length;

        for ( let i = 1; i <= numWorkers; i++ ) {
            
            setTimeout( () => {

                const worker = Cluster.fork();

                worker.on( "message", callback );

                worker.send({
                    type: "GENERATE_DATA",
                    from: 'master',
                    data: {
                        
                    }
                });

            }, 0 );
        }

        Cluster.on( "online", worker => {
            
        });

        Cluster.on( "exit", ( worker, code, signal ) => {

        });
    } 

    if ( Cluster.isWorker ) {

        const Generator = require( "./generator" );

        process.on( "message", msg => {  
            Generator( data => {
                process.send( data );
                process.exit( 0 );
            })
        });
    }
}