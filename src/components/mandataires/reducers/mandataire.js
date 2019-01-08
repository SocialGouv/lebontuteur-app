//

import piwik from "react-piwik";

const MANDATAIRE_INITIAL_STATE = {
  // store some user mandataire data
  profile: {
    mesures_en_cours: 0
  },
  // store etablissement for autompletes and getDisplayValue
  finess: [],
  codePostaux: [],
  // store tis for autompletes and getDisplayValue
  tis: []
};

const mandataireReducer = (state = MANDATAIRE_INITIAL_STATE, action) => {
  switch (action.type) {
    case "MANDATAIRE_PROFILE_UPDATED":
      // Track when mandataires are changing them maximum desired measures
      if (state.profile.dispo_max !== action.data.dispo_max) {
        piwik.push([
          "trackEvent",
          "Mandataire",
          "Updated profile",
          "Max desired measures",
          action.data.dispo_max
        ]);
      }

      return {
        ...state,
        profile: action.data
      };
    case "FINESS_UPDATED":
      return {
        ...state,
        finess: action.data
      };
    case "CODE_POSTAL_UPDATED":
      return {
        ...state,
        codePostaux: action.data
      };
    case "TIS_UPDATED":
      return {
        ...state,
        tis: action.data
      };
    case "MESURE_REACTIVATED":
    case "MESURE_CREATED":
      return {
        ...state,
        profile: {
          ...state.profile,
          mesures_en_cours: state.profile.mesures_en_cours + 1
        }
      };
    case "MESURE_CLOSED":
      return {
        ...state,
        profile: {
          ...state.profile,
          mesures_en_cours: state.profile.mesures_en_cours - 1
        }
      };
    default:
      return state;
  }
};

export default mandataireReducer;
