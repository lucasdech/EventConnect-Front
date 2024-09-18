import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule],
})
export class HomeComponent implements OnInit {

    images: { src: string, alt: string }[] = [
    { src: 'assets/images/home-carousel/1.png', alt: 'Événement 1'},
    { src: 'assets/images/home-carousel/2.png', alt: 'Événement 2'},
    { src: 'assets/images/home-carousel/4.png', alt: 'Événement 3'},
  ];

  currentIndex = 0;

  ngOnInit() {
    // Utilisez requestAnimationFrame au lieu de setInterval
    this.startCarousel();
  }

  startCarousel() {
    const animate = () => {
      this.nextImage();
      setTimeout(() => requestAnimationFrame(animate), 5000);
    };
    requestAnimationFrame(animate);
  }

  nextImage() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  prevImage() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }
}
