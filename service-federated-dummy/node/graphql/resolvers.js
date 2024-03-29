const dummys = [{
        id: "1",
        description: "Dummy 1",
    },
    {
        id: "2",     
        description: "Dummy 2",      
    },
    {
        id: "3",     
        description: "Dummy 3",    
    }
];

const createResolverMap = () => {
    return {
        Query: {
            getDummys: (root, args, context, info) => dummys,
            getDummys1: (root, args, context, info) => dummys,
            getDummys2: (root, args, context, info) => dummys,
            getDummys3: (root, args, context, info) => dummys,
            getDummys4: (root, args, context, info) => dummys
        },
        Dummy: {
            __resolveReference(object) {                
                return dummys.find(d => d.id === object.id);
            }
        }
    };
};

module.exports = {
    createResolverMap
};