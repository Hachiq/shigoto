import {
  Component,
  ElementRef,
  HostListener,
  ViewChild
} from '@angular/core';
import { VIDEO } from '../../../common-shared/constants/video';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faAngleLeft,
  faAngleRight,
  faClosedCaptioning,
  faCog,
  faDownLeftAndUpRightToCenter,
  faGaugeHigh,
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

  isubtitles = faClosedCaptioning;
  ispeed = faGaugeHigh;

  iright = faAngleRight;
  ileft = faAngleLeft;

  VIDEO = VIDEO;

  @ViewChild('videoPlayer', { static: true }) videoPlayer!: ElementRef<HTMLVideoElement>;
  video!: HTMLVideoElement;

  isPlaying: boolean = false;
  isDragging: boolean = false;
  wasPlayingOnDrag: boolean = false;

  currentTime: number = 0;
  duration: number = 0;
  progress: number = 0;

  volume: number = 1;
  lastVolume: number = 1;

  currentPlaybackRate = 1;

  showSettings = false;

  ngOnInit() {
    this.video = this.videoPlayer.nativeElement;
  }

  @HostListener('document:click', ['$event'])
  handleClickOutsideSettings(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (this.showSettings && !target.closest('.settings')) {
      this.showSettings = false;
    }
  }

  toggleSettings($event: MouseEvent) {
    $event.stopPropagation();
    this.showSettings = !this.showSettings;
  }

  isFullscreen() {
    return !!document?.fullscreenElement;
  }

  toggleFullscreen(): void {
    const videoContainer = this.video.parentElement;
    if (!videoContainer) {
      return;
    }

    if (!this.isFullscreen()) {
      if (videoContainer.requestFullscreen) {
        videoContainer.requestFullscreen();
      } else if ((videoContainer as any).webkitRequestFullscreen) {
        (videoContainer as any).webkitRequestFullscreen();
      } else if ((videoContainer as any).msRequestFullscreen) {
        (videoContainer as any).msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen();
      } else if ((document as any).msExitFullscreen) {
        (document as any).msExitFullscreen();
      }
    }
  }

  setDuration() {
    this.duration = this.video.duration;
  }

  onPlay() {
    this.isPlaying = true;
    requestAnimationFrame(this.updateTime);
  }

  onPause() {
    this.isPlaying = false;
  }

  onSeeked() {
    requestAnimationFrame(this.updateTime);
  }

  updateTime = () => {
    this.currentTime = this.video.currentTime;
    this.progress = (this.video.currentTime / this.video.duration) * 100;
    requestAnimationFrame(this.updateTime); // Keep updating on the rendering cycle
  };

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
