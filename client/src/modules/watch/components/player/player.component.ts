import { Component, ElementRef, ViewChild } from '@angular/core';
import { VIDEO } from '../../../common-shared/constants/video';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faBackward,
  faCog,
  faDownLeftAndUpRightToCenter,
  faForward,
  faPause,
  faPlay,
  faUpRightAndDownLeftFromCenter,
  faVolumeHigh,
  faVolumeLow,
  faVolumeMute
} from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { TimePipe } from '../../../common-shared/pipes/time.pipe';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    TimePipe
  ],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss'
})
export class PlayerComponent {
  iplay = faPlay;
  ipause = faPause;

  ivolumemute = faVolumeMute;
  ivolumelow = faVolumeLow;
  ivolumehigh = faVolumeHigh;

  ibackward = faBackward;
  iforward = faForward;

  isettings = faCog;

  iexpand = faUpRightAndDownLeftFromCenter;
  icollapse = faDownLeftAndUpRightToCenter;

  VIDEO = VIDEO;

  @ViewChild('videoPlayer', { static: true }) videoPlayer!: ElementRef<HTMLVideoElement>;

  isPlaying = false;

  currentTime: number = 0;
  duration: number = 0;
  progress: number = 0;

  ngOnInit() {
    const video = this.videoPlayer.nativeElement;

    video.addEventListener('loadedmetadata', () => {
      this.duration = video.duration;
    });

    video.addEventListener('play', () => {
      this.isPlaying = true;
      requestAnimationFrame(updateTime);
    });

    video.addEventListener('pause', () => {
      this.isPlaying = false;
    });

    video.addEventListener('seeked', () => {
      requestAnimationFrame(updateTime);
    });

    const updateTime = () => {
      this.currentTime = video.currentTime;
      this.progress = (video.currentTime / video.duration) * 100;
      requestAnimationFrame(updateTime); // Keep updating on the rendering cycle
    };
  }

  play() {
    const video: HTMLVideoElement = this.videoPlayer.nativeElement;
    video.play();
  }

  pause() {
    const video: HTMLVideoElement = this.videoPlayer.nativeElement;
    video.pause();
  }

  togglePlay() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  seek(event: MouseEvent) {
    const progressBar = event.target as HTMLElement;
    const clickX = event.offsetX;
    const progressBarWidth = progressBar.offsetWidth;

    const video = this.videoPlayer.nativeElement;
    const newTime = (clickX / progressBarWidth) * video.duration;
    this.seekTo(newTime);
  }

  seekTo(time: number) {
    const video: HTMLVideoElement = this.videoPlayer.nativeElement;
    video.currentTime = time;
  }
}
