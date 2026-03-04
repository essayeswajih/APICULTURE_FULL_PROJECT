import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoStories } from './video-stories';

describe('VideoStories', () => {
  let component: VideoStories;
  let fixture: ComponentFixture<VideoStories>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoStories]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoStories);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
