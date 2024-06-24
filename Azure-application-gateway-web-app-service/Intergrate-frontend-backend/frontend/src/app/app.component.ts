import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { environment } from '../environments/environment.development';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'angular-frontend';
  data: any;
  error: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get(`${environment.backendUrl}/data`).subscribe(response => {
      this.data = response;
    }, error => {
      this.error = error;
    });
  }
}
