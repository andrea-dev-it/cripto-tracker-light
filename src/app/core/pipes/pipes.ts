import { formatCurrency } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'profits', standalone: true })
export class ProfitsPipe implements PipeTransform {
  transform(num: number, args?: any): any {
    return `${num > 0 ? '' : '- '} ${Math.abs(num).toLocaleString('it-IT', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })} €`;
  }
}

@Pipe({ name: 'profitsNoDecimal', standalone: true })
export class ProfitsNoDecimalPipe implements PipeTransform {
  transform(num: number, args?: any): any {
    if (num === 0) return num + ' €';
    return `${num > 0 ? '' : '- '} ${Math.abs(num).toLocaleString('it-IT', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })} €`;
  }
}

@Pipe({ name: 'profitsPerc', standalone: true })
export class ProfitsPercPipe implements PipeTransform {
  transform(num: number, args?: any): any {
    if (!num) return '∞%';

    return `${Math.abs(num).toLocaleString('it-IT', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })}%`;
  }
}

@Pipe({ name: 'profitsPercSimulator', standalone: true })
export class ProfitsPercSimulatorPipe implements PipeTransform {
  transform(num: number, args?: any): any {
    if (!num) return '∞%';
    return `${num > 0 ? '' : '- '} ${Math.abs(num).toLocaleString('it-IT', {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    })}%`;
  }
}

@Pipe({ name: 'profitsPercNodecimal', standalone: true })
export class ProfitsPercNoDecimalPipe implements PipeTransform {
  transform(num: number, args?: any): any {
    if (!num) return '∞%';
    return `${num > 0 ? '' : '- '} ${Math.abs(num).toLocaleString('it-IT', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })}%`;
  }
}

@Pipe({ name: 'deposits', standalone: true })
export class DepositsPipe implements PipeTransform {
  transform(num: number, args?: any): any {
    return `${Math.abs(num).toLocaleString('it-IT', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })} €`;
  }
}

@Pipe({ name: 'depositsNoDecimal', standalone: true })
export class DepositsNoDecimalPipe implements PipeTransform {
  transform(num: number, args?: any): any {
    return `${Math.abs(num).toLocaleString('it-IT', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })} €`;
  }
}

@Pipe({ name: '$depositsNoDecimal', standalone: true })
export class $DepositsNoDecimalPipe implements PipeTransform {
  transform(num: number, args?: any): any {
    return `$ ${Math.abs(num).toLocaleString('it-IT', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })}`;
  }
}

@Pipe({
  name: 'shortNumber',
  standalone: true,
})
export class ShortNumberPipe implements PipeTransform {
  transform(number: number, args?: any): any {
    if (isNaN(number)) return null; // will only work value is a number
    if (number === null) return null;
    if (number === 0) return null;
    let abs = Math.abs(number);
    const rounder = Math.pow(10, 1);
    const isNegative = number < 0; // will also work for Negative numbers
    let key = '';

    const powers = [
      { key: ' Q', value: Math.pow(10, 15) },
      { key: ' T', value: Math.pow(10, 12) },
      { key: ' B', value: Math.pow(10, 9) },
      { key: ' M', value: Math.pow(10, 6) },
      { key: ' K', value: 1000 },
    ];

    for (let i = 0; i < powers.length; i++) {
      let reduced = abs / powers[i].value;
      reduced = Math.round(reduced * rounder) / rounder;
      if (reduced >= 1) {
        abs = reduced;
        key = powers[i].key;
        break;
      }
    }
    return (isNegative ? '-' : '') + Math.round(abs) + key;
  }
}

@Pipe({ name: 'quantity', standalone: true })
export class QuantityPipe implements PipeTransform {
  transform(num: number, args?: any): any {
    return num > 999
      ? formatCurrency(num, 'it-IT', '', 'EUR', '0.0-0')
      : formatCurrency(num, 'it-IT', '', 'EUR', '0.2-2');
  }
}

@Pipe({
  name: 'shortNumberUsd',
  standalone: true,
})
export class ShortNumberUsdPipe implements PipeTransform {
  transform(value: number, args?: any): any {
    if (isNaN(value)) return null;
    if (value === null) return null;
    if (value === 0) return '$ 0';

    const abs = Math.abs(value * 1000000);
    const isNegative = value < 0;
    let isBillion = false;

    const powers = [
      { key: ' B', value: Math.pow(10, 9) },
      { key: ' M', value: Math.pow(10, 6) },
      { key: ' K', value: 1000 },
    ];

    for (let i = 0; i < powers.length; i++) {
      if (abs >= powers[i].value) {
        isBillion = i === 0; // Imposta isBillion a true se il numero è in miliardi
        const formattedNumber = this.formatNumberWithCommas(
          abs / powers[i].value,
          i !== 2 && isBillion
        );
        const result =
          (isNegative ? '-' : '') + '$' + formattedNumber + powers[i].key;
        return result.trim(); // Rimuovi eventuali spazi bianchi
      }
    }

    const formattedNumber = this.formatNumberWithCommas(abs, false);
    return (isNegative ? '-' : '') + '$' + formattedNumber;
  }

  private formatNumberWithCommas(
    value: number,
    includeDecimal: boolean
  ): string {
    const formatter = new Intl.NumberFormat('it-IT', {
      maximumFractionDigits: includeDecimal ? 1 : 0,
      minimumFractionDigits: includeDecimal ? 1 : 0,
      useGrouping: true,
    });

    return formatter.format(value);
  }
}

@Pipe({
  name: 'thousandsSeparator',
  standalone: true,
})
export class ThousandsSeparatorPipe implements PipeTransform {
  transform(value: number): string | null {
    if (isNaN(value)) return null;
    if (value === null) return null;
    if (value === 0) return '0';

    const abs = Math.abs(value);
    const isNegative = value < 0;

    const formattedNumber = new Intl.NumberFormat('it-IT', {
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
      useGrouping: true,
    }).format(abs);

    return (isNegative ? '-' : '') + formattedNumber;
  }
}

@Pipe({
  name: 'timeFromNow',
  standalone: true,
})
export class TimeFromNowPipe implements PipeTransform {
  transform(timestamp: number): string {
    const now = new Date();
    const dateToCompare = new Date(timestamp);
    const timeDifference = now.getTime() - dateToCompare.getTime();
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return days === 1 ? '1 day ago' : `${days} days ago`;
    } else if (hours > 0) {
      return hours === 1 ? '1 hour ago' : `${hours} hours ago`;
    } else if (minutes > 0) {
      return minutes === 1 ? '1 minute ago' : `${minutes} minutes ago`;
    } else {
      return seconds === 1 ? '1 second ago' : `${seconds} seconds ago`;
    }
  }
}

@Pipe({ name: 'ratingLevel', standalone: true })
export class RatingLevelPipe implements PipeTransform {
  transform(level: string, args?: any): any {
    return level?.slice(0, 2) + '%';
  }
}

@Pipe({ name: 'formatNumberIt', standalone: true })
export class FormatNumberItPipe implements PipeTransform {
  transform(num: number, args?: any): any {
    const formatter = new Intl.NumberFormat('it-IT', {
      maximumFractionDigits: 4,
      minimumFractionDigits: 2,
      useGrouping: true,
    });

    return formatter.format(num);
  }
}
