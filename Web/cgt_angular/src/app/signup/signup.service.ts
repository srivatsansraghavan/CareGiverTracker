import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SignupService {
  constructor(private httpClient: HttpClient) {}
}
