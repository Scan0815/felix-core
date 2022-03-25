import {Component, Element, Event, EventEmitter, h, Host, Method, Prop, State} from '@stencil/core';
import {FileStackToPreviewUrl, FileStackToVideoUrl} from '../../../helpers/file-stack-utils';
import {IFileStack} from '../../../interfaces/filestack';

@Component({
  tag: 'flx-file-stack-video',
  styleUrl: 'stack-video.scss',
  shadow: true
})
export class StackVideo {
  @Prop() fileStack: IFileStack|undefined;
  @Prop() srcVideo: string|undefined;
  @Prop() loopVideo: boolean = true;
  @Prop() autoPlayVideo: boolean = true;
  @Prop() onlyPreview: boolean = false;
  @Prop({mutable: true}) mutedVideo: boolean = true;
  @Prop() showControls: boolean = false;
  @Prop() trackViewTimeout = null;
  @Prop() muteButton = false;
  @Prop() fullScreenButton = true;
  @Prop() autoAspectRatio = true;
  @Prop() volume = 0.7;
  @Prop() rootElement: HTMLElement|undefined;
  @Prop({mutable: true}) preload = 'metadata';
  @State() progressBarValue = 0;
  @State() addPlayButton = false;
  @State() loading = false;
  @Element() el!: HTMLElement;
  @Event() trackViewVideo: EventEmitter|undefined;

  private muteButtonEl: HTMLIonButtonElement|undefined;
  private videoEl: HTMLVideoElement|undefined;
  private progressBarEl: HTMLIonProgressBarElement|undefined;
  private seekBarEl: HTMLInputElement|undefined;
  private posterEl: HTMLImageElement|undefined;
  private timeOutId: number|undefined;
  private animationTimeOutId: number|undefined;
  private isPaused = true;

  addSrc(fileStack: IFileStack|undefined, srcVideo: any) {
    if(fileStack || srcVideo) {
      this.videoEl?.setAttribute('src', srcVideo ? srcVideo : fileStack && FileStackToVideoUrl(fileStack));
      this.videoEl?.load();
    }
  }

  removeSrc() {
      this.videoEl?.removeAttribute('src');
    this.videoEl?.load();
  }

  @Method()
  async switchMuteState() {
    await this.switchMute();
  }

  componentDidLoad() {
    this.videoEl?.addEventListener("timeupdate", () => {
      this.updateDuration()
    }, true);
    this.videoEl?.addEventListener("play", () => {
      this.hideLoading();
      this.hidePoster();
    }, true);
    this.videoEl?.addEventListener('waiting', () => {
      this.showLoading()
    }, true);
    this.videoEl?.addEventListener('canplaythrough', () => {
      this.hideLoading();
      this.hidePoster();
    }, true);
    if (!!navigator.platform.match(/iPhone|iPod|iPad/)) {
      this.seekBarEl?.addEventListener("touchend", (e) => {
        this.iosPolyfill(e)
      }, true);
    }
    if (!this.onlyPreview) {
      this.createObserver();
    }
    if (!this.autoPlayVideo) {
      this.addPoster();
    }
  }

  disconnectedCallback() {
    if (this.videoEl) {
      this.videoEl.removeEventListener("timeupdate", () => {
        this.updateDuration()
      }, true);
      this.videoEl.removeEventListener('waiting', () => {
        this.showLoading()
      }, true);
      this.videoEl.removeEventListener('canplaythrough', () => {
        this.hideLoading()
      }, true);
    }
    this.removeTrackView();
    if (!!navigator.platform.match(/iPhone|iPod|iPad/)) {
      this.seekBarEl?.removeEventListener("touchend", (e) => {
        this.iosPolyfill(e)
      }, true);
    }
  }

  showPoster() {
    this.posterEl?.classList.remove('hide');
  }

  hidePoster() {
    this.posterEl?.classList.add('hide');
  }

  showLoading() {
    this.loading = true;
  }

  hideLoading() {
    this.loading = false;
  }

