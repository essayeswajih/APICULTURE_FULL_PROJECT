import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Home } from "./pages/home/home";
import { Header } from "./header/header";
import { Footer } from "./footer/footer";
import { ToastrDemo } from "./toastr-demo/toastr-demo";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, ToastrDemo],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'Apiculture';
}
