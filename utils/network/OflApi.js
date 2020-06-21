import { fetchApi } from './ApiUtils';

const endPoints = {
	login: '/login',
	user: '/user/{userId}',
	resetPassword: '/forget-password',
	notifications: '/user/{userId}/notifications',
	saveDeviceToken: '/user/{userId}/savedevicetoken',
	uploadProfilePictureUrl: 'https://oxfitnesslab.com/api/user/{userId}/profilepicture?api_key={apiKey}'
};

export const login = payload => 
	fetchApi(endPoints.login, payload, 'post')

export const user = (userId) => {
	var endpoint = endPoints.user.replace("{userId}", userId)
	return fetchApi(endpoint, null, 'get')
}

export const resetPassword = payload => 
	fetchApi(endPoints.resetPassword, payload, 'post')

export const notifications = (userId) => {
	var endpoint = endPoints.notifications.replace("{userId}", userId)
	return fetchApi(endpoint, null, 'get')
}

//parameters[@"device_token"] = deviceToken;
export const saveDeviceToken = (userId, payload) => {
	var endpoint = endPoints.saveDeviceToken.replace("{userId}", userId)
	return fetchApi(endpoint, payload, 'post')
}

export const uploadProfilePicture = (userId, token, image) => {
	var endpoint = endPoints.uploadProfilePictureUrl
						.replace("{userId}", userId)
						.replace("{apiKey}", token)

	let formdata = new FormData()
	formdata.append('file_picture', {
		uri: image.path,
		type: image.mime,
		name: 'image.jpg',
	});
      
    return fetch(endpoint, {
        method: 'post',
        headers: { 'Content-Type': 'multipart/form-data'}, body: formdata
    })
}
	