  play() {
    this.videoEl?.play().then(() => {
      this.videoEl?.classList.remove('pause');
      this.hidePoster();
      this.preload = "metadata";
      this.isPaused = false;
    }, () => {
      this.addPlayButton = true;
      this.loading = false;
    });
  }

  clickPlay() {
    this.addPlayButton = false;
    this.addSrc(this.fileStack, this.srcVideo);
    this.play();
    this.mutedVideo = false;
    if (this.videoEl) {
      this.videoEl.volume = this.volume;
    }
    this.createTrackView();
  }

  pause() {
    if (this.videoEl) {
      this.videoEl.pause();
      this.videoEl?.classList.add('pause');
      this.preload = "none";
      this.isPaused = true;
    }
  }

  createObserver() {
    let observer;
    let options = {
      root: this.rootElement,
      threshold: 0.5
    };
    if (!!window.IntersectionObserver) {
      observer = new IntersectionObserver((entries) => {
        this.handleIntersect(entries)
      }, options);
      observer.observe(this.el);
    }
  }

  handleIntersect(entries: IntersectionObserverEntry[]) {
    entries.forEach(entry => {
      if (entry.intersectionRatio <= 0.5 && !this.videoEl?.paused) {
        this.pause();
        this.removeTrackView();
        if (!this.autoPlayVideo) {
          this.addPoster();
          this.hideLoading();
        } else {
          this.showLoading();
        }
        this.removeSrc();
      } else if (this.isPaused) {
        if (entry.intersectionRatio >= 0.5) {
          if (!this.autoPlayVideo) {
            this.addPoster();
            this.hideLoading();
          } else {
            this.addSrc(this.fileStack, this.srcVideo);
            this.play();
            this.createTrackView();
          }
        }
      }
    });
  }


  addPoster() {
    this.addPlayButton = true;
    this.showPoster();
  }

  removeTrackView() {
    if (this.timeOutId) {
      clearTimeout(this.timeOutId);
    }
  }

  createTrackView() {
    if (this.trackViewTimeout) {
      this.removeTrackView();
      this.timeOutId = window.setTimeout(() => {
        this.trackViewVideo?.emit(this.fileStack);
      }, this.trackViewTimeout);
    }
  }

  async switchFullScreen(event?:Event) {
    if (event) {
      event.preventDefault();
      event.stopImmediatePropagation();
      event.stopPropagation();
    }
    // @ts-ignore
    if (this.videoEl && this.videoEl["webkitEnterFullscreen"]) {
      // @ts-ignore
      await this.videoEl["webkitEnterFullscreen"]();
    } else if (this.videoEl?.requestFullscreen) {
      await this.videoEl?.requestFullscreen();
    }
  }

  switchMute(event?:Event) {

    if (event) {
      event.preventDefault();
      event.stopImmediatePropagation();
      event.stopPropagation();
    }

    this.mutedVideo = !this.mutedVideo;
    if (!this.mutedVideo && this.videoEl) {
      this.videoEl.volume = this.volume;
    }

    this.muteButtonEl?.classList.remove('fadeInAndOut');

    if (this.animationTimeOutId) {
      clearTimeout(this.animationTimeOutId);
    }

    this.animationTimeOutId = window.setTimeout(() => {
      this.muteButtonEl?.classList.add('fadeInAndOut');
    }, 100);

    this.play();
  }

  updateDuration() {
    if (this.progressBarEl && this.videoEl) {
      this.progressBarValue = ((100 / this.videoEl?.duration) * this.videoEl?.currentTime) / 100;
      if (isNaN(this.progressBarValue)) {
        this.progressBarValue = 0.0
      }
      if(this.seekBarEl) {
        this.seekBarEl.value = this.progressBarValue.toString();
      }
    }
  }

