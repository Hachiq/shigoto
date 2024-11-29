import {
  Component,
  ElementRef,
  HostListener,
  ViewChild
} from '@angular/core';
import { VIDEO } from '../../../common-shared/constants/video';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faCog,
  faDownLeftAndUpRightToCenter,
  faPause,
  faPlay,
  faRotateLeft,
  faRotateRight,
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

  ibackward = faRotateLeft;
  iforward = faRotateRight;

  isettings = faCog;

  iexpand = faUpRightAndDownLeftFromCenter;
  icollapse = faDownLeftAndUpRightToCenter;

  VIDEO = VIDEO;

  @ViewChild('videoPlayer', { static: true }) videoPlayer!: ElementRef<HTMLVideoElement>;
  @ViewChild('progressContainer', { static: true }) progressBarContainer!: ElementRef<HTMLVideoElement>;

  isPlaying: boolean = false;
  isDragging: boolean = false;
  wasPlayingOnDrag: boolean = false;

  currentTime: number = 0;
  duration: number = 0;
  progress: number = 0;

  volume: number = 1;
  lastVolume: number = 1;

  ngOnInit() {
    const video = this.videoPlayer.nativeElement;

    video.volume = this.volume;

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

  onVolumeChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.volume = parseFloat(input.value);

    this.videoPlayer.nativeElement.volume = this.volume;

    if (this.volume > 0) {
      this.lastVolume = this.volume;
    }
  }

  startDragging(event: MouseEvent): void {
    this.wasPlayingOnDrag = this.isPlaying;
    this.pause();
    this.isDragging = true;
    this.seek(event);
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (this.isDragging) {
      this.seek(event);
    }
  }

  @HostListener('document:mouseup')
  stopDragging(): void {
    this.isDragging = false;
    if (this.wasPlayingOnDrag) {
      this.play();
    }
  }

  play() {
    const video: HTMLVideoElement = this.videoPlayer.nativeElement;
    video.play();
  }

  pause() {
    const video: HTMLVideoElement = this.videoPlayer.nativeElement;
    video.pause();
  }

  togglePlayButton() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  toggleVolumeButton() {
    const video = this.videoPlayer.nativeElement;

    if (this.volume === 0) {
      this.volume = this.lastVolume || 1;
      video.volume = this.volume;
    } else {
      this.lastVolume = this.volume;
      this.volume = 0;
      video.volume = 0;
    }
  }

  seek(event: MouseEvent) {
    const progressBar = event.target as HTMLElement;
    const clickX = event.offsetX;
    const progressBarWidth = progressBar.offsetWidth;

    const video = this.videoPlayer.nativeElement;
    const newTime = (clickX / progressBarWidth) * video.duration;
    
    video.currentTime = newTime;
  }

  goBackward() {
    const video: HTMLVideoElement = this.videoPlayer.nativeElement;
    video.currentTime -= 10;
  }

  goForward() {
    const video: HTMLVideoElement = this.videoPlayer.nativeElement;
    video.currentTime += 10;
  }
}
