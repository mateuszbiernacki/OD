conn = new Mongo();
db = conn.getDB("eVotingPP");

db.createUser(
  {
    user: "admin",
    pwd:  "password",
    roles: [ { role: "readWrite", db: "eVotingPP" } ]
  }
)

db.user.insert(
    { "imię": "Jan", "nazwisko": "Kowalski", "e-mail":"jan.kowalski@partiaa.pl", "grupy" : [ "poseł", "Partia A" ] }
    );
db.user.insert(
    { "imię": "Jarosław", "nazwisko": "Ka", "e-mail":"jaroslaw.ka@superpartia.pl", "grupy": [ "master", "poseł", "Super Partia" ] }
    );
db.user.insert(
    { "imię": "Adrian", "nazwisko": "Duda", "e-mail":"adrian.duda@superpartia.pl", "grupy" : [ "długopis", "Super Partia" ] }
    );

db.authentication.insert(
    { "e-mail":"jan.kowalski@partiaa.pl", "kod_otp": "NJQW4LTLN53WC3DTNNUUA4DBOJ2GSYLBFZYGY==="}
);
db.authentication.insert(
    { "e-mail":"jaroslaw.ka@superpartia.pl", "kod_otp": "NJQXE33TNRQXOLTLMFAHG5LQMVZHAYLSORUWCLTQNQ======"}
);
db.authentication.insert(
    { "e-mail":"adrian.duda@superpartia.pl", "kod_otp": "MFSHE2LBNYXGI5LEMFAHG5LQMVZHAYLSORUWCLTQNQ======"}
);

db.admin.insert(
    { "e-mail":"nowaka34@poznan.pl", "hasło":"e9a75486736a550af4fea861e2378305c4a555a05094dee1dca2f68afea49cc3a50e8de6ea131ea521311f4d6fb054a146e8282f8e35ff2e6368c1a62e909716", "kod_otp": "NJQW4LTLN53WC3DTNNAHS324DBOAHS23KJ2GSYLBFZYGY==="}
);
db.admin.insert(
    { "e-mail":"golebiewski1234@put.poznan.pl", "hasło":"c941f1f4addf37cc51b80776cd15fd4f5e43f761d2bbebc056d04eeb9594dc60eada0e3766e95070113ef425bfd91cd848f46f8f777c269e4b4985057e91a5af", "kod_otp": "MSJ36SD3WC3DTNNAHS324DBOAHSSJ223KJ2GSYLBFZYGY==="}
);

