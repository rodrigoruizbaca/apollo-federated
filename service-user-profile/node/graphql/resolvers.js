const users = [{
        member_nrn: "nrn:member:2264819",
        profile: {
            display_name: "Rodrigo Ruiz",
            avatar: {
                key: "The key",
                small: "Small avatar",
                medium: "Medium avatar",
                large: "Larga avatar",
                provider: "The provider",    
            }       
        },         
    },
    {
        member_nrn: "nrn:member:2287665",
        profile: {
            display_name: "Keith Johnston"        
        }        
    },
    {
        member_nrn: "nrn:member:2243025",
        profile: {
            display_name: "User 1"         
        }         
    }
];

const createResolverMap = () => {
    return {
        Query: {
            getUserByNrn: (root, args, context, info) => users.find(u => u.nrn === args.nrn),
            getUsers: (root, args, context, info) => users
        },
        Member: {
            __resolveReference(object) {
                console.log("Object " + JSON.stringify(object));
                console.log("User " + JSON.stringify(users.find(user => user.member_nrn === object.member_nrn)));
                return users.find(user => user.member_nrn === object.member_nrn);
            }
        }
    };
};

module.exports = {
    createResolverMap
};