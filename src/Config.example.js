'use strict';

const DEBUG = true;

const Constants = {
    DEBUG,
    versionCode: 1,
    URL: {
        root: 'http://woocommerce-domain.com',
        base: DEBUG? 'http://localhost:9200/':'http://woocommerce-domain.com',
    },
    Keys: {
        ConsumerKey: 'ck_blahblahblah',
	    ConsumerSecret: 'cs_blahblahblah'
    },
    Paystack: {
        TestPublicKey: 'pk_test_blahblah',
        LivePublicKey: 'pk_live_blahblah',
    },
    App: {
        name: "Czar",
        slogan: "Ain't Life just Fun!",
        title: "Czar Stores : Know what you want",
        logo: null,
    }
}

module.exports = Constants;