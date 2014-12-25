var validActors = [
  { "$ref": "#/definitions/objectTypes/person" }
];

var validTargets = validActors;

var validObjects = validActors;
validObjects.push({ "$ref": "#/definitions/objectTypes/credentials" });


module.exports = function (platforms, verbs) {

  var platformSchema = {
    "type": "string"
  };
  var verbSchema = {
    "type": "string"
  };

  if (platforms) {
    platformSchema.enum = platforms;
  }

  if (verbs) {
    verbSchema.enum = verbs;
  }

  return {
    "id": "http://sockethub.org/activity-stream-schema#",
    "$schema": "http://json-schema.org/draft-04/schema#",
    "description": "schema for Sockethub Activity Streams",

    "type": "object",
    "required" : [ "id", "verb", "platform", "actor" ],
    "properties": {
      "id": {
        "type": "string"
      },
      "verb": verbSchema,
      "platform": platformSchema,
      "actor": {
        "type": "object",
        "oneOf": validActors
      },
      "target": {
        "type": "object",
        "oneOf": validTargets
      },
      "object": {
        "type": "object",
        "oneOf": validObjects
      },
    },

    "definitions": {
      "objectTypes": {

        "person": {
          "required": [ "objectType", "displayName" ],
          "additionalProperties": true,
          "properties": {
            "objectType": {
              "enum": [ "person" ]
            },
            "displayName": {
              "type": "string"
            }
          }
        },

        "credentials": {
          "required": [ "objectType" ],
          "additionalProperties": true,
          "properties": {
            "objectType": {
              "enum": [ "credentials" ]
            }
          }
        }
      }
    }
  };
};