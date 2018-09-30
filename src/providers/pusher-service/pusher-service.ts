import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
declare const Pusher: any;
@Injectable()

export class PusherServiceProvider {
  pusher: any;
  constructor(public http: HttpClient) {
    this.pusher = new Pusher('fc44950e09ecefa9effd', {
      cluster: 'ap2',
      forceTLS: true
    });

  }
  public init(name: string) {
    return this.pusher.subscribe(name);
  }
  public destroy(name: string) {
    this.pusher.unsubscribe(name);
  }
}