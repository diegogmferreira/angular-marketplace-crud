import { Component } from '@angular/core';
import { Login } from "./pages/login/login";

@Component({
  selector: 'app-root',
  imports: [Login],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  
}
