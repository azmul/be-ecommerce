import { Request, Response} from "express";
import mongodb from "mongodb";
import { IGetUserAuthInfoRequest } from "../defination/apiDefination";
import Product from "../models/product";
import { log } from "../logger/logging";
import { numericCode } from 'numeric-code'
import API  from "../constant/apiContant"

const ObjectId: any = mongodb.ObjectId;

const productsData = [
    {
        "id": "1",
        "sku": "asdf123",
        "name": "Lorem ipsum jacket",
        "price": 12.45,
        "discount": 10,
        "offerEnd": "October 5, 2020 12:11:00",
        "new": false,
        "rating": 4,
        "saleCount": 54,
        "category": [
            "fashion",
            "men"
        ],
        "tag": [
            "fashion",
            "men",
            "jacket",
            "full sleeve"
        ],
        "variation": [
            {
                "color": "white",
                "image": "/assets/img/product/fashion/1.jpg",
                "size": [
                    {
                        "name": "x",
                        "stock": 3
                    },
                    {
                        "name": "m",
                        "stock": 2
                    },
                    {
                        "name": "xl",
                        "stock": 5
                    }
                ]
            },
            {
                "color": "black",
                "image": "/assets/img/product/fashion/8.jpg",
                "size": [
                    {
                        "name": "x",
                        "stock": 4
                    },
                    {
                        "name": "m",
                        "stock": 7
                    },
                    {
                        "name": "xl",
                        "stock": 9
                    },
                    {
                        "name": "xxl",
                        "stock": 1
                    }
                ]
            },
            {
                "color": "brown",
                "image": "/assets/img/product/fashion/3.jpg",
                "size": [
                    {
                        "name": "x",
                        "stock": 1
                    },
                    {
                        "name": "m",
                        "stock": 2
                    },
                    {
                        "name": "xl",
                        "stock": 4
                    },
                    {
                        "name": "xxl",
                        "stock": 0
                    }
                ]
            }
        ],
        "image": [
            "/assets/img/product/fashion/1.jpg",
            "/assets/img/product/fashion/3.jpg",
            "/assets/img/product/fashion/6.jpg",
            "/assets/img/product/fashion/8.jpg",
            "/assets/img/product/fashion/9.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"
    },
    {
        "id": "2",
        "sku": "asdf124",
        "name": "Lorem ipsum coat",
        "price": 18.5,
        "discount": 15,
        "new": false,
        "rating": 3,
        "saleCount": 12,
        "category": [
            "fashion",
            "women"
        ],
        "tag": [
            "fashion",
            "women",
            "coat",
            "full sleeve"
        ],
        "variation": [
            {
                "color": "blue",
                "image": "/assets/img/product/fashion/2.jpg",
                "size": [
                    {
                        "name": "x",
                        "stock": 3
                    },
                    {
                        "name": "m",
                        "stock": 6
                    },
                    {
                        "name": "xl",
                        "stock": 7
                    }
                ]
            },
            {
                "color": "brown",
                "image": "/assets/img/product/fashion/4.jpg",
                "size": [
                    {
                        "name": "x",
                        "stock": 4
                    },
                    {
                        "name": "m",
                        "stock": 8
                    },
                    {
                        "name": "xl",
                        "stock": 3
                    },
                    {
                        "name": "xxl",
                        "stock": 7
                    }
                ]
            },
            {
                "color": "black",
                "image": "/assets/img/product/fashion/5.jpg",
                "size": [
                    {
                        "name": "x",
                        "stock": 3
                    },
                    {
                        "name": "m",
                        "stock": 7
                    },
                    {
                        "name": "xl",
                        "stock": 0
                    },
                    {
                        "name": "xxl",
                        "stock": 7
                    }
                ]
            }
        ],
        "image": [
            "/assets/img/product/fashion/2.jpg",
            "/assets/img/product/fashion/4.jpg",
            "/assets/img/product/fashion/5.jpg",
            "/assets/img/product/fashion/7.jpg",
            "/assets/img/product/fashion/9.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"
    },
    {
        "id": "3",
        "sku": "asdf125",
        "name": "Lorem ipsum jacket",
        "price": 17.45,
        "discount": 40,
        "offerEnd": "October 2, 2020 12:11:00",
        "new": true,
        "rating": 5,
        "saleCount": 36,
        "category": [
            "fashion",
            "men"
        ],
        "tag": [
            "fashion",
            "men",
            "jacket",
            "full sleeve"
        ],
        "variation": [
            {
                "color": "white",
                "image": "/assets/img/product/fashion/1.jpg",
                "size": [
                    {
                        "name": "x",
                        "stock": 3
                    },
                    {
                        "name": "m",
                        "stock": 2
                    },
                    {
                        "name": "xl",
                        "stock": 5
                    }
                ]
            },
            {
                "color": "black",
                "image": "/assets/img/product/fashion/8.jpg",
                "size": [
                    {
                        "name": "x",
                        "stock": 4
                    },
                    {
                        "name": "m",
                        "stock": 7
                    },
                    {
                        "name": "xl",
                        "stock": 9
                    },
                    {
                        "name": "xxl",
                        "stock": 1
                    }
                ]
            },
            {
                "color": "brown",
                "image": "/assets/img/product/fashion/3.jpg",
                "size": [
                    {
                        "name": "x",
                        "stock": 1
                    },
                    {
                        "name": "m",
                        "stock": 2
                    },
                    {
                        "name": "xl",
                        "stock": 4
                    },
                    {
                        "name": "xxl",
                        "stock": 0
                    }
                ]
            }
        ],
        "image": [
            "/assets/img/product/fashion/3.jpg",
            "/assets/img/product/fashion/1.jpg",
            "/assets/img/product/fashion/6.jpg",
            "/assets/img/product/fashion/8.jpg",
            "/assets/img/product/fashion/9.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"
    },
    {
        "id": "4",
        "sku": "asdf126",
        "name": "Lorem ipsum fashion coat",
        "price": 15.5,
        "discount": 0,
        "new": true,
        "rating": 4,
        "saleCount": 20,
        "category": [
            "fashion",
            "women"
        ],
        "tag": [
            "fashion",
            "women",
            "coat",
            "full sleeve"
        ],
        "variation": [
            {
                "color": "blue",
                "image": "/assets/img/product/fashion/2.jpg",
                "size": [
                    {
                        "name": "x",
                        "stock": 3
                    },
                    {
                        "name": "m",
                        "stock": 6
                    },
                    {
                        "name": "xl",
                        "stock": 7
                    }
                ]
            },
            {
                "color": "brown",
                "image": "/assets/img/product/fashion/4.jpg",
                "size": [
                    {
                        "name": "x",
                        "stock": 4
                    },
                    {
                        "name": "m",
                        "stock": 8
                    },
                    {
                        "name": "xl",
                        "stock": 3
                    },
                    {
                        "name": "xxl",
                        "stock": 7
                    }
                ]
            },
            {
                "color": "black",
                "image": "/assets/img/product/fashion/5.jpg",
                "size": [
                    {
                        "name": "x",
                        "stock": 3
                    },
                    {
                        "name": "m",
                        "stock": 7
                    },
                    {
                        "name": "xl",
                        "stock": 0
                    },
                    {
                        "name": "xxl",
                        "stock": 7
                    }
                ]
            }
        ],
        "image": [
            "/assets/img/product/fashion/4.jpg",
            "/assets/img/product/fashion/2.jpg",
            "/assets/img/product/fashion/5.jpg",
            "/assets/img/product/fashion/7.jpg",
            "/assets/img/product/fashion/9.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"
    },
    {
        "id": "5",
        "sku": "asdf127",
        "name": "Lorem ipsum female coat",
        "price": 25.5,
        "discount": 10,
        "new": true,
        "rating": 5,
        "saleCount": 25,
        "category": [
            "fashion",
            "women"
        ],
        "tag": [
            "fashion",
            "women",
            "coat",
            "full sleeve"
        ],
        "variation": [
            {
                "color": "blue",
                "image": "/assets/img/product/fashion/2.jpg",
                "size": [
                    {
                        "name": "x",
                        "stock": 3
                    },
                    {
                        "name": "m",
                        "stock": 6
                    },
                    {
                        "name": "xl",
                        "stock": 7
                    }
                ]
            },
            {
                "color": "brown",
                "image": "/assets/img/product/fashion/4.jpg",
                "size": [
                    {
                        "name": "x",
                        "stock": 4
                    },
                    {
                        "name": "m",
                        "stock": 8
                    },
                    {
                        "name": "xl",
                        "stock": 3
                    },
                    {
                        "name": "xxl",
                        "stock": 7
                    }
                ]
            },
            {
                "color": "black",
                "image": "/assets/img/product/fashion/5.jpg",
                "size": [
                    {
                        "name": "x",
                        "stock": 3
                    },
                    {
                        "name": "m",
                        "stock": 7
                    },
                    {
                        "name": "xl",
                        "stock": 0
                    },
                    {
                        "name": "xxl",
                        "stock": 7
                    }
                ]
            }
        ],
        "image": [
            "/assets/img/product/fashion/5.jpg",
            "/assets/img/product/fashion/2.jpg",
            "/assets/img/product/fashion/4.jpg",
            "/assets/img/product/fashion/7.jpg",
            "/assets/img/product/fashion/9.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"
    },
    {
        "id": "6",
        "sku": "asdf128",
        "name": "Lorem ipsum jacket",
        "price": 19.85,
        "discount": 0,
        "offerEnd": "October 17, 2020 12:11:00",
        "new": true,
        "rating": 5,
        "saleCount": 65,
        "category": [
            "fashion",
            "men"
        ],
        "tag": [
            "fashion",
            "men",
            "jacket",
            "full sleeve"
        ],
        "variation": [
            {
                "color": "white",
                "image": "/assets/img/product/fashion/1.jpg",
                "size": [
                    {
                        "name": "x",
                        "stock": 3
                    },
                    {
                        "name": "m",
                        "stock": 2
                    },
                    {
                        "name": "xl",
                        "stock": 5
                    }
                ]
            },
            {
                "color": "black",
                "image": "/assets/img/product/fashion/8.jpg",
                "size": [
                    {
                        "name": "x",
                        "stock": 4
                    },
                    {
                        "name": "m",
                        "stock": 7
                    },
                    {
                        "name": "xl",
                        "stock": 9
                    },
                    {
                        "name": "xxl",
                        "stock": 1
                    }
                ]
            },
            {
                "color": "brown",
                "image": "/assets/img/product/fashion/3.jpg",
                "size": [
                    {
                        "name": "x",
                        "stock": 1
                    },
                    {
                        "name": "m",
                        "stock": 2
                    },
                    {
                        "name": "xl",
                        "stock": 4
                    },
                    {
                        "name": "xxl",
                        "stock": 0
                    }
                ]
            }
        ],
        "image": [
            "/assets/img/product/fashion/6.jpg",
            "/assets/img/product/fashion/3.jpg",
            "/assets/img/product/fashion/1.jpg",
            "/assets/img/product/fashion/8.jpg",
            "/assets/img/product/fashion/9.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"
    },
    {
        "id": "7",
        "sku": "asdf129",
        "name": "Lorem ipsum fashion female coat",
        "price": 55.5,
        "discount": 40,
        "new": true,
        "rating": 5,
        "saleCount": 55,
        "category": [
            "fashion",
            "women"
        ],
        "tag": [
            "fashion",
            "women",
            "coat",
            "full sleeve"
        ],
        "variation": [
            {
                "color": "blue",
                "image": "/assets/img/product/fashion/2.jpg",
                "size": [
                    {
                        "name": "x",
                        "stock": 3
                    },
                    {
                        "name": "m",
                        "stock": 6
                    },
                    {
                        "name": "xl",
                        "stock": 7
                    }
                ]
            },
            {
                "color": "brown",
                "image": "/assets/img/product/fashion/4.jpg",
                "size": [
                    {
                        "name": "x",
                        "stock": 4
                    },
                    {
                        "name": "m",
                        "stock": 8
                    },
                    {
                        "name": "xl",
                        "stock": 3
                    },
                    {
                        "name": "xxl",
                        "stock": 7
                    }
                ]
            },
            {
                "color": "black",
                "image": "/assets/img/product/fashion/5.jpg",
                "size": [
                    {
                        "name": "x",
                        "stock": 3
                    },
                    {
                        "name": "m",
                        "stock": 7
                    },
                    {
                        "name": "xl",
                        "stock": 0
                    },
                    {
                        "name": "xxl",
                        "stock": 7
                    }
                ]
            }
        ],
        "image": [
            "/assets/img/product/fashion/7.jpg",
            "/assets/img/product/fashion/5.jpg",
            "/assets/img/product/fashion/2.jpg",
            "/assets/img/product/fashion/4.jpg",
            "/assets/img/product/fashion/9.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"
    },
    {
        "id": "8",
        "sku": "asdf130",
        "name": "Lorem ipsum fashion jacket",
        "price": 29.85,
        "discount": 10,
        "offerEnd": "October 18, 2020 12:11:00",
        "new": false,
        "rating": 5,
        "saleCount": 83,
        "category": [
            "fashion",
            "men"
        ],
        "tag": [
            "fashion",
            "men",
            "jacket",
            "full sleeve"
        ],
        "stock": 0,
        "image": [
            "/assets/img/product/fashion/8.jpg",
            "/assets/img/product/fashion/6.jpg",
            "/assets/img/product/fashion/3.jpg",
            "/assets/img/product/fashion/1.jpg",
            "/assets/img/product/fashion/9.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"
    },
    {
        "id": "9",
        "sku": "asdf131",
        "name": "Lorem ipsum fashion female top",
        "price": 35.6,
        "discount": 0,
        "new": false,
        "rating": 4,
        "saleCount": 95,
        "category": [
            "fashion",
            "women"
        ],
        "tag": [
            "fashion",
            "women",
            "top",
            "sleeveless"
        ],
        "stock": 5,
        "affiliateLink": "//www.amazon.com",
        "image": [
            "/assets/img/product/fashion/9.jpg",
            "/assets/img/product/fashion/7.jpg",
            "/assets/img/product/fashion/5.jpg",
            "/assets/img/product/fashion/2.jpg",
            "/assets/img/product/fashion/4.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
    },
    {
        "id": "10",
        "sku": "asdf132",
        "name": "Lorem ipsum blender",
        "price": 15.6,
        "discount": 0,
        "new": false,
        "rating": 4,
        "saleCount": 90,
        "category": [
            "electronics"
        ],
        "tag": [
            "electronics"
        ],
        "stock": 15,
        "image": [
            "/assets/img/product/electronics/1.jpg",
            "/assets/img/product/electronics/2.jpg",
            "/assets/img/product/electronics/3.jpg",
            "/assets/img/product/electronics/4.jpg",
            "/assets/img/product/electronics/5.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
    },
    {
        "id": "11",
        "sku": "asdf133",
        "name": "Lorem ipsum speaker",
        "price": 10.6,
        "discount": 10,
        "new": true,
        "rating": 5,
        "saleCount": 190,
        "category": [
            "electronics"
        ],
        "tag": [
            "electronics"
        ],
        "stock": 25,
        "image": [
            "/assets/img/product/electronics/2.jpg",
            "/assets/img/product/electronics/3.jpg",
            "/assets/img/product/electronics/4.jpg",
            "/assets/img/product/electronics/5.jpg",
            "/assets/img/product/electronics/6.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
    },
    {
        "id": "12",
        "sku": "asdf134",
        "name": "Lorem ipsum camera",
        "price": 12.5,
        "discount": 20,
        "new": true,
        "rating": 3,
        "saleCount": 90,
        "category": [
            "electronics"
        ],
        "tag": [
            "electronics"
        ],
        "stock": 20,
        "image": [
            "/assets/img/product/electronics/3.jpg",
            "/assets/img/product/electronics/4.jpg",
            "/assets/img/product/electronics/5.jpg",
            "/assets/img/product/electronics/6.jpg",
            "/assets/img/product/electronics/7.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
    },
    {
        "id": "13",
        "sku": "asdf135",
        "name": "Lorem ipsum monitor",
        "price": 14.5,
        "discount": 30,
        "new": false,
        "rating": 4,
        "saleCount": 100,
        "category": [
            "electronics"
        ],
        "tag": [
            "electronics"
        ],
        "stock": 40,
        "image": [
            "/assets/img/product/electronics/4.jpg",
            "/assets/img/product/electronics/5.jpg",
            "/assets/img/product/electronics/6.jpg",
            "/assets/img/product/electronics/7.jpg",
            "/assets/img/product/electronics/8.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
    },
    {
        "id": "14",
        "sku": "asdf136",
        "name": "Lorem ipsum small speaker",
        "price": 2.5,
        "discount": 10,
        "new": true,
        "rating": 5,
        "saleCount": 120,
        "category": [
            "electronics"
        ],
        "tag": [
            "electronics"
        ],
        "stock": 45,
        "image": [
            "/assets/img/product/electronics/5.jpg",
            "/assets/img/product/electronics/6.jpg",
            "/assets/img/product/electronics/7.jpg",
            "/assets/img/product/electronics/8.jpg",
            "/assets/img/product/electronics/1.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
    },
    {
        "id": "15",
        "sku": "asdf137",
        "name": "Lorem ipsum microphone",
        "price": 12.5,
        "discount": 0,
        "new": false,
        "rating": 4,
        "saleCount": 20,
        "category": [
            "electronics"
        ],
        "tag": [
            "electronics"
        ],
        "stock": 5,
        "image": [
            "/assets/img/product/electronics/6.jpg",
            "/assets/img/product/electronics/7.jpg",
            "/assets/img/product/electronics/8.jpg",
            "/assets/img/product/electronics/1.jpg",
            "/assets/img/product/electronics/2.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
    },
    {
        "id": "16",
        "sku": "asdf138",
        "name": "Lorem ipsum grinder",
        "price": 22.5,
        "discount": 20,
        "new": true,
        "rating": 5,
        "saleCount": 25,
        "category": [
            "electronics"
        ],
        "tag": [
            "electronics"
        ],
        "stock": 7,
        "image": [
            "/assets/img/product/electronics/7.jpg",
            "/assets/img/product/electronics/8.jpg",
            "/assets/img/product/electronics/1.jpg",
            "/assets/img/product/electronics/2.jpg",
            "/assets/img/product/electronics/3.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
    },
    {
        "id": "17",
        "sku": "asdf139",
        "name": "Lorem ipsum bluetooth",
        "price": 32.5,
        "discount": 10,
        "new": true,
        "rating": 4,
        "saleCount": 15,
        "category": [
            "electronics"
        ],
        "tag": [
            "electronics"
        ],
        "stock": 6,
        "image": [
            "/assets/img/product/electronics/8.jpg",
            "/assets/img/product/electronics/1.jpg",
            "/assets/img/product/electronics/2.jpg",
            "/assets/img/product/electronics/3.jpg",
            "/assets/img/product/electronics/4.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
    },
    {
        "id": "18",
        "sku": "asdf140",
        "name": "Lorem ipsum chair one",
        "price": 15.6,
        "discount": 0,
        "new": false,
        "rating": 4,
        "saleCount": 90,
        "category": [
            "furniture"
        ],
        "tag": [
            "furniture"
        ],
        "stock": 15,
        "image": [
            "/assets/img/product/furnitures/1.jpg",
            "/assets/img/product/furnitures/2.jpg",
            "/assets/img/product/furnitures/3.jpg",
            "/assets/img/product/furnitures/4.jpg",
            "/assets/img/product/furnitures/5.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
    },
    {
        "id": "19",
        "sku": "asdf141",
        "name": "Lorem ipsum chair two",
        "price": 10.6,
        "discount": 10,
        "new": true,
        "rating": 5,
        "saleCount": 190,
        "category": [
            "furniture"
        ],
        "tag": [
            "furniture"
        ],
        "stock": 25,
        "image": [
            "/assets/img/product/furnitures/2.jpg",
            "/assets/img/product/furnitures/3.jpg",
            "/assets/img/product/furnitures/4.jpg",
            "/assets/img/product/furnitures/5.jpg",
            "/assets/img/product/furnitures/6.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
    },
    {
        "id": "20",
        "sku": "asdf142",
        "name": "Lorem ipsum chair three",
        "price": 12.5,
        "discount": 20,
        "new": true,
        "rating": 3,
        "saleCount": 90,
        "category": [
            "furniture"
        ],
        "tag": [
            "furniture"
        ],
        "stock": 20,
        "image": [
            "/assets/img/product/furnitures/3.jpg",
            "/assets/img/product/furnitures/4.jpg",
            "/assets/img/product/furnitures/5.jpg",
            "/assets/img/product/furnitures/6.jpg",
            "/assets/img/product/furnitures/7.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
    },
    {
        "id": "21",
        "sku": "asdf143",
        "name": "Lorem ipsum sofa one",
        "price": 14.5,
        "discount": 30,
        "new": false,
        "rating": 4,
        "saleCount": 100,
        "category": [
            "furniture"
        ],
        "tag": [
            "furniture"
        ],
        "stock": 40,
        "image": [
            "/assets/img/product/furnitures/4.jpg",
            "/assets/img/product/furnitures/5.jpg",
            "/assets/img/product/furnitures/6.jpg",
            "/assets/img/product/furnitures/7.jpg",
            "/assets/img/product/furnitures/8.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
    },
    {
        "id": "22",
        "sku": "asdf144",
        "name": "Lorem ipsum sofa two",
        "price": 22.5,
        "discount": 10,
        "new": true,
        "rating": 5,
        "saleCount": 120,
        "category": [
            "furniture"
        ],
        "tag": [
            "furniture"
        ],
        "stock": 45,
        "image": [
            "/assets/img/product/furnitures/5.jpg",
            "/assets/img/product/furnitures/6.jpg",
            "/assets/img/product/furnitures/7.jpg",
            "/assets/img/product/furnitures/8.jpg",
            "/assets/img/product/furnitures/1.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
    },
    {
        "id": "23",
        "sku": "asdf145",
        "name": "Lorem ipsum sofa three",
        "price": 12.5,
        "discount": 0,
        "new": false,
        "rating": 4,
        "saleCount": 20,
        "category": [
            "furniture"
        ],
        "tag": [
            "furniture"
        ],
        "stock": 5,
        "image": [
            "/assets/img/product/furnitures/6.jpg",
            "/assets/img/product/furnitures/7.jpg",
            "/assets/img/product/furnitures/8.jpg",
            "/assets/img/product/furnitures/1.jpg",
            "/assets/img/product/furnitures/2.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
    },
    {
        "id": "24",
        "sku": "asdf146",
        "name": "Lorem ipsum sofa four",
        "price": 22.5,
        "discount": 20,
        "new": true,
        "rating": 5,
        "saleCount": 25,
        "category": [
            "furniture"
        ],
        "tag": [
            "furniture"
        ],
        "stock": 7,
        "image": [
            "/assets/img/product/furnitures/7.jpg",
            "/assets/img/product/furnitures/8.jpg",
            "/assets/img/product/furnitures/1.jpg",
            "/assets/img/product/furnitures/2.jpg",
            "/assets/img/product/furnitures/3.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
    },
    {
        "id": "25",
        "sku": "asdf147",
        "name": "Lorem ipsum sofa five",
        "price": 32.5,
        "discount": 10,
        "new": true,
        "rating": 4,
        "saleCount": 15,
        "category": [
            "furniture"
        ],
        "tag": [
            "furniture"
        ],
        "stock": 6,
        "image": [
            "/assets/img/product/furnitures/8.jpg",
            "/assets/img/product/furnitures/1.jpg",
            "/assets/img/product/furnitures/2.jpg",
            "/assets/img/product/furnitures/3.jpg",
            "/assets/img/product/furnitures/4.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
    },
    {
        "id": "26",
        "sku": "asdf148",
        "name": "Lorem ipsum plant one",
        "price": 15.6,
        "discount": 0,
        "new": false,
        "rating": 4,
        "saleCount": 90,
        "category": [
            "plant"
        ],
        "tag": [
            "plant"
        ],
        "stock": 15,
        "image": [
            "/assets/img/product/plants/1.jpg",
            "/assets/img/product/plants/2.jpg",
            "/assets/img/product/plants/3.jpg",
            "/assets/img/product/plants/4.jpg",
            "/assets/img/product/plants/5.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
    },
    {
        "id": "27",
        "sku": "asdf149",
        "name": "Lorem ipsum plant two",
        "price": 10.6,
        "discount": 10,
        "new": true,
        "rating": 5,
        "saleCount": 190,
        "category": [
            "plant"
        ],
        "tag": [
            "plant"
        ],
        "stock": 25,
        "image": [
            "/assets/img/product/plants/2.jpg",
            "/assets/img/product/plants/3.jpg",
            "/assets/img/product/plants/4.jpg",
            "/assets/img/product/plants/5.jpg",
            "/assets/img/product/plants/6.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
    },
    {
        "id": "28",
        "sku": "asdf150",
        "name": "Lorem ipsum plant three",
        "price": 12.5,
        "discount": 20,
        "new": true,
        "rating": 3,
        "saleCount": 90,
        "category": [
            "plant"
        ],
        "tag": [
            "plant"
        ],
        "stock": 20,
        "image": [
            "/assets/img/product/plants/3.jpg",
            "/assets/img/product/plants/4.jpg",
            "/assets/img/product/plants/5.jpg",
            "/assets/img/product/plants/6.jpg",
            "/assets/img/product/plants/7.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
    },
    {
        "id": "29",
        "sku": "asdf151",
        "name": "Lorem ipsum plant four",
        "price": 14.5,
        "discount": 30,
        "new": false,
        "rating": 4,
        "saleCount": 100,
        "category": [
            "plant"
        ],
        "tag": [
            "plant"
        ],
        "stock": 40,
        "image": [
            "/assets/img/product/plants/4.jpg",
            "/assets/img/product/plants/5.jpg",
            "/assets/img/product/plants/6.jpg",
            "/assets/img/product/plants/7.jpg",
            "/assets/img/product/plants/8.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
    },
    {
        "id": "30",
        "sku": "asdf152",
        "name": "Lorem ipsum plant five",
        "price": 22.5,
        "discount": 10,
        "new": true,
        "rating": 5,
        "saleCount": 120,
        "category": [
            "plant"
        ],
        "tag": [
            "plant"
        ],
        "stock": 45,
        "image": [
            "/assets/img/product/plants/5.jpg",
            "/assets/img/product/plants/6.jpg",
            "/assets/img/product/plants/7.jpg",
            "/assets/img/product/plants/8.jpg",
            "/assets/img/product/plants/1.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
    },
    {
        "id": "31",
        "sku": "asdf153",
        "name": "Lorem ipsum plant six",
        "price": 12.5,
        "discount": 0,
        "new": false,
        "rating": 4,
        "saleCount": 20,
        "category": [
            "plant"
        ],
        "tag": [
            "plant"
        ],
        "stock": 5,
        "image": [
            "/assets/img/product/plants/6.jpg",
            "/assets/img/product/plants/7.jpg",
            "/assets/img/product/plants/8.jpg",
            "/assets/img/product/plants/1.jpg",
            "/assets/img/product/plants/2.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
    },
    {
        "id": "32",
        "sku": "asdf154",
        "name": "Lorem ipsum plant seven",
        "price": 22.5,
        "discount": 20,
        "new": true,
        "rating": 5,
        "saleCount": 25,
        "category": [
            "plant"
        ],
        "tag": [
            "plant"
        ],
        "stock": 7,
        "image": [
            "/assets/img/product/plants/7.jpg",
            "/assets/img/product/plants/8.jpg",
            "/assets/img/product/plants/1.jpg",
            "/assets/img/product/plants/2.jpg",
            "/assets/img/product/plants/3.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
    },
    {
        "id": "33",
        "sku": "asdf155",
        "name": "Lorem ipsum plant eight",
        "price": 32.5,
        "discount": 10,
        "new": true,
        "rating": 4,
        "saleCount": 15,
        "category": [
            "plant"
        ],
        "tag": [
            "plant"
        ],
        "stock": 6,
        "image": [
            "/assets/img/product/plants/8.jpg",
            "/assets/img/product/plants/1.jpg",
            "/assets/img/product/plants/2.jpg",
            "/assets/img/product/plants/3.jpg",
            "/assets/img/product/plants/4.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
    },
    {
        "id": "34",
        "sku": "asdf156",
        "name": "Lorem ipsum fruit one",
        "price": 15.6,
        "discount": 0,
        "new": false,
        "rating": 4,
        "saleCount": 90,
        "category": [
            "organic food"
        ],
        "tag": [
            "organic food"
        ],
        "stock": 15,
        "image": [
            "/assets/img/product/fruits/1.jpg",
            "/assets/img/product/fruits/2.jpg",
            "/assets/img/product/fruits/3.jpg",
            "/assets/img/product/fruits/4.jpg",
            "/assets/img/product/fruits/5.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
    },
    {
        "id": "35",
        "sku": "asdf157",
        "name": "Lorem ipsum fruit two",
        "price": 10.6,
        "discount": 10,
        "new": true,
        "rating": 5,
        "saleCount": 190,
        "category": [
            "organic food"
        ],
        "tag": [
            "organic food"
        ],
        "stock": 25,
        "image": [
            "/assets/img/product/fruits/2.jpg",
            "/assets/img/product/fruits/3.jpg",
            "/assets/img/product/fruits/4.jpg",
            "/assets/img/product/fruits/5.jpg",
            "/assets/img/product/fruits/6.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
    },
    {
        "id": "36",
        "sku": "asdf158",
        "name": "Lorem ipsum fruit three",
        "price": 12.5,
        "discount": 20,
        "new": true,
        "rating": 3,
        "saleCount": 90,
        "category": [
            "organic food"
        ],
        "tag": [
            "organic food"
        ],
        "stock": 20,
        "image": [
            "/assets/img/product/fruits/3.jpg",
            "/assets/img/product/fruits/4.jpg",
            "/assets/img/product/fruits/5.jpg",
            "/assets/img/product/fruits/6.jpg",
            "/assets/img/product/fruits/7.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
    },
    {
        "id": "37",
        "sku": "asdf159",
        "name": "Lorem ipsum fruit four",
        "price": 14.5,
        "discount": 30,
        "new": false,
        "rating": 4,
        "saleCount": 100,
        "category": [
            "organic food"
        ],
        "tag": [
            "organic food"
        ],
        "stock": 40,
        "image": [
            "/assets/img/product/fruits/4.jpg",
            "/assets/img/product/fruits/5.jpg",
            "/assets/img/product/fruits/6.jpg",
            "/assets/img/product/fruits/7.jpg",
            "/assets/img/product/fruits/8.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
    },
    {
        "id": "38",
        "sku": "asdf160",
        "name": "Lorem ipsum fruit five",
        "price": 22.5,
        "discount": 10,
        "new": true,
        "rating": 5,
        "saleCount": 120,
        "category": [
            "organic food"
        ],
        "tag": [
            "organic food"
        ],
        "stock": 45,
        "image": [
            "/assets/img/product/fruits/5.jpg",
            "/assets/img/product/fruits/6.jpg",
            "/assets/img/product/fruits/7.jpg",
            "/assets/img/product/fruits/8.jpg",
            "/assets/img/product/fruits/1.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
    },
    {
        "id": "39",
        "sku": "asdf161",
        "name": "Lorem ipsum fruit six",
        "price": 12.5,
        "discount": 0,
        "new": false,
        "rating": 4,
        "saleCount": 20,
        "category": [
            "organic food"
        ],
        "tag": [
            "organic food"
        ],
        "stock": 5,
        "image": [
            "/assets/img/product/fruits/6.jpg",
            "/assets/img/product/fruits/7.jpg",
            "/assets/img/product/fruits/8.jpg",
            "/assets/img/product/fruits/1.jpg",
            "/assets/img/product/fruits/2.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
    },
    {
        "id": "40",
        "sku": "asdf162",
        "name": "Lorem ipsum fruit seven",
        "price": 22.5,
        "discount": 20,
        "new": true,
        "rating": 5,
        "saleCount": 25,
        "category": [
            "organic food"
        ],
        "tag": [
            "organic food"
        ],
        "stock": 7,
        "image": [
            "/assets/img/product/fruits/7.jpg",
            "/assets/img/product/fruits/8.jpg",
            "/assets/img/product/fruits/1.jpg",
            "/assets/img/product/fruits/2.jpg",
            "/assets/img/product/fruits/3.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
    },
    {
        "id": "41",
        "sku": "asdf163",
        "name": "Lorem ipsum fruit eight",
        "price": 32.5,
        "discount": 10,
        "new": true,
        "rating": 4,
        "saleCount": 15,
        "category": [
            "organic food"
        ],
        "tag": [
            "organic food"
        ],
        "stock": 6,
        "image": [
            "/assets/img/product/fruits/8.jpg",
            "/assets/img/product/fruits/1.jpg",
            "/assets/img/product/fruits/2.jpg",
            "/assets/img/product/fruits/3.jpg",
            "/assets/img/product/fruits/4.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
    },
    {
        "id": "42",
        "sku": "asdf164",
        "name": "Lorem ipsum lamp",
        "price": 12.5,
        "discount": 20,
        "new": true,
        "rating": 4,
        "saleCount": 15,
        "category": [
            "electronics"
        ],
        "tag": [
            "electronics"
        ],
        "stock": 7,
        "image": [
            "/assets/img/product/electronics/9.jpg",
            "/assets/img/product/electronics/10.jpg",
            "/assets/img/product/electronics/1.jpg",
            "/assets/img/product/electronics/2.jpg",
            "/assets/img/product/electronics/3.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
    },
    {
        "id": "43",
        "sku": "asdf165",
        "name": "Lorem ipsum headphone",
        "price": 16.5,
        "discount": 10,
        "new": false,
        "rating": 5,
        "saleCount": 5,
        "category": [
            "electronics"
        ],
        "tag": [
            "electronics"
        ],
        "stock": 6,
        "image": [
            "/assets/img/product/electronics/10.jpg",
            "/assets/img/product/electronics/1.jpg",
            "/assets/img/product/electronics/2.jpg",
            "/assets/img/product/electronics/3.jpg",
            "/assets/img/product/electronics/4.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
    },
    {
        "id": "44",
        "sku": "asdf166",
        "name": "Lorem ipsum flower one",
        "price": 1.5,
        "discount": 20,
        "new": true,
        "rating": 4,
        "saleCount": 10,
        "category": [
            "flower"
        ],
        "tag": [
            "flower"
        ],
        "stock": 6,
        "image": [
            "/assets/img/product/flowers/1.jpg",
            "/assets/img/product/flowers/2.jpg",
            "/assets/img/product/flowers/3.jpg",
            "/assets/img/product/flowers/4.jpg",
            "/assets/img/product/flowers/5.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
    },
    {
        "id": "45",
        "sku": "asdf167",
        "name": "Lorem ipsum flower two",
        "price": 6.5,
        "discount": 30,
        "new": false,
        "rating": 5,
        "saleCount": 5,
        "category": [
            "flower"
        ],
        "tag": [
            "flower"
        ],
        "stock": 7,
        "image": [
            "/assets/img/product/flowers/2.jpg",
            "/assets/img/product/flowers/3.jpg",
            "/assets/img/product/flowers/4.jpg",
            "/assets/img/product/flowers/5.jpg",
            "/assets/img/product/flowers/6.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
    },
    {
        "id": "46",
        "sku": "asdf168",
        "name": "Lorem ipsum flower three",
        "price": 3.5,
        "discount": 5,
        "new": true,
        "rating": 4,
        "saleCount": 7,
        "category": [
            "flower"
        ],
        "tag": [
            "flower"
        ],
        "stock": 10,
        "image": [
            "/assets/img/product/flowers/3.jpg",
            "/assets/img/product/flowers/4.jpg",
            "/assets/img/product/flowers/5.jpg",
            "/assets/img/product/flowers/6.jpg",
            "/assets/img/product/flowers/7.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
    },
    {
        "id": "47",
        "sku": "asdf169",
        "name": "Lorem ipsum flower four",
        "price": 4.5,
        "discount": 20,
        "new": true,
        "rating": 5,
        "saleCount": 10,
        "category": [
            "flower"
        ],
        "tag": [
            "flower"
        ],
        "stock": 6,
        "image": [
            "/assets/img/product/flowers/4.jpg",
            "/assets/img/product/flowers/5.jpg",
            "/assets/img/product/flowers/6.jpg",
            "/assets/img/product/flowers/7.jpg",
            "/assets/img/product/flowers/8.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
    },
    {
        "id": "48",
        "sku": "asdf170",
        "name": "Lorem ipsum flower five",
        "price": 7.5,
        "discount": 30,
        "new": true,
        "rating": 3,
        "saleCount": 4,
        "category": [
            "flower"
        ],
        "tag": [
            "flower"
        ],
        "stock": 7,
        "image": [
            "/assets/img/product/flowers/5.jpg",
            "/assets/img/product/flowers/6.jpg",
            "/assets/img/product/flowers/7.jpg",
            "/assets/img/product/flowers/8.jpg",
            "/assets/img/product/flowers/1.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
    },
    {
        "id": "49",
        "sku": "asdf171",
        "name": "Lorem ipsum flower six",
        "price": 4.5,
        "discount": 10,
        "new": false,
        "rating": 5,
        "saleCount": 2,
        "category": [
            "flower"
        ],
        "tag": [
            "flower"
        ],
        "stock": 10,
        "image": [
            "/assets/img/product/flowers/6.jpg",
            "/assets/img/product/flowers/7.jpg",
            "/assets/img/product/flowers/8.jpg",
            "/assets/img/product/flowers/1.jpg",
            "/assets/img/product/flowers/2.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
    },
    {
        "id": "50",
        "sku": "asdf172",
        "name": "Lorem ipsum flower seven",
        "price": 3.5,
        "discount": 20,
        "new": true,
        "rating": 5,
        "saleCount": 5,
        "category": [
            "flower"
        ],
        "tag": [
            "flower"
        ],
        "stock": 6,
        "image": [
            "/assets/img/product/flowers/7.jpg",
            "/assets/img/product/flowers/8.jpg",
            "/assets/img/product/flowers/1.jpg",
            "/assets/img/product/flowers/2.jpg",
            "/assets/img/product/flowers/3.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
    },
    {
        "id": "51",
        "sku": "asdf173",
        "name": "Lorem ipsum flower eight",
        "price": 2.5,
        "discount": 30,
        "new": true,
        "rating": 5,
        "saleCount": 9,
        "category": [
            "flower"
        ],
        "tag": [
            "flower"
        ],
        "stock": 10,
        "image": [
            "/assets/img/product/flowers/8.jpg",
            "/assets/img/product/flowers/1.jpg",
            "/assets/img/product/flowers/2.jpg",
            "/assets/img/product/flowers/3.jpg",
            "/assets/img/product/flowers/4.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
    },
    {
        "id": "52",
        "sku": "asdf174",
        "name": "Lorem ipsum book one",
        "price": 6.5,
        "discount": 30,
        "new": true,
        "rating": 5,
        "saleCount": 10,
        "category": [
            "book"
        ],
        "tag": [
            "book"
        ],
        "stock": 20,
        "image": [
            "/assets/img/product/books/1.jpg",
            "/assets/img/product/books/2.jpg",
            "/assets/img/product/books/3.jpg",
            "/assets/img/product/books/4.jpg",
            "/assets/img/product/books/5.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
    },
    {
        "id": "53",
        "sku": "asdf175",
        "name": "Lorem ipsum book two",
        "price": 4.2,
        "discount": 0,
        "new": true,
        "rating": 5,
        "saleCount": 10,
        "category": [
            "book"
        ],
        "tag": [
            "book"
        ],
        "stock": 20,
        "image": [
            "/assets/img/product/books/2.jpg",
            "/assets/img/product/books/3.jpg",
            "/assets/img/product/books/4.jpg",
            "/assets/img/product/books/5.jpg",
            "/assets/img/product/books/6.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
    },
    {
        "id": "54",
        "sku": "asdf176",
        "name": "Lorem ipsum book three",
        "price": 6.6,
        "discount": 20,
        "new": true,
        "rating": 3,
        "saleCount": 11,
        "category": [
            "book"
        ],
        "tag": [
            "book"
        ],
        "stock": 20,
        "image": [
            "/assets/img/product/books/3.jpg",
            "/assets/img/product/books/4.jpg",
            "/assets/img/product/books/5.jpg",
            "/assets/img/product/books/6.jpg",
            "/assets/img/product/books/7.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
    },
    {
        "id": "55",
        "sku": "asdf177",
        "name": "Lorem ipsum book four",
        "price": 7.1,
        "discount": 40,
        "new": true,
        "rating": 4,
        "saleCount": 19,
        "category": [
            "book"
        ],
        "tag": [
            "book"
        ],
        "stock": 40,
        "image": [
            "/assets/img/product/books/4.jpg",
            "/assets/img/product/books/5.jpg",
            "/assets/img/product/books/6.jpg",
            "/assets/img/product/books/7.jpg",
            "/assets/img/product/books/8.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
    },
    {
        "id": "56",
        "sku": "asdf178",
        "name": "Lorem ipsum book five",
        "price": 8.6,
        "discount": 30,
        "new": false,
        "rating": 4,
        "saleCount": 12,
        "category": [
            "book"
        ],
        "tag": [
            "book"
        ],
        "stock": 8,
        "image": [
            "/assets/img/product/books/5.jpg",
            "/assets/img/product/books/6.jpg",
            "/assets/img/product/books/7.jpg",
            "/assets/img/product/books/8.jpg",
            "/assets/img/product/books/1.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
    },
    {
        "id": "57",
        "sku": "asdf179",
        "name": "Lorem ipsum book six",
        "price": 5.5,
        "discount": 10,
        "new": true,
        "rating": 4,
        "saleCount": 19,
        "category": [
            "book"
        ],
        "tag": [
            "book"
        ],
        "stock": 20,
        "image": [
            "/assets/img/product/books/6.jpg",
            "/assets/img/product/books/7.jpg",
            "/assets/img/product/books/8.jpg",
            "/assets/img/product/books/1.jpg",
            "/assets/img/product/books/2.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
    },
    {
        "id": "58",
        "sku": "asdf180",
        "name": "Lorem ipsum book seven",
        "price": 3.2,
        "discount": 20,
        "new": false,
        "rating": 2,
        "saleCount": 9,
        "category": [
            "book"
        ],
        "tag": [
            "book"
        ],
        "stock": 11,
        "image": [
            "/assets/img/product/books/7.jpg",
            "/assets/img/product/books/8.jpg",
            "/assets/img/product/books/1.jpg",
            "/assets/img/product/books/2.jpg",
            "/assets/img/product/books/3.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
    },
    {
        "id": "59",
        "sku": "asdf181",
        "name": "Lorem ipsum book eight",
        "price": 8.5,
        "discount": 5,
        "new": true,
        "rating": 3,
        "saleCount": 19,
        "category": [
            "book"
        ],
        "tag": [
            "book"
        ],
        "stock": 30,
        "image": [
            "/assets/img/product/books/8.jpg",
            "/assets/img/product/books/1.jpg",
            "/assets/img/product/books/2.jpg",
            "/assets/img/product/books/3.jpg",
            "/assets/img/product/books/4.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
    },
    {
        "id": "60",
        "sku": "asdf182",
        "name": "Lorem ipsum cosmetics one",
        "price": 3.5,
        "discount": 10,
        "new": true,
        "rating": 3,
        "saleCount": 20,
        "category": [
            "cosmetics"
        ],
        "tag": [
            "cosmetics"
        ],
        "stock": 20,
        "image": [
            "/assets/img/product/cosmetics/1.jpg",
            "/assets/img/product/cosmetics/2.jpg",
            "/assets/img/product/cosmetics/3.jpg",
            "/assets/img/product/cosmetics/4.jpg",
            "/assets/img/product/cosmetics/5.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
    },
    {
        "id": "61",
        "sku": "asdf183",
        "name": "Lorem ipsum cosmetics two",
        "price": 18.5,
        "discount": 15,
        "new": false,
        "rating": 5,
        "saleCount": 9,
        "category": [
            "cosmetics"
        ],
        "tag": [
            "cosmetics"
        ],
        "stock": 20,
        "image": [
            "/assets/img/product/cosmetics/2.jpg",
            "/assets/img/product/cosmetics/3.jpg",
            "/assets/img/product/cosmetics/4.jpg",
            "/assets/img/product/cosmetics/5.jpg",
            "/assets/img/product/cosmetics/6.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
    },
    {
        "id": "62",
        "sku": "asdf184",
        "name": "Lorem ipsum cosmetics three",
        "price": 4.2,
        "discount": 15,
        "new": true,
        "rating": 5,
        "saleCount": 29,
        "category": [
            "cosmetics"
        ],
        "tag": [
            "cosmetics"
        ],
        "stock": 20,
        "image": [
            "/assets/img/product/cosmetics/3.jpg",
            "/assets/img/product/cosmetics/4.jpg",
            "/assets/img/product/cosmetics/5.jpg",
            "/assets/img/product/cosmetics/6.jpg",
            "/assets/img/product/cosmetics/7.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
    },
    {
        "id": "63",
        "sku": "asdf185",
        "name": "Lorem ipsum cosmetics four",
        "price": 1.5,
        "discount": 0,
        "new": false,
        "rating": 4,
        "saleCount": 20,
        "category": [
            "cosmetics"
        ],
        "tag": [
            "cosmetics"
        ],
        "stock": 10,
        "image": [
            "/assets/img/product/cosmetics/4.jpg",
            "/assets/img/product/cosmetics/5.jpg",
            "/assets/img/product/cosmetics/6.jpg",
            "/assets/img/product/cosmetics/7.jpg",
            "/assets/img/product/cosmetics/8.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
    },
    {
        "id": "64",
        "sku": "asdf186",
        "name": "Lorem ipsum cosmetics five",
        "price": 6.3,
        "discount": 15,
        "new": true,
        "rating": 5,
        "saleCount": 20,
        "category": [
            "cosmetics"
        ],
        "tag": [
            "cosmetics"
        ],
        "stock": 20,
        "image": [
            "/assets/img/product/cosmetics/5.jpg",
            "/assets/img/product/cosmetics/6.jpg",
            "/assets/img/product/cosmetics/7.jpg",
            "/assets/img/product/cosmetics/8.jpg",
            "/assets/img/product/cosmetics/1.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
    },
    {
        "id": "65",
        "sku": "asdf187",
        "name": "Lorem ipsum cosmetics six",
        "price": 4.5,
        "discount": 20,
        "new": false,
        "rating": 2,
        "saleCount": 29,
        "category": [
            "cosmetics"
        ],
        "tag": [
            "cosmetics"
        ],
        "stock": 20,
        "image": [
            "/assets/img/product/cosmetics/6.jpg",
            "/assets/img/product/cosmetics/7.jpg",
            "/assets/img/product/cosmetics/8.jpg",
            "/assets/img/product/cosmetics/1.jpg",
            "/assets/img/product/cosmetics/2.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
    },
    {
        "id": "66",
        "sku": "asdf188",
        "name": "Lorem ipsum cosmetics seven",
        "price": 7.1,
        "discount": 45,
        "new": true,
        "rating": 4,
        "saleCount": 10,
        "category": [
            "cosmetics"
        ],
        "tag": [
            "cosmetics"
        ],
        "stock": 20,
        "image": [
            "/assets/img/product/cosmetics/7.jpg",
            "/assets/img/product/cosmetics/8.jpg",
            "/assets/img/product/cosmetics/1.jpg",
            "/assets/img/product/cosmetics/2.jpg",
            "/assets/img/product/cosmetics/3.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
    },
    {
        "id": "67",
        "sku": "asdf189",
        "name": "Lorem ipsum cosmetics eight",
        "price": 9.0,
        "discount": 10,
        "new": false,
        "rating": 4,
        "saleCount": 29,
        "category": [
            "cosmetics"
        ],
        "tag": [
            "cosmetics"
        ],
        "stock": 20,
        "image": [
            "/assets/img/product/cosmetics/8.jpg",
            "/assets/img/product/cosmetics/1.jpg",
            "/assets/img/product/cosmetics/2.jpg",
            "/assets/img/product/cosmetics/3.jpg",
            "/assets/img/product/cosmetics/4.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
    },
    {
        "id": "68",
        "sku": "asdf190",
        "name": "Lorem ipsum accessories one",
        "price": 3.1,
        "discount": 10,
        "new": true,
        "rating": 4,
        "saleCount": 29,
        "category": [
            "accessories"
        ],
        "tag": [
            "accessories"
        ],
        "stock": 20,
        "image": [
            "/assets/img/product/accessories/1.jpg",
            "/assets/img/product/accessories/2.jpg",
            "/assets/img/product/accessories/3.jpg",
            "/assets/img/product/accessories/4.jpg",
            "/assets/img/product/accessories/5.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
    },
    {
        "id": "69",
        "sku": "asdf191",
        "name": "Lorem ipsum accessories two",
        "price": 12.43,
        "discount": 20,
        "new": false,
        "rating": 5,
        "saleCount": 19,
        "category": [
            "accessories"
        ],
        "tag": [
            "accessories"
        ],
        "stock": 30,
        "image": [
            "/assets/img/product/accessories/2.jpg",
            "/assets/img/product/accessories/3.jpg",
            "/assets/img/product/accessories/4.jpg",
            "/assets/img/product/accessories/5.jpg",
            "/assets/img/product/accessories/6.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
    },
    {
        "id": "70",
        "sku": "asdf192",
        "name": "Lorem ipsum accessories three",
        "price": 12.5,
        "discount": 0,
        "new": true,
        "rating": 5,
        "saleCount": 30,
        "category": [
            "accessories"
        ],
        "tag": [
            "accessories"
        ],
        "stock": 10,
        "image": [
            "/assets/img/product/accessories/3.jpg",
            "/assets/img/product/accessories/4.jpg",
            "/assets/img/product/accessories/5.jpg",
            "/assets/img/product/accessories/6.jpg",
            "/assets/img/product/accessories/7.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
    },
    {
        "id": "71",
        "sku": "asdf193",
        "name": "Lorem ipsum accessories four",
        "price": 19.33,
        "discount": 20,
        "new": false,
        "rating": 5,
        "saleCount": 20,
        "category": [
            "accessories"
        ],
        "tag": [
            "accessories"
        ],
        "stock": 30,
        "image": [
            "/assets/img/product/accessories/4.jpg",
            "/assets/img/product/accessories/5.jpg",
            "/assets/img/product/accessories/6.jpg",
            "/assets/img/product/accessories/7.jpg",
            "/assets/img/product/accessories/8.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
    },
    {
        "id": "72",
        "sku": "asdf194",
        "name": "Lorem ipsum accessories five",
        "price": 12.35,
        "discount": 20,
        "new": true,
        "rating": 5,
        "saleCount": 20,
        "category": [
            "accessories"
        ],
        "tag": [
            "accessories"
        ],
        "stock": 10,
        "image": [
            "/assets/img/product/accessories/5.jpg",
            "/assets/img/product/accessories/6.jpg",
            "/assets/img/product/accessories/7.jpg",
            "/assets/img/product/accessories/8.jpg",
            "/assets/img/product/accessories/9.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
    },
    {
        "id": "73",
        "sku": "asdf195",
        "name": "Lorem ipsum accessories six",
        "price": 12.45,
        "discount": 20,
        "new": true,
        "rating": 5,
        "saleCount": 19,
        "category": [
            "accessories"
        ],
        "tag": [
            "accessories"
        ],
        "stock": 30,
        "image": [
            "/assets/img/product/accessories/6.jpg",
            "/assets/img/product/accessories/7.jpg",
            "/assets/img/product/accessories/8.jpg",
            "/assets/img/product/accessories/9.jpg",
            "/assets/img/product/accessories/10.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
    },
    {
        "id": "74",
        "sku": "asdf196",
        "name": "Lorem ipsum accessories seven",
        "price": 2.43,
        "discount": 10,
        "new": true,
        "rating": 5,
        "saleCount": 15,
        "category": [
            "accessories"
        ],
        "tag": [
            "accessories"
        ],
        "stock": 10,
        "image": [
            "/assets/img/product/accessories/7.jpg",
            "/assets/img/product/accessories/8.jpg",
            "/assets/img/product/accessories/9.jpg",
            "/assets/img/product/accessories/10.jpg",
            "/assets/img/product/accessories/11.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
    },
    {
        "id": "75",
        "sku": "asdf197",
        "name": "Lorem ipsum accessories eight",
        "price": 13.4,
        "discount": 30,
        "new": true,
        "rating": 5,
        "saleCount": 2,
        "category": [
            "accessories"
        ],
        "tag": [
            "accessories"
        ],
        "stock": 10,
        "image": [
            "/assets/img/product/accessories/8.jpg",
            "/assets/img/product/accessories/9.jpg",
            "/assets/img/product/accessories/10.jpg",
            "/assets/img/product/accessories/11.jpg",
            "/assets/img/product/accessories/12.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
    },
    {
        "id": "76",
        "sku": "asdf198",
        "name": "Lorem ipsum accessories nine",
        "price": 5.24,
        "discount": 30,
        "new": true,
        "rating": 5,
        "saleCount": 34,
        "category": [
            "accessories"
        ],
        "tag": [
            "accessories"
        ],
        "stock": 10,
        "image": [
            "/assets/img/product/accessories/9.jpg",
            "/assets/img/product/accessories/10.jpg",
            "/assets/img/product/accessories/11.jpg",
            "/assets/img/product/accessories/12.jpg",
            "/assets/img/product/accessories/1.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
    },
    {
        "id": "77",
        "sku": "asdf199",
        "name": "Lorem ipsum accessories ten",
        "price": 2.2,
        "discount": 0,
        "new": true,
        "rating": 5,
        "saleCount": 19,
        "category": [
            "accessories"
        ],
        "tag": [
            "accessories"
        ],
        "stock": 30,
        "image": [
            "/assets/img/product/accessories/10.jpg",
            "/assets/img/product/accessories/11.jpg",
            "/assets/img/product/accessories/12.jpg",
            "/assets/img/product/accessories/1.jpg",
            "/assets/img/product/accessories/2.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
    },
    {
        "id": "78",
        "sku": "asdf200",
        "name": "Lorem ipsum accessories eleven",
        "price": 12.65,
        "discount": 20,
        "new": true,
        "rating": 4,
        "saleCount": 20,
        "category": [
            "accessories"
        ],
        "tag": [
            "accessories"
        ],
        "stock": 23,
        "image": [
            "/assets/img/product/accessories/11.jpg",
            "/assets/img/product/accessories/12.jpg",
            "/assets/img/product/accessories/1.jpg",
            "/assets/img/product/accessories/2.jpg",
            "/assets/img/product/accessories/3.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
    },
    {
        "id": "79",
        "sku": "asdf201",
        "name": "Lorem ipsum accessories twelve",
        "price": 9.52,
        "discount": 0,
        "new": true,
        "rating": 5,
        "saleCount": 19,
        "category": [
            "accessories"
        ],
        "tag": [
            "accessories"
        ],
        "stock": 10,
        "image": [
            "/assets/img/product/accessories/12.jpg",
            "/assets/img/product/accessories/1.jpg",
            "/assets/img/product/accessories/2.jpg",
            "/assets/img/product/accessories/3.jpg",
            "/assets/img/product/accessories/4.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
    },
    {
        "id": "80",
        "sku": "asdf202",
        "name": "Lorem ipsum handmade one",
        "price": 19,
        "discount": 10,
        "new": true,
        "rating": 4,
        "saleCount": 19,
        "category": [
            "handmade"
        ],
        "tag": [
            "handmade"
        ],
        "stock": 10,
        "image": [
            "/assets/img/product/handmade/1.jpg",
            "/assets/img/product/handmade/2.jpg",
            "/assets/img/product/handmade/3.jpg",
            "/assets/img/product/handmade/4.jpg",
            "/assets/img/product/handmade/5.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
    },
    {
        "id": "81",
        "sku": "asdf203",
        "name": "Lorem ipsum handmade two",
        "price": 12,
        "discount": 50,
        "new": false,
        "rating": 4,
        "saleCount": 15,
        "category": [
            "handmade"
        ],
        "tag": [
            "handmade"
        ],
        "stock": 7,
        "image": [
            "/assets/img/product/handmade/2.jpg",
            "/assets/img/product/handmade/3.jpg",
            "/assets/img/product/handmade/4.jpg",
            "/assets/img/product/handmade/5.jpg",
            "/assets/img/product/handmade/6.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
    },
    {
        "id": "82",
        "sku": "asdf204",
        "name": "Lorem ipsum handmade three",
        "price": 5.52,
        "discount": 10,
        "new": true,
        "rating": 5,
        "saleCount": 12,
        "category": [
            "handmade"
        ],
        "tag": [
            "handmade"
        ],
        "stock": 6,
        "image": [
            "/assets/img/product/handmade/3.jpg",
            "/assets/img/product/handmade/4.jpg",
            "/assets/img/product/handmade/5.jpg",
            "/assets/img/product/handmade/6.jpg",
            "/assets/img/product/handmade/7.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
    },
    {
        "id": "83",
        "sku": "asdf205",
        "name": "Lorem ipsum handmade four",
        "price": 2.13,
        "discount": 0,
        "new": true,
        "rating": 3,
        "saleCount": 14,
        "category": [
            "handmade"
        ],
        "tag": [
            "handmade"
        ],
        "stock": 12,
        "image": [
            "/assets/img/product/handmade/4.jpg",
            "/assets/img/product/handmade/5.jpg",
            "/assets/img/product/handmade/6.jpg",
            "/assets/img/product/handmade/7.jpg",
            "/assets/img/product/handmade/8.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
    },
    {
        "id": "84",
        "sku": "asdf206",
        "name": "Lorem ipsum handmade five",
        "price": 12.9,
        "discount": 40,
        "new": false,
        "rating": 3,
        "saleCount": 13,
        "category": [
            "handmade"
        ],
        "tag": [
            "handmade"
        ],
        "stock": 8,
        "image": [
            "/assets/img/product/handmade/5.jpg",
            "/assets/img/product/handmade/6.jpg",
            "/assets/img/product/handmade/7.jpg",
            "/assets/img/product/handmade/8.jpg",
            "/assets/img/product/handmade/1.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
    },
    {
        "id": "85",
        "sku": "asdf207",
        "name": "Lorem ipsum handmade six",
        "price": 3.78,
        "discount": 20,
        "new": true,
        "rating": 5,
        "saleCount": 17,
        "category": [
            "handmade"
        ],
        "tag": [
            "handmade"
        ],
        "stock": 5,
        "image": [
            "/assets/img/product/handmade/6.jpg",
            "/assets/img/product/handmade/7.jpg",
            "/assets/img/product/handmade/8.jpg",
            "/assets/img/product/handmade/1.jpg",
            "/assets/img/product/handmade/2.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
    },
    {
        "id": "86",
        "sku": "asdf208",
        "name": "Lorem ipsum handmade seven",
        "price": 2.52,
        "discount": 10,
        "new": true,
        "rating": 4,
        "saleCount": 18,
        "category": [
            "handmade"
        ],
        "tag": [
            "handmade"
        ],
        "stock": 5,
        "image": [
            "/assets/img/product/handmade/7.jpg",
            "/assets/img/product/handmade/8.jpg",
            "/assets/img/product/handmade/1.jpg",
            "/assets/img/product/handmade/2.jpg",
            "/assets/img/product/handmade/3.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
    },
    {
        "id": "87",
        "sku": "asdf209",
        "name": "Lorem ipsum handmade eight",
        "price": 6.4,
        "discount": 0,
        "new": true,
        "rating": 5,
        "saleCount": 20,
        "category": [
            "handmade"
        ],
        "tag": [
            "handmade"
        ],
        "stock": 10,
        "image": [
            "/assets/img/product/handmade/8.jpg",
            "/assets/img/product/handmade/1.jpg",
            "/assets/img/product/handmade/2.jpg",
            "/assets/img/product/handmade/3.jpg",
            "/assets/img/product/handmade/4.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
    },
    {
        "id": "88",
        "sku": "asdf210",
        "name": "Lorem ipsum kids one",
        "price": 12.45,
        "discount": 10,
        "offerEnd": "October 5, 2020 12:11:00",
        "new": false,
        "rating": 4,
        "saleCount": 54,
        "category": [
            "fashion",
            "kids"
        ],
        "tag": [
            "fashion",
            "kids"
        ],
        "variation": [
            {
                "color": "white",
                "image": "/assets/img/product/fashion/23.jpg",
                "size": [
                    {
                        "name": "x",
                        "stock": 3
                    },
                    {
                        "name": "m",
                        "stock": 2
                    },
                    {
                        "name": "xl",
                        "stock": 5
                    }
                ]
            },
            {
                "color": "black",
                "image": "/assets/img/product/fashion/24.jpg",
                "size": [
                    {
                        "name": "x",
                        "stock": 4
                    },
                    {
                        "name": "m",
                        "stock": 7
                    },
                    {
                        "name": "xl",
                        "stock": 9
                    },
                    {
                        "name": "xxl",
                        "stock": 1
                    }
                ]
            },
            {
                "color": "brown",
                "image": "/assets/img/product/fashion/25.jpg",
                "size": [
                    {
                        "name": "x",
                        "stock": 1
                    },
                    {
                        "name": "m",
                        "stock": 2
                    },
                    {
                        "name": "xl",
                        "stock": 4
                    },
                    {
                        "name": "xxl",
                        "stock": 0
                    }
                ]
            }
        ],
        "image": [
            "/assets/img/product/fashion/23.jpg",
            "/assets/img/product/fashion/24.jpg",
            "/assets/img/product/fashion/25.jpg",
            "/assets/img/product/fashion/26.jpg",
            "/assets/img/product/fashion/27.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"
    },
    {
        "id": "89",
        "sku": "asdf211",
        "name": "Lorem ipsum kids two",
        "price": 18.5,
        "discount": 15,
        "new": false,
        "rating": 3,
        "saleCount": 12,
        "category": [
            "fashion",
            "kids"
        ],
        "tag": [
            "fashion",
            "kids"
        ],
        "variation": [
            {
                "color": "blue",
                "image": "/assets/img/product/fashion/24.jpg",
                "size": [
                    {
                        "name": "x",
                        "stock": 3
                    },
                    {
                        "name": "m",
                        "stock": 6
                    },
                    {
                        "name": "xl",
                        "stock": 7
                    }
                ]
            },
            {
                "color": "brown",
                "image": "/assets/img/product/fashion/25.jpg",
                "size": [
                    {
                        "name": "x",
                        "stock": 4
                    },
                    {
                        "name": "m",
                        "stock": 8
                    },
                    {
                        "name": "xl",
                        "stock": 3
                    },
                    {
                        "name": "xxl",
                        "stock": 7
                    }
                ]
            },
            {
                "color": "black",
                "image": "/assets/img/product/fashion/26.jpg",
                "size": [
                    {
                        "name": "x",
                        "stock": 3
                    },
                    {
                        "name": "m",
                        "stock": 7
                    },
                    {
                        "name": "xl",
                        "stock": 0
                    },
                    {
                        "name": "xxl",
                        "stock": 7
                    }
                ]
            }
        ],
        "image": [
            "/assets/img/product/fashion/24.jpg",
            "/assets/img/product/fashion/25.jpg",
            "/assets/img/product/fashion/26.jpg",
            "/assets/img/product/fashion/27.jpg",
            "/assets/img/product/fashion/28.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"
    },
    {
        "id": "90",
        "sku": "asdf212",
        "name": "Lorem ipsum kids three",
        "price": 17.45,
        "discount": 40,
        "offerEnd": "October 2, 2020 12:11:00",
        "new": true,
        "rating": 5,
        "saleCount": 36,
        "category": [
            "fashion",
            "kids"
        ],
        "tag": [
            "fashion",
            "kids"
        ],
        "variation": [
            {
                "color": "white",
                "image": "/assets/img/product/fashion/25.jpg",
                "size": [
                    {
                        "name": "x",
                        "stock": 3
                    },
                    {
                        "name": "m",
                        "stock": 2
                    },
                    {
                        "name": "xl",
                        "stock": 5
                    }
                ]
            },
            {
                "color": "black",
                "image": "/assets/img/product/fashion/26.jpg",
                "size": [
                    {
                        "name": "x",
                        "stock": 4
                    },
                    {
                        "name": "m",
                        "stock": 7
                    },
                    {
                        "name": "xl",
                        "stock": 9
                    },
                    {
                        "name": "xxl",
                        "stock": 1
                    }
                ]
            },
            {
                "color": "brown",
                "image": "/assets/img/product/fashion/27.jpg",
                "size": [
                    {
                        "name": "x",
                        "stock": 1
                    },
                    {
                        "name": "m",
                        "stock": 2
                    },
                    {
                        "name": "xl",
                        "stock": 4
                    },
                    {
                        "name": "xxl",
                        "stock": 0
                    }
                ]
            }
        ],
        "image": [
            "/assets/img/product/fashion/25.jpg",
            "/assets/img/product/fashion/26.jpg",
            "/assets/img/product/fashion/27.jpg",
            "/assets/img/product/fashion/28.jpg",
            "/assets/img/product/fashion/29.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"
    },
    {
        "id": "91",
        "sku": "asdf213",
        "name": "Lorem ipsum kids four",
        "price": 15.5,
        "discount": 0,
        "new": true,
        "rating": 4,
        "saleCount": 20,
        "category": [
            "fashion",
            "kids"
        ],
        "tag": [
            "fashion",
            "kids"
        ],
        "variation": [
            {
                "color": "blue",
                "image": "/assets/img/product/fashion/26.jpg",
                "size": [
                    {
                        "name": "x",
                        "stock": 3
                    },
                    {
                        "name": "m",
                        "stock": 6
                    },
                    {
                        "name": "xl",
                        "stock": 7
                    }
                ]
            },
            {
                "color": "brown",
                "image": "/assets/img/product/fashion/27.jpg",
                "size": [
                    {
                        "name": "x",
                        "stock": 4
                    },
                    {
                        "name": "m",
                        "stock": 8
                    },
                    {
                        "name": "xl",
                        "stock": 3
                    },
                    {
                        "name": "xxl",
                        "stock": 7
                    }
                ]
            },
            {
                "color": "black",
                "image": "/assets/img/product/fashion/28.jpg",
                "size": [
                    {
                        "name": "x",
                        "stock": 3
                    },
                    {
                        "name": "m",
                        "stock": 7
                    },
                    {
                        "name": "xl",
                        "stock": 0
                    },
                    {
                        "name": "xxl",
                        "stock": 7
                    }
                ]
            }
        ],
        "image": [
            "/assets/img/product/fashion/26.jpg",
            "/assets/img/product/fashion/27.jpg",
            "/assets/img/product/fashion/28.jpg",
            "/assets/img/product/fashion/29.jpg",
            "/assets/img/product/fashion/30.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"
    },
    {
        "id": "92",
        "sku": "asdf214",
        "name": "Lorem ipsum kids five",
        "price": 25.5,
        "discount": 10,
        "new": true,
        "rating": 5,
        "saleCount": 25,
        "category": [
            "fashion",
            "kids"
        ],
        "tag": [
            "fashion",
            "kids"
        ],
        "variation": [
            {
                "color": "blue",
                "image": "/assets/img/product/fashion/27.jpg",
                "size": [
                    {
                        "name": "x",
                        "stock": 3
                    },
                    {
                        "name": "m",
                        "stock": 6
                    },
                    {
                        "name": "xl",
                        "stock": 7
                    }
                ]
            },
            {
                "color": "brown",
                "image": "/assets/img/product/fashion/28.jpg",
                "size": [
                    {
                        "name": "x",
                        "stock": 4
                    },
                    {
                        "name": "m",
                        "stock": 8
                    },
                    {
                        "name": "xl",
                        "stock": 3
                    },
                    {
                        "name": "xxl",
                        "stock": 7
                    }
                ]
            },
            {
                "color": "black",
                "image": "/assets/img/product/fashion/29.jpg",
                "size": [
                    {
                        "name": "x",
                        "stock": 3
                    },
                    {
                        "name": "m",
                        "stock": 7
                    },
                    {
                        "name": "xl",
                        "stock": 0
                    },
                    {
                        "name": "xxl",
                        "stock": 7
                    }
                ]
            }
        ],
        "image": [
            "/assets/img/product/fashion/27.jpg",
            "/assets/img/product/fashion/28.jpg",
            "/assets/img/product/fashion/29.jpg",
            "/assets/img/product/fashion/30.jpg",
            "/assets/img/product/fashion/23.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"
    },
    {
        "id": "93",
        "sku": "asdf215",
        "name": "Lorem ipsum kids six",
        "price": 19.85,
        "discount": 0,
        "offerEnd": "October 17, 2020 12:11:00",
        "new": true,
        "rating": 5,
        "saleCount": 65,
        "category": [
            "fashion",
            "kids"
        ],
        "tag": [
            "fashion",
            "kids"
        ],
        "variation": [
            {
                "color": "white",
                "image": "/assets/img/product/fashion/28.jpg",
                "size": [
                    {
                        "name": "x",
                        "stock": 3
                    },
                    {
                        "name": "m",
                        "stock": 2
                    },
                    {
                        "name": "xl",
                        "stock": 5
                    }
                ]
            },
            {
                "color": "black",
                "image": "/assets/img/product/fashion/29.jpg",
                "size": [
                    {
                        "name": "x",
                        "stock": 4
                    },
                    {
                        "name": "m",
                        "stock": 7
                    },
                    {
                        "name": "xl",
                        "stock": 9
                    },
                    {
                        "name": "xxl",
                        "stock": 1
                    }
                ]
            },
            {
                "color": "brown",
                "image": "/assets/img/product/fashion/30.jpg",
                "size": [
                    {
                        "name": "x",
                        "stock": 1
                    },
                    {
                        "name": "m",
                        "stock": 2
                    },
                    {
                        "name": "xl",
                        "stock": 4
                    },
                    {
                        "name": "xxl",
                        "stock": 0
                    }
                ]
            }
        ],
        "image": [
            "/assets/img/product/fashion/28.jpg",
            "/assets/img/product/fashion/29.jpg",
            "/assets/img/product/fashion/30.jpg",
            "/assets/img/product/fashion/23.jpg",
            "/assets/img/product/fashion/24.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"
    },
    {
        "id": "94",
        "sku": "asdf216",
        "name": "Lorem ipsum kids seven",
        "price": 55.5,
        "discount": 40,
        "new": true,
        "rating": 5,
        "saleCount": 55,
        "category": [
            "fashion",
            "kids"
        ],
        "tag": [
            "fashion",
            "kids"
        ],
        "variation": [
            {
                "color": "blue",
                "image": "/assets/img/product/fashion/29.jpg",
                "size": [
                    {
                        "name": "x",
                        "stock": 3
                    },
                    {
                        "name": "m",
                        "stock": 6
                    },
                    {
                        "name": "xl",
                        "stock": 7
                    }
                ]
            },
            {
                "color": "brown",
                "image": "/assets/img/product/fashion/30.jpg",
                "size": [
                    {
                        "name": "x",
                        "stock": 4
                    },
                    {
                        "name": "m",
                        "stock": 8
                    },
                    {
                        "name": "xl",
                        "stock": 3
                    },
                    {
                        "name": "xxl",
                        "stock": 7
                    }
                ]
            },
            {
                "color": "black",
                "image": "/assets/img/product/fashion/23.jpg",
                "size": [
                    {
                        "name": "x",
                        "stock": 3
                    },
                    {
                        "name": "m",
                        "stock": 7
                    },
                    {
                        "name": "xl",
                        "stock": 0
                    },
                    {
                        "name": "xxl",
                        "stock": 7
                    }
                ]
            }
        ],
        "image": [
            "/assets/img/product/fashion/29.jpg",
            "/assets/img/product/fashion/30.jpg",
            "/assets/img/product/fashion/23.jpg",
            "/assets/img/product/fashion/24.jpg",
            "/assets/img/product/fashion/25.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"
    },
    {
        "id": "95",
        "sku": "asdf217",
        "name": "Lorem ipsum kids eight",
        "price": 29.85,
        "discount": 10,
        "offerEnd": "October 18, 2020 12:11:00",
        "new": false,
        "rating": 5,
        "saleCount": 83,
        "category": [
            "fashion",
            "kids"
        ],
        "tag": [
            "fashion",
            "kids"
        ],
        "stock": 0,
        "image": [
            "/assets/img/product/fashion/30.jpg",
            "/assets/img/product/fashion/23.jpg",
            "/assets/img/product/fashion/24.jpg",
            "/assets/img/product/fashion/25.jpg",
            "/assets/img/product/fashion/26.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"
    },
    {
        "id": "96",
        "sku": "asdf218",
        "name": "Lorem ipsum auto part one",
        "price": 16.4,
        "discount": 10,
        "new": true,
        "rating": 5,
        "saleCount": 20,
        "category": [
            "auto parts"
        ],
        "tag": [
            "auto parts"
        ],
        "stock": 15,
        "image": [
            "/assets/img/product/auto-parts/1.jpg",
            "/assets/img/product/auto-parts/2.jpg",
            "/assets/img/product/auto-parts/3.jpg",
            "/assets/img/product/auto-parts/4.jpg",
            "/assets/img/product/auto-parts/2.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
    },
    {
        "id": "97",
        "sku": "asdf219",
        "name": "Lorem ipsum auto part two",
        "price": 26.5,
        "discount": 0,
        "new": false,
        "rating": 4,
        "saleCount": 10,
        "category": [
            "auto parts"
        ],
        "tag": [
            "auto parts"
        ],
        "stock": 10,
        "image": [
            "/assets/img/product/auto-parts/2.jpg",
            "/assets/img/product/auto-parts/3.jpg",
            "/assets/img/product/auto-parts/4.jpg",
            "/assets/img/product/auto-parts/1.jpg",
            "/assets/img/product/auto-parts/3.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
    },
    {
        "id": "98",
        "sku": "asdf220",
        "name": "Lorem ipsum auto part three",
        "price": 14.2,
        "discount": 30,
        "new": true,
        "rating": 3,
        "saleCount": 30,
        "category": [
            "auto parts"
        ],
        "tag": [
            "auto parts"
        ],
        "stock": 13,
        "image": [
            "/assets/img/product/auto-parts/3.jpg",
            "/assets/img/product/auto-parts/4.jpg",
            "/assets/img/product/auto-parts/1.jpg",
            "/assets/img/product/auto-parts/2.jpg",
            "/assets/img/product/auto-parts/4.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
    },
    {
        "id": "99",
        "sku": "asdf221",
        "name": "Lorem ipsum auto part four",
        "price": 6.4,
        "discount": 0,
        "new": false,
        "rating": 2,
        "saleCount": 10,
        "category": [
            "auto parts"
        ],
        "tag": [
            "auto parts"
        ],
        "stock": 5,
        "image": [
            "/assets/img/product/auto-parts/4.jpg",
            "/assets/img/product/auto-parts/1.jpg",
            "/assets/img/product/auto-parts/2.jpg",
            "/assets/img/product/auto-parts/3.jpg",
            "/assets/img/product/auto-parts/2.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
    },
    {
        "id": "100",
        "sku": "asdf222",
        "name": "Lorem ipsum cake one",
        "price": 6.4,
        "discount": 0,
        "new": false,
        "rating": 5,
        "saleCount": 10,
        "category": [
            "cakes"
        ],
        "tag": [
            "cakes"
        ],
        "stock": 20,
        "image": [
            "/assets/img/product/cake-shop/1.jpg",
            "/assets/img/product/cake-shop/2.jpg",
            "/assets/img/product/cake-shop/3.jpg",
            "/assets/img/product/cake-shop/4.jpg",
            "/assets/img/product/cake-shop/5.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
    },
    {
        "id": "101",
        "sku": "asdf223",
        "name": "Lorem ipsum cake two",
        "price": 3,
        "discount": 10,
        "new": true,
        "rating": 4,
        "saleCount": 15,
        "category": [
            "cakes"
        ],
        "tag": [
            "cakes"
        ],
        "stock": 25,
        "image": [
            "/assets/img/product/cake-shop/2.jpg",
            "/assets/img/product/cake-shop/3.jpg",
            "/assets/img/product/cake-shop/4.jpg",
            "/assets/img/product/cake-shop/5.jpg",
            "/assets/img/product/cake-shop/6.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
    },
    {
        "id": "102",
        "sku": "asdf224",
        "name": "Lorem ipsum cake three",
        "price": 2.4,
        "discount": 10,
        "new": false,
        "rating": 5,
        "saleCount": 30,
        "category": [
            "cakes"
        ],
        "tag": [
            "cakes"
        ],
        "stock": 10,
        "image": [
            "/assets/img/product/cake-shop/3.jpg",
            "/assets/img/product/cake-shop/4.jpg",
            "/assets/img/product/cake-shop/5.jpg",
            "/assets/img/product/cake-shop/6.jpg",
            "/assets/img/product/cake-shop/7.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
    },
    {
        "id": "103",
        "sku": "asdf225",
        "name": "Lorem ipsum cake four",
        "price": 3.5,
        "discount": 10,
        "new": true,
        "rating": 4,
        "saleCount": 14,
        "category": [
            "cakes"
        ],
        "tag": [
            "cakes"
        ],
        "stock": 10,
        "image": [
            "/assets/img/product/cake-shop/4.jpg",
            "/assets/img/product/cake-shop/5.jpg",
            "/assets/img/product/cake-shop/6.jpg",
            "/assets/img/product/cake-shop/7.jpg",
            "/assets/img/product/cake-shop/8.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
    },
    {
        "id": "104",
        "sku": "asdf226",
        "name": "Lorem ipsum cake five",
        "price": 4.2,
        "discount": 0,
        "new": false,
        "rating": 5,
        "saleCount": 30,
        "category": [
            "cakes"
        ],
        "tag": [
            "cakes"
        ],
        "stock": 40,
        "image": [
            "/assets/img/product/cake-shop/5.jpg",
            "/assets/img/product/cake-shop/6.jpg",
            "/assets/img/product/cake-shop/7.jpg",
            "/assets/img/product/cake-shop/8.jpg",
            "/assets/img/product/cake-shop/1.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
    },
    {
        "id": "105",
        "sku": "asdf227",
        "name": "Lorem ipsum cake six",
        "price": 5.7,
        "discount": 30,
        "new": true,
        "rating": 3,
        "saleCount": 30,
        "category": [
            "cakes"
        ],
        "tag": [
            "cakes"
        ],
        "stock": 25,
        "image": [
            "/assets/img/product/cake-shop/6.jpg",
            "/assets/img/product/cake-shop/7.jpg",
            "/assets/img/product/cake-shop/8.jpg",
            "/assets/img/product/cake-shop/1.jpg",
            "/assets/img/product/cake-shop/2.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
    },
    {
        "id": "106",
        "sku": "asdf228",
        "name": "Lorem ipsum cake seven",
        "price": 6.5,
        "discount": 10,
        "new": true,
        "rating": 3,
        "saleCount": 20,
        "category": [
            "cakes"
        ],
        "tag": [
            "cakes"
        ],
        "stock": 40,
        "image": [
            "/assets/img/product/cake-shop/7.jpg",
            "/assets/img/product/cake-shop/8.jpg",
            "/assets/img/product/cake-shop/1.jpg",
            "/assets/img/product/cake-shop/2.jpg",
            "/assets/img/product/cake-shop/3.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
    },
    {
        "id": "107",
        "sku": "asdf229",
        "name": "Lorem ipsum cake eight",
        "price": 4.5,
        "discount": 10,
        "new": true,
        "rating": 3,
        "saleCount": 20,
        "category": [
            "cakes"
        ],
        "tag": [
            "cakes"
        ],
        "stock": 60,
        "image": [
            "/assets/img/product/cake-shop/8.jpg",
            "/assets/img/product/cake-shop/1.jpg",
            "/assets/img/product/cake-shop/2.jpg",
            "/assets/img/product/cake-shop/3.jpg",
            "/assets/img/product/cake-shop/4.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
    },
    {
        "id": "108",
        "sku": "asdf222",
        "name": "Lorem ipsum cake one",
        "price": 6.4,
        "discount": 0,
        "new": false,
        "rating": 5,
        "saleCount": 10,
        "category": [
            "cakes"
        ],
        "tag": [
            "cakes"
        ],
        "stock": 20,
        "image": [
            "/assets/img/product/cake-shop/1.jpg",
            "/assets/img/product/cake-shop/2.jpg",
            "/assets/img/product/cake-shop/3.jpg",
            "/assets/img/product/cake-shop/4.jpg",
            "/assets/img/product/cake-shop/5.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
    },
    {
        "id": "109",
        "sku": "asdf223",
        "name": "Lorem ipsum cake two",
        "price": 3,
        "discount": 10,
        "new": true,
        "rating": 4,
        "saleCount": 15,
        "category": [
            "cakes"
        ],
        "tag": [
            "cakes"
        ],
        "stock": 25,
        "image": [
            "/assets/img/product/cake-shop/2.jpg",
            "/assets/img/product/cake-shop/3.jpg",
            "/assets/img/product/cake-shop/4.jpg",
            "/assets/img/product/cake-shop/5.jpg",
            "/assets/img/product/cake-shop/6.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
    },
    {
        "id": "110",
        "sku": "asdf224",
        "name": "Lorem ipsum cake three",
        "price": 2.4,
        "discount": 10,
        "new": false,
        "rating": 5,
        "saleCount": 30,
        "category": [
            "cakes"
        ],
        "tag": [
            "cakes"
        ],
        "stock": 10,
        "image": [
            "/assets/img/product/cake-shop/3.jpg",
            "/assets/img/product/cake-shop/4.jpg",
            "/assets/img/product/cake-shop/5.jpg",
            "/assets/img/product/cake-shop/6.jpg",
            "/assets/img/product/cake-shop/7.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
    },
    {
        "id": "111",
        "sku": "asdf225",
        "name": "Lorem ipsum cake four",
        "price": 3.5,
        "discount": 10,
        "new": true,
        "rating": 4,
        "saleCount": 14,
        "category": [
            "cakes"
        ],
        "tag": [
            "cakes"
        ],
        "stock": 10,
        "image": [
            "/assets/img/product/cake-shop/4.jpg",
            "/assets/img/product/cake-shop/5.jpg",
            "/assets/img/product/cake-shop/6.jpg",
            "/assets/img/product/cake-shop/7.jpg",
            "/assets/img/product/cake-shop/8.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
    },
    {
        "id": "112",
        "sku": "asdf226",
        "name": "Lorem ipsum cake five",
        "price": 4.2,
        "discount": 0,
        "new": false,
        "rating": 5,
        "saleCount": 30,
        "category": [
            "cakes"
        ],
        "tag": [
            "cakes"
        ],
        "stock": 40,
        "image": [
            "/assets/img/product/cake-shop/5.jpg",
            "/assets/img/product/cake-shop/6.jpg",
            "/assets/img/product/cake-shop/7.jpg",
            "/assets/img/product/cake-shop/8.jpg",
            "/assets/img/product/cake-shop/1.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
    },
    {
        "id": "113",
        "sku": "asdf227",
        "name": "Lorem ipsum cake six",
        "price": 5.7,
        "discount": 30,
        "new": true,
        "rating": 3,
        "saleCount": 30,
        "category": [
            "cakes"
        ],
        "tag": [
            "cakes"
        ],
        "stock": 25,
        "image": [
            "/assets/img/product/cake-shop/6.jpg",
            "/assets/img/product/cake-shop/7.jpg",
            "/assets/img/product/cake-shop/8.jpg",
            "/assets/img/product/cake-shop/1.jpg",
            "/assets/img/product/cake-shop/2.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
    },
    {
        "id": "114",
        "sku": "asdf228",
        "name": "Lorem ipsum cake seven",
        "price": 6.5,
        "discount": 10,
        "new": true,
        "rating": 3,
        "saleCount": 20,
        "category": [
            "cakes"
        ],
        "tag": [
            "cakes"
        ],
        "stock": 40,
        "image": [
            "/assets/img/product/cake-shop/7.jpg",
            "/assets/img/product/cake-shop/8.jpg",
            "/assets/img/product/cake-shop/1.jpg",
            "/assets/img/product/cake-shop/2.jpg",
            "/assets/img/product/cake-shop/3.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
    },
    {
        "id": "115",
        "sku": "asdf229",
        "name": "Lorem ipsum cake eight",
        "price": 4.5,
        "discount": 10,
        "new": true,
        "rating": 3,
        "saleCount": 20,
        "category": [
            "cakes"
        ],
        "tag": [
            "cakes"
        ],
        "stock": 60,
        "image": [
            "/assets/img/product/cake-shop/8.jpg",
            "/assets/img/product/cake-shop/1.jpg",
            "/assets/img/product/cake-shop/2.jpg",
            "/assets/img/product/cake-shop/3.jpg",
            "/assets/img/product/cake-shop/4.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
    },
    {
        "id": "116",
        "sku": "asdf230",
        "name": "Lorem ipsum pet food one",
        "price": 6.4,
        "discount": 0,
        "new": false,
        "rating": 5,
        "saleCount": 10,
        "category": [
            "pet food"
        ],
        "tag": [
            "pet food"
        ],
        "stock": 20,
        "image": [
            "/assets/img/product/pet-food/1.jpg",
            "/assets/img/product/pet-food/2.jpg",
            "/assets/img/product/pet-food/3.jpg",
            "/assets/img/product/pet-food/4.jpg",
            "/assets/img/product/pet-food/5.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
    },
    {
        "id": "117",
        "sku": "asdf231",
        "name": "Lorem ipsum pet food two",
        "price": 3,
        "discount": 10,
        "new": true,
        "rating": 4,
        "saleCount": 15,
        "category": [
            "pet food"
        ],
        "tag": [
            "pet food"
        ],
        "stock": 25,
        "image": [
            "/assets/img/product/pet-food/2.jpg",
            "/assets/img/product/pet-food/3.jpg",
            "/assets/img/product/pet-food/4.jpg",
            "/assets/img/product/pet-food/5.jpg",
            "/assets/img/product/pet-food/6.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
    },
    {
        "id": "118",
        "sku": "asdf232",
        "name": "Lorem ipsum pet food three",
        "price": 2.4,
        "discount": 10,
        "new": false,
        "rating": 5,
        "saleCount": 30,
        "category": [
            "pet food"
        ],
        "tag": [
            "pet food"
        ],
        "stock": 10,
        "image": [
            "/assets/img/product/pet-food/3.jpg",
            "/assets/img/product/pet-food/4.jpg",
            "/assets/img/product/pet-food/5.jpg",
            "/assets/img/product/pet-food/6.jpg",
            "/assets/img/product/pet-food/7.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
    },
    {
        "id": "119",
        "sku": "asdf233",
        "name": "Lorem ipsum pet food four",
        "price": 3.5,
        "discount": 10,
        "new": true,
        "rating": 4,
        "saleCount": 14,
        "category": [
            "pet food"
        ],
        "tag": [
            "pet food"
        ],
        "stock": 10,
        "image": [
            "/assets/img/product/pet-food/4.jpg",
            "/assets/img/product/pet-food/5.jpg",
            "/assets/img/product/pet-food/6.jpg",
            "/assets/img/product/pet-food/7.jpg",
            "/assets/img/product/pet-food/8.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
    },
    {
        "id": "120",
        "sku": "asdf234",
        "name": "Lorem ipsum pet food five",
        "price": 4.2,
        "discount": 0,
        "new": false,
        "rating": 5,
        "saleCount": 30,
        "category": [
            "pet food"
        ],
        "tag": [
            "pet food"
        ],
        "stock": 40,
        "image": [
            "/assets/img/product/pet-food/5.jpg",
            "/assets/img/product/pet-food/6.jpg",
            "/assets/img/product/pet-food/7.jpg",
            "/assets/img/product/pet-food/8.jpg",
            "/assets/img/product/pet-food/1.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
    },
    {
        "id": "121",
        "sku": "asdf235",
        "name": "Lorem ipsum pet food six",
        "price": 5.7,
        "discount": 30,
        "new": true,
        "rating": 3,
        "saleCount": 30,
        "category": [
            "pet food"
        ],
        "tag": [
            "pet food"
        ],
        "stock": 25,
        "image": [
            "/assets/img/product/pet-food/6.jpg",
            "/assets/img/product/pet-food/7.jpg",
            "/assets/img/product/pet-food/8.jpg",
            "/assets/img/product/pet-food/1.jpg",
            "/assets/img/product/pet-food/2.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
    },
    {
        "id": "122",
        "sku": "asdf236",
        "name": "Lorem ipsum pet food seven",
        "price": 6.5,
        "discount": 10,
        "new": true,
        "rating": 3,
        "saleCount": 20,
        "category": [
            "pet food"
        ],
        "tag": [
            "pet food"
        ],
        "stock": 40,
        "image": [
            "/assets/img/product/pet-food/7.jpg",
            "/assets/img/product/pet-food/8.jpg",
            "/assets/img/product/pet-food/1.jpg",
            "/assets/img/product/pet-food/2.jpg",
            "/assets/img/product/pet-food/3.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
    },
    {
        "id": "123",
        "sku": "asdf237",
        "name": "Lorem ipsum pet food eight",
        "price": 4.5,
        "discount": 10,
        "new": true,
        "rating": 3,
        "saleCount": 20,
        "category": [
            "pet food"
        ],
        "tag": [
            "pet food"
        ],
        "stock": 60,
        "image": [
            "/assets/img/product/pet-food/8.jpg",
            "/assets/img/product/pet-food/1.jpg",
            "/assets/img/product/pet-food/2.jpg",
            "/assets/img/product/pet-food/3.jpg",
            "/assets/img/product/pet-food/4.jpg"
        ],
        "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
    }
];

export async function getAllProducts(req: Request, res: Response) {
    const { last_id } = req.query;

    let query: any = {};
    let countQuery: any = {};

    if(last_id) {
        query = {...countQuery, '_id': {'$gt':new ObjectId(last_id)}};
    } else {
        query = {...countQuery };
    }

    delete query.last_id;
    delete countQuery.last_id;

    try {
        const products = await Product.find(query).limit(API.DEFAULT_DATA_PER_PAGE);
        const total = await Product.find(countQuery).countDocuments()

        res.status(200).send(
            {
                data: products.length > 0 ? products : productsData,
                meta: {
                    total: total > 0 ? total : productsData.length,
                }
            }
        );
    } catch (error) {
        res.status(500).send({ status:500, message: error});
    }
}

export async function createProductHandler(
    req: IGetUserAuthInfoRequest,
    res: Response
  ) {
    try {
      let product = new Product({...req.body, number_id: numericCode(6)});
      await product.save();
      res.status(201).send({ message: "Product Created", data: product });
    } catch (err: any) {
      log.error(err);
      res.status(400).send({ status: 400, message: err?.message });
    }
  }

  export async function getProductHandler(req: Request, res: Response) {
    const id = req.params.id;
    const { isNumeric } = req.query;
    try {
        const product = !isNumeric ? await Product.findById(id) : await Product.findOne({ number_id: Number(id) });
        if (!product) return res.status(404).send('The Product with the given id was not found');

        res.status(200).send(product);
    } catch(err: any) {
        log.error(err);
      res.status(400).send({status: 400, message: err?.message});
    }
}

export async function updateProductHandler(req: IGetUserAuthInfoRequest, res: Response) {
    const id = req.params.id;

    try {
        const product = await Product.findByIdAndUpdate(id, { ...req.body });
        if (!product) return res.status(404).send('The product with the given id was not found');

        res.status(200).send({message: 'product Updated'});
    } catch(err: any) {
        log.error(err);
      res.status(400).send({status: 400, message: err?.message});
    }
}

export async function deleteProductHandler(req: IGetUserAuthInfoRequest, res: Response) {
    const id = req.params.id;
  
    try {
        await Product.remove(id)        
        res.status(200).send({ message: "Deleted"});
    } catch(err: any){
      log.error(err);
      res.status(400).send({status: 400, message: err?.message});
    }
  }