<!DOCTYPE html>
<html>
    <head>
        <title>Casa Bombillo</title>

        
    </head>
    <body>
        <script src="https://cdn.auth0.com/js/lock/10.0/lock.min.js"></script>
        <script type="text/javascript">
          var lock = new Auth0Lock('OhgmXRdIZ5KaJah0hQsFa5AEYrjbsx85', 'ruizoft.auth0.com', {
            auth: {
              redirectUrl: 'http://localhost/auth0/main',
              responseType: 'code',

              params: {
                scope: 'openid email' // Learn about scopes: https://auth0.com/docs/scopes
              }
            },
            allowSignUp: false,
            allowedConnections: ['Username-Password-Authentication'],
            theme: {
                logo: 'http://res.cloudinary.com/ruizoft/image/upload/v1470964863/bulb_tf2iyp.jpg',
                primaryColor: 'green'
              },
              language: 'es'
          });
        </script>
        <button onclick="lock.show();">Login</button>
    </body>
</html>
