import mongoose from 'mongoose';

const playerSchema = new mongoose.Schema(
	{
		puuid: {
			type: String,
			required: true,
			unique: true,
			index: true,
			trim: true,
		},
		summonerName: {
			type: String,
			required: true,
			trim: true,
		},
		tag: {
			type: String,
			required: true,
			trim: true,
		},
		profileIconId: {
			type: Number,
			required: true,
		},
		summonerLevel: {
			type: Number,
			required: true,
		},
		region: {
			type: String,
			required: true,
			trim: true,
			lowercase: true,
		},
	},
	{
		timestamps: true,
		collection: 'players',
	}
);

const Player = mongoose.model('Player', playerSchema);

export default Player;

