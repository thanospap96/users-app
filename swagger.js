const m2s = require('mongoose-to-swagger');
const User = require('./models/user.model');



exports.options = {
  "components": {
    "schemas": {
      User: m2s(User)
    }
  },
  "openapi": "3.1.0",
  "info": {
    "version": "1.0.0",
    "title": "Users and Products CRUD API",
    "description":"An application for creating users and choosing product",
    "contact": {
      "name": "API Support",
      "url": "http://aueb.gr",
      "email":"support@example.com"
    }
  },
  "servers": [
    {
      url: "http://localhost:3000",
      description:"Local Server"
    },
    {
      url:"http://www.backend.aueb.gr",
      description:"Testing server"
    }
  ],
  "tags": [
    {
      "name":"Users",
      "description": "Endpoints for User"
    },
    {
      "name": "Users and Products",
      "description": "Endpoints for users and their products"
    },
    {
      "name": "Auth",
      "description":"Endpoints for Authentication"
    }
  ],
  "paths": {
    "/api/users": {
      "get": {
        "tags":["Users"],
        "description":"Returns a list of all users",
        "responses":{
          "200":{
            "description": "List of all users",
            "content": {
              "application/json": {
                "schema": {
                  "type":"array",
                  "items": {
                    "$ref":"#/components/schemas/User"
                  }
                }
              }
            }
          }
        }
      },      
    },
    "/api/users/{username}":{
      "get": {
        "tags": ["users"],
        "parameters": [
          {
            "name":"username",
            "in":"path",
            "required": true,
            "description": "Username of user that we want to find",
            "type": "string"
          }
        ],
        "description": "Return users details for specific",
        "responses": {
          "200": {
            "description": "User details",
            "content": {
              "application/json": {
                       "schema": {
              "$ref": "#/components/schemas/User"
               }
              }
            }
          }
        }
      }    
    },
    "/api/auth/login": {
      "post": {
        "tags": ["Auth"],
        "description": "Login User",
        "requestBody": {
          "description": "Users send username and password and and for response we have jwt token",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "username": { "type" : "string" },
                  "password": { "type": "string" }
                },
                "required": ["username", "password"]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Token returned"
          }
        }
      }
    }
  }
}