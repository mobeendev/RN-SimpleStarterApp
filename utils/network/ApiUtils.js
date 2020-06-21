/* global fetch */

import fetchival from 'fetchival';
import _ from 'lodash';
import apiConfig from './config';
import { userToken } from '../store/user';

export const exceptionExtractError = (exception) => {
	if (!exception.Errors) return false;
	let error = false;
	const errorKeys = Object.keys(exception.Errors);
	if (errorKeys.length > 0) {
		error = exception.Errors[errorKeys[0]][0].message;
	}
	return error;
};

export const fetchApi = (endPoint, payload = {}, method = 'get', headers = {}) => {
	var accessToken = userToken;
	
	const url =  apiConfig.apiUrl + endPoint + "?user_token=" +accessToken + "&api_key=" + accessToken
	console.log('sending request ' + url);
	return fetchival(url, {
		headers: _.pickBy({
			...(accessToken ? {
				Authorization: `Bearer ${accessToken}`,
			} : {
				'Client-ID': apiConfig.clientId,
			}),
			...headers,
		}, item => !_.isEmpty(item)),
	})[method.toLowerCase()](payload)
	.then( (response) => {
		return response
	})
};

var ApiUtils = {  
    checkStatus: function(response) {
      if (response.ok) {
        return response;
      } else {
        let error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
    }
  };


  export { ApiUtils as default };