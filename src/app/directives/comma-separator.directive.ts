import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[FormatCommaSeparator]'
})
export class CommaSeparatorDirective {

  constructor(private el: ElementRef<HTMLInputElement>) {}

  private formatValue(value: string): string {
    if (!value) return '';

    value = value.toUpperCase().replace(/,/g, '').trim();

    let multiplier = 1;

    if (value.endsWith('T')) {
      multiplier = 1_000;
      value = value.slice(0, -1);
    } else if (value.endsWith('M')) {
      multiplier = 1_000_000;
      value = value.slice(0, -1);
    } else if (value.endsWith('B')) {
      multiplier = 1_000_000_000;
      value = value.slice(0, -1);
    }

    const numericValue = parseFloat(value);
    if (!isNaN(numericValue)) {
      return (numericValue * multiplier).toLocaleString('en-US');
    }

    return '';
  }

  @HostListener('blur')
  onBlur() {
    const input = this.el.nativeElement;
    input.value = this.formatValue(input.value);
  }

  @HostListener('focus')
  onFocus() {
    // Optional: remove formatting when focusing to allow easier editing
    const input = this.el.nativeElement;
    input.value = input.value.replace(/,/g, '');
  }
}