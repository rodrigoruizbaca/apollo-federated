const posts = [{
        post_id: "1",
        resource_id: "1",
        comment: "comment 1",
        created_by: "nrn:member:2264819",
        dummy: ["1", "3", "2"]            
    },
    {
        post_id: "2",
        resource_id: "1",
        comment: "comment 2",
        created_by: "nrn:member:2264819" ,
        dummy: ["1", "2"]       
    },
    {
        post_id: "3",
        resource_id: "1",
        comment: "comment 3",
        created_by: "nrn:member:2264819" ,
        dummy: ["1", "2"]           
    },
    {
        post_id: "4",
        resource_id: "1",
        comment: "comment 4",
        created_by: "nrn:member:2287665" ,
        dummy: ["2"]                
    },
    {
        post_id: "5",
        resource_id: "1",
        comment: "comment 5",
        created_by: "nrn:member:2287665" ,
        dummy: ["1", "3"]                  
    },
    {
        post_id: "6",
        resource_id: "1",
        comment: "comment 6",
        created_by: "nrn:member:2287665" ,
        dummy: ["1", "3"]             
    },
    {
        post_id: "7",
        resource_id: "1",
        comment: "comment 7",
        created_by: "nrn:member:2243025",
        dummy: ["1", "3", "2"]                  
    },
    {
        post_id: "8",
        resource_id: "1",
        comment: "comment 8",
        created_by: "nrn:member:2243025",
        dummy: ["1", "3", "2"]                          
    },
    {
        post_id: "9",
        resource_id: "1",
        comment: "comment 9",
        created_by: "nrn:member:2243025" ,
        dummy: ["1", "3", "2"]                            
    }
];

const resources = [
    {
        resource_id: "1",
        name: "Resource 1"
    },
    {
        resource_id: "2",
        name: "Resource 2"
    },
    {
        resource_id: "3",
        name: "Resource 3"
    }
];

const createResolverMap = () => {
    return {
        Query: {
            posts: (root, args, context, info) => {
                const found = posts.filter(p => p.resource_id === args.resource_id);
                return found;
            },
            post: (root, args, context, info) => {
                const found = posts.filter(p => p.resource_id === args.resource_id && p.post_id === args.post_id)[0];
                return found;
            },
            getResources: (root, args, context, info) => resources
        },
        Post: {
            created_by(post) {
                return { __typename: "Member", member_nrn: post.created_by };
            },
            dummy(post) {
                console.log(`post ${JSON.stringify(post)}`);
                return post.dummy.map(p => {
                    return {
                        __typename: "Dummy", id: p
                    }
                });
                //return { __typename: "Dummy", id: post.dummy };
            }
        },
    };
};

module.exports = {
    createResolverMap
};