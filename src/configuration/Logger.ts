import { LoggerService, Injectable } from '@nestjs/common';
import { createWriteStream, mkdirSync, WriteStream } from 'fs';
import { EOL } from 'os';
import { join } from 'path';

@Injectable()
export class MyLogger implements LoggerService {
  logStream!: WriteStream;
  warningStream!: WriteStream;
  errorStream!: WriteStream;
  allStream!: WriteStream;
  requestStream!: WriteStream;
  queryStream!: WriteStream;
  /**
   * Create a new instance of MyLogger.
   */
  path_folder_logger: string = process.env.PATH_FOLDER_LOGES;
  constructor() {
    mkdirSync(join(process.cwd(), this.path_folder_logger), {
      recursive: true,
    });
    this.logStream = createWriteStream(
      join(process.cwd(), this.path_folder_logger, 'log.log'),
      {
        flags: 'a',
      },
    );
    this.warningStream = createWriteStream(
      join(process.cwd(), this.path_folder_logger, 'warning.log'),
      { flags: 'a' },
    );

    this.errorStream = createWriteStream(
      join(process.cwd(), this.path_folder_logger, 'error.log'),
      {
        flags: 'a',
      },
    );

    this.allStream = createWriteStream(
      join(process.cwd(), this.path_folder_logger, 'all.log'),
      {
        flags: 'a',
      },
    );

    this.requestStream = createWriteStream(
      join(process.cwd(), 'logs', 'request.log'),
      {
        flags: 'a',
      },
    );

    this.queryStream = createWriteStream(
      join(process.cwd(), 'logs', 'query.log'),
      {
        flags: 'a',
      },
    );
  }

  Reset = '\x1b[0m';
  Bright = '\x1b[1m';
  Dim = '\x1b[2m';
  Underscore = '\x1b[4m';
  Blink = '\x1b[5m';
  Reverse = '\x1b[7m';
  Hidden = '\x1b[8m';

  FgBlack = '\x1b[30m';
  FgRed = '\x1b[31m';
  FgGreen = '\x1b[32m';
  FgYellow = '\x1b[33m';
  FgBlue = '\x1b[34m';
  FgMagenta = '\x1b[35m';
  FgCyan = '\x1b[36m';
  FgWhite = '\x1b[37m';
  FgGray = '\x1b[90m';

  BgBlack = '\x1b[40m';
  BgRed = '\x1b[41m';
  BgGreen = '\x1b[42m';
  BgYellow = '\x1b[43m';
  BgBlue = '\x1b[44m';
  BgMagenta = '\x1b[45m';
  BgCyan = '\x1b[46m';
  BgWhite = '\x1b[47m';
  BgGray = '\x1b[100m';

  name_project: string = process.env.APP_NAME || 'Welcome Nest App';
  /**
   * Write a 'log' level log.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  log(message: any, ...optionalParams: any[]) {
    // console.log(optionalParams);
    const log = `[${this.name_project}] [${this.FgMagenta}${this.customTimestampFormat()}${this.Reset}] [${this.FgGreen}${this.Bright}LOG${
      this.Reset
    }${this.Reset}] ${this.FgBlack + message + this.Reset}`;
    console.log(log);
    this.write(this.logStream, 'LOG', message);
  }

  /**
   * Write a 'fatal' level log.
   */
  fatal(message: any, ...optionalParams: any[]) {
    console.log(`fatal: `, message, ...optionalParams);
  }

  /**
   * Write an 'error' level log.
   */
  error(message: any, ...optionalParams: any[]) {
    console.log('error', ...optionalParams);
    const log = `[${this.name_project}] [${this.FgMagenta}${this.customTimestampFormat()}${this.Reset}] [${this.FgRed}${this.Bright}ERROR${
      this.Reset
    }${this.Reset}] ${this.FgCyan + message + this.Reset}`;
    console.log(log);
    this.write(this.errorStream, 'ERROR', message);
  }

  /**
   * Write a 'warn' level log.
   */
  warn(message: any, ...optionalParams: any[]) {
    console.log('warn', ...optionalParams);
    const log = `[${this.name_project}] [${this.FgMagenta}${this.customTimestampFormat()}${this.Reset}] [${this.FgRed}${this.Bright}WARNING${
      this.Reset
    }${this.Reset}] ${this.FgYellow + message + this.Reset}`;
    console.log(log);
    this.write(this.warningStream, 'WARNING', message);
  }

  query(message: any) {
    console.log('====================================');
    console.log(message);
    console.log('====================================');
    const msg = `code: ${new Date().getTime()} \n ${message} \n`;
    this.write(this.queryStream, 'QUERY', msg);
  }

  url_http(message: any, optionalParams) {
    // const log = `[${this.name_project}] [${this.FgMagenta}${this.customTimestampFormat()}${this.Reset}] [${this.FgGreen}${this.Bright}HTTP URL${
    //   this.Reset
    // }${this.Reset}] code: ${new Date().getTime()} \n ${this.FgBlue + this.Blink + message + this.Reset + this.Reset} \n ${optionalParams}`;
    // console.log(log);
    this.write(
      this.requestStream,
      'HTTP URL',
      `code: ${new Date().getTime()} \n ${message} \n ${optionalParams} \n`,
    );
  }

  /**
   * Write a 'debug' level log.
   */
  debug?(message: any, ...optionalParams: any[]) {
    console.log(`debug: `, message, ...optionalParams);
  }

  /**
   * Write a 'verbose' level log.
   */
  verbose?(message: any, ...optionalParams: any[]) {
    console.log(`verbose: `, message, ...optionalParams);
  }

  customTimestampFormat = () => {
    const date = new Date();
    const dayName = date.toLocaleDateString('en-us', { weekday: 'short' });
    const monthName = date.toLocaleDateString('en-us', { month: 'short' });
    const day = date.getDate();
    const year = date.getFullYear();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    const finalFormat = `${dayName} ${monthName} ${day} ${year} | ${hour}:${minute}:${second}`;
    return finalFormat;
  };
  /**
   * Write a 'info' level log.
   */
  write(stream, type, msg) {
    const message = `[${this.name_project}] [${this.customTimestampFormat()}] [${type}] ${msg}`;
    this.allStream.write(message + EOL);
    stream.write(message + EOL);
  }
}
