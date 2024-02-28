import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Task } from './Model/task';
import { WebSocketService } from './services/web-socket.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{

  title = 'real-dashboard-client';

  tasks: Task[] = [];

  form: FormGroup = new FormGroup({
    name: new FormControl<string>('', Validators.required),
    days: new FormControl<number>(0 , Validators.required)
  });

  constructor(private webSocketService: WebSocketService) {
  }

  ngOnInit(): void {
    this.webSocketService.listen(task => {
      this.tasks.push(task);
    });
  }

  add(name: string, days: number): void {
    const task: Task = {
      name: name,
      days: days
    };
    this.webSocketService.send(task);
  }

  click(): void{
    this.add(this.form.value.name, this.form.value.days);
    this.form.reset({});
  }


}