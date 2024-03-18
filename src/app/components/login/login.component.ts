import { Component } from '@angular/core';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrl: './login.component.scss',
})
export class LoginComponent {
	videos = [
		'../../../assets/Videos/video_login.mp4',
		'../../../assets/Videos/screensound_video1.mp4',
	];
	videoIndex = 0;

	constructor() {}

	playNextVideo() {
		this.videoIndex++;
		if (this.videoIndex >= this.videos.length) {
			this.videoIndex = 0;
		}
	}
}
