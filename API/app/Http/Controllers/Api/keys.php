<?php
require_once __DIR__ . './../../../../vendor/autoload.php';


Lyra\Client::setDefaultUsername("42067562");
Lyra\Client::setDefaultPassword("testpassword_uQEqlBajHnI1dC8fhbovh2AHKtKUc31waFBS71qYN71mr");
Lyra\Client::setDefaultEndpoint("https://api.micuentaweb.pe");

/* publicKey and used by the javascript client */
Lyra\Client::setDefaultPublicKey("42067562:testpublickey_N8WwFbjlIkO5qqhNW6x36FoLIpnrUZt4mk0gjQOt3dxrY");

/* Javascript content delivery server */
Lyra\Client::setDefaultClientEndpoint("https://api.micuentaweb.pe");

/* SHA256 key */
Lyra\Client::setDefaultSHA256Key("FRNCuJzja1m7orxTKXEszyTFV1jn9lgpQLxgahcPfigzg");