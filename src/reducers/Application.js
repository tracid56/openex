import * as Constants from '../constants/ActionTypes'
import {Map, List} from 'immutable'
import {mergeStore, mergeStoreDeep} from '../utils/Store'

const application = (state = Map(), action) => {

  switch (action.type) {

    // region EXERCISESTATUSES
    case Constants.APPLICATION_FETCH_EXERCISE_STATUSES_SUCCESS: {
      return state.withMutations(function (state) {
        mergeStore(state, action, ['entities', 'exercise_statuses'])
        state.setIn(['ui', 'loading'], false)
      })
    }
    //endregion

    // region INCIDENTTYPES
    case Constants.APPLICATION_FETCH_INCIDENT_TYPES_SUCCESS: {
      return state.withMutations(function (state) {
        mergeStore(state, action, ['entities', 'incident_types'])
        state.setIn(['ui', 'loading'], false)
      })
    }
    //endregion

    // region INJECTTYPES
    case Constants.APPLICATION_FETCH_INJECT_TYPES_SUCCESS: {
      return state.withMutations(function (state) {
        mergeStore(state, action, ['entities', 'inject_types'])
        state.setIn(['ui', 'loading'], false)
      })
    }
    //endregion

    // region INJECTSTATUSES
    case Constants.APPLICATION_FETCH_INJECT_STATUSES_SUCCESS: {
      return state.withMutations(function (state) {
        mergeStore(state, action, ['entities', 'inject_statuses'])
        state.setIn(['ui', 'loading'], false)
      })
    }
    //endregion

    // region FILES
    case Constants.APPLICATION_FETCH_FILES_SUCCESS: {
      return state.withMutations(function (state) {
        mergeStore(state, action, ['entities', 'files'])
        state.setIn(['ui', 'loading'], false)
      })
    }

    case Constants.APPLICATION_ADD_FILE_SUBMITTED: {
      return state.setIn(['ui', 'loading'], true)
    }

    case Constants.APPLICATION_ADD_FILE_SUCCESS: {
      return state.withMutations(function (state) {
        mergeStore(state, action, ['entities', 'files'])
        state.setIn(['ui', 'loading'], false)
      })
    }
    //endregion

    // region USERS
    case Constants.APPLICATION_FETCH_USERS_SUBMITTED: {
      return state.setIn(['ui', 'loading'], true)
    }

    case Constants.APPLICATION_FETCH_USERS_SUCCESS: {
      return state.withMutations(function (state) {
        mergeStore(state,action, ['entities', 'users'])
        mergeStore(state, action, ['entities', 'exercise_statuses'])
        state.setIn(['ui', 'loading'], false)
      })
    }

    case Constants.APPLICATION_FETCH_USERS_ERROR: {
      return state.setIn(['ui', 'loading'], false)
    }

    case Constants.APPLICATION_SEARCH_USERS_SUBMITTED: {
      return state.setIn(['ui', 'states', 'current_search_keyword'], action.payload)
    }

    case Constants.APPLICATION_ADD_USER_SUBMITTED: {
      return state.setIn(['ui', 'loading'], true)
    }

    case Constants.APPLICATION_ADD_USER_SUCCESS: {
      return state.withMutations(function (state) {
        mergeStore(state, action, ['entities', 'users'])
        state.setIn(['ui', 'loading'], false)
      })
    }

    case Constants.APPLICATION_ADD_USER_ERROR: {
      return state.setIn(['ui', 'loading'], false)
    }
    //endregion

    //region ORGANIZATIONS
    case Constants.APPLICATION_FETCH_ORGANIZATIONS_SUBMITTED: {
      return state.setIn(['ui', 'loading'], true)
    }

    case Constants.APPLICATION_FETCH_ORGANIZATIONS_SUCCESS: {
      return state.withMutations(function (state) {
        mergeStore(state,action, ['entities', 'organizations'])
        state.setIn(['ui', 'loading'], false)
      })
    }

    case Constants.APPLICATION_FETCH_ORGANIZATIONS_ERROR: {
      return state.setIn(['ui', 'loading'], false)
    }

    case Constants.APPLICATION_ADD_ORGANIZATION_SUBMITTED: {
      return state.setIn(['ui', 'loading'], true)
    }

    case Constants.APPLICATION_ADD_ORGANIZATION_SUCCESS: {
      return state.withMutations(function (state) {
        mergeStore(state, action, ['entities', 'organizations'])
        state.setIn(['ui', 'loading'], false)
      })
    }

    case Constants.APPLICATION_ADD_ORGANIZATION_ERROR: {
      return state.setIn(['ui', 'loading'], false)
    }
    //endregion

    //region EXERCISES
    case Constants.APPLICATION_FETCH_EXERCISES_SUBMITTED: {
      return state.setIn(['ui', 'loading'], true)
    }

    case Constants.APPLICATION_FETCH_EXERCISES_SUCCESS: {
      return state.withMutations(function (state) {
        mergeStore(state, action, ['entities', 'exercises'])
        mergeStore(state, action, ['entities', 'exercise_statuses'])
        state.setIn(['ui', 'loading'], false)
      })
    }

    case Constants.APPLICATION_FETCH_EXERCISES_ERROR: {
      return state.setIn(['ui', 'loading'], false)
    }

    case Constants.APPLICATION_FETCH_EXERCISE_SUBMITTED: {
      return state.setIn(['ui', 'loading'], true)
    }

    case Constants.APPLICATION_FETCH_EXERCISE_SUCCESS: {
      return state.withMutations(function (state) {
        mergeStore(state, action, ['entities', 'exercises'])
        mergeStore(state, action, ['entities', 'exercise_statuses'])
        state.setIn(['ui', 'loading'], false)
      })
    }

    case Constants.APPLICATION_FETCH_EXERCISE_ERROR: {
      return state.setIn(['ui', 'loading'], false)
    }

    case Constants.APPLICATION_ADD_EXERCISE_SUBMITTED: {
      return state.setIn(['ui', 'loading'], true)
    }

    case Constants.APPLICATION_ADD_EXERCISE_SUCCESS: {
      return state.withMutations(function (state) {
        mergeStore(state, action, ['entities', 'exercises'])
        state.setIn(['ui', 'loading'], false)
      })
    }

    case Constants.APPLICATION_ADD_EXERCISE_ERROR: {
      return state.setIn(['ui', 'loading'], false)
    }

    case Constants.APPLICATION_UPDATE_EXERCISE_SUBMITTED: {
      return state.setIn(['ui', 'loading'], true)
    }

    case Constants.APPLICATION_UPDATE_EXERCISE_SUCCESS: {
      return state.withMutations(function (state) {
        mergeStore(state, action, ['entities', 'exercises'])
        state.setIn(['ui', 'loading'], false)
      })
    }

    case Constants.APPLICATION_UPDATE_EXERCISE_ERROR: {
      return state.setIn(['ui', 'loading'], false)
    }

    case Constants.APPLICATION_DELETE_EXERCISE_SUBMITTED: {
      return state.setIn(['ui', 'loading'], true)
    }

    case Constants.APPLICATION_DELETE_EXERCISE_SUCCESS: {
      return state.withMutations(function (state) {
        state.deleteIn(['entities', 'exercises', action.payload])
        state.setIn(['ui', 'loading'], false)
      })
    }

    case Constants.APPLICATION_DELETE_EXERCISE_ERROR: {
      return state.setIn(['ui', 'loading'], false)
    }
    //endregion

    // region OBJECTIVES
    case Constants.APPLICATION_FETCH_OBJECTIVES_SUBMITTED: {
      return state.setIn(['ui', 'loading'], true)
    }

    case Constants.APPLICATION_FETCH_OBJECTIVES_SUCCESS: {
      return state.withMutations(function (state) {
        mergeStore(state, action, ['entities', 'objectives'])
        mergeStoreDeep(state, action, ['entities', 'subobjectives'])
        state.setIn(['ui', 'loading'], false)
      })
    }

    case Constants.APPLICATION_FETCH_OBJECTIVES_ERROR: {
      return state.setIn(['ui', 'loading'], false)
    }

    case Constants.APPLICATION_FETCH_OBJECTIVE_SUBMITTED: {
      return state.setIn(['ui', 'loading'], true)
    }

    case Constants.APPLICATION_FETCH_OBJECTIVE_SUCCESS: {
      return state.withMutations(function (state) {
        mergeStore(state, action, ['entities', 'objectives'])
        state.setIn(['ui', 'loading'], false)
      })
    }

    case Constants.APPLICATION_FETCH_OBJECTIVE_ERROR: {
      return state.setIn(['ui', 'loading'], false)
    }

    case Constants.APPLICATION_ADD_OBJECTIVE_SUBMITTED: {
      return state.setIn(['ui', 'loading'], true)
    }

    case Constants.APPLICATION_ADD_OBJECTIVE_SUCCESS: {
      return state.withMutations(function (state) {
        mergeStore(state, action, ['entities', 'objectives'])
        state.setIn(['ui', 'loading'], false)
      })
    }

    case Constants.APPLICATION_ADD_OBJECTIVE_ERROR: {
      return state.setIn(['ui', 'loading'], false)
    }

    case Constants.APPLICATION_UPDATE_OBJECTIVE_SUBMITTED: {
      return state.setIn(['ui', 'loading'], true)
    }

    case Constants.APPLICATION_UPDATE_OBJECTIVE_SUCCESS: {
      return state.withMutations(function (state) {
        mergeStore(state, action, ['entities', 'objectives'])
        state.setIn(['ui', 'loading'], false)
      })
    }

    case Constants.APPLICATION_UPDATE_OBJECTIVE_ERROR: {
      return state.setIn(['ui', 'loading'], false)
    }

    case Constants.APPLICATION_DELETE_OBJECTIVE_SUBMITTED: {
      return state.setIn(['ui', 'loading'], true)
    }

    case Constants.APPLICATION_DELETE_OBJECTIVE_SUCCESS: {
      return state.withMutations(function (state) {
        state.deleteIn(['entities', 'objectives', action.payload.get('objectiveId')])
        state.setIn(['ui', 'loading'], false)
      })
    }
    //endregion

    // region SUBOBJECTIVES
    case Constants.APPLICATION_FETCH_SUBOBJECTIVES_SUBMITTED: {
      return state.setIn(['ui', 'loading'], true)
    }

    case Constants.APPLICATION_FETCH_SUBOBJECTIVES_SUCCESS: {
      return state.withMutations(function (state) {
        mergeStore(state, action, ['entities', 'subobjectives'])
        state.setIn(['ui', 'loading'], false)
      })
    }

    case Constants.APPLICATION_FETCH_SUBOBJECTIVES_ERROR: {
      return state.setIn(['ui', 'loading'], false)
    }

    case Constants.APPLICATION_FETCH_SUBOBJECTIVE_SUBMITTED: {
      return state.setIn(['ui', 'loading'], true)
    }

    case Constants.APPLICATION_FETCH_SUBOBJECTIVE_SUCCESS: {
      return state.withMutations(function (state) {
        mergeStore(state, action, ['entities', 'subobjectives'])
        state.setIn(['ui', 'loading'], false)
      })
    }

    case Constants.APPLICATION_FETCH_SUBOBJECTIVE_ERROR: {
      return state.setIn(['ui', 'loading'], false)
    }

    case Constants.APPLICATION_ADD_SUBOBJECTIVE_SUBMITTED: {
      return state.setIn(['ui', 'loading'], true)
    }

    case Constants.APPLICATION_ADD_SUBOBJECTIVE_SUCCESS: {
      let objectiveId = action.payload.getIn(['entities', 'subobjectives', action.payload.get('result'), 'subobjective_objective'])
      action.payload = action.payload.setIn(['entities', 'objectives', objectiveId, 'objective_subobjectives'], new List([action.payload.get('result')]))
      return state.withMutations(function (state) {
        mergeStore(state, action, ['entities', 'subobjectives'])
        mergeStoreDeep(state, action, ['entities', 'objectives'])
        state.setIn(['ui', 'loading'], false)
      })
    }

    case Constants.APPLICATION_ADD_SUBOBJECTIVE_ERROR: {
      return state.setIn(['ui', 'loading'], false)
    }

    case Constants.APPLICATION_UPDATE_SUBOBJECTIVE_SUBMITTED: {
      return state.setIn(['ui', 'loading'], true)
    }

    case Constants.APPLICATION_UPDATE_SUBOBJECTIVE_SUCCESS: {
      return state.withMutations(function (state) {
        mergeStore(state, action, ['entities', 'subobjectives'])
        state.setIn(['ui', 'loading'], false)
      })
    }

    case Constants.APPLICATION_UPDATE_SUBOBJECTIVE_ERROR: {
      return state.setIn(['ui', 'loading'], false)
    }

    case Constants.APPLICATION_DELETE_SUBOBJECTIVE_SUBMITTED: {
      return state.setIn(['ui', 'loading'], true)
    }

    case Constants.APPLICATION_DELETE_SUBOBJECTIVE_SUCCESS: {
      let subObjectiveKey = state.getIn(['entities', 'objectives', action.payload.get('objectiveId'), 'objective_subobjectives']).keyOf(action.payload.get('subobjectiveId'))
      return state.withMutations(function (state) {
        state.deleteIn(['entities', 'objectives', action.payload.get('objectiveId'), 'objective_subobjectives', subObjectiveKey])
        state.deleteIn(['entities', 'subobjectives', action.payload.get('subobjectiveId')])
        state.setIn(['ui', 'loading'], false)
      })
    }
    //endregion

    // region AUDIENCES
    case Constants.APPLICATION_FETCH_AUDIENCE_SUBMITTED: {
      return state.setIn(['ui', 'loading'], true)
    }

    case Constants.APPLICATION_FETCH_AUDIENCE_SUCCESS: {
      return state.withMutations(function (state) {
        mergeStore(state, action, ['entities', 'audiences'])
        state.setIn(['ui', 'loading'], false)
      })
    }

    case Constants.APPLICATION_FETCH_AUDIENCE_ERROR: {
      return state.setIn(['ui', 'loading'], false)
    }

    case Constants.APPLICATION_SEARCH_AUDIENCES_SUBMITTED: {
      return state.setIn(['ui', 'states', 'current_search_keyword'], action.payload)
    }

    case Constants.APPLICATION_ADD_AUDIENCE_SUBMITTED: {
      return state.setIn(['ui', 'loading'], true)
    }

    /*
    case Constants.APPLICATION_ADD_AUDIENCE_SUCCESS: {
      let audienceId = action.payload.get('result')
      let exerciseId = action.payload.getIn(['entities', 'audiences', audienceId, 'audience_exercise'])
      return state.withMutations(function (state) {
        mergeStore(state, action, ['entities', 'audiences'])
        state.setIn(['ui', 'loading'], false)
        state.setIn(['ui', 'states', 'current_audiences', exerciseId], action.payload.get('result'))
      })
    }*/

    case Constants.APPLICATION_ADD_AUDIENCE_ERROR: {
      return state.setIn(['ui', 'loading'], false)
    }

    case Constants.APPLICATION_UPDATE_AUDIENCE_SUBMITTED: {
      return state.setIn(['ui', 'loading'], true)
    }

    case Constants.APPLICATION_UPDATE_AUDIENCE_SUCCESS: {
      return state.withMutations(function (state) {
        mergeStore(state, action, ['entities', 'audiences'])
        state.setIn(['ui', 'loading'], false)
      })
    }

    case Constants.APPLICATION_UPDATE_AUDIENCE_ERROR: {
      return state.setIn(['ui', 'loading'], false)
    }

    case Constants.APPLICATION_DELETE_AUDIENCE_SUBMITTED: {
      return state.setIn(['ui', 'loading'], true)
    }

    case Constants.APPLICATION_DELETE_AUDIENCE_SUCCESS: {
      return state.withMutations(function (state) {
        state.deleteIn(['entities', 'audiences', action.payload.get('audienceId')])
        state.setIn(['ui', 'states', 'current_audiences', action.payload.get('exerciseId')], undefined)
        state.setIn(['ui', 'loading'], false)
      })
    }


    //endregion

    // region EVENTS
    case Constants.APPLICATION_FETCH_EVENTS_SUBMITTED: {
      return state.setIn(['ui', 'loading'], true)
    }

    case Constants.APPLICATION_FETCH_EVENTS_SUCCESS: {
      return state.withMutations(function (state) {
        mergeStore(state, action, ['entities', 'events'])
        state.setIn(['ui', 'loading'], false)
      })
    }

    case Constants.APPLICATION_FETCH_EVENTS_ERROR: {
      return state.setIn(['ui', 'loading'], false)
    }

    case Constants.APPLICATION_FETCH_EVENT_SUBMITTED: {
      return state.setIn(['ui', 'loading'], true)
    }

    case Constants.APPLICATION_FETCH_EVENT_SUCCESS: {
      return state.withMutations(function (state) {
        mergeStore(state, action, ['entities', 'events'])
        state.setIn(['ui', 'loading'], false)
      })
    }

    case Constants.APPLICATION_FETCH_EVENT_ERROR: {
      return state.setIn(['ui', 'loading'], false)
    }

    case Constants.APPLICATION_ADD_EVENT_SUBMITTED: {
      return state.setIn(['ui', 'loading'], true)
    }

    case Constants.APPLICATION_ADD_EVENT_SUCCESS: {
      return state.withMutations(function (state) {
        mergeStore(state, action, ['entities', 'events'])
        state.setIn(['ui', 'loading'], false)
      })
    }

    case Constants.APPLICATION_ADD_EVENT_ERROR: {
      return state.setIn(['ui', 'loading'], false)
    }

    case Constants.APPLICATION_UPDATE_EVENT_SUBMITTED: {
      return state.setIn(['ui', 'loading'], true)
    }

    case Constants.APPLICATION_UPDATE_EVENT_SUCCESS: {
      return state.withMutations(function (state) {
        mergeStore(state, action, ['entities', 'events'])
        state.setIn(['ui', 'loading'], false)
      })
    }

    case Constants.APPLICATION_UPDATE_EVENT_ERROR: {
      return state.setIn(['ui', 'loading'], false)
    }

    case Constants.APPLICATION_DELETE_EVENT_SUBMITTED: {
      return state.setIn(['ui', 'loading'], true)
    }

    case Constants.APPLICATION_DELETE_EVENT_SUCCESS: {
      return state.withMutations(function (state) {
        state.deleteIn(['entities', 'events', action.payload.get('eventId')])
        state.setIn(['ui', 'loading'], false)
      })
    }
    //endregion

    // region INCIDENTS
    case Constants.APPLICATION_FETCH_INCIDENTS_SUBMITTED: {
      return state.setIn(['ui', 'loading'], true)
    }

    case Constants.APPLICATION_FETCH_INCIDENTS_SUCCESS: {
      return state.withMutations(function (state) {
        mergeStore(state, action, ['entities', 'incidents'])
        state.setIn(['ui', 'loading'], false)
      })
    }

    case Constants.APPLICATION_FETCH_INCIDENTS_ERROR: {
      return state.setIn(['ui', 'loading'], false)
    }

    case Constants.APPLICATION_FETCH_INCIDENT_SUBMITTED: {
      return state.setIn(['ui', 'loading'], true)
    }

    case Constants.APPLICATION_FETCH_INCIDENT_SUCCESS: {
      return state.withMutations(function (state) {
        mergeStore(state, action, ['entities', 'incidents'])
        state.setIn(['ui', 'loading'], false)
      })
    }

    case Constants.APPLICATION_FETCH_INCIDENT_ERROR: {
      return state.setIn(['ui', 'loading'], false)
    }

    case Constants.APPLICATION_ADD_INCIDENT_SUBMITTED: {
      return state.setIn(['ui', 'loading'], true)
    }

    case Constants.APPLICATION_ADD_INCIDENT_SUCCESS: {
      let incidentId = action.payload.get('result')
      let eventId = action.payload.getIn(['entities', 'incidents', incidentId, 'incident_event'])
      let exerciseId = action.payload.getIn(['entities', 'events', eventId, 'event_exercise'])
      console.log('ADD', incidentId, eventId, exerciseId)
      return state.withMutations(function (state) {
        mergeStore(state, action, ['entities', 'incidents'])
        state.setIn(['ui', 'loading'], false)
        state.setIn(['ui', 'states', 'current_incidents', exerciseId, eventId], action.payload.get('result'))
      })
    }

    case Constants.APPLICATION_ADD_INCIDENT_ERROR: {
      return state.setIn(['ui', 'loading'], false)
    }

    case Constants.APPLICATION_UPDATE_INCIDENT_SUBMITTED: {
      return state.setIn(['ui', 'loading'], true)
    }

    case Constants.APPLICATION_UPDATE_INCIDENT_SUCCESS: {
      return state.withMutations(function (state) {
        mergeStore(state, action, ['entities', 'incidents'])
        state.setIn(['ui', 'loading'], false)
      })
    }

    case Constants.APPLICATION_UPDATE_INCIDENT_ERROR: {
      return state.setIn(['ui', 'loading'], false)
    }

    case Constants.APPLICATION_DELETE_INCIDENT_SUBMITTED: {
      return state.setIn(['ui', 'loading'], true)
    }

    case Constants.APPLICATION_DELETE_INCIDENT_SUCCESS: {
      return state.withMutations(function (state) {
        state.deleteIn(['entities', 'incidents', action.payload.get('incidentId')])
        state.setIn(['ui', 'states', 'current_incidents', action.payload.get('exerciseId'), action.payload.get('eventId')], undefined)
        state.setIn(['ui', 'loading'], false)
      })
    }

    case Constants.APPLICATION_SELECT_INCIDENT: {
      return state.setIn(['ui', 'states', 'current_incidents', action.payload.exerciseId, action.payload.eventId], action.payload.incidentId)
    }
    //endregion

    //region INJECTS
    case Constants.APPLICATION_FETCH_INJECTS_SUBMITTED: {
      return state.setIn(['ui', 'loading'], true)
    }

    case Constants.APPLICATION_FETCH_INJECTS_SUCCESS: {
      return state.withMutations(function (state) {
        mergeStore(state, action, ['entities', 'injects'])
        mergeStore(state, action, ['entities', 'inject_statuses'])
        state.setIn(['ui', 'loading'], false)
      })
    }

    case Constants.APPLICATION_FETCH_INJECTS_ERROR: {
      return state.setIn(['ui', 'loading'], false)
    }

    case Constants.APPLICATION_FETCH_INJECT_SUBMITTED: {
      return state.setIn(['ui', 'loading'], true)
    }

    case Constants.APPLICATION_FETCH_INJECT_SUCCESS: {
      return state.withMutations(function (state) {
        mergeStore(state, action, ['entities', 'injects'])
        mergeStore(state, action, ['entities', 'inject_statuses'])
        state.setIn(['ui', 'loading'], false)
      })
    }

    case Constants.APPLICATION_FETCH_INJECT_ERROR: {
      return state.setIn(['ui', 'loading'], false)
    }

    case Constants.APPLICATION_ADD_INJECT_SUBMITTED: {
      return state.setIn(['ui', 'loading'], true)
    }

    case Constants.APPLICATION_ADD_INJECT_SUCCESS: {
      return state.withMutations(function (state) {
        mergeStore(state, action, ['entities', 'injects'])
        state.setIn(['ui', 'states', 'lastId'], action.payload.get('result'))
        state.setIn(['ui', 'loading'], false)
      })
    }

    case Constants.APPLICATION_ADD_INJECT_ERROR: {
      return state.setIn(['ui', 'loading'], false)
    }

    case Constants.APPLICATION_UPDATE_INJECT_SUBMITTED: {
      return state.setIn(['ui', 'loading'], true)
    }

    case Constants.APPLICATION_UPDATE_INJECT_SUCCESS: {
      return state.withMutations(function (state) {
        mergeStore(state, action, ['entities', 'injects'])
        state.setIn(['ui', 'loading'], false)
      })
    }

    case Constants.APPLICATION_UPDATE_INJECT_ERROR: {
      return state.setIn(['ui', 'loading'], false)
    }

    case Constants.APPLICATION_DELETE_INJECT_SUBMITTED: {
      return state.setIn(['ui', 'loading'], true)
    }

    case Constants.APPLICATION_DELETE_INJECT_SUCCESS: {
      return state.withMutations(function (state) {
        state.deleteIn(['entities', 'injects', action.payload])
        state.setIn(['ui', 'loading'], false)
      })
    }

    case Constants.APPLICATION_DELETE_INJECT_ERROR: {
      return state.setIn(['ui', 'loading'], false)
    }
    //endregion

    case Constants.APPLICATION_NAVBAR_LEFT_TOGGLE_SUBMITTED: {
      return state.setIn(['ui', 'navbar_left_open'], !state.getIn(['ui', 'navbar_left_open']))
    }

    case Constants.APPLICATION_NAVBAR_RIGHT_TOGGLE_SUBMITTED: {
      return state.setIn(['ui', 'navbar_right_open'], !state.getIn(['ui', 'navbar_right_open']))
    }

    default: {
      return state;
    }
  }
}

export default application;