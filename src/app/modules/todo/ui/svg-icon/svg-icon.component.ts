import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-svg-icon',
  templateUrl: './svg-icon.component.html',
  styleUrls: ['./svg-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SvgIconComponent implements OnInit {
  @Input() svgPath!: string;
  @Input() width!: string;
  @Input() height!: string;
  @Input() color!: string;
  svgContent: SafeHtml = '';

  constructor(
    private sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    if (this.svgPath) {
      this.loadSvg(this.svgPath);
    }
  }

  private loadSvg(path: string): void {
    fetch(path)
      .then(response => response.text())
      .then(svg => {
        this.svgContent = this.sanitizer.bypassSecurityTrustHtml(this.modifySvg(svg, this.width, this.height, this.color));
        this.cdr.markForCheck();
      })
      .catch(error => console.error('Error loading SVG:', error));
  }

  private modifySvg(svg: string, width: string, height: string, color: string): string {
    const parser = new DOMParser();
    const doc = parser.parseFromString(svg, 'image/svg+xml');
    const svgElement = doc.querySelector('svg');

    if (svgElement) {
      svgElement.setAttribute('width', width);
      svgElement.setAttribute('height', height);

      if (color) {
        this.setSvgColor(svgElement, color);
      }
    }

    return new XMLSerializer().serializeToString(doc);
  }

  private setSvgColor(svgElement: SVGSVGElement, color: string): void {
    const paths = svgElement.querySelectorAll('path');
    paths.forEach(path => {
      path.setAttribute('fill', color);
    });
  }
}
