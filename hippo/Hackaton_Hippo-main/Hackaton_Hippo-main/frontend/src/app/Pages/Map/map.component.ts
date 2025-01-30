import { Component, Renderer2, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';

import svgPanZoom, { pan } from 'svg-pan-zoom';

const DEFAULT_SVG_PAN_OPTIONS = {
  zoomEnabled: true,
  controlIconsEnabled: true,
  center: true,
  minZoom: 1,
  maxZoom: 3,
  zoomScaleSensitivity: 0.5,
  contain: true,
  fit: true,
  panLimit: true,
};

@Component({
  standalone: true,
  imports: [ButtonModule, TagModule],
  selector: 'map-component',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  providers: [],
})
export class MapComponent implements OnInit {
  constructor(private http: HttpClient, private renderer: Renderer2) {}

  ngOnInit() {
    this.loadSVG();
  }

  private loadSVG() {
    this.http
      .get('/toulousemap.svg', { responseType: 'text' })
      .subscribe((svgContent) => {
        const svgContainer = document.getElementById('svg-container');
        if (svgContainer) {
          svgContainer.innerHTML = svgContent;
          const svgElement = svgContainer.querySelector('svg') as SVGElement;
          svgElement.id = 'gravemap-svg';
          svgElement.setAttribute('width', '100%');
          svgElement.setAttribute('height', '70vh');
          svgElement.style.borderRadius = '20px';

          this.setupPanZoom();
          this.addInteractions(svgElement);
        }
      });
  }

  setupPanZoom() {
    const svgElement = document.getElementById('gravemap-svg');
    if (svgElement) {
      const panZoomInstance = svgPanZoom(svgElement, DEFAULT_SVG_PAN_OPTIONS);
      panZoomInstance.reset();
    }
  }

  private addInteractions(svgElement: SVGElement) {
    // Query selector all that goes through all the
    const pathElements = Array.from(
      svgElement.querySelectorAll('[id*="PATH"]')
    );

    pathElements.forEach((element) => {
      const numZone = parseInt(element.id.replace('PATH', ''));
      this.addInteraction(element, numZone);
    });
  }

  private addInteraction(element: Element, numZone: number) {
    this.applyInitialStyle(element, numZone);
    this.renderer.listen(element, 'mouseover', () =>
      this.applyHoverStyle(element, numZone)
    );
    this.renderer.listen(element, 'mouseout', () =>
      this.applyInitialStyle(element, numZone)
    );
    this.renderer.listen(element, 'click', () => this.selectZone(numZone));
  }

  private applyInitialStyle(element: Element, numZone: number) {
    this.renderer.setStyle(element, 'fill', this.getZoneColor(numZone));
    this.renderer.setStyle(element, 'fill-opacity', '0.5');
  }

  private applyHoverStyle(element: Element, numZone: number) {
    this.renderer.setStyle(
      element,
      'fill',
      this.darkenColor(this.getZoneColor(numZone))
    );
    this.renderer.setStyle(element, 'fill-opacity', '0.8');
  }

  private getZoneColor(numZone: number): string {
    switch (numZone) {
      case 1:
        return '#FF0000';
      case 2:
        return '#00FF00';
      case 3:
        return '#0000FF';
      case 4:
        return '#FFFF00';
      case 5:
        return '#00FFFF';
      default:
        return '#000000';
    }
  }

  private darkenColor(color: string): string {
    const rgb = color.match(/[\da-f]{2}/gi)?.map((c) =>
      Math.max(0, parseInt(c, 16) - 50)
        .toString(16)
        .padStart(2, '0')
    );
    return `#${rgb?.join('')}`;
  }

  zoomIn() {
    const svgElement = document.getElementById('gravemap-svg');
    if (svgElement) svgPanZoom(svgElement, DEFAULT_SVG_PAN_OPTIONS).zoomIn();
  }

  zoomOut() {
    const svgElement = document.getElementById('gravemap-svg');
    if (svgElement) svgPanZoom(svgElement, DEFAULT_SVG_PAN_OPTIONS).zoomOut();
  }

  up() {
    const svgElement = document.getElementById('gravemap-svg');
    if (svgElement)
      svgPanZoom(svgElement, DEFAULT_SVG_PAN_OPTIONS).panBy({ x: 0, y: 50 });
  }

  down() {
    const svgElement = document.getElementById('gravemap-svg');
    if (svgElement)
      svgPanZoom(svgElement, DEFAULT_SVG_PAN_OPTIONS).panBy({ x: 0, y: -50 });
  }

  selectZone(numZone: number) {
    localStorage.setItem('selectedZone', numZone.toString());
    // Redirect to the zone page
    window.location.href = `/${numZone}/info`;
  }
}
