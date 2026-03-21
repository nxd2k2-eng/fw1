import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Footer } from '../../components/client/footer/footer';
import { Header } from '../../components/client/header/header';

@Component({
  selector: 'app-client-layout',
  standalone: true,          
  imports: [RouterModule, Header, Footer],
  templateUrl: './client-layout.html',
  styleUrl: './client-layout.css',
})
export class ClientLayout {}