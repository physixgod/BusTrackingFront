import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dayMonth'
})
export class DayMonthPipe implements PipeTransform {

  transform(date: Date | string): string {
    if (!date) return '';
    
    const day = new Date(date).getDate();
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const month = monthNames[new Date(date).getMonth()];
    
    let suffix = 'th';
    if (day === 1 || day === 21 || day === 31) suffix = 'st';
    else if (day === 2 || day === 22) suffix = 'nd';
    else if (day === 3 || day === 23) suffix = 'rd';
    
    return `${day}${suffix} ${month}`;
  }
}
