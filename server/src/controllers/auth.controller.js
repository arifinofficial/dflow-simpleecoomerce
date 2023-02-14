const userService = require('../services/user.service');
const defaultResponse = require('../utils/response');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res, next) => {
	const response = await userService.insert(req.body);
	return res.json(defaultResponse(true, '', response));
}

const login = async (req, res, next) => {
	let response = await userService.find({ username: req.body.username });

	if (response === null)
		response = await userService.find({ email: req.body.username });

	if (response === null)
		return res.status(400).json(defaultResponse(false, 'Wrong credential.'));

	const validatePassword = await bcrypt.compare(req.body.password, response.password);

	if (!validatePassword)
		return res.status(400).json(defaultResponse(false, 'Wrong credential.'));



	const updateUserResponse = await userService.generateAccessToken(response);

	res.cookie('refreshToken', updateUserResponse.refreshToken, {
		httpOnly: true,
		maxAge: 24 * 60 * 60 * 1000
	});

	const { password, refreshToken, ...data } = updateUserResponse;

	return res.json(defaultResponse(true, 'Success', data));
}

const refreshToken = async (req, res, next) => {
	try {
		const refreshToken = req.cookies.refreshToken;

		if (!refreshToken)
			return res.status(401).json(defaultResponse(false, 'Unauthorized'));

		let user = await userService.find({ refreshToken: refreshToken });
		
		if (!refreshToken)
			return res.status(401).json(defaultResponse(false, 'Unauthorized'));

		jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
			if (err)
				return res.status(403).json(defaultResponse(false, 'Forbidden'));

			const getAccessToken = await userService.generateRefreshToken(user);

			const { password, refreshToken, ...data } = getAccessToken;

			res.json(defaultResponse(true, 'Success', data));
		});

		return;
	} catch (error) {

	}
}

const logout = async (req, res) => {
	const refreshToken = req.cookies.refreshToken;

	if (!refreshToken)
		return res.status(204).json(defaultResponse(false, 'No content.'));

	let user = await userService.find({ refreshToken: refreshToken });

	if (!refreshToken)
		return res.status(204).json(defaultResponse(false, 'No content.'));

	const logout = await userService.logout(res, user._id);

	if (!logout)
		return res.status(500).json(defaultResponse(false, 'Error'));

	return res.json(defaultResponse(true, 'Success'));
}

module.exports = {
	register,
	login,
	refreshToken,
	logout
};