  skipAhead() {
    if (this.progressBarEl && this.videoEl) {
      const seekBarValue = this.seekBarEl?.value || "0";
      let currentTime = parseFloat((this.videoEl?.duration * (parseFloat(seekBarValue) * 100) / 100).toString());
      if (isNaN(currentTime)) {
        currentTime = 0.0
      }
      this.videoEl.currentTime = currentTime;
      this.progressBarValue = parseFloat(((100 / this.videoEl?.duration) * currentTime / 100).toString());
      if (isNaN(this.progressBarValue)) {
        this.progressBarValue = 0.0
      }
      if(this.seekBarEl) {
        this.seekBarEl.value = this.progressBarValue.toString();
      }
    }
  }

  iosPolyfill(e:any) {

   const boundingClientRect = this.seekBarEl?.getBoundingClientRect();
   let val = 0;
   let max = 0;
   if(boundingClientRect){
     val = (e.pageX - boundingClientRect.left) / (boundingClientRect.right - boundingClientRect.left);
   }
    const maxAttribute = this.seekBarEl?.getAttribute("max");
    if(maxAttribute){
      max = parseInt(maxAttribute);
    }

    const segment = 1 / (max - 1);
    let segmentArr = [];
    max++;
    for (let i = 0; i < max; i++) {
      segmentArr.push(segment * i);
    }
    let segCopy = JSON.parse(JSON.stringify(segmentArr)),
      ind = segmentArr.sort((a, b) => Math.abs(val - a) - Math.abs(val - b))[0];

    if(this.seekBarEl) {
      this.seekBarEl.value =  segCopy.indexOf(ind) + 1;
    }

  }

  render() {
    let style;
    if (this.fileStack && this.autoAspectRatio && this.fileStack.width > 0 && this.fileStack.height > 0) {
      style = {"--aspect-ratio": (this.fileStack.width / this.fileStack.height).toString()}
    }
    return (
      <Host style={style}>
        {(this.isPaused && this.addPlayButton) &&
          <ion-fab vertical="center" horizontal="center" slot="fixed">
            <ion-fab-button onClick={() => {
              this.clickPlay()
            }}>
              <ion-icon class="play" name="play"/>
            </ion-fab-button>
          </ion-fab>
        }
        {(this.loading) &&
          <ion-fab vertical="center" horizontal="center" slot="fixed">
            <ion-fab-button>
              <ion-spinner class="loading" color="primary" name="crescent">
              </ion-spinner>
            </ion-fab-button>
          </ion-fab>
        }
        <ion-buttons>
          {(this.muteButton) &&
            <ion-button mode="md" class="mute-button" ref={ref => this.muteButtonEl = ref}>
              <ion-icon slot="icon-only" name={(this.mutedVideo ? 'volume-mute-outline' : 'volume-high-outline')}/>
            </ion-button>
          }
          {(!this.isPaused && this.fullScreenButton) &&
            <ion-button mode="md" class="full-screen-button" onClick={event => this.switchFullScreen(event)}>
              <ion-icon slot="icon-only" name="expand-outline"/>
            </ion-button>
          }
        </ion-buttons>

        <video ref={ref => this.videoEl = ref} width={this.fileStack?.width} height={this.fileStack?.height}
               onClick={(event) => this.switchMute(event)}
               preload={this.preload}
               muted={this.mutedVideo}
               draggable={false}
               playsInline={true}
               loop={this.loopVideo} controls={this.showControls}>
          Your browser does not support the video tag.
        </video>

        {(this.fileStack) &&
          <img alt={this.fileStack?.name} ref={ref => this.posterEl = ref} class="poster"
               src={FileStackToPreviewUrl(this.fileStack, '900xxx', 'jpg')}/>
        }

        {(this.fileStack && this.fileStack.hasOwnProperty("duration")) &&
          <div class="video-progress">
            <ion-progress-bar ref={ref => this.progressBarEl = ref} class="progress-bar" value={this.progressBarValue}/>
            <input type="range" ref={ref => this.seekBarEl = ref} class="seek" onInput={() => {
              this.skipAhead()
            }} min="0" max="1" step="0.01" value="0"/>
          </div>
        }
      </Host>
    );
  }

}
