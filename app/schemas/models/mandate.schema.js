// TODO: This file was created by bulk-decaffeinate.
// Sanity-check the conversion and remove this comment.
let MandateSchema
const c = require('./../schemas')

module.exports = (MandateSchema = {
  type: 'object',
  additionalProperties: false,
  default: {
    simulationThroughputRatio: 1,
    sessionSaveDelay: {
      registered: { min: 4, max: 10 },
      anonymous: { min: 5, max: 15 }
    }
  },
  // registered: {min: 10, max: 30}  # High load, like during HoC scaling
  // anonymous: {min: 20, max: 60}
  properties: {
    simulationThroughputRatio: {
      name: 'Simulation Throughput Ratio',
      description: '0-1 fraction of requests for a match to simulate that should be granted.',
      type: 'number',
      minimum: 0,
      maximum: 1
    },
    sessionSaveDelay: {
      name: 'Session Save Delay',
      description: 'How often we save level sessions after code changes--min and max wait in seconds.',
      type: 'object',
      properties: {
        registered: {
          description: 'How often to save for registered players.',
          type: 'object',
          additionalProperties: false,
          requiredProperties: ['min', 'max'],
          properties: {
            min: { type: 'number', minimum: 1, exclusiveMinimum: true, format: 'seconds' },
            max: { type: 'number', minimum: 5, exclusiveMinimum: true, format: 'seconds' }
          }
        },
        anonymous: {
          description: 'How often to save for anonymous players.',
          type: 'object',
          additionalProperties: false,
          requiredProperties: ['min', 'max'],
          properties: {
            min: { type: 'number', minimum: 1, exclusiveMinimum: true, format: 'seconds' },
            max: { type: 'number', minimum: 5, exclusiveMinimum: true, format: 'seconds' }
          }
        }
      }
    },
    latestAnnouncement: c.int(),
    currentTournament:
      c.array({ description: 'The arrays of the current active tournament, if any.' },
        c.object({}, {
          level: 'string',
          courseInstanceID: c.objectId(),
          startAt: 'integer',
          endAt: 'integer',
          name: 'string'
        }
        )
      ),
    tournamentOnlyLevels: c.array({ description: 'levels only accessible during tournament with specific course instance id' }, 'string'),
    experimentProbabilities: {
      type: 'object',
      description: 'Mapping of experiment names to experimental values and their probabilities, like `{m7: {control: 0.75, experiment: 0.25}}`',
      additionalProperties: {
        type: 'object',
        description: 'Mapping of experimental values to their probabilities, like `{control: 0.75, experiment: 0.25}`',
        additionalProperties: c.pct({ description: 'Probability of being assigned to this experiment value' })
      }
    }
  }
})

c.extendBasicProperties(MandateSchema, 'Mandate')