db.vote.insert(
    { "nr_głosowania":"2021/1", "pytanie":"Zajęcia zdalne", "kworum":20, "początek":ISODate("2021-12-02T09:05:00.000Z"), "koniec":ISODate("2021-12-02T11:05:00.000Z"),
"uprawnieni": [
    { "id":"1c88ef55801f80e116dd19ebf65ad8da137cf991e3eae10e50bc25532f5fc7facbe8c888cba65930cba55f6566b845b4ce2a4eb2109164a82302ec9ea1fb150e", "głosował":true},
    { "id":"60ad9c31ad5fe93ec4a8ef2e3c77b8ccdb9303e56c2737b318618ec2db000f20657579c8d879efd970b313e1100c1cf6f3954418ee6328f47ce4475fcca88dd9", "głosował":true},
    { "id":"76eaa5b5fe16747a96d2486f72ec049f1fa6d63b1efd01a04c8b1f02e986205b5c9ab24650841e930d87b7d3dbc6ee6b38aac4e6170793d20c9f32d0b5c71e3b", "głosował":false},
    { "id":"64e3e442bae6c22afd15f734c2e4ce51d5018b6a6c165867b1757b4932fae4f9fb0d3f1610a0b950098a57102cb2c8f74536355885f13fb315f13f6f283efcb8", "głosował":false},
    { "id":"80958988ca75b928096e328007b986339e5eb08c069d664f582d5cc4076c1f2c3c7bd046a8e6c09602b669a9ae367f4a21b3510387df32a85cb37425d95ad040", "głosował":true},
    { "id":"e2f2937803d19df3e715b8af9cbc29300510a30896660dafc6e28e3466644d7b8c7850adabed5feed183581d3c4c37129b08aceba5ce290d3ab7d3695e920812", "głosował":true},
    { "id":"66f7a5b64375b13d62b95bb7a96e714d85aed33e94aea012204b3f20cf431acc64d6d02a906bf45aacbdf1d2272f82be95c7c5f18071fa3fed3294b4ccbf6bed", "głosował":true},
    { "id":"eb21f7d7e1b45e1356b86f381301c7e259825de9d6e899d3d96278c6e72767c7f754b1b70900268312ce12dccee0eb791e11e0d75f0a72f7292ebcdcb96cc260", "głosował":true},
    { "id":"71a83daeaac40ca0b018d08e34b6e57c0fc48124df89492b06344b12eff9aa4aef746f0a95b8a2de9eb6337e46b14dbe3c799f038143838a3a96a542f34a6710", "głosował":false},
    { "id":"f0651b61ba68186e12735dea2cc822a70851d04a1a6a6c00e4581b722318ac59853455724fb7480baa111d1b8e6e4930fcaf562f8f8c5ba8afe269038aa4ec81", "głosował":true},
    { "id":"fde7b9a2e053e09e658b9a65779953bde8f2ce72e51050e7d26a54cccf5e2a5c2aaa68ba13bcca7c955fce22ba967417aa44c7d6918b360a16379ceadbceecbb", "głosował":false},
    { "id":"508d0c5ee0a610538c479ecc60828638cbe4ea552d5bc7e1975dae1aad65f2ccceef3eed57024148b90cf183921014bb9d2eba0704db139e369e305eee1ea797", "głosował":true},
    { "id":"8cc7dd0e41feefd9f9ce5e5e9958ecffdb0d8e42d1e5b301f368f60412e4b87a1bb411a5ead4bc73e32feb658d64e6bf039ef1d0be84657ebac8dc4bbcf92b58", "głosował":true},
    { "id":"f89782bf08bf570346ef903d3ab13004415659e4f2d4112c7ef098107361afe8dfe8e61c9d2610854d67f4bab0a376e93aa728b313774bcb603b9cb288897960", "głosował":true},
    { "id":"9ece7415328a7c9d28b769fbf67e3e5633d61363dae02ee5112f350c150572174e0799bdeef82f391baaa7ccdc4ad78b3b4c7d8a1480fccf7a217fbfa3d08215", "głosował":false},
    { "id":"51f531aa488a8fa94c79b1f22f09d5eb99be959be48a9c04cc9635cb27cb083d2de3fa9251ba8ca0b1599d5e601f68c3f6382ac4e527b5ed5bfd9efbd4f6fc98", "głosował":true},
    { "id":"a165ecda3f331e61e50de7f0a64497396b369105832454d978ae5097cfaa4a8d2dfbe42402af89f25502817047c188b160b12de7c12811c700ffdaa0262b461f", "głosował":true},
    { "id":"1cb1c522c0fc6dbcdbea7fff7b950c98246c98bcca8c239215b4410fbb03ca06d7a4fda34f24297e6549fc2ffb052a4b1697e30afbec1b07b3306f1a489bcdb0", "głosował":true},
    { "id":"dcee4573d0485e016ee6925749f01b9ed0b9bfe82043a7a4caeef9dba664b6742006eb04e27cb50167b52d08a11bcdbda247da3633f3eaf7a47ea289b13d5399", "głosował":false},
    { "id":"284a19a22069e394669e1918c9dfed4d9ceaa222b7edcec3404bcac319fd5dd1041651ecf53b3d56cc458d8a8f3a231fc28773fce22ac15ca576c208efe8a684", "głosował":true},
    { "id":"f905f23a075cdd9ab58e815b9fc272a49a5d423adae130bb6505dbf383cb857cb21c2d41821c3dc4c6f0eadc5325a7a3ac64cf76b358da77a6252a6188d5cac8", "głosował":false},
    { "id":"52b7832501f1fe4ae81d6599c3094068bc196356db3bed10e0377db80b6b5923bf96f823f4b6dfe7286897eef4682a6feacd2823e310ee77ab8c3c74163fc4c0", "głosował":false},
    { "id":"62983412f6c6d7b58d7c2041eedfe6775373b3b1840fbf584ad270564ed99aacca569e90df0635724f39f987147c88bcb013c0bd4e84c9598ff8c77366937b89", "głosował":false},
    { "id":"29f6ed626beb537502d8ccbc0d3c51479d0c4dfb4636641fb28b709be6867196db9baf57ed25c787f9dd322c7dd2931b0871ca8b90ac8b4f56fc277d3d2e68a2", "głosował":false}
],
"wyniki": [
    { "wybór":"Za", "głosów":"10"},
    { "wybór":"Przeciw", "głosów":"4"}
]
});

db.vote.insert(
    { "nr_głosowania":"2021/2", "pytanie":"Sesja zdalna", "kworum":"20", "początek":ISODate("2021-12-02T12:05:00.000Z"), "koniec":ISODate("2021-12-02T14:05:00.000Z"), 
"uprawnieni": [
    { "id":"1c88ef55801f80e116dd19ebf65ad8da137cf991e3eae10e50bc25532f5fc7facbe8c888cba65930cba55f6566b845b4ce2a4eb2109164a82302ec9ea1fb150e", "głosował":true, "wybór":"przeciw"},
    { "id":"60ad9c31ad5fe93ec4a8ef2e3c77b8ccdb9303e56c2737b318618ec2db000f20657579c8d879efd970b313e1100c1cf6f3954418ee6328f47ce4475fcca88dd9", "głosował":true, "wybór":"za"},
    { "id":"76eaa5b5fe16747a96d2486f72ec049f1fa6d63b1efd01a04c8b1f02e986205b5c9ab24650841e930d87b7d3dbc6ee6b38aac4e6170793d20c9f32d0b5c71e3b", "głosował":false, "wybór":""},
    { "id":"64e3e442bae6c22afd15f734c2e4ce51d5018b6a6c165867b1757b4932fae4f9fb0d3f1610a0b950098a57102cb2c8f74536355885f13fb315f13f6f283efcb8", "głosował":false, "wybór":""},
    { "id":"80958988ca75b928096e328007b986339e5eb08c069d664f582d5cc4076c1f2c3c7bd046a8e6c09602b669a9ae367f4a21b3510387df32a85cb37425d95ad040", "głosował":true, "wybór":"za"},
    { "id":"e2f2937803d19df3e715b8af9cbc29300510a30896660dafc6e28e3466644d7b8c7850adabed5feed183581d3c4c37129b08aceba5ce290d3ab7d3695e920812", "głosował":true, "wybór":"za"},
    { "id":"66f7a5b64375b13d62b95bb7a96e714d85aed33e94aea012204b3f20cf431acc64d6d02a906bf45aacbdf1d2272f82be95c7c5f18071fa3fed3294b4ccbf6bed", "głosował":true, "wybór":"za"},
    { "id":"eb21f7d7e1b45e1356b86f381301c7e259825de9d6e899d3d96278c6e72767c7f754b1b70900268312ce12dccee0eb791e11e0d75f0a72f7292ebcdcb96cc260", "głosował":true, "wybór":"za"},
    { "id":"71a83daeaac40ca0b018d08e34b6e57c0fc48124df89492b06344b12eff9aa4aef746f0a95b8a2de9eb6337e46b14dbe3c799f038143838a3a96a542f34a6710", "głosował":false, "wybór":""},
    { "id":"f0651b61ba68186e12735dea2cc822a70851d04a1a6a6c00e4581b722318ac59853455724fb7480baa111d1b8e6e4930fcaf562f8f8c5ba8afe269038aa4ec81", "głosował":true, "wybór":"przeciw"},
    { "id":"fde7b9a2e053e09e658b9a65779953bde8f2ce72e51050e7d26a54cccf5e2a5c2aaa68ba13bcca7c955fce22ba967417aa44c7d6918b360a16379ceadbceecbb", "głosował":false, "wybór":""},
    { "id":"508d0c5ee0a610538c479ecc60828638cbe4ea552d5bc7e1975dae1aad65f2ccceef3eed57024148b90cf183921014bb9d2eba0704db139e369e305eee1ea797", "głosował":true, "wybór":"za"},
    { "id":"8cc7dd0e41feefd9f9ce5e5e9958ecffdb0d8e42d1e5b301f368f60412e4b87a1bb411a5ead4bc73e32feb658d64e6bf039ef1d0be84657ebac8dc4bbcf92b58", "głosował":true, "wybór":"wstrzymało_się"},
    { "id":"f89782bf08bf570346ef903d3ab13004415659e4f2d4112c7ef098107361afe8dfe8e61c9d2610854d67f4bab0a376e93aa728b313774bcb603b9cb288897960", "głosował":true, "wybór":"za"},
    { "id":"9ece7415328a7c9d28b769fbf67e3e5633d61363dae02ee5112f350c150572174e0799bdeef82f391baaa7ccdc4ad78b3b4c7d8a1480fccf7a217fbfa3d08215", "głosował":true, "wybór":"za"},
    { "id":"51f531aa488a8fa94c79b1f22f09d5eb99be959be48a9c04cc9635cb27cb083d2de3fa9251ba8ca0b1599d5e601f68c3f6382ac4e527b5ed5bfd9efbd4f6fc98", "głosował":true, "wybór":"za"},
    { "id":"a165ecda3f331e61e50de7f0a64497396b369105832454d978ae5097cfaa4a8d2dfbe42402af89f25502817047c188b160b12de7c12811c700ffdaa0262b461f", "głosował":true, "wybór":"wstrzymało_się"},
    { "id":"1cb1c522c0fc6dbcdbea7fff7b950c98246c98bcca8c239215b4410fbb03ca06d7a4fda34f24297e6549fc2ffb052a4b1697e30afbec1b07b3306f1a489bcdb0", "głosował":true, "wybór":"przeciw"},
    { "id":"dcee4573d0485e016ee6925749f01b9ed0b9bfe82043a7a4caeef9dba664b6742006eb04e27cb50167b52d08a11bcdbda247da3633f3eaf7a47ea289b13d5399", "głosował":true, "wybór":"przeciw"},
    { "id":"284a19a22069e394669e1918c9dfed4d9ceaa222b7edcec3404bcac319fd5dd1041651ecf53b3d56cc458d8a8f3a231fc28773fce22ac15ca576c208efe8a684", "głosował":true, "wybór":"za"},
    { "id":"f905f23a075cdd9ab58e815b9fc272a49a5d423adae130bb6505dbf383cb857cb21c2d41821c3dc4c6f0eadc5325a7a3ac64cf76b358da77a6252a6188d5cac8", "głosował":false, "wybór":""},
    { "id":"52b7832501f1fe4ae81d6599c3094068bc196356db3bed10e0377db80b6b5923bf96f823f4b6dfe7286897eef4682a6feacd2823e310ee77ab8c3c74163fc4c0", "głosował":false, "wybór":""},
    { "id":"62983412f6c6d7b58d7c2041eedfe6775373b3b1840fbf584ad270564ed99aacca569e90df0635724f39f987147c88bcb013c0bd4e84c9598ff8c77366937b89", "głosował":false, "wybór":""},
    { "id":"29f6ed626beb537502d8ccbc0d3c51479d0c4dfb4636641fb28b709be6867196db9baf57ed25c787f9dd322c7dd2931b0871ca8b90ac8b4f56fc277d3d2e68a2", "głosował":false, "wybór":""}
],
"wyniki": [
    { "wybór":"Za", "głosów":"10"},
    { "wybór":"Przeciw", "głosów":"4"},
    { "wybór":"Wstrzymało się", "głosów":"2"}
]
});