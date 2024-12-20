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
  faCheck,
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
import { VIDEO_SETTINGS_TABS } from '../../../common-shared/constants/video-settings-tabs';
import { playbackRateOptions } from '../../../common-shared/constants/playback-rate-options';

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

  icheck = faCheck;

  VIDEO = VIDEO;
  SETTINGS = VIDEO_SETTINGS_TABS;

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

  // Consider getting rid of currentPlaybackRate property.
  currentPlaybackRate = 1;
  playbackRateOptions = playbackRateOptions;

  showSettings = false;

  settingsTab: string = this.SETTINGS.General;

  ngOnInit() {
    this.video = this.videoPlayer.nativeElement;
  }

  changePlaybackRate(speed: number) {
    this.currentPlaybackRate = speed;
    this.video.playbackRate = this.currentPlaybackRate;
  }

  changeSettingsTab(tab: string) {
    this.settingsTab = tab;
  }

  @HostListener('document:click', ['$event'])
  handleClickOutsideSettings(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (this.showSettings && !target.closest('.settings')) {
      this.showSettings = false;
      this.changeSettingsTab(this.SETTINGS.General);
    }
  }

  toggleSettings($event: MouseEvent) {
    $event.stopPropagation();
    this.changeSettingsTab(this.SETTINGS.General);
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
    this.wasPlayingOnDrag = false;
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
    const target = event.target as HTMLElement;

    if (!target.closest('.video-container')) {
      return;
    }

    const clickX = event.offsetX;
    const progressBarWidth = target.offsetWidth;

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
