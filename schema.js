const graphql = require('graphql');
const _ = require('lodash');

const {GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList} = graphql;

var books = 
    [
    {name: 'book1', id: '1', genre: 'comedy', authorId: '1'}
    ]

var authors = 
    [
    {name: 'author1', id: '1', age: '44'}
    ]

    

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: ()=>({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author: {
            type: AuthorType,
            resolve(parent,args){
                console.log("\nParent : ",parent)
                return _.find(authors,{id: parent.authorId})
            }
        }
    }) 
})

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: ()=>({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        books: {
            type: new GraphQLList(BookType),
            resolve(parent,args){
                console.log("Coming Inside Books subquery, val of Args: ",args)
                return _.filter(books,{authorId: parent.id})
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
       book:{
            type: BookType,
            args: {id: {type: GraphQLID}},
            resolve(parent,args){
               return _.find(books,{id: args.id})
            }
        },
        
        author:{
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                return _.find(authors,{id:args.id})
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query:RootQuery
})