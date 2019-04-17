const graphql = require('graphql');
const _ = require('lodash');

const {GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList} = graphql;

var books = 
    [
    {name: 'book1', id: '1', genre: 'comedy', authorId: '1'},
    {name: 'book2', id: '2', genre: 'horror', authorId: '2'},
    {name: 'book3', id: '3', genre: 'romance', authorId: '3'},
    {name: 'book4', id: '4', genre: 'thriller', authorId: '4'}
    ]

var authors = 
    [
    {name: 'author1', id: '1', age: '44'},
    {name: 'author2', id: '2', age: '34'},
    {name: 'author3', id: '3', age: '24'},
    {name: 'author4', id: '4', age: '14'}
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
        },

        books:{
            type: new GraphQLList(BookType),
            args: {},
            resolve(parent,args){
                console.log(parent)
                return _.filter(books,{})
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query:RootQuery
})