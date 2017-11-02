openssl genrsa -des3 -passout pass:5243metallica44!$ -out server.pass.key 2048
openssl rsa -passin pass:5243metallica44!$ -in server.pass.key -out server.key
openssl req -new -key server.key -out server.csr
openssl x509 -req -sha256 -days 365 -in server.csr -signkey server.key -out server.crt -extfile v3.ext