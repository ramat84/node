const express = require( 'express' );
const app = express();

app.use( express.json() );

const port = process.env.PORT || 3000;
const users = [ 
    { id: 1, name: 'danny', age: 18 },
    { id: 2, name: 'Dobby', age: 32 } 
];

const NOT_FOUND = 404;
const BAD_REQUEST = 400;

app.get( '/', ( req, resp ) => {
  resp.send( "Hello World" );  
} );


app.get( '/api/users', (req, resp) => {
    resp.send( users );
} ); 

app.get( '/api/users/:id', ( req, resp ) => {
    const user = users.find( user => user.id === parseInt( req.params.id ) ); 
    if( !user ) resp.status( NOT_FOUND ).send( 'User not found' );
    resp.send( user );
} );

app.post( '/api/users', (req, resp) => {
    if( !req.body.name || req.body.length < 3 )
        resp.status( BAD_REQUEST ).send( 'Name should contain at least 3 characters' );

    if( !req.body.age || isNaN( parseInt( req.body.age ) ) )
        resp.status( BAD_REQUEST ).send( 'Age should be a number' );

    const user = {
        id: users[ users.length -1 ].id + 1,
        name: req.body.name,
        age: req.body.age
    };

    resp.send( user );
} );

app.get( '/api/users/:fromAge/:toAge', (req, resp) => {
    resp.send( `From age ${req.params.fromAge} to ${req.params.toAge}` );
} );

app.listen( port, () => {
    console.log( `Listening on port ${port}` );
} );
